"use client";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes, FaRegUser } from "react-icons/fa";
import Graphs from "../components/Graphs";
import UserList from "../components/UserList";
import { IoIosSettings } from "react-icons/io";
import { FiLogOut, FiUsers } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { url } from "../utils/url";
import axios from "axios";

const Page = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUserList = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        const res = await axios.get(`${url}/userList/getUserList`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Response from API: ", res);
        if (res.data && res.data.users) {
          setData(res.data.users);
        } else {
          console.error("No users found in the response");
        }
      } catch (error) {
        console.error("Error fetching user list: ", error);
      }
    };

    fetchUserList();
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [navValue, setNavValue] = useState("Dashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    toast.success("Logout successfull");
    setTimeout(() => {
      redirect("/");
    }, 1000);
  };
  return (
    <div className="flex min-h-screen bg-[#fdf5e9]">
      <div
        className={`fixed h-full mt-10 bg-white text-black p-6 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 md:w-64`}
      >
        <div className="flex flex-col space-y-6">
          <div className="flex justify-center items-center"></div>
          <ul>
            {["Dashboard", "Users", "Settings"].map((item) => (
              <li
                key={item}
                className={`text-lg py-2 cursor-pointer px-8 hover:text-orange-500 hover:bg-orange-200 transition-all flex items-center ${
                  navValue === item
                    ? "border-r-4 border-orange-600 bg-orange-100 text-orange-500"
                    : ""
                }`}
                onClick={() => setNavValue(item)}
              >
                {/* Add icons inline */}
                {item === "Dashboard" && (
                  <MdOutlineDashboard className="mr-2" />
                )}
                {item === "Users" && <FiUsers className="mr-2" />}
                {item === "Settings" && <IoIosSettings className="mr-2" />}

                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        className="md:hidden fixed top-4 left-4 z-50 text-2xl bg-white p-2 rounded-full shadow-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-40 flex justify-between items-center h-14">
        <div className="text-xl font-semibold">
          {" "}
          <img src="/images/menu.png" alt="Logo" className="h-12" />
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-2xl text-black">
            <FaRegUser />
          </button>
          <button className="text-2xl text-black" onClick={handleLogout}>
            <FiLogOut />
          </button>
        </div>
      </div>

      {navValue === "Dashboard" && <Graphs />}
      {navValue === "Users" && <UserList data={data} />}
      {navValue === "Settings" && <p>Settings Page</p>}
    </div>
  );
};

export default Page;
