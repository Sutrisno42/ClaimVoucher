/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import logo1 from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfil, LogOut, reset } from "../features/AuthSlice.jsx";
import Sidebar from "../components/Sidebar.jsx";
import AddVoucher from "../components/AddVoucher.jsx";
import { GiHamburgerMenu } from "react-icons/gi";

export default function AddVoucherPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(getProfil());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center hidden md:flex">
          <img
            src={logo1}
            alt="User Avatar"
            className="w-10 h-10 mr-3"
          />
          <span className="text-lg font-semibold">Claim Voucher</span>
        </div>
        <button className="text-3xl p-2 md:hidden" onClick={toggleSidebar}>
          <GiHamburgerMenu className="text-3xl" />
        </button>
        <button className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600">
          <a href="/history">
            History
          </a>
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-800 transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:static md:translate-x-0 z-50`}
        >
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>

        {/* Main Dashboard Content */}
        <div className="flex-1">
          <AddVoucher />
        </div>
      </div>
    </div>
  );
}
