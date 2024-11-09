import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Service from '../src/pages/Service';
import Question from './pages/Question';
import Exchange from './pages/Exchange';
import Ask from '../src/pages/Ask';
import Board from '../src/pages/Board';
import Fitcomment from '../src/pages/Fitcomment';
import Fitcomment2 from '../src/pages/Fitcomment2';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Main from './pages/Main';
import Repair from './pages/Repair';
import Auction from './pages/Auction';
import AuctionDetail from './pages/AuctionDetail';
import UpdateAsk from './pages/UpdateAsk';
import './App.css';
import { CookiesProvider } from 'react-cookie';
import WebSocketContext, { WebSocketConnect } from './utils/WebSocketConnect';

const Connect = WebSocketConnect;

function App() {
	return (
		<div className="App">
			<CookiesProvider>
				<WebSocketContext.Provider value={Connect}>
					<BrowserRouter basename={process.env.PUBLIC_URL}>
						<Routes>
							<Route path="/" element={<Main />} />
							<Route path="/Service" element={<Service />} />
							<Route path="/Question" element={<Question />} />
							<Route path="/Exchange" element={<Exchange />} />
							<Route path="/Ask" element={<Ask />} />
							<Route path="/UpdateAsk" element={<UpdateAsk />} />
							<Route path="/Board" element={<Board />} />
							<Route path="/Fitcomment" element={<Fitcomment />} />
							<Route path="/Fitcomment2" element={<Fitcomment2 />} />
							<Route path="/Login" element={<Login />} />
							<Route path="/SignIn" element={<SignIn />} />
							<Route path="/Repair" element={<Repair />} />
							<Route path="/Auction" element={<Auction />} />
							<Route path="/AuctionDetail" element={<AuctionDetail />} />
						</Routes>
					</BrowserRouter>
				</WebSocketContext.Provider>
			</CookiesProvider>
		</div>
	);
}

export default App;
