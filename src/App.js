import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Service from '../src/pages/Service';
import Ask from '../src/pages/Ask';
import Fitcomment from '../src/pages/Fitcomment';
import Fitcomment2 from '../src/pages/Fitcomment2';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/Service" element={<Service />} />
          <Route path="/Ask" element={<Ask />} />
          <Route path="/Fitcomment" element={<Fitcomment />} />
          <Route path="/Fitcomment2" element={<Fitcomment2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
