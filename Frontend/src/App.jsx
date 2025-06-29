import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Landing from './components/landing';
import Detection from './components/detection';
import Usage from './components/usage';

const App = () => {
  return (
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/detection" element={<Detection/>} />
            <Route path="/usage" element={<Usage/>} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;