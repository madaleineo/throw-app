import { useLoaderData, json, Form, useFetcher } from '@remix-run/react';
import { db } from '../utils/db.server';
import React, { useEffect, useState } from 'react';

export async function loader() {
  const pots = await db.pot.findMany();
  const statuses = await db.status.findMany();
  const groups = await db.group.findMany();

  const potsWithStatus = pots.map((pot) => {
    const status = statuses.find((status) => status.id === pot.status_id);
    const group = groups.find((g) => g.id === pot.group_id);
    return {
      ...pot,
      status: status ? status.name : 'Unknown',
      status_id: pot.status_id,
      groupName: group ? group.name : 'No Group',
      groupPhone: group ? group.phone : null
    };
  });

  return json({ pots: potsWithStatus, statuses });
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const potId = formData.get('potId');
  const status_id = formData.get('status_id');
  const potIds = formData.getAll('potIds');
  const actionType = formData.get('actionType');

  try {
    if (actionType === 'massUpdate' && potIds.length > 0) {
      // Mass update of pots
      const ids = potIds.map((id) => parseInt(id as string, 10));
      // Update all pots to status_id = 2 (packaged)
      await db.pot.updateMany({
        where: { id: { in: ids } },
        data: { status_id: 2 },
      });

      // After mass update, check if all pots in those groups are now packaged
      await checkAndTriggerGHL(ids);
      return json({ success: true });
    } else if (potId && status_id) {
      // Single pot update
      const updatedPot = await db.pot.update({
        where: { id: parseInt(potId as string, 10) },
        data: { status_id: parseInt(status_id as string, 10) },
      });

      // Check if all pots in this pot's group are now packaged
      await checkAndTriggerGHL([updatedPot.id]);
      return json({ success: true });
    } else {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }
  } catch (error) {
    console.error('Failed to update status:', error);
    return json({ error: 'Failed to update status' }, { status: 500 });
  }
}

// Helper function to check if all pots in a group are packaged, and if so, send a GHL text message
async function checkAndTriggerGHL(potIds: number[]) {
  // Find unique group IDs from these pots
  const pots = await db.pot.findMany({
    where: { id: { in: potIds } },
    select: { group_id: true }
  });

  // Unique group IDs
  const groupIds = [...new Set(pots.map(p => p.group_id))];

  for (const groupId of groupIds) {
    // Check if all pots in the group are status = 2
    const groupPots = await db.pot.findMany({
      where: { group_id: groupId },
    });

    const allPackaged = groupPots.every(p => p.status_id === 2);
    if (allPackaged) {
      // All pots in this group are packaged
      const group = await db.group.findUnique({ where: { id: groupId } });
      if (group && group.phone) {
        // Trigger GHL SMS
        await sendGHLTextMessage(group.phone);
      }
    }
  }
}

