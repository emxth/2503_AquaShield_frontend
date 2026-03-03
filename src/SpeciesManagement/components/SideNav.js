import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, List, Clock, Inbox } from "lucide-react";

function SideNav({ onHistoryClick }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menu = [
    { name: "Dashboard", path: "/speciesDashboard", icon: <Home size={18} /> },
    { name: "Add Species", path: "/AddSpecies", icon: <PlusCircle size={18} /> },
    { name: "All Species", path: "/viewAllSpecies", icon: <List size={18} /> },
    { name: "History", path: null, icon: <Clock size={18} />, action: onHistoryClick },
    { name: "Requests", path: "/SpeciesAddRequest", icon: <Inbox size={18} /> },
  ];

  return (
    <div className="w-64 h-screen bg-[#0E6C91] text-white flex flex-col p-4">
      {/* Logo / App Title */}
      <h2 className="text-xl font-bold mb-6 tracking-wide">Species Manager</h2>

      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="h-20 w-20 rounded-full bg-[#17A9D3] flex items-center justify-center text-xl font-bold">
          A
        </div>
        <span className="mt-2 font-semibold">Arshvinth</span>
      </div>

      <hr className="border-gray-500 mb-4" />

      {/* Navigation */}
      <nav className="flex flex-col space-y-2">
        {menu.map((item) =>
          item.path ? (
            // Use Link for routes
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive(item.path)
                  ? "bg-[#17A9D3] text-white"
                  : "text-gray-200 hover:bg-[#B3D9EA] hover:text-[#0E6C91]"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ) : (
            // Use button for actions (like History)
            <button
              key={item.name}
              onClick={item.action}
              className="flex items-center gap-3 px-4 py-2 rounded-lg transition text-gray-200 hover:bg-[#B3D9EA] hover:text-[#0E6C91]"
            >
              {item.icon}
              {item.name}
            </button>
          )
        )}
      </nav>
    </div>
  );
}

export default SideNav;
