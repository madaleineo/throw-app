import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function EditSession() {
  const navigate = useNavigate();
  const { sessionId } = useParams(); // Extract sessionId from URL

  // Assuming sessionsData is available, e.g., fetched or passed as props.
  const sessionsData = [
    { id: '1', name: "Mandy Parker", date: "2024-11-12", people: 2, wheels: 1, status: "In progress" },
    { id: '2', name: "TJ Decker", date: "2024-11-12", people: 2, wheels: 1, status: "In progress" },
    { id: '3', name: "Paula Higgins", date: "2024-11-12", people: 2, wheels: 1, status: "In progress" },
    { id: '4', name: "Michael Phelps", date: "2024-11-14", people: 2, wheels: 2, status: "Upcoming" },
    { id: '5', name: "Joshua Felt", date: "2024-11-14", people: 2, wheels: 2, status: "Upcoming" },
    { id: '6', name: "Vanessa Moody", date: "2024-11-14", people: 2, wheels: 2, status: "Upcoming" },
    { id: '7', name: "Michael Pastor", date: "2024-11-14", people: 2, wheels: 2, status: "Upcoming" },
    { id: '8', name: "Cindy Loo Hoo", date: "2024-11-11", people: 4, wheels: 3, status: "Paid" },
    { id: '9', name: "Vindy Allen", date: "2024-11-11", people: 4, wheels: 3, status: "Paid" },
    { id: '10', name: "Franklin D. Roosevelt", date: "2024-11-13", people: 4, wheels: 3, status: "Upcoming" },
    { id: '11', name: "Barney", date: "2024-11-13", people: 4, wheels: 3, status: "Upcoming" },
    { id: '12', name: "Mr. Sykes", date: "2024-11-13", people: 4, wheels: 3, status: "Upcoming" },
    { id: '13', name: "Miss Muffet", date: "2024-11-11", people: 4, wheels: 4, status: "Paid" },
    { id: '14', name: "Miss Piggy", date: "2024-11-11", people: 4, wheels: 4, status: "No show" },
  ];

  const [session, setSession] = useState(null); // Initialize session state as null

  useEffect(() => {
    // Find the session data by sessionId (make sure sessionId is a string if needed)
    const foundSession = sessionsData.find(session => session.id === sessionId);
    if (foundSession) {
      setSession(foundSession); // Set session data for editing
    }
  }, [sessionId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSession(prevSession => ({
      ...prevSession,
      [name]: name === 'people' || name === 'wheels' ? Number(value) : value, // Parse number fields
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you’d send the updated `session` data to your backend or update app state
    console.log('Updated session data:', session);
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!session) return <p>Loading...</p>; // Loading state until session data is fetched

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="font-bold text-2xl mb-4">Edit Session</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={session.name}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={session.date}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Number of People</label>
          <input
            type="number"
            name="people"
            value={session.people}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
            min="1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Number of Wheels</label>
          <input
            type="number"
            name="wheels"
            value={session.wheels}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
            min="1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Status</label>
          <select
            name="status"
            value={session.status}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="Upcoming">Upcoming</option>
            <option value="In progress">In progress</option>
            <option value="Paid">Paid</option>
            <option value="No show">No show</option>
          </select>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
