import Header from "./components/header";
import { Outlet } from "react-router-dom";

import React, { useEffect, useState } from "react";

const SelectGroupPage: React.FC = () => {
  const [groups, setGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch groups from the backend
    fetch("http://localhost:4000/api/groups")
      .then((res) => res.json())
      .then((data) => {
        setGroups(data.groups.map((group: { name: string }) => group.name));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Header>
        <div className='Center-Body'>
          <Outlet />
        </div>
      </Header>
      <div className="flex flex-col items-center justify-start min-h-screen bg-white px-8">

        {/* Title */}
        <h1 className="text-2xl font-bold mb-6">Select Your Group</h1>

        {/* Group List */}
        {loading ? (
          <p className="text-gray-500">Loading groups...</p>
        ) : (
          <div className="w-full max-w-md space-y-4">
            {groups.length > 0 ? (
              groups.map((group, index) => (
                <button
                  key={index}
                  className="w-full py-3 text-white bg-green-700 rounded-md text-lg"
                  onClick={() => console.log(`Selected: ${group}`)}
                >
                  {group}
                </button>
              ))
            ) : (
              <p className="text-gray-500 text-center">No groups found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SelectGroupPage;
