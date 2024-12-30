/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, reset, } from "../features/AuthSlice";
import { FaChevronRight, FaChevronUp, FaChevronDown, FaAngleLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import logo1 from "../assets/logo.png";

export default function Sidebar({ setCategory,  isSidebarOpen, toggleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [voucherCounts, setVoucherCounts] = useState({});

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

  const fetchVoucherCounts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/claims");
      const data = response.data;

      // jmlh perkategori & total
      const counts = data.reduce(
        (acc, claim) => {
          const category = claim.voucher.kategori;
          acc[category] = (acc[category] || 0) + 1;
          acc.total += 1;
          return acc;
        },
        { total: 0 }
      );

      setVoucherCounts(counts);
    } catch (error) {
      console.error("Error fetching voucher counts:", error);
    }
  };

  useEffect(() => {
    fetchVoucherCounts();
  }, []);

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
        <li className="p-4 bg-blue-800 cursor-pointer">
          <div onClick={toggleDropdown} className="flex justify-between items-center text-white">
            <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
            <button>
              {voucherCounts.total || 0} Total Voucher Klaim 
            </button>

          </div>
          {isOpen && (
            <ul className="ml-4 mt-2 space-y-2">
              {["F&B", "Health", "Shopping"].map((category) => (
                <li
                  key={category}
                  className="bg-blue-800 text-gray-50 hover:text-gray-300 cursor-pointer"
                >
                  <div
                    onClick={() => handleCategoryClick(category)}
                    className="flex justify-between items-center"
                  >
                    <span className="ml-2">{voucherCounts[category] || 0}</span>
                    <span>{category}</span>
                  </div>
                </li>
              ))}
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
