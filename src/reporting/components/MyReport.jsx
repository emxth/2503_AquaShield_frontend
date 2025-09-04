import { useState } from 'react';
import incidentImg from './../Image/image.png';

const MyReport = () => {
  const[sort,setSort]=useState('none');
  const [activeTab, setActiveTab] = useState('All Reports');
  const [reports, setReports] = useState([
    {
      id: 'RPT-001',
      status: 'In Review',
      incidentImg:incidentImg,
      locationId: 'LOC-4567',
      date: '28.08.2025',
      type: 'Fish Gear',
    },
    {
      id: 'RPT-002',
      status: 'Verified',
      incidentImg:incidentImg,
      locationId: 'LOC-8923',
      date: '28.08.2025',
      type: 'Fish Gear',
    },
    {
      id: 'RPT-003',
      status: 'Restricted',
      incidentImg:incidentImg,
      locationId: 'LOC-1256',
      date: '27.08.2025',
      type: 'Water Quality',
    },
    {
      id: 'RPT-004',
      status: 'Verified',
      incidentImg:incidentImg,
      locationId: 'LOC-7643',
      date: '26.08.2025',
      type: 'Marine Life',
    },
  ]);

  const filteredReports = activeTab === 'All Reports' 
    ? reports 
    : reports.filter(report => report.status === activeTab);

  const deleteReport = (id) => {
    setReports(reports.filter(report => report.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
        <div className='text-center flex justify-center items-center'>
            <h2 className='text-2xl mt-5  text-cyan-700 mb-3 font-[Lexend] font-semibold text-center'>Report Details</h2>
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
          {filteredReports.map((report) => (
            <div key={report.id} className="bg-white rounded-lg shadow-md p-4 border-l-4 
              ${report.status === 'Verified' ? 'border-green-500' : 
                report.status === 'In Review' ? 'border-yellow-500' : 
                'border-red-500'}"
            >
              <div className="flex justify-between items-start mb-4 p-4 ">
                <span className={`px-2 py-1 rounded text-xs font-medium
                  ${report.status === 'Verified' ? 'bg-green-100 text-green-800' : 
                    report.status === 'In Review' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}`}
                >
                  {report.status}
                </span>
                <span className="text-gray-500 text-sm">{report.id}</span>
              </div>

              <div className="mb-4 w-[80%] m-6">
                <img src={report.incidentImg}/>
              </div>
              
              <div className="mb-4 flex">
                <p className="text-gray-600 text-sm p-2">Location ID</p>
                <p className="font-medium p-2">{report.locationId}</p>
              </div>
              
              <div className="flex justify-between items-center mb-4 p-2">
                <span className="text-gray-600">Date : {report.date}</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {report.type}
                </span>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                  Update
                </button>
                <button 
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  onClick={() => deleteReport(report.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Load More Button */}
        <div className="mt-8 text-center">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            Load More
          </button>
        </div>
      </main>
    </div>
  );
};

export default MyReport;