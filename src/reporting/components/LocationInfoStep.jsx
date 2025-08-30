
import { MapPin } from 'lucide-react'
import React, { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import LocationPicker from './LocationPicker';


export default function LocationInfoStep() {

    const [location,setLocation]=useState(null);
  return (
    <div  className='space-y-8 m-2'>
        {/*Header Section*/}
        <div className='text-center mb-10 flex gap-3 justify-start items-stretch'>
            <div ><MapPin className='w-6 h-6 text-center text-cyan-700 '/></div>
            <h2 className='text-2xl text-cyan-700 mb-3 font-[Lexend] font-semibold text-center'>Location Details</h2>
        </div>
        {/* location input section*/}
        <div className='max-w-4xl'>
            <LocationPicker setLocation={setLocation}/>
        </div>

        <div className='space-y-6 grid grid-cols-1'>
            <div className='flex gap-5'>
                <label className='fonts-[Inter] text-cyan-700 text-lg'>Location Description :</label>
                <textarea className='w-[70%] px-4 py-4 shadow-lg -top-2 content-start rounded-xl focus:ring-4 focus:ring-cyan-600 focus:border-cyan-600 backdrop-blur-sm'></textarea>

            </div>
            
        </div>
    </div>
    

  )
}
