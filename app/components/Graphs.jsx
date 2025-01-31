"use client";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["10", "15", "20", "25", "30", "35", "40", "45", "50"],
  datasets: [
    {
      label: "2024年 1月",
      data: [200, 400, 450, 600, 650, 700, 750, 800, 850],
      fill: false,
      borderColor: "#FFA500",
      tension: 0.1,
    },
  ],
};

function Graphs() {
  return (
    <div className="md:ml-64 w-full p-8 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium text-[#333]">
            Number of User Registrations
          </h3>
          <div className="flex justify-between items-center mt-4">
            <span className="text-2xl font-semibold">450 People</span>
            <span className="text-green-500">+12.5%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium text-[#333]">Active Users</h3>
          <div className="flex justify-between items-center mt-4">
            <span className="text-2xl font-semibold">50 / Month</span>
            <span className="text-green-500">+316.6%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium text-[#333]">
            Average Number Of Connections
          </h3>
          <div className="flex justify-between items-center mt-4">
            <span className="text-2xl font-semibold">4 times / month</span>
            <span className="text-red-500">-16.6%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium text-[#333]">
            Average Number of Receptions
          </h3>
          <div className="flex justify-between items-center mt-4">
            <span className="text-2xl font-semibold">4 times / month</span>
            <span className="text-red-500">-16.6%</span>
          </div>
        </div>

        <div className="bg-white md:col-span-2 md:row-span-4 p-6 rounded-xl shadow-md ">
          <h3 className="text-lg font-medium text-[#333] mb-4">
            Gender/Generation Ratio
          </h3>
          <Line data={data} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium text-[#333]">
            Number of Lottery Uses
          </h3>
          <div className="flex justify-between items-center mt-4">
            <span className="text-2xl font-semibold">4 times / month</span>
            <span className="text-red-500">-16.6%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium text-[#333]">
            Number of Account Deletions
          </h3>
          <div className="flex justify-between items-center mt-4">
            <span className="text-2xl font-semibold">4 people / month</span>
            <span className="text-red-500">-16.6%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graphs;
