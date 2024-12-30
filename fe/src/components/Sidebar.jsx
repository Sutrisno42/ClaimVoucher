/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, reset, } from "../features/AuthSlice";
import { FaChevronRight, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import logo1 from "../assets/logo.png";

export default function Sidebar({ setCategory,  isSidebarOpen, toggleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  return (
    <aside
      className={`bg-blue-800 w-64 p-4 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 md:relative md:block absolute h-full`}
    >
      <div className="flex items-center mb-4 text-white md:hidden">
        <img src={logo1} alt="Logo" className="w-10 h-10 mr-3" />
        <span className="text-lg font-semibold">Claim Voucher</span>
      </div>
      <ul className="mb-4">
        <li className="p-4 bg-blue-800  cursor-pointer">
          <div className="flex justify-between items-center text-white">
            <button>
              <a href="/addVoucher">
                Voucher
              </a>
            </button>
          </div>
        </li>
        <li className="p-4 bg-blue-800 cursor-pointer">
          <div onClick={toggleDropdown} className="flex justify-between items-center text-white">
            <button>
              <a href="/dashboard">
                Kategori Voucher
              </a>
            </button>
            <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
          </div>
          {isOpen && (
            <ul className="ml-4 mt-2 space-y-2 ">
              <li className=" bg-blue-800 text-gray-50 hover:text-gray-300 cursor-pointer">
                <div className="flex justify-between items-center">
                  <span>F&B</span>
                  <button
                    onClick={() => handleCategoryClick("F&B")}
                    className="p-1 ">
                    <FaChevronRight />
                  </button>
                </div>
              </li>
              <li className=" bg-blue-800 text-gray-50 hover:text-gray-300 cursor-pointer">
                <div className="flex justify-between items-center">
                  <span>Health</span>
                  <button onClick={() => handleCategoryClick("Health")} className="p-1">
                    <FaChevronRight />
                  </button>
                </div>
              </li>
              <li className=" bg-blue-800 text-gray-50 hover:text-gray-300 cursor-pointer">
                <div className="flex justify-between items-center">
                  <span>Shopping</span>
                  <button
                    onClick={() => handleCategoryClick("Shopping")}
                    className="p-1">
                    <FaChevronRight />
                  </button>
                </div>
              </li>
            </ul>
          )}
        </li>
      </ul>

      <button onClick={logout} className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600">
        Logout
      </button>
    </aside>
  )
}
