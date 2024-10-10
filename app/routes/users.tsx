import logo from "app/images/throw.png"

export default function Pottery() {

  return (
    <div className='flex flex-row'>
      <div className="bg-burnt-orange flex flex-col p-4 w-60 min-h-screen">
        <div className="flex justify-center">
          <img src={logo} className='w-40' alt='Throw logo' />
        </div>
        <div className="p-2">
          <button className="p-2 flex flex-row hover:bg-hover-orange min-w-full rounded-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 pr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
            Sessions
          </button>
        </div>
        <div className="p-2 ">
          <button className="p-2 flex flex-row hover:bg-hover-orange min-w-full rounded-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 pr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            Scheduling
          </button>
        </div>
        <div className="p-2">
          <button className="p-2 flex flex-row bg-hover-orange min-w-full rounded-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 pr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
            Users
          </button>
        </div>
        <div className="p-2">
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
            <h2 className="font-bold size-8">Users</h2>
            <p>A list of all the users in your system and what level of access they have.</p>
          </div>
          <div>
            <button className="flex flex-row bg-plurple hover:bg-hover-plurple text-white px-2 py-1 rounded-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 1 26 22" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add User</button>
          </div>
        </div>
        <div className="py-16 flex">
          <table className="w-eighty">
            <thead className="text-left border-b-2">
              <tr>
                <th className="py-2">Name</th>
                <th>Role</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 font-semibold">Madaleine Osmun</td>
                <td className="font-light">Admin</td>
                <td className="font-light">madaleine.osmun@email.test</td>
                <td className="font-semibold text-plurple hover:cursor-pointer hover:text-hover-plurple">Edit</td>
              </tr>
              <tr>
                <td className="py-4 font-semibold">John Paul Ryan</td>
                <td className="font-light">Admin</td>
                <td className="font-light">johnpaul.ryan@email.test</td>
                <td className="font-semibold text-plurple hover:cursor-pointer hover:text-hover-plurple">Edit</td>
              </tr>
              <tr>
                <td className="py-4 font-semibold">Bubba Jones</td>
                <td className="font-light">Customer</td>
                <td className="font-light">bubba.jones@email.test</td>
                <td className="font-semibold text-plurple hover:cursor-pointer hover:text-hover-plurple">Edit</td>
              </tr>
              <tr>
                <td className="py-4 font-semibold">Susie Jones</td>
                <td className="font-light">Customer</td>
                <td className="font-light">susie.jones@email.test</td>
                <td className="font-semibold text-plurple hover:cursor-pointer hover:text-hover-plurple">Edit</td>
              </tr>
              <tr>
                <td className="py-4 font-semibold">Johnny Jones</td>
                <td className="font-light">Member</td>
                <td className="font-light">johnny.jones@email.test</td>
                <td className="font-semibold text-plurple hover:cursor-pointer hover:text-hover-plurple">Edit</td>
              </tr>
              <tr>
                <td className="py-4 font-semibold">Davey Jones</td>
                <td className="font-light">Customer</td>
                <td className="font-light">davey.jones@email.test</td>
                <td className="font-semibold text-plurple hover:cursor-pointer hover:text-hover-plurple">Edit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}