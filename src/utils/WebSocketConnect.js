// 웹소켓 연결을 담당하는 것과, 그걸 Context화 하는 코드
import { Client } from '@stomp/stompjs';
import { createContext } from 'react';
import { WEB_SCOKET_URL } from './Constant';

export const WebSocketConnect = new Promise((reslove, reject) => {
	const scoketClient = new Client({
		brokerURL: WEB_SCOKET_URL,
		onWebSocketClose: () => {
			console.log('웹소켓 서버와 연결이 중단됨');
			reslove('웹소켓 서버와 연결이 중단됨');
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
});

/** @type {Array<import('@stomp/stompjs').StompSubscription>} */
let subscribeList = [];

/**
 * @param {Client} client
 * @param {string} destination
 * @param {import('@stomp/stompjs').messageCallbackType} messageCallbackType
 *
 */
export function subscribe(client, destination, messageCallbackType) {
	subscribeList.push(client.subscribe(destination, messageCallbackType));
}

export function allUnSubscribe() {
	subscribeList.forEach((i) => {
		i.unsubscribe();
	});

	subscribeList = [];
}

/** @type {React.Context<Promise<Client>>} */
const WebSocketContext = createContext();
export default WebSocketContext;
