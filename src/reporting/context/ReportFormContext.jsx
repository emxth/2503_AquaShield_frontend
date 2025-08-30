import { children, createContext, useContext, useState } from "react";

const ReportFormContext=createContext();

export const useFormContext=()=>useContext(ReportFormContext);

export const FormProvider=({children})=>{
    const[currentStep,setCurrentStep]=useState(1);

    const steps=[
        {id:1, title:"Location Info",description:"Location Info"},
        {id:2, title:"Report Details",description:"Incident Information"},
        {id:3, title:"Evidence",description:"Incident evidences"},
        {id:4, title:"Personal Info",description:"Reporter Information"}
    ];

    const value={steps,currentStep}
    return <ReportFormContext.Provider value={value}>{children}</ReportFormContext.Provider>
}