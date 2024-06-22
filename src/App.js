import React from 'react';
import { BrowserRouter as Route, Routes, BrowserRouter } from 'react-router-dom';
import Service from '../src/pages/Service';
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
    <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
        	<Routes>
        	  <Route path="/" element={<Main />} />
        	  <Route path="/Service" element={<Service />} />
        	  <Route path="/Ask" element={<Ask />} />
        	  <Route path="/Fitcomment" element={<Fitcomment />} />
        	  <Route path="/Fitcomment2" element={<Fitcomment2 />} />
        	  <Route path="/Login" element={<Login />} />
        	  <Route path="/SignIn" element={<SignIn />} />
        	  <Route path="/Repair" element={<Repair />} />
        	  <Route path="/Auction" element={<Auction />} />
        	  <Route path="/AuctionDetail" element={<AuctionDetail />} />
        	</Routes>
    	</BrowserRouter>
      </div>
  );
}

export default App;
