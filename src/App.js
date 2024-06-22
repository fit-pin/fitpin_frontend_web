import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Service from '../src/pages/Service';
import Question from './pages/Question';
import Exchange from './pages/Exchange';
import Ask from '../src/pages/Ask';
import Fitcomment from '../src/pages/Fitcomment';
import Fitcomment2 from '../src/pages/Fitcomment2';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Main from './pages/Main';
import Repair from './pages/Repair';
import Auction from './pages/Auction';
import AuctionDetail from './pages/AuctionDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Service" element={<Service />} />
          <Route path="/Question" element={<Question />} />
          <Route path="/Exchange" element={<Exchange />} />
          <Route path="/Ask" element={<Ask />} />
          <Route path="/Fitcomment" element={<Fitcomment />} />
          <Route path="/Fitcomment2" element={<Fitcomment2 />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Repair" element={<Repair />} />
          <Route path="/Auction" element={<Auction />} />
          <Route path="/AuctionDetail" element={<AuctionDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
