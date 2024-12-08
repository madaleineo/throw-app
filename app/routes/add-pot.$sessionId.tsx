import { useParams, Link, useNavigate } from "@remix-run/react";
import { useState } from "react";
import logo from "app/images/throw.png";

export default function AddPot() {
  const { sessionId } = useParams(); // Extract sessionId from URL
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [description, setDescription] = useState("");
  const [pots, setPots] = useState([]); // State to store pots for the session

  const handleAddPot = (e) => {
    e.preventDefault();

    if (!fullName || !description) {
      alert("Please fill out both fields.");
      return;
    }

    // Add a new pot to the pots array
    const newPot = { fullName, description, id: Date.now() }; // id can be generated with timestamp or other unique identifier
    setPots((prevPots) => [...prevPots, newPot]);

    // Optionally, you can send the new pot data to your backend to associate with sessionId
    // For example: postPots(sessionId, newPot);

    // Clear form fields
    setFullName("");
    setDescription("");
  };

  const handleCancel = () => {
    navigate(`/sessions/${sessionId}`); // Navigate back to the session details
  };

  return (
    <div className="flex flex-row">


      <div className="flex flex-col w-eighty p-8">


        <div className="pt-8 pb-4">
          <h2 className="w-sixty font-bold size-8">Add a Pot to Session #{sessionId}</h2>
          <p className="w-sixty">
            Add your pot to your group with your name and a short description including color and any other defining features.
          </p>
          <form onSubmit={handleAddPot}>
            <div className="row-space-between p-2">
              <label htmlFor="full_name">Full Name: </label>
              <input
                id="full_name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="ie. John Smith"
              />
            </div>

            <div className="row-space-between p-2">
              <label htmlFor="last_names">Description: </label>
              <input
                id="last_names"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="ie. Piece 1: Blue and white, Piece 2: Pink with flowers."
              />
            </div>
            <div className="flex space-x-2 mt-4">
              <button type="submit" className="bg-plurple text-white px-4 py-2 rounded-sm">Add Pot</button>
              <button type="button" onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded-sm">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