// Example function to send text via GoHighLevel API
async function sendGHLTextMessage(phoneNumber: string) {
  const locationId = process.env.GHL_LOCATION_ID;
  const apiKey = process.env.GHL_API_KEY;

  const message = "Hello there! Your pots from THROW Art Studios are now ready to be picked up! Please remember that you have 14 days to pick up your pots. If you do not pick them up within 14 days, we will sadly have to destroy them. Please click this link to schedule a time to pick up your pots. https://fareharbor.com/embeds/book/luv-jp/items/562991/calendar/2024/12/?flow=1022190&full-items=yes";

  // According to GHL API docs, sending a message typically looks like this:
  // POST /conversations/messages
  // Body: { "locationId": "...", "toNumber": "+1234567890", "channelType": "SMS", "message": "..." }

  const response = await fetch('https://services.leadconnectorhq.com/conversations/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Version': '2021-04-15'
    },
    body: JSON.stringify({
      type: 'SMS',
      contactId: '',
      locationId,
      fromNumber: '+13854752856',
      toNumber: `+1${phoneNumber}`,
      message: message
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[GHL] Failed to send SMS:", response.status, response.statusText, errorText);
  } else {
    console.log("[GHL] SMS successfully sent to:", phoneNumber);
  }
}

export default function ManagePots() {

  const data = useLoaderData<typeof loader>();
  const [pots, setPots] = useState(data.pots);
  const [filters, setFilters] = useState({ startDate: '', endDate: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const fetcher = useFetcher();

  useEffect(() => {
    // Poll every 30 seconds
    const intervalId = setInterval(() => {
      fetcher.load("/trigger-check");
    }, 30000);

    return () => clearInterval(intervalId);
  }, [fetcher]);

  const handleStatusChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const potId = form.potId.value;
    const status_id = form.status_id.value;

    try {
      const response = await fetch('', {
        method: 'POST',
        body: new FormData(form),
      });

      if (response.ok) {
        setPots((prevPots) =>
          prevPots.map((pot) =>
            pot.id === parseInt(potId, 10) ? { ...pot, status_id: parseInt(status_id, 10) } : pot
          )
        );
        window.location.reload();
      } else {
        console.error('Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const filteredPots = pots.filter((pot) => {
    const createdAt = new Date(pot.created_at).getTime();
    const startDate = filters.startDate ? new Date(filters.startDate).getTime() : null;
    const endDate = filters.endDate ? new Date(filters.endDate).getTime() : null;

    const matchesDate =
      (!startDate || createdAt >= startDate) && (!endDate || createdAt <= endDate);

    const potDateString = new Date(pot.created_at).toLocaleString().toLowerCase();

    const matchesSearch =
      pot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pot.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pot.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pot.groupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      potDateString.includes(searchQuery.toLowerCase());

    return matchesDate && matchesSearch;
  });

  const handleMassUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('actionType', 'massUpdate');
      filteredPots.forEach((pot) => formData.append('potIds', pot.id.toString()));

      const response = await fetch('', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Failed to update multiple pots');
      }
    } catch (error) {
      console.error('Error updating multiple pots:', error);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center p-12 bg-burnt-orange">
      <h2 className="text-xl font-bold mb-4">Manage Pots</h2>
      <div className="mb-6 w-full max-w-4xl">
        <div className="flex flex-wrap gap-4 mb-4 items-end">
          <div>
            <label htmlFor="startDate" className="block mb-1">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={filters.startDate}
              onChange={(e) => setFilters((prev) => ({ ...prev, startDate: e.target.value }))}
              className="border rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block mb-1">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={filters.endDate}
              onChange={(e) => setFilters((prev) => ({ ...prev, endDate: e.target.value }))}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="searchQuery" className="block mb-1">Search</label>
            <input
              type="text"
              id="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <button
            onClick={handleMassUpdate}
            className="ml-auto px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Mark All Filtered as Packaged
          </button>
        </div>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2">Date</th>
            <th className="border border-gray-500 px-4 py-2">Name</th>
            <th className="border border-gray-500 px-4 py-2">Description</th>
            <th className="border border-gray-500 px-4 py-2">Status</th>
            <th className="border border-gray-500 px-4 py-2">Group Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredPots.map((pot) => (
            <tr key={pot.id}>
              <td className="border border-gray-500 px-4 py-2 text-center">
                {new Date(pot.created_at).toLocaleString()}
              </td>
              <td className="border border-gray-500 px-4 py-2">{pot.name}</td>
              <td className="border border-gray-500 px-4 py-2">{pot.description}</td>
              <td className="border border-gray-500 px-4 py-2 text-center">
                <Form method="post" onSubmit={handleStatusChange}>
                  <input type="hidden" name="potId" value={pot.id} />
                  <select
                    name="status_id"
                    defaultValue={pot.status_id}
                    className="border rounded"
                  >
                    {data.statuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="ml-2 px-4 py-1 bg-blue-500 text-white rounded"
                  >
                    Update
                  </button>
                </Form>
              </td>
              <td className="border border-gray-500 px-4 py-2 text-center">{pot.groupName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
