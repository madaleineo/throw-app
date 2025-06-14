import { useState } from 'react';
import { Link } from "@remix-run/react";
import logo from "app/images/throw.png";

export default function Pottery() {
  const [dateFilter, setDateFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const sessions = [
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

  const filteredSessions = sessions
    .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date
    .filter(session => {
      const matchesDate = dateFilter ? session.date === dateFilter : true;
      const matchesName = nameFilter ? session.name.toLowerCase().includes(nameFilter.toLowerCase()) : true;
      return matchesDate && matchesName;
    });

  // Function to clear filters
  const clearFilters = () => {
    setDateFilter("");
    setNameFilter("");
  };

  // Function to get color class for each status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-700";
      case "In progress":
        return "bg-yellow-100 text-yellow-700";
      case "Paid":
        return "bg-green-200 text-green-700";
      case "No show":
        return "bg-red-200 text-red-900";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <div className='flex flex-row'>
        <div className="bg-burnt-orange flex flex-col p-4 w-60 min-h-screen">
          <div className="flex justify-center">
            <img src={logo} className='w-40' alt='Throw logo' />
          </div>
          <div className="p-2">
            <button className="p-2 flex flex-row bg-hover-orange min-w-full rounded-sm">
              {/* Sessions Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 pr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="..." />
              </svg>
              Sessions
            </button>
          </div>
          <div className="p-2 ">
            <Link to='/scheduling' className="p-2 flex flex-row hover:bg-hover-orange min-w-full rounded-sm text-black font-normal hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 pr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              Scheduling
            </Link>
          </div>
          <div className="p-2">
            <Link to='/users' className="p-2 flex flex-row hover:bg-hover-orange min-w-full rounded-sm  text-black font-normal hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 pr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
              Users
            </Link>
          </div>
          <div className="flex items-end p-2">
            <button className="p-2 flex flex-row hover:bg-hover-orange min-w-full rounded-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 pr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>
              Logout
            </button>
          </div>
        </div>
        <div className="flex flex-col w-eighty p-8">
          <div className="flex flex-row justify-between">
            <div>
              <h2 className="font-bold size-8">Sessions</h2>
              <p className="w-sixty">A list of all groups that will be attending the studio. These will typically be created through the signup form, but you can manually add groups here too.</p>
            </div>
            <div>
              <button className="flex flex-row bg-plurple hover:bg-hover-plurple text-white px-2 py-1 rounded-sm min-w-32">
                {/* Add Session Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 1 26 22" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Session
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="pt-8 pb-4 flex flex-row space-x-4">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-sm"
              placeholder="Filter by Date" />
            <input
              type="text"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-sm"
              placeholder="Filter by Name" />
            <button
              onClick={clearFilters}
              className="bg-gray-200 hover:bg-gray-300 text-black px-3 py-2 rounded-sm border"
            >
              Clear Filters
            </button>
          </div>

          {/* Filtered Sessions */}
          {filteredSessions.map((session, index) => (
            <div className="py-4" key={index}>
              <div className="flex flex-row justify-between">
                <div>
                  <h2 className="font-bold">
                    {session.name}
                    <span className={`ml-4 px-2 font-normal rounded-sm ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </h2>
                  <p className="font-light">{session.date}  •  {session.people} people  •  {session.wheels} wheels</p>
                </div>
                <div>
                  <Link to={`/add-pot/${session.id}`} className="flex flex-row hover:bg-gray-200 text-black py-1 px-3 rounded-sm min-w-28 border">
                    Add Pots
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-4 -2 26 22" strokeWidth={1} stroke="gray" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="..." />
                    </svg>
                  </Link>
                  <Link to={`/edit-session/${session.id}`} className="flex flex-row hover:bg-gray-200 text-black py-1 px-3 rounded-sm min-w-28 border">
                    Edit Session
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-4 -2 26 22" strokeWidth={1} stroke="gray" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="..." />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
