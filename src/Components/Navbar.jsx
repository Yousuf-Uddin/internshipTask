import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav className="flex justify-between  bg-gray-800 text-white p-4">
      <NavLink to="/" className="text-xl font-bold">
        Inventory Management App
      </NavLink>
      <div className="flex space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-red-500" : "text-white"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/viewItems"
          className={({ isActive }) =>
            isActive ? "text-red-500" : "text-white"
          }
        >
          View Items
        </NavLink>
        <NavLink
          to="/addItems"
          className={({ isActive }) =>
            isActive ? "text-red-500" : "text-white"
          }
        >
          Add Items
        </NavLink>
      </div>
    </nav>
  );
}
export default Navbar;
