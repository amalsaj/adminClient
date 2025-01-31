"use client";
import React, { useState } from "react";

const Page = ({ data }) => {
  console.log("data: ", data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const filteredData = data.filter(
    (item) =>
      item.nickName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="bg-[#fdf5e9] text-black w-full p-4 md:ml-64 md:p-8 mt-16">
      <h1 className="text-xl md:text-2xl font-semibold mb-4">User List</h1>
      <div className="md:relative mb-6">
        <input
          type="text"
          placeholder="Search by nickname or email"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto md:overflow-visible shadow-lg rounded-lg bg-white">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 border text-left">No.</th>
              <th className="p-4 border text-left">Nickname</th>
              <th className="p-4 border text-left">Email</th>
              <th className="p-4 border text-left">Date of Birth</th>
              <th className="p-4 border text-left">Gender</th>
              <th className="p-4 border text-left">Location</th>
              <th className="p-4 border text-left">Registration Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index}>
                <td className="p-4 border">{index + 1}</td>
                <td className="p-4 border">{item.nickName}</td>
                <td className="p-4 border">{item.email}</td>
                <td className="p-4 border">{item.dob}</td>
                <td className="p-4 border">{item.gender}</td>
                <td className="p-4 border">{item.location}</td>
                <td className="p-4 border">{item.registrationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-4 md:space-y-0">
        <div className="text-sm md:text-base">
          {`Showing ${startIndex + 1} - ${
            startIndex + paginatedData.length
          } of ${filteredData.length}`}
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].slice(0, 5).map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page + 1
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
