import React, { useState } from 'react';

const UploadDataPage = () => {
  const [files, setFiles] = useState([]);
  const [claimAmount, setClaimAmount] = useState('');

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const totalFiles = files.length + selectedFiles.length;
    
    if (totalFiles > 5) {
      alert('You can only upload up to 5 files in total');
      return;
    }
    
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert('Please upload at least one document');
      return;
    }
    if (!claimAmount) {
      alert('Please enter the claim amount');
      return;
    }
    // Here you would typically send the files and claim amount to your backend
    console.log('Files:', files);
    console.log('Claim Amount:', claimAmount);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-white p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-orange-600 mb-2 text-center">
          Upload Your Documents
        </h1>
        
        <div className="mb-6 text-center">
          <p className="text-gray-600 mb-2">
            Please upload your insurance claim documents below. We accept lease agreements, ledgers, and other relevant documentation.
          </p>
          <p className="text-sm text-gray-500">
            Our AI will analyze your documents to process your claim faster and more accurately.
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label 
              htmlFor="file-upload" 
              className={`w-full flex flex-col items-center px-4 py-6 bg-orange-50 text-orange-600 rounded-lg border-2 border-orange-200 border-dashed cursor-pointer hover:bg-orange-100 transition-colors ${files.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-base">Upload files (lease, ledger)</span>
              <span className="text-sm text-orange-500 mt-1">
                {files.length}/5 files uploaded
              </span>
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              disabled={files.length >= 5}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="claim-amount" className="block text-gray-700 font-medium mb-2">
              Enter Claim Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2  text-gray-500">$</span>
              <input
                id="claim-amount"
                type="number"
                value={claimAmount}
                onChange={(e) => setClaimAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-2 border border-orange-200 bg-orange-50 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Please enter the total amount of your claim in dollars.
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Uploaded Files:</h2>
              <div className="grid grid-cols-5 gap-4">
                {files.map((file, index) => (
                  <div 
                    key={index}
                    className="relative group"
                  >
                    <div className="aspect-square bg-orange-50 rounded-lg p-3 flex flex-col items-center justify-center border-2 border-orange-200">
                      <svg className="w-8 h-8 text-orange-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-xs text-gray-600 text-center truncate w-full" title={file.name}>
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        {(file.size / 1024 / 1024).toFixed(1)}MB
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300"
            >
              Submit Claim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDataPage; 