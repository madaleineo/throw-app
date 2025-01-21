import { useLoaderData, json, Form } from '@remix-run/react';
import { db } from '../utils/db.server';
import React, { useState } from 'react';

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
      groupPhone: group ? group.phone : null,
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
      const ids = potIds.map((id) => parseInt(id as string, 10));
      await db.pot.updateMany({
        where: { id: { in: ids } },
        data: { status_id: 2 },
      });
      await checkAndTriggerGHL(ids);
      return json({ success: true });
    } else if (potId && status_id) {
      const updatedPot = await db.pot.update({
        where: { id: parseInt(potId as string, 10) },
        data: { status_id: parseInt(status_id as string, 10) },
      });
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

async function checkAndTriggerGHL(potIds: number[]) {
  const pots = await db.pot.findMany({
    where: { id: { in: potIds } },
    select: { group_id: true },
  });

  const groupIds = [...new Set(pots.map((p) => p.group_id))];

  for (const groupId of groupIds) {
    const groupPots = await db.pot.findMany({
      where: { group_id: groupId },
    });

    const allPackaged = groupPots.every((p) => p.status_id === 2);
    if (allPackaged) {
      const group = await db.group.findUnique({ where: { id: groupId } });
      if (group && group.phone) {
        await sendGHLTextMessage(group.phone);
      }
    }
  }
}

async function sendGHLTextMessage(phoneNumber: string) {
  const locationId = process.env.GHL_LOCATION_ID;
  const apiKey = process.env.GHL_API_KEY;

  const message =
    'Hello there! Your pots from THROW Art Studios are now ready to be picked up! Please remember that you have 14 days to pick up your pots. If you do not pick them up within 14 days, we will sadly have to destroy them. Please click this link to schedule a time to pick up your pots. https://fareharbor.com/embeds/book/luv-jp/items/562991/calendar/2024/12/?flow=1022190&full-items=yes';

  const response = await fetch('https://services.leadconnectorhq.com/conversations/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      Version: '2021-04-15',
    },
    body: JSON.stringify({
      type: 'SMS',
      contactId: '',
      locationId,
      fromNumber: '+13854752856',
      toNumber: `+1${phoneNumber}`,
      messageType: 'OUTBOUND',
      message: message,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[GHL] Failed to send SMS:', response.status, response.statusText, errorText);
  } else {
    console.log('[GHL] SMS successfully sent to:', phoneNumber);
  }
}

export default function ManagePots() {
  const data = useLoaderData<typeof loader>();
  const [pots, setPots] = useState(data.pots);
  const [filters, setFilters] = useState({ startDate: '', endDate: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [showPackaged, setShowPackaged] = useState(false); // Added toggle state

  const handleTogglePackagedView = () => {
    setShowPackaged((prev) => !prev); // Toggle packaged/unpackaged view
  };

  const handleClearFilters = () => {
    setFilters({ startDate: '', endDate: '' });
    setSearchQuery('');
  };

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
    const matchesPackaged = showPackaged ? pot.status_id === 2 : pot.status_id !== 2;

    const createdAt = new Date(pot.created_at).getTime();
    const startDate = filters.startDate ? new Date(filters.startDate).getTime() : null;
    const endDate = filters.endDate ? new Date(filters.endDate).getTime() : null;

    const matchesDate =
      (!startDate || createdAt >= startDate) && (!endDate || createdAt <= endDate);

    const matchesSearch =
      pot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pot.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pot.groupName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPackaged && matchesDate && matchesSearch;
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
        <div className="flex gap-2 pb-4 items-end">
          <button
            onClick={handleTogglePackagedView}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {showPackaged ? 'Show Unprocessed Pots' : 'Show Packaged Pots'}
          </button>
          <div>
            <label htmlFor="startDate" className="block mb-1">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={filters.startDate}
              onChange={(e) => setFilters((prev) => ({ ...prev, startDate: e.target.value }))}
              className="border rounded px-2 w-40"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block pb-1">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={filters.endDate}
              onChange={(e) => setFilters((prev) => ({ ...prev, endDate: e.target.value }))}
              className="border rounded px-2 w-40"
            />
          </div>
          <div>
            <label htmlFor="searchQuery" className="block mb-1">Search</label>
            <input
              type="text"
              id="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-48 border rounded px-2"
            />
          </div>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
          >
            Clear Filters
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
                    className="border rounded bg-pale-yellow"
                  >
                    {data.statuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="ml-2 px-4 py-1 bg-deep-green text-white rounded hover:bg-hover-green"
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
