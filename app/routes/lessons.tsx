import { useState } from 'react';
import { Link } from "@remix-run/react";
import logo from "app/images/throw.png";

export default function Lessons() {
  const [dateFilter, setDateFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const lessons = [
    { id: '1', name: "Date Night Class", date: "2024-12-09", time: "6:00 PM" },
    { id: '2', name: "Date Night Class", date: "2024-12-09", time: "8:00 PM" },
    { id: '3', name: "Date Night Class", date: "2024-12-10", time: "6:00 PM" },
    { id: '4', name: "Date Night Class", date: "2024-12-10", time: "8:00 PM" },
    { id: '5', name: "Date Night Class", date: "2024-12-11", time: "6:00 PM" },
    { id: '6', name: "Date Night Class", date: "2024-12-11", time: "8:00 PM" },
    { id: '7', name: "Date Night Class", date: "2024-12-12", time: "6:00 PM" },
    { id: '8', name: "Date Night Class", date: "2024-12-12", time: "8:00 PM" },
    { id: '9', name: "Date Night Class", date: "2024-12-13", time: "6:00 PM" },
    { id: '10', name: "Date Night Class", date: "2024-12-13", time: "8:00 PM" },
    { id: '11', name: "Date Night Class", date: "2024-12-14", time: "6:00 PM" },
    { id: '12', name: "Date Night Class", date: "2024-12-14", time: "8:00 PM" },
    { id: '13', name: "Date Night Class", date: "2024-12-15", time: "6:00 PM" },
    { id: '14', name: "Date Night Class", date: "2024-12-15", time: "8:00 PM" },
    { id: '15', name: "Date Night Class", date: "2024-12-16", time: "6:00 PM" },
    { id: '16', name: "Date Night Class", date: "2024-12-16", time: "8:00 PM" },
  ];

  const groups = [
    { id: '1', name: "Group Name 1", numPeople: 5, numWheels: 5, lessonId: '1' },
    { id: '2', name: "Group Name 2", numPeople: 2, numWheels: 2, lessonId: '1' },
    { id: '3', name: "Group Name 3", numPeople: 3, numWheels: 3, lessonId: '2' },
    { id: '4', name: "Group Name 4", numPeople: 4, numWheels: 4, lessonId: '2' },
    { id: '5', name: "Group Name 5", numPeople: 6, numWheels: 6, lessonId: '3' },
    { id: '6', name: "Group Name 6", numPeople: 8, numWheels: 8, lessonId: '4' },
    { id: '7', name: "Group Name 7", numPeople: 2, numWheels: 2, lessonId: '4' },
  ];

  const filteredLessons = lessons
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
              <h2 className="font-bold size-8">Lessons</h2>
              <p className="w-sixty">A list of upcoming lessons. </p>
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

          {/* Filtered Lessons */}
          {filteredLessons.map((lessons, index) => (
            <div className="py-4" key={index}>
              <div className="flex flex-row justify-between">
                <div>
                  <h2 className="font-bold">
                    {lessons.name}
                  </h2>
                  <p className="font-light">{lessons.date}  •  {lessons.time} </p>
                  {groups.map((groups, gIndex) => (
                    groups.lessonId === lessons.id &&
                    < div className='' key={gIndex} >
                      <h2>{groups.name}  -  {groups.numPeople} People  •  {groups.numWheels} Wheels </h2>
                    </div>
                  ))}
                </div>
                <div>
                  <Link to={`/add-pot/${lessons.id}`} className="flex flex-row hover:bg-gray-200 text-black py-1 px-3 rounded-sm min-w-28 border">
                    Add Pots
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-4 -2 26 22" strokeWidth={1} stroke="gray" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="..." />
                    </svg>
                  </Link>
                  <Link to={`/edit-session/${lessons.id}`} className="flex flex-row hover:bg-gray-200 text-black py-1 px-3 rounded-sm min-w-28 border">
                    Edit Lesson
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-4 -2 26 22" strokeWidth={1} stroke="gray" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="..." />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div >
    </>
  )
}
