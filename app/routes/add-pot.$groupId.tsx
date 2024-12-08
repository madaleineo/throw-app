import { json, useLoaderData, Link, Form } from "@remix-run/react";
import { useState } from "react";
import { db } from "../utils/db.server";
import { ActionFunctionArgs } from "@remix-run/node";

// Loader to fetch group and pots data
export async function loader({ params }: { params: { groupId: string } }) {
  const { groupId } = params;

  const group = await db.group.findUnique({
    where: {
      id: parseInt(groupId, 10),
    },
  });

  if (!group) {
    throw new Response("Group not found", { status: 404 });
  }

  const pots = await db.pot.findMany({
    where: {
      group_id: group.id,
    },
  });

  return json({ group, pots });
}

// Action to handle form submission and create a new pot
export async function action({ request }: ActionFunctionArgs) {
  try {
    const { artistName, description, groupId }: { artistName: string; description: string; groupId: number } = await request.json();

    if (!artistName || !description || !groupId) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }

    const newPot = await db.pot.create({
      data: {
        name: artistName,
        description,
        group_id: groupId,
      },
    });

    return json(newPot, { status: 201 });
  } catch (error) {
    console.error("Failed to create pot:", error);
    return json({ error: "Failed to create pot" }, { status: 500 });
  }
}

type Pot = {
  id: number;
  name: string;
  description: string;
  group_id: number;
};

export default function AddPot() {
  const { group, pots: initialPots } = useLoaderData<{ group: { id: number; name: string; phone: string }; pots: Pot[] }>();
  const [artistName, setArtistName] = useState("");
  const [description, setDescription] = useState("");
  const [pots, setPots] = useState(initialPots);

  // Handle form submission to create a new pot
  const handleAddPot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/add-pot/${group.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ artistName, description, groupId: group.id }),
      });

      if (response.ok) {
        const newPot = await response.json();
        setArtistName("");
        setDescription("");
        setPots([...pots, newPot]); // Update pots locally
        window.location.reload();
      } else {
        const error = await response.json();
        console.error("Error:", error);
        window.location.reload();
      }
    } catch (err) {
      console.error("Failed to create pot:", err);
      window.location.reload();
    }
  };

  return (
    <div className="w-screen h-screen flex flex-row justify-center p-12 bg-burnt-orange">
      {/* Group Info Section */}
      <div className="flex flex-col w-96">
        <h1 className="w-sixty font-bold text-xl">{group.name}</h1>
        <h1 className="w-sixty font-bold text-xl pb-2">Group Information</h1>
        <h2 className="w-sixty font-normal size-8">Phone Number: {group.phone}</h2>
        <p className="w-sixty">
          Add pots to your group with your name and a short description including color and any other defining features.
        </p>
        <div className="py-4">
          <Link to="/groups" className="py-2 px-8 bg-deep-green rounded hover:bg-hover-green text-white transition text-lg font-semibold">
            Back To Groups
          </Link>
        </div>
      </div>

      {/* Add Pot Section */}
      <div className="flex flex-col items-center w-96 px-24">
        <h2 className="text-xl font-bold mb-4">Add New Pot</h2>
        <Form className="flex flex-col" onSubmit={handleAddPot}>
          <input type="hidden" value={group.id} />
          <div className="flex flex-col pt-2">
            <label htmlFor="artist_name">Artist Name</label>
            <input
              id="artist_name"
              type="text"
              placeholder="John Smith"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              className="rounded px-2 py-1"
              required
            />
          </div>
          <div className="flex flex-col py-4">
            <label htmlFor="description">Description: </label>
            <input
              id="description"
              type="text"
              placeholder="Pink with flowers"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded px-2 py-1"
              required
            />
          </div>
          <button
            type="submit"
            className="py-2 px-8 bg-deep-green rounded hover:bg-hover-green text-white transition text-lg font-semibold"
          >
            Add Pot
          </button>
        </Form>
      </div>

      {/* Display Pots Section */}
      <div className="flex flex-col items-center w-96 px-24">
        <h2 className="text-xl font-bold mb-4">Pots</h2>
        <div className="flex flex-col gap-4 w-80">
          {pots.map((pot) => (
            <div
              key={pot.id}
              className="bg-deep-green text-white px-6 py-2 rounded text-center cursor-pointer hover:bg-hover-green"
            >
              <h2 className="text-lg font-semibold">{pot.name} - {pot.description}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
