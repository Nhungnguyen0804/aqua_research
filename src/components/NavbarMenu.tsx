import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Research", path: "/research" },
  { name: "Chat", path: "/chat" },
];

function Navbar() {
  return (
    <div className="navbar">
      <nav className="flex items-center gap-5 text-[0.8rem] md:gap-10 md:text-[1.2rem]">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? "opacity-100 font-semibold text-blue-600"
                  : "opacity-75 text-gray-600 hover:text-blue-600"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Navbar;
