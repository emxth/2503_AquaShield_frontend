import { Link, useLocation } from "react-router-dom";

function SideNav() {
  const location = useLocation();

  // Helper function to check active route
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      {/* Profile Image Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="h-20 w-20 rounded-full bg-gray-600 mb-2"></div>
        <span className="text-lg font-semibold">User Name</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col space-y-2">
        <Link
          className={`px-4 py-2 rounded-lg transition ${
            isActive("")
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
          to=""
        >
          Dashboard
        </Link>

        <Link
          className={`px-4 py-2 rounded-lg transition ${
            isActive("")
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
          to=""
        >
          Add Trucks
        </Link>

        <Link
          className={`px-4 py-2 rounded-lg transition ${
            isActive("")
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
          to=""
        >
          All Trucks
        </Link>

        <Link
          className={`px-4 py-2 rounded-lg transition ${
            isActive("")
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
          to=""
        >
          Maintenance Costs
        </Link>

        <Link
          className={`px-4 py-2 rounded-lg transition ${
            isActive("")
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
          to=""
        >
          Fuel Costs
        </Link>

        <Link
          className={`px-4 py-2 rounded-lg transition ${
            isActive("")
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
          to=""
        >
          Calculate Cost
        </Link>
      </nav>
    </div>
  );
}

export default SideNav;
