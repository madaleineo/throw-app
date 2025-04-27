import React, { useState } from "react";
import Header from "./components/header";
import { Outlet } from "react-router-dom";


const CreateGroupPage: React.FC = () => {
  const [groupName, setGroupName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ groupName, email, phone });
    // You can integrate API call here
  };

  return (
    <>
      <Header>
        <Outlet />
      </Header>
      <div className="flex flex-col items-center justify-start min-h-screen bg-white px-4 pt-32">
        <h1 className="text-2xl font-bold mb-6">Create a New Group</h1>

        <form onSubmit={handleSubmit} className="space-y-4 px-8">
          <div>
            <label className="text-sm font-medium text-gray-700">Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Smith Family"
              className="min-w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="min-w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="123-456-7890"
              className="min-w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div className="py-4">
            <button
              type="submit"
              className="w-full py-3 text-white bg-deep-green rounded-md text-lg"
            >
              Create Group
            </button>
          </div >
        </form>
      </div>
    </>
  );
};

export default CreateGroupPage;
