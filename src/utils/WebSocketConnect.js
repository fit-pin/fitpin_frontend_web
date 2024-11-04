// 웹소켓 연결을 담당하는 것과, 그걸 Context화 하는 코드
import { Client } from '@stomp/stompjs';
import { createContext } from 'react';

export const WebSocketConnect = new Promise((reslove, reject) => {
	const scoketClient = new Client({
		brokerURL: 'ws://localhost:8080/sock',
		onWebSocketClose: () => {
			console.log('웹소켓 서버와 연결이 중단됨');
			reslove("웹소켓 서버와 연결이 중단됨");
		},
		onConnect: () => {
			console.log('웹소켓 연결 성공');
			reslove(scoketClient);
		},
		onDisconnect: () => {
			console.log('웹소켓 서버와 연결 중단');
		},
	});
	scoketClient.activate();
})

/** @type {React.Context<Promise<Client>>} */
const WebSocketContext = createContext();
export default WebSocketContext;