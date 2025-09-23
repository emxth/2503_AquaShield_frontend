import { User } from 'lucide-react'
import React, { useState } from 'react'
import { useFormContext } from '../context/ReportFormContext';

export default function PersonalInfo() {

  const [isAnonymous, setIsAnonymous] = useState(false);
  const{formData,setFormData,error}=useFormContext();


  const handleToggle = () => {
    setIsAnonymous(prev=>{
        const newValue=!prev;

        setFormData(preData=>({
            ...preData,
            personalInfo:{
                ...preData.personalInfo,
                annonimity:newValue
            }
            
        }));
        return newValue;
    })
  };

  const handleChangeInputs=(field,value)=>{
    setFormData(preData=>({
        ...preData,
        personalInfo:{
            ...preData.personalInfo,
            [field]:value
        }
    }))
  }
  return (
    <div  className='space-y-5'>
            {/*Header Section*/}
            <div className='text-center mb-10 flex gap-3 justify-start items-stretch'>
                <div ><User className='w-6 h-6 text-center text-cyan-700 '/></div>
                <h2 className='text-2xl text-cyan-700 mb-3 font-[Lexend] font-semibold text-center'>Personal Details</h2>
            </div>

            
        {/*input fields*/}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='space-y-2'>
                <label className='block text-lg text-cyan-700 font-[Inter] mb-1 font-semibold text-left'>
                Full Name
                </label>
                <div>
                    <input 
                    type='text'
                    className={`w-full px-2 py-2 border-2  border-cyan-300 text-cyan-700 rounded-xl focus:right-4 focus:ring-cyan-600 focus:border-cyan-600 transition-all duration-200 bg-white/50 backdrop-blur-sm ${error.name ? "border-red-400 focus:border-red-500 focus:ring-red-500/20":"border-gray-200 hover:border-gray-300"}`}
                    value={formData.personalInfo.name}
                    onChange={(e)=> handleChangeInputs('name',e.target.value)}/>
                    {error.name && (
                    <div className='absolute -bottom-6 left-0 flex items-center text-red-500 text-sm'>
                    {error.name}
                    </div>
                )}
                </div>
            </div>

            <div className='space-y-2'>
                <label className='block text-lg text-cyan-700 font-[Inter] mb-1 font-semibold text-left'>
                Contact Number
                </label>
                <div>
                    <input 
                    type='text'
                    className={`w-full px-2 py-2 border-2 rounded-xl  border-cyan-300 focus:right-4 text-cyan-700 focus:ring-cyan-600 focus:border-cyan-600 transition-all duration-200 bg-white/50 backdrop-blur-sm ${error.mobile ? "border-red-400 focus:border-red-500 focus:ring-red-500/20":"border-gray-200 hover:border-gray-300"}`}
                    value={formData.personalInfo.mobile}
                    onChange={(e)=> handleChangeInputs('mobile',e.target.value)}
                    />
                    {error.mobile && (
                    <div className='absolute -bottom-6 left-0 flex items-center text-red-500 text-sm'>
                    {error.mobile}
                    </div>
                )}
                </div>
            </div>
            <div className='space-y-2'>
                <label className='block text-lg text-cyan-700 font-[Inter] mb-1 font-semibold text-left'>
                Email
                </label>
                <div>
                    <input 
                    type='email'
                    className={`w-full px-2 py-2 border-2 rounded-xl  border-cyan-300 focus:right-4 text-cyan-700 focus:ring-cyan-600 focus:border-cyan-600 transition-all duration-200 bg-white/50 backdrop-blur-sm ${error.email? "border-red-400 focus:border-red-500 focus:ring-red-500/20":"border-gray-200 hover:border-gray-300"}`
                    }
                    value={formData.personalInfo.email}
                    onChange={(e)=> handleChangeInputs('email',e.target.value)}
                    />
                    {error.email && (
                    <div className='absolute -bottom-6 left-0 flex items-center text-red-500 text-sm'>
                    {error.email}
                    </div>
                )}
                </div>
            </div>
            {/* Toggle button */}
            <label className="flex items-center cursor-pointer mb-4">
                <span className="mr-2 text-cyan-700 font-[Inter] mb-1 font-semibold text-left text-lg">Report Anonymously</span>
                <div
                className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
                    isAnonymous ? "bg-cyan-700" : "bg-gray-400"
                }`}
                onClick={handleToggle}
                >
                <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                    isAnonymous ? "translate-x-6" : ""
                    }`}
                ></div>
                </div>
            </label>

        </div>
        
    </div>
  )
}
