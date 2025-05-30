import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChevronDown,
  FaUserCircle,
  FaDesktop,
  FaUpload,
  FaBars,
  FaTimes,
  FaStore,
  FaSignOutAlt,
} from "react-icons/fa";
import { authService } from "../../services/authService";

const menuItems = [
  {
    label: "Dashboard",
    icon: <FaDesktop className="text-gray-600" />,
    link: "/dashboard",
  },
  {
    label: "Sale",
    icon: <FaUpload className="text-gray-600" />,
    submenu: [
      { label: "Sale", link: "/sale/new" },
      { label: "Sale Return", link: "/sale/list" },
    ],
  },
];

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleButtonRef = useRef(null); // Add this with other refs in the component

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        toggleButtonRef.current &&
        toggleButtonRef.current.contains(event.target)
      ) {
        console.log("Click on toggle button, ignoring");
        return; // Ignore clicks on the toggle button
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target) &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        console.log("Click outside detected, closing menu");
        setDropdownOpen(null);
        setUserDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log("mobileMenuOpen state:", mobileMenuOpen);
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setDropdownOpen(null);
  };

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-2xl font-bold text-indigo-600 transition-colors duration-200 hover:text-indigo-700"
            >
              <FaStore className="mr-2" />
              Eyesdeal
            </Link>
          </div>

          {/* Desktop Menu */}
          <div
            className="hidden md:flex items-center space-x-8"
            ref={dropdownRef}
          >
            <ul className="flex items-center space-x-6">
              {menuItems.map((item, index) => (
                <li key={index} className="relative group">
                  {item.submenu ? (
                    <div>
                      <button
                        className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm font-medium"
                        onClick={() => toggleDropdown(index)}
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                        <FaChevronDown
                          className={`ml-1 transition-transform duration-300 ease-in-out ${
                            dropdownOpen === index ? "rotate-180" : ""
                          }`}
                          size={12}
                        />
                      </button>
                      <ul
                        className={`${
                          dropdownOpen === index
                            ? "opacity-100 scale-y-100"
                            : "opacity-0 scale-y-95 pointer-events-none"
                        } absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100 transition-all duration-300 ease-in-out transform origin-top`}
                      >
                        {item.submenu.map((sub, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={sub.link}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                              onClick={() => setDropdownOpen(null)}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      to={item.link}
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm font-medium"
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* User Profile */}
            <div className="relative" ref={userDropdownRef}>
              <button
                className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm font-medium"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <FaUserCircle size={24} />
                <span className="ml-2 hidden lg:inline">
                  {user?.name || "User"}
                </span>
                <FaChevronDown
                  className={`ml-1 transition-transform duration-300 ease-in-out ${
                    userDropdownOpen ? "rotate-180" : ""
                  }`}
                  size={12}
                />
              </button>
              <ul
                className={`${
                  userDropdownOpen
                    ? "opacity-100 scale-y-100"
                    : "opacity-0 scale-y-95 pointer-events-none"
                } absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border border-gray-100 transition-all duration-300 ease-in-out transform origin-top`}
              >
                <li className="px-4 py-2 text-sm text-gray-700">
                  <strong className="font-semibold text-gray-900">
                    {user?.name || "User Name"}
                  </strong>
                  <p className="text-xs text-gray-500">
                    {user?.role || "Role"}
                  </p>
                </li>
                <li>
                  <hr className="border-gray-200 my-1" />
                </li>
                <li>
                  <button
                    className="w-full flex items-center px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="mr-2" />
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            ref={toggleButtonRef} // Add this ref to the button
            className="md:hidden flex items-center text-gray-600 hover:text-indigo-600 focus:outline-none transition duration-300 ease-in-out relative w-6 h-6"
            onClick={() => {
              console.log("Toggle clicked, current state:", mobileMenuOpen);
              setMobileMenuOpen((prev) => !prev);
            }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <FaBars
              size={24}
              className={`absolute transition-opacity duration-300 ease-in-out ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <FaTimes
              size={24}
              className={`absolute transition-opacity duration-300 ease-in-out ${
                mobileMenuOpen ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col py-4 space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.submenu ? (
                  <div>
                    <button
                      className="w-full flex items-center px-4 py-2 text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors duration-200"
                      onClick={() => toggleDropdown(index)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                      <FaChevronDown
                        className={`ml-auto transition-transform duration-300 ease-in-out ${
                          dropdownOpen === index ? "rotate-180" : ""
                        }`}
                        size={12}
                      />
                    </button>
                    <ul
                      className={`${
                        dropdownOpen === index
                          ? "max-h-[200px] opacity-100"
                          : "max-h-0 opacity-0 pointer-events-none"
                      } pl-8 py-2 bg-gray-50 transition-all duration-300 ease-in-out overflow-hidden`}
                    >
                      {item.submenu.map((sub, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={sub.link}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                            onClick={() => {
                              console.log("Menu item clicked, closing menu");
                              setMobileMenuOpen(false);
                              setDropdownOpen(null);
                            }}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    to={item.link}
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors duration-200"
                    onClick={() => {
                      console.log("Menu item clicked, closing menu");
                      setMobileMenuOpen(false);
                    }}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
            <li>
              <hr className="border-gray-200 my-2" />
            </li>
            <li className="px-4 py-2">
              <div className="text-sm text-gray-700">
                <strong className="font-semibold text-gray-900">
                  {user?.name || "User Name"}
                </strong>
                <p className="text-xs text-gray-500">{user?.role || "Role"}</p>
              </div>
              <button
                className="w-full flex items-center px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 transition-colors duration-200 mt-2"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
