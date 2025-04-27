import { Link } from '@remix-run/react';
import logo from '../images/throw.png'

const MobileHome = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-start min-h-screen bg-white px-4 pt-12">
        <div className="mb-12">
          <img src={logo} alt="Throw Art Studio" className="w-72" />
        </div>

        <div className="flex flex-col space-y-12 w-full px-12">
          <Link to="/mobile-create-group" className="w-full py-3 text-white bg-deep-green rounded-md text-lg flex justify-center hover:bg-hover-green">
            Create New Group
          </Link>
          <button className="w-full py-3 text-white bg-deep-green rounded-md text-lg">
            Select Your Group
          </button>
          <button className="w-full py-3 text-white bg-deep-green rounded-md text-lg">
            Manage Pots
          </button>
        </div>

      </div>
    </>
  );
};

export default MobileHome;
