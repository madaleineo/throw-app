import { useState } from 'react';
import { ActionFunctionArgs } from '@remix-run/node';
import { useLoaderData, json, Form, Link } from '@remix-run/react';
import { db } from '../utils/db.server';

// Loader to fetch groups where group_complete === false
export async function loader() {
  const groups = await db.group.findMany({
    where: {
      group_complete: false,
    },
  });
  return json({ groups });
}

// Action to handle form submission and create a new group
export async function action({ request }: ActionFunctionArgs) {
  try {
    const { groupName, phone, email }: { groupName: string; phone: string; email: string } = await request.json();

    if (!groupName || !phone || !email) {
      return json({ error: 'Missing Group Name, Phone Number, or Email' }, { status: 400 });
    }

    const newGroup = await db.group.create({
      data: {
        name: groupName,
        phone: phone,
        email: email, // Save email in the database
      },
    });

    return json({ group: newGroup }, { status: 201 });
  } catch (error) {
    console.error('Failed to create group:', error);
    return json({ error: 'Failed to create group' }, { status: 500 });
  }
}

type Group = {
  id: number;
  name: string;
  group_complete: boolean;
};

export default function Groups() {
  const { groups } = useLoaderData<{ groups: Group[] }>();
  const [groupName, setGroupName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(''); // State for email
  const [localGroups, setLocalGroups] = useState(groups || []);

  // Handle form submission to create a new group
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groupName, phone, email }), // Send email in the request
      });

      if (response.ok) {
        const data = await response.json();
        setGroupName('');
        setPhone('');
        setEmail(''); // Reset email field
        setLocalGroups([...localGroups, data.group]); // Update local state
        window.location.reload();
      }
    } catch (err) {
      console.error('Failed to create group:', err);
      window.location.reload();
    }
  };

  return (
    <div className="w-screen h-screen flex flex-row justify-center p-12 bg-burnt-orange">
      {/* Create Group Section */}
      <div className="flex flex-col items-center w-96 px-24">
        <h2 className="text-xl font-bold mb-4">Create New Group</h2>
        <Form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col pt-2">
            <label htmlFor="groupName">Group Name</label>
            <input
              id="groupName"
              type="text"
              placeholder="Smith Family"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="rounded px-2 py-1"
              required
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded px-2 py-1"
              required
            />
          </div>
          <div className="flex flex-col pb-4">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="123-456-7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded px-2 py-1"
              required
            />
          </div>
          <button
            type="submit"
            className="py-2 px-8 bg-deep-green rounded hover:bg-hover-green text-white transition text-lg font-semibold"
          >
            Create Group
          </button>
        </Form>
      </div>

      {/* Select Group Section */}
      <div className="flex flex-col items-center w-96 px-24">
        <h2 className="text-xl font-bold mb-4">Select Your Group</h2>
        <div className="flex flex-col gap-4">
          {groups.map((group) => (
            <Link to={`/add-pot/${group.id}`}
              key={group.id}
              className="bg-deep-green text-white px-6 py-2 rounded text-center cursor-pointer hover:bg-hover-green"
            >
              <span className="text-lg font-semibold">{group.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
