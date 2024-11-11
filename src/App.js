import React, { useEffect, useState } from 'react';
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
import AuctionDetail from './pages/AuctionDetail';
import UpdateAsk from './pages/UpdateAsk';
import './App.css';
import { CookiesProvider } from 'react-cookie';
import WebSocketContext, { WebSocketConnect } from './utils/WebSocketConnect';
import RepairDetail from './pages/RepairDetail';

function App() {
	/** @type {[SocketState, React.Dispatch<React.SetStateAction<SocketState>>]} */
	const [scoketState, setScoketState] = useState({
		state: 'close',
		client: undefined,
	});

	// 웹소켓이 한번 끊기고 재연결을 시도하지만, 재연결 되도 모든 구독이 다 끊기기 된다
	// 그래서 재연결 후 현재 컴포넌트가 다시 구독 될수 있도록 컴포넌트에 useEffect Hook 을 작동시키기 위해
	// 전역 Context를 사용한다
	useEffect(() => {
		WebSocketConnect({
			connect: (client) => {
				setScoketState({ state: 'connect', client });
			},
			close: (client) => {
				setScoketState({ state: 'close', client });
			},
			disconnect: (client) => {
				setScoketState({ state: 'disconnect', client });
			},
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="App">
			<CookiesProvider>
				<WebSocketContext.Provider value={scoketState}>
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
							<Route path="/AuctionDetail" element={<AuctionDetail />} />
							<Route path="/RepairDetail" element={<RepairDetail />} />
						</Routes>
					</BrowserRouter>
				</WebSocketContext.Provider>
			</CookiesProvider>
		</div>
	);
}

export default App;
