import { useLoaderData, json, Form } from '@remix-run/react';
import { db } from '../utils/db.server';
import React, { useState } from 'react';

// Loader to fetch pots and statuses
export async function loader() {
  const pots = await db.pot.findMany();
  const statuses = await db.status.findMany();

  // Map pots to include the status string
  const potsWithStatus = pots.map((pot) => {
    const status = statuses.find((status) => status.id === pot.status_id);
    return {
      ...pot,
      status: status ? status.name : 'Unknown',
      status_id: pot.status_id
    };
  });

  return json({ pots: potsWithStatus, statuses });
}

// Action to handle status updates
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const potId = formData.get('potId');
  const status_id = formData.get('status_id');

  if (!potId || !status_id) {
    return json({ error: 'Missing pot ID or status ID' }, { status: 400 });
  }

  try {
    await db.pot.update({
      where: { id: parseInt(potId as string, 10) },
      data: { status_id: parseInt(status_id as string, 10) },
    });

    return json({ success: true });
  } catch (error) {
    console.error('Failed to update status:', error);
    return json({ error: 'Failed to update status' }, { status: 500 });
  }
}

// Component
export default function ManagePots() {
  const data = useLoaderData<typeof loader>();
  const [pots, setPots] = useState(data.pots);

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
        // Update local state to reflect the new status
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

  return (
    <div className="w-screen h-screen flex flex-row justify-center p-12 bg-burnt-orange">
      <div className="flex flex-col items-center w-full px-24">
        <h2 className="text-xl font-bold mb-4">Manage Pots</h2>
        <table className="table-auto w-full border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-500 px-4 py-2">Date</th>
              <th className="border border-gray-500 px-4 py-2">Name</th>
              <th className="border border-gray-500 px-4 py-2">Description</th>
              <th className="border border-gray-500 px-4 py-2">Status</th>
              <th className="border border-gray-500 px-4 py-2">Group ID</th>
            </tr>
          </thead>
          <tbody>
            {pots.map((pot) => (
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
                <td className="border border-gray-500 px-4 py-2 text-center">{pot.group_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
