import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/LandingPage';
import UploadDataPage from './components/UploadDataPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/upload" element={<UploadDataPage />} />
      </Routes>
    </Router>
  );
}

export default App;
