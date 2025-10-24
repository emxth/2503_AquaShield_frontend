import { children, createContext, useContext, useState } from "react";

const ReportFormContext=createContext();

export const useFormContext=()=>useContext(ReportFormContext);

export const FormProvider=({children})=>{
    const[currentStep,setCurrentStep]=useState(1);
    const[error,setErrors]=useState({});
    const[formData,setFormData]=useState({
        locationInfo:{
            type: "Point",
            coordinates: [], 
            lat: "",         
            lng: "",         
            description: ""

        },
        incidentInfo:{
            incidentDate:"",
            incidentTime:"",
            incidentType:"",
            species:"",
            description:"",

        },
        evidences:[],
        personalInfo:{
            name:"",
            mobile:"",
            email:"",
            annonimity:true
        }

    })

     const steps=[
        {id:1, title:"Location Info",description:"Location Info"},
        {id:2, title:"Report Details",description:"Incident Information"},
        {id:3, title:"Evidence",description:"Incident evidences"},
        {id:4, title:"Personal Info",description:"Reporter Information"}
    ];

 const validateSteps=(steps)=>{
    const newError={};
    if(steps===1){
        if(!formData.locationInfo.description){
            newError.description="Location description Required";
        }
    }

    if(steps===2){
        if(!formData.incidentInfo.incidentDate){
            newError.incidentDate="Incident Date must be required ";
        }
        if(!formData.incidentInfo.incidentTime){
            newError.incidentTime="Incident Time Must be Required";
        }
        if(!formData.incidentInfo.incidentType){
            newError.incidentType="You must Select Incident Types";
        }
        if(!formData.incidentInfo.description){
            newError.description="Incident description Required";
        }
        
    }
    if (steps === 3) {
    if (!formData.evidences || formData.evidences.length === 0) {
        newError.evidences = "Incident evidences Required";
    }
}
    if(steps===4){
        if(!formData.personalInfo.name){
            newError.name="You should fill Your name.We protect Your privacy";
        }
        if(!formData.personalInfo.email){
            newError.email="You must enter your email";
        }
        if(!formData.personalInfo.mobile){
            newError.mobile="You must enter your mobile number";
        }
    }

    setErrors(newError);
    return Object.keys(newError).length===0;
 }

 const nextStep=()=>{
    if(validateSteps(currentStep)){
        setCurrentStep((prev)=>Math.min(prev+1,steps.length))
    }
 }

 const prevStep=()=>{
    setCurrentStep((prev)=>Math.max(prev-1,1))
 }
   

    const value={steps,currentStep,formData,setFormData,error,prevStep,nextStep}
    return <ReportFormContext.Provider value={value}>{children}</ReportFormContext.Provider>
}