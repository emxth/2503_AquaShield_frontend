import { Camera } from 'lucide-react'
import React, { useState } from 'react'

export default function EvidenceInfo() {

    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFileUpload=(e)=>{
        const files = Array.from(e.target.files);
        const newFiles = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);

    }


    const removeFile = (index) => {
    const newFiles = [...uploadedFiles];
    URL.revokeObjectURL(newFiles[index].preview);
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  return (
    <div  className='space-y-5'>
            {/*Header Section*/}
            <div className='text-center mb-10 flex gap-3 justify-start items-stretch'>
                <div ><Camera className='w-6 h-6 text-center text-cyan-700 '/></div>
                <h2 className='text-2xl text-cyan-700 mb-3 font-[Lexend] font-semibold text-center'>Evidences</h2>
            </div>

            <div className="mb-6">
              <label htmlFor="file-upload" className="block border-2 border-dashed border-cyan-500 rounded-lg p-8 text-center cursor-pointer transition-colors hover:bg-blue-50">
                <div className="text-gray-500">
                  <div className="text-4xl mb-2 hover:translate-y-2">📁</div>
                  <p>Click to browse or drag files here</p>
                </div>
                <input 
                  id="file-upload"
                  type="file" 
                  multiple 
                  accept="image/*,video/*" 
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            {uploadedFiles.length>0 &&(
                <div className="mt-6">
                <h4 className="text-lg font-medium text-cyan-700 mb-4">Uploaded Files:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {uploadedFiles.map((file, index) => (
                    <div key={index} className="relative border border-gray-300 rounded-md overflow-hidden">
                      {file.file.type.startsWith('image/') ? (
                        <img src={file.preview} alt="preview" className="w-full h-28 object-cover" />
                         ) : (
                        <video src={file.preview} controls className="w-full h-28 object-cover" />

                        )}
                      <button 
                        className="absolute top-1 right-1 bg-red-500 bg-opacity-70 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => removeFile(index)}
                      >
                         ×
                      </button>
                      <p className="text-xs p-1 truncate">{file.file.name}</p>
                    </div>
                  ))}
                </div>
                 </div>
            )}
                
    </div>
  )
}
