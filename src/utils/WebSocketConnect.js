// 웹소켓 연결을 담당하는 것과, 그걸 Context화 하는 코드
import { Client } from '@stomp/stompjs';
import { createContext } from 'react';
import { WEB_SCOKET_URL } from './Constant';

/**
 * @param {Object} param0
 * @param {(client: Client) => void} param0.connect 
 * @param {(client: Client) => void} param0.disconnect 
 * @param {(client: Client) => void} param0.close 
*/
export function WebSocketConnect({connect, disconnect, close}) {
	const client = new Client({
		brokerURL: WEB_SCOKET_URL,
		onWebSocketClose: () => {
			console.log('웹소켓 서버와 통신 종료');
			close(client);
		},
		onConnect: () => {
			console.log('웹소켓 서버와 연결됨');
			connect(client);
		},
		onDisconnect: () => {
			console.log('웹소켓 서버와 연결이 중단됨');
			disconnect(client);
		},
	});
	client.activate();
};

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

/** @type {React.Context<SocketState>} */
const WebSocketContext = createContext();
export default WebSocketContext;
