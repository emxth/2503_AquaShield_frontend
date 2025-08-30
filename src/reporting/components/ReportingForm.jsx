import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import { useFormContext } from '../context/ReportFormContext'
import { stepIcons } from '../utility/icon';

export default function ReportingForm() {

    //call context hook
    const{steps,currentStep}=useFormContext();
 
  return (
    <div className='max-w-5xl mx-auto p-6'>
        <div className='mb-12'>
        <div className='flex items-center justify-between mb-6'>

            {steps.map((step,index)=>{
                //create Icon instance
                const Icon=stepIcons[step.id];
                const isActive=currentStep===step.id;
                const isCompleted=currentStep > step.id;
                return(
                <div className='flex items-center' key={step.id}>
                    <div className='flex flex-col items-center mt-8'>
                        <div className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-500 transform 
                            ${isCompleted? "bg-gradient-to-r from-cyan-500 to-cyan-700 border-cyan-500 text-white shadow scale-110":
                            isActive? "bg-gradient-to-r  from-cyan-700 to-cyan-500 border-cyan-700 text-white shadow-lg scale-110":"bg-slate-300 border-gray-300 text-gray-400"  }`}>

                                {isCompleted?<Check className='w-6 h-6'/>:<Icon className='w-6 h-6'/>}
                        </div>
                        <div className='mt-4 text-center'>
                            <p className={`text-sm font-bold font-[Inter] ${isActive? "text-cyan-500":isCompleted?"text-cyan-700" :"text-slate-300"}`}> {step.title}</p>
                        </div>
                    </div>
                    {/*desktop progress line*/}
                    {index <steps.length-1 && (
                    <div className={`hidden sm:block w-24 h-1 mx-6 rounded-full transition-all duration-500 ${currentStep > step.id ? "bg-gradient-to-r  from-cyan-700 to-cyan-500" : "bg-slate-300"}`}></div>
                    )}
                </div>
                )
            })}
        </div>

        {/* mobile Prgress bar */}
        <div className='sm:hidden'>
            <div className='flex justify-between items-center mb-4'>
                <span className='text-sm font-[Inter] font-bold text-cyan-700'>
                    Step {currentStep} of {steps.length}
                </span>
                 <span className='text-sm text-cyan-700'>
                    {steps[currentStep-1].title}
                    
                </span>

            </div>
            <div className='w-full bg-slate-300 rounded-full overflow-hidden'>
                <div className='bg-gradient-to-r from-cyan-500 to-cyan-700 h-3 rounded-full transition-all duration-700'
                    style={{width:`${(currentStep/steps.length)*100}%`}}></div>
                </div>
            </div>
        </div>

        {/*Form Content*/}
        <div className='bg-stone-100 backdrop-blur-sm rounded-full shadow-2xl border-stone-300/50 p-10 mb-10'>
            <div className='min-h-[600]'></div>
        </div>

        {/*forward and back*/}
        <div className='flex justify-between items-center'>
            <button className={`flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-200`}>
                <ChevronLeft className='w-5 h-5 mr-2'/>Previous
            </button>
            <button className={`flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-200`}>
                Back<ChevronRight className='w-5 h-5 mr-2'/>
            </button>
{/*
            <button className='flex items-center px-10 py-4 bg-gradient-to-r  from-cyan-500 to-cyan-700 text-white rounded-2xl font-semibold hover:from-cyan-900 hover:to-blue-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:translate-y-1'>
                Submit Report
            </button>*/}
        </div>
    </div>
  )
}
