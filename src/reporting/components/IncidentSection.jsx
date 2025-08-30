import { FileText } from 'lucide-react'
import React, { useState } from 'react'

export default function IncidentSection() {

    //useState
    const[selectIncidentType,setSelectIncidentType]=useState("");
    const[selectedSpecies,setSpecies]=useState("");

//mock data for drop down
    const  incidentTypes = [
        { id: 1, name: "Fishing without license"},
        { id: 2, name: "Fishing in restricted area"},
        { id: 3, name: "Using explosives"},
        { id: 4, name: "Using cyanide"},
        { id: 5, name: "Using banned nets"},
        { id: 6, name: "Catching undersized fish"},
        { id: 7, name: "Exceeding quota"},
        { id: 8, name: "Targeting endangered species"},
        { id: 9, name: "Illegal fish trade"},
        { id: 10, name: "Foreign vessel intrusion" }
    ];

    const speciesTypes = [
        "Tuna",
        "Shark",
        "Lobster",
        "Sea Cucumber",
        "Ornamental Fish"
    ];

    const showSpecies= selectIncidentType==="Catching undersized fish"|| selectIncidentType==="Targeting endangered species" || selectIncidentType==="Foreign vessel intrusion";

    

  return (
    <div  className='space-y-5'>
        {/*Header Section*/}
        <div className='text-center mb-10 flex gap-3 justify-start items-stretch'>
            <div ><FileText className='w-6 h-6 text-center text-cyan-700 '/></div>
            <h2 className='text-2xl text-cyan-700 mb-3 font-[Lexend] font-semibold text-center'>Report Details</h2>
        </div>

        {/*input fields*/}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='space-y-2'>
                <label className='block text-lg text-cyan-700 font-[Inter] mb-1 font-semibold text-left'>
                Date Of Incident
                </label>
                <div>
                    <input 
                    type='date'
                    className={`w-full px-2 py-2 border-2  border-cyan-300 text-cyan-700 rounded-xl focus:right-4 focus:ring-cyan-600 focus:border-cyan-600 transition-all duration-200 bg-white/50 backdrop-blur-sm`}
                    />
                </div>
            </div>

            <div className='space-y-2'>
                <label className='block text-lg text-cyan-700 font-[Inter] mb-1 font-semibold text-left'>
                Date Of Incident
                </label>
                <div>
                    <input 
                    type='time'
                    className={`w-full px-2 py-2 border-2 rounded-xl  border-cyan-300 focus:right-4 text-cyan-700 focus:ring-cyan-600 focus:border-cyan-600 transition-all duration-200 bg-white/50 backdrop-blur-sm`}
                    />
                </div>
            </div>

            
        </div>
        <div className='space-y-1'>
                <label className='block text-lg text-cyan-700 font-[Inter] mb-1 font-semibold text-left'>
                Incident Type
                </label>
                <select className='w-full px-2 py-2 border-2  text-cyan-700 border-cyan-300 rounded-xl focus:ring-4 focus:ring-cyan-800 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-cyan-700'
                 onChange={(e)=>setSelectIncidentType(e.target.value)}>
                    <option>Select Incident</option>
                    {incidentTypes.map((incident)=>(
                        <option key={incident.id} value={incident.name}>{incident.name}</option>
                    ))}
                    
                </select>

                
            </div>
            {showSpecies && (
                <div className='space-y-1'>
                <label className='block text-lg text-cyan-700 font-[Inter] mb-1 font-semibold text-left'>
                Species Type
                </label>
                <select className='w-full px-2 py-2 border-2  text-cyan-700 border-cyan-300 rounded-xl focus:ring-4 focus:ring-cyan-800 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-cyan-700'
                 onChange={(e)=>setSpecies(e.target.value)}>
                    <option>Select Species</option>
                    {speciesTypes.map((specis)=>(
                        <option key={specis} value={specis}>{specis}</option>
                    ))}
                    
                </select>

                
            </div>
            )}

            <div className='space-y-6 grid grid-cols-1'>
            <div className='flex gap-5'>
                <label className='block text-lg text-cyan-700 font-[Inter] mb-1 font-semibold text-left'>Description of Activity :</label>
                <textarea className='w-full px-4 py-4 shadow-lg border-2 border-cyan-300 content-start bg-white/50 rounded-xl focus:ring-4 focus:ring-cyan-600 focus:border-cyan-600 backdrop-blur-sm'></textarea>

            </div>
            
        </div>

        
        
    </div>
  )
}
