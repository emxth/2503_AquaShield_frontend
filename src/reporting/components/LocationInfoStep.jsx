
import { MapPin } from 'lucide-react'
import React, { useState,useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import LocationPicker from './LocationPicker';
import { useFormContext } from '../context/ReportFormContext';


export default function LocationInfoStep() {

    const [location,setLocation]=useState(null);

    const{formData,setFormData,error}=useFormContext();
    const DEFAULT_COORDS = [79.8612, 6.9271];
    
    const handleSelectLocation = (coords) => {
    if (!coords || typeof coords.lat !== "number" || typeof coords.lng !== "number") {
        setLocation(null);
        setFormData(prev => ({
        ...prev,
        locationInfo: null, // or leave unchanged
        }));
        return;
    }

    const geoLocation = {
        type: "Point",
        coordinates: coords ? [coords.lng, coords.lat] : DEFAULT_COORDS,// lng first!
        lat:coords.lat,
        lng:coords.lng,
        description: formData.locationInfo?.description || "",
    };

    setLocation(coords);
    setFormData(prev => ({
        ...prev,
        locationInfo: geoLocation,
    }));
    };

  return (
    <div  className='space-y-8 m-2'>
        {/*Header Section*/}
        <div className='text-center mb-10 flex gap-3 justify-start items-stretch'>
            <div ><MapPin className='w-6 h-6 text-center text-cyan-700 '/></div>
            <h2 className='text-2xl text-cyan-700 mb-3 font-[Lexend] font-semibold text-center'>Location Details</h2>
        </div>
        {/* location input section*/}
        <div className='max-w-4xl'>
            <LocationPicker setLocation={handleSelectLocation}/>
        </div>

        <div className='space-y-6 grid grid-cols-1'>
            <div className='flex gap-5'>
                <label className='fonts-[Inter] text-cyan-700 text-lg'>Location Description :</label>
                <textarea className={`w-[70%] px-4 py-4 shadow-lg -top-2 content-start rounded-xl focus:ring-4 focus:ring-cyan-600 focus:border-cyan-600 backdrop-blur-sm
                ${error.description ? "border-red-400 focus:border-red-500 focus:ring-red-500/20":"border-gray-200 hover:border-gray-300"}`}
                value={formData.locationInfo?.description || ""}
                onChange={(e)=>
                    setFormData((prev)=>({
                        ...prev,
                        locationInfo:{
                            ...prev.locationInfo,
                            description:e.target.value
                        }
                    }))
                }/>
                {error.description && (
                    <div className='absolute -bottom-6 left-0 flex items-center text-red-500 text-sm'>
                    {error.description}
                    </div>
                )}

            </div>
            
        </div>
    </div>
    

  )
}
