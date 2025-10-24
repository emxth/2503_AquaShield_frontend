import React, { useState } from 'react';
import incidentImg from './../Image/image.png';

const ReportInfo = ({report,onClose}) => {
  const [reportData,setReportData]=useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-700 p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Report Details</h1>
          <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg inline-flex">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="font-medium">Report Submitted Successfully</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Report Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-600 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Report Summary
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">ID</p>
                <p className="font-medium text-gray-900">{report._id}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium text-gray-900">{report.incidentDate} at {report.incidentTime}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-900">{report.location.description}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {report.status}
                </span>
              </div>
            </div>
            
            <button className="mt-6 flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={()=>{
              const[lng,lat]=report.location.coordinates;
              const url=`https://www.google.com/maps?q=${lat},${lng}`;
              window.open(url,"_blank");
            }}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
              View on Map
            </button>
          </div>
          
          {/* Incident Information */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-600 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Incident Information
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Incident Type</p>
                <p className="font-medium text-gray-900">{report.incidentType || 'Not specified'}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Species</p>
                <p className="font-medium text-gray-900">{report.species || 'Not specified'}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Incident</p>
                <p className="font-medium text-gray-900">{report.description || 'Not specified'}</p>
              </div>
            </div>
          </div>
           {/* evidences Information */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-600 mb-4 flex items-center mt-4">
              <svg className="w-5 h-5 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Evidences
            </h2>
            <div className="mb-4 w-[80%] m-6">
                  {report.evidencePhotos?.[0]?.url ? (
                    <img src={report.evidencePhotos[0].url} alt="Incident" className="w-60 h-32 object-cover" />
                  ) : (
                    <img src={incidentImg} alt="Default incident" className="w-full h-32 object-cover" />
                  )}
              </div>
          </div>
        </div>

       
        
        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4 text-center text-sm text-gray-500">
          <p className='text-cyan-600'>© 2025 Illegal Fishing Reporter App. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ReportInfo;