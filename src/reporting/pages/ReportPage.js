import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function ReportPage() {
    return (
        <div className='p-6 bg-gray-50 min-h-screen'>
            <div className='flex gap-4  pb-2 mb-4 justify-center items-center'>
                <NavLink to="reportIncident"
                    className={({ isActive }) => `px-4 py-2 rounded-md transition ${isActive ? 'bg-gradient-to-r  from-cyan-700 to-cyan-500 text-white' : 'bg-white text-gray-700'}`}>
                    Report Incident
                </NavLink>
                <NavLink to="myReport"
                    className={({ isActive }) => `px-4 py-2 rounded-md transition ${isActive ? 'bg-gradient-to-r  from-cyan-700 to-cyan-500 text-white' : 'bg-white text-gray-700'}`}>
                    My Report
                </NavLink>
            </div>
            <Outlet />
        </div>
    )
}
