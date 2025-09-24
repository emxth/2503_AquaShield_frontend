import { useState, useEffect } from 'react';
import incidentImg from './../Image/image.png';
import axios from 'axios';

const MyReport = () => {
  const [sort, setSort] = useState('none');
  const [activeTab, setActiveTab] = useState('All Reports');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReports = () => {
      axios
        .get("http://localhost:8081/api/report/getReports")
        .then((res) => {
          console.log("API Response:", res);
          
          // Handle different response structures
          const reportsData = res.data?.data || res.data || [];
          setReports(Array.isArray(reportsData) ? reportsData : []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching reports:", error);
          setError("Failed to retrieve reports");
          setLoading(false);
          setReports([]); // Ensure reports is always an array
        });
    };
    
    getReports();
  }, []);

  // Add loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-cyan-700 text-lg">Loading reports...</div>
      </div>
    );
  }

  // Add error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  const filteredReports = activeTab === 'All Reports' 
    ? reports 
    : reports.filter(report => report.status === activeTab);

  const deleteReport = (id) => {
    setReports(reports.filter(report => report._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className='text-center flex justify-center items-center'>
        <h2 className='text-2xl mt-5 text-cyan-700 mb-3 font-[Lexend] font-semibold text-center'>My Reports</h2>
      </div>

      <main className="container mx-auto p-4">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap border-b border-gray-200 justify-center gap-9">
            {['All Reports', 'Verified', 'In Review', 'Restricted'].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 font-medium ${activeTab === tab ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-cyan-700 hover:text-gray-700'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex justify-center items-center mt-2 md:mt-8">
            <label htmlFor="sort" className="mr-2 text-cyan-700">Sort by:</label>
            <select 
              id="sort"
              className="border border-cyan-300 text-cyan-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="none">None</option>
              <option value="location">Location (A-Z)</option>
              <option value="date">Date (Ascending)</option>
            </select>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center max-w-[80%]">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <div key={report._id} className="bg-white rounded-lg shadow-md p-4 border-l-4 
                  ${report.status === 'Verified' ? 'border-green-500' : 
                    report.status === 'In Review' ? 'border-yellow-500' : 
                    'border-red-500'}"
                >
                  <div className="flex justify-between items-start mb-4 p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium
                      ${report.status === 'Verified' ? 'bg-green-100 text-green-800' : 
                        report.status === 'In Review' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}
                    >
                      {report.status}
                    </span>
                    <span className="text-gray-500 text-sm">{report._id?.slice(-6)}</span>
                  </div>

                  <div className="mb-4 w-[80%] m-6">
                    {report.evidencePhotos?.[0]?.url ? (
                      <img src={report.evidencePhotos[0].url} alt="Incident" className="w-full h-32 object-cover" />
                    ) : (
                      <img src={incidentImg} alt="Default incident" className="w-full h-32 object-cover" />
                    )}
                  </div>
                  
                  <div className="mb-4 flex">
                    <p className="text-gray-600 text-sm p-2">Location:</p>
                    <p className="font-medium p-2">{report.location?.description || 'Unknown location'}</p>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4 p-2">
                    <span className="text-gray-600">Date: {new Date(report.date).toLocaleDateString()}</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {report.incidentType}
                    </span>
                  </div>
                  
                  {report.status === "PENDING" && (
                    <div className="flex justify-end space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        Update
                      </button>
                      <button 
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                        onClick={() => deleteReport(report._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-8">
                No reports found for the selected filter.
              </div>
            )}
          </div>
        </div>

        {/* Load More Button */}
        {filteredReports.length > 0 && (
          <div className="mt-8 text-center">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              Load More
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyReport;