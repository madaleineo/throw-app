import { useLoaderData, json, Form } from '@remix-run/react';
import { db } from '../utils/db.server';
import React, { useState } from 'react';

// Loader to fetch pots, statuses, and groups
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
    };
  });

  return json({ pots: potsWithStatus, statuses });
}

// Action to handle both single and multiple updates
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const potId = formData.get('potId');
  const status_id = formData.get('status_id');
  const potIds = formData.getAll('potIds'); // When mass updating, we send multiple IDs
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
      return json({ success: true });
    } else if (potId && status_id) {
      // Single pot update
      await db.pot.update({
        where: { id: parseInt(potId as string, 10) },
        data: { status_id: parseInt(status_id as string, 10) },
      });
      return json({ success: true });
    } else {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }
  } catch (error) {
    console.error('Failed to update status:', error);
    return json({ error: 'Failed to update status' }, { status: 500 });
  }
}

export default function ManagePots() {
  const data = useLoaderData<typeof loader>();
  const [pots, setPots] = useState(data.pots);
  const [filters, setFilters] = useState({ startDate: '', endDate: '' });
  const [searchQuery, setSearchQuery] = useState('');

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
      } else {
        console.error('Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // Filter pots based on the date range and search query
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

  // Handle mass update to packaged
  const handleMassUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('actionType', 'massUpdate');
      // Add all filtered pot IDs to the formData
      filteredPots.forEach((pot) => formData.append('potIds', pot.id.toString()));

      const response = await fetch('', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Refresh the page to see changes
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
