
import React, { useRef, useState, useEffect } from "react";
import SideNav from "./components/SideNav";
import fishCountImg from "./images/Fish.png";
import endangerSpecies from "./images/Endanger.png";
import recentSpecies from "./images/Species.jpg";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import axios from "axios";

function SpeciesDashboard() {
  const historyRef = useRef(null);

  const [history, setHistory] = useState([]);

  const [stats, setStats] = useState({
    totalCount: 0,
    endangeredCount: 0,
    protectedCount: 0,
    commonCount: 0,
    recentCount: 0,
    lineData: [],
  });

  const handleHistoryClick = () => {
    if (historyRef.current) {
      historyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("http://localhost:8081/species/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://localhost:8081/species/specieshistory");
        const data = await res.json();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  const pieData = [
    { name: "Endangered", value: stats.endangeredCount },
    { name: "Common", value: stats.commonCount },
    { name: "Protected", value: stats.protectedCount },
  ];

  const COLORS = ["#17A9D3", "#0E6C91", "#B3D9EA"];

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      <SideNav onHistoryClick={handleHistoryClick} />

      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#0E6C91]">Dashboard</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            { img: fishCountImg, title: "Total Species Count", value: stats.totalCount },
            { img: endangerSpecies, title: "Endangered Species", value: stats.endangeredCount },
            { img: recentSpecies, title: "Recently Added", value: stats.recentCount },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow p-4 flex items-center space-x-4 border-l-4 border-[#17A9D3]"
            >
              <img src={card.img} alt={card.title} className="w-14 h-14" />
              <div>
                <h2 className="text-lg font-semibold text-[#0E6C91]">
                  {card.title}
                </h2>
                <p className="text-2xl font-bold text-[#17A9D3]">{card.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Pie Chart + Progress Bars */}
          <div className="bg-white rounded-2xl shadow p-4 flex">
            <div>
              <h2 className="text-lg font-bold mb-4 text-[#0E6C91]">
                Species Distribution
              </h2>
              <PieChart width={220} height={200}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>

            {/* Progress Bars */}
            <div className="flex flex-col justify-center ml-20 w-40">
              {pieData.map((entry, index) => {
                const total = pieData.reduce((acc, cur) => acc + cur.value, 0);
                const percent = total > 0 ? ((entry.value / total) * 100).toFixed(0) : 0;
                return (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#0E6C91]">{entry.name}</span>
                      <span className="text-[#17A9D3] font-semibold">{percent}%</span>
                    </div>
                    <div className="bg-[#B3D9EA] h-3 rounded-full">
                      <div
                        className="h-3 rounded-full"
                        style={{
                          width: `${percent}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Line Chart */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="text-lg font-bold mb-4 text-[#0E6C91]">
              Species Added Over Time
            </h2>
            <LineChart width={400} height={250} data={stats.lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#17A9D3" />
            </LineChart>
          </div>
        </div>

        {/* Export Report */}
        {/* <div className="mb-6">
          <button className="bg-[#17A9D3] hover:bg-[#0E6C91] transition text-white font-semibold py-2 px-4 rounded-lg shadow">
            Export Report
          </button>
        </div> */}
        

        {/* Activity Table */}
        <div ref={historyRef} className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-xl font-bold mb-5 text-[#0E6C91]">Recent Activity</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#B3D9EA] text-left">
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((item, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="p-2 border">
                      {new Date(item.performedAt).toLocaleString()}
                    </td>
                    <td className="p-2 border">
                      {item.action.charAt(0).toUpperCase() + item.action.slice(1)}
                      {item.speciesId
                        ? ` - ${item.speciesId.CommonName || item.speciesId.ScientificName}`
                        : ""}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-2 border text-center" colSpan="2">
                    No recent activity
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SpeciesDashboard;




