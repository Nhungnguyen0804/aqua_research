import { NavLink } from "react-router-dom";
import { Sparkle } from "lucide-react";
import React from "react";
const navItems = [
  { name: "Home", path: "/" },
  { name: "Research", path: "/research" },
  { name: "Chat", path: "/chat" },
];

function Navbar() {
  return (
    <div className="navbar">
      <nav className="flex items-center gap-3 md:gap-6">
        {navItems.map((item, index) => (
          <React.Fragment key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "font-semibold text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`
              }
            >
              {item.name}
            </NavLink>

            {index !== navItems.length - 1 && (
              <Sparkle size={20} fill="skyblue" stroke="none" />
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}

export default Navbar;
