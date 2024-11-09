import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/title.png';
import styles from '../styles/Repair.module.css';
import axios from 'axios';
import { DATA_URL, DATA_URL_APP } from '../utils/Constant';
import WebSocketContext, {
	allUnSubscribe,
	subscribe,
} from '../utils/WebSocketConnect';
import { getUserDataMemory, setUserDataMemory } from '../utils/AppData';
import ErrorPage from './ErrorPage';

/**
 * @param {import('@stomp/stompjs').IMessage} message
 * @param {React.Dispatch<React.SetStateAction<RepairItemState>>} setItems
 * @param {"connect" | "buyItem" | "endItem"} type
 * @param {string} token
 * */
async function handleMassage(message, setItems, type, token) {
	console.log(JSON.parse(message.body));

	if (type === 'connect') {
		/**@type {recvRepairListType} */
		const body = JSON.parse(message.body);

		//TODO: 이곳을 완성하자
		const meperData = body.map((list) => {
			if (list.userList[token]) {
				return {
					myAuction: {
						state: list.auction.state,
						auction: list.auction.actionData,
					},
				};
			} else {
				return {
					otherAuction: {
						state: list.auction.state,
					},
				};
			}
		});
	}

	if (type === 'buyItem') {
		/**@type {RepairRecvType[]} */
		const body = JSON.parse(message.body);

		const mapBody = await Promise.all(
			body.map(async (item) => {
				try {
					const req = await axios.get(
						`${DATA_URL_APP}api/item-info/${item.itemKey}`,
					);

					return {
						...item,
						itemImageUrl: req.data.itemImgName[0],
					};
				} catch (error) {
					console.error(`앱 백엔드에 요청실패: ${error}`);
				}
			}),
		);
		setItems((prev) => {
			if (prev?.otherAuction) {
				return { ...prev, otherAuction: [...prev.otherAuction, mapBody] };
			} else {
				return { ...prev, otherAuction: mapBody };
			}
		});
	}
}

function Repair() {
	const recvRepairList = '/action/repair/connect';
	const recvBuyItem = '/action/repair/buyItem';
	const recvEndItem = '/action/repair/endItem';

	const SendConnect = '/recv/repair/connect';

	const token = localStorage.getItem('accessToken');

	const navigate = useNavigate();
	const webSocketContext = useContext(WebSocketContext);	

	/** @type {[RepairItemState, React.Dispatch<React.SetStateAction<RepairItemState>>]} */
	const [items, setItems] = useState();
	/** @type {[UserData | undefined, React.Dispatch<React.SetStateAction<UserData>>]} */
	const [userData, setUserData] = useState(getUserDataMemory());

	const myAuction = items?.myAuction;
	const otherAuction = items?.otherAuction;

	// 웹소켓 연결용
	useEffect(() => {
		// 모든 구독 없에고 들감
		allUnSubscribe();

		if (!token || !userData || webSocketContext.state !== 'connect') {
			return;
		}

		const client = webSocketContext.client;
		subscribe(client, recvRepairList, (m) =>
			handleMassage(m, setItems, 'connect', token),
		);
		subscribe(client, recvBuyItem, (m) =>
			handleMassage(m, setItems, 'buyItem', token),
		);
		subscribe(client, recvEndItem, (m) =>
			handleMassage(m, setItems, 'endItem', token),
		);
		client.publish({
			destination: SendConnect,
			body: JSON.stringify({
				token: token,
				company: userData.company,
			}),
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [webSocketContext.state, userData]);

	// 수선 업체 정보 얻기용
	useEffect(() => {
		if (!token) {
			return;
		}
		const userName = localStorage.getItem('username');

		if (userName) {
			axios
				.get(`${DATA_URL}users/${userName}`)
				.then((res) => {
					setUserDataMemory(res.data);
					setUserData(res.data);
				})
				.catch((e) => {
					console.error(`유저데이터 불러오기 실패: ${e}`);
				});
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const Logout = () => {
		const refreshToken = localStorage.getItem('refreshToken');

		axios
			.post(`${DATA_URL}logout`, null, {
				headers: {
					// 로컬 스토리지에서 가져온 refreshToken을 헤더에 추가
					Authorization: refreshToken,
					'Content-Type': 'application/json',
				},
				withCredentials: true, // CORS
			})
			.then((res) => {
				console.log('로그아웃 성공 : ', res);
				// 로컬 스토리지에서 토큰 제거
				localStorage.removeItem('refreshToken');
				localStorage.removeItem('accessToken');
				localStorage.removeItem('username');
				navigate('/');
			})
			.catch((error) => {
				console.error('로그아웃 실패 :', error);
			});
	};

	if (!token) {
		return <ErrorPage messge="유효하지 않는 접근입니다" navigate="/" />;
	}

	const requests = [
		{ id: 4, name: '#신청자이름', date: '2024-04-11', status: '주문 완료' },
		{ id: 3, name: '#신청자이름', date: '2024-04-09', status: '진행중' },
		{ id: 2, name: '#신청자이름', date: '2024-04-06', status: '수선 완료' },
		{ id: 1, name: '#신청자이름', date: '2024-04-05', status: '수선 완료' },
	];

	return (
		<div className={styles.App}>
			<header className={styles.header}>
				<div>
					<img
						src={logo}
						className={styles.logo}
						alt="logo"
						onClick={() => navigate('/')}
					/>
				</div>
				<div className={styles.right}>
					<span onClick={Logout}>로그아웃</span>
				</div>
			</header>
			<div className={styles.content}>
				<div className={styles.leftContent}>
					<div className={styles.titlDiv}>
						<p className={styles.welcome}>
							{userData?.company} 수선 환영합니다
						</p>
						<div className={styles.storeInfo}>
							<div className={styles.details}>
								<h2>#{userData?.company} 수선</h2>
								<p>
									<strong>주소:</strong> {userData?.address1}{' '}
									{userData?.address2}
								</p>
								<p>
									<strong>전화번호: </strong> {userData?.phone}
								</p>
								<p>
									<strong>가입일</strong> {userData?.joinDate}
								</p>
							</div>
						</div>
					</div>
					<h1 className={styles.auctionTitle}>수선 경매</h1>

					<div className={styles.auctionSection}>
						{otherAuction ? (
							otherAuction.map((itemInfo, index) => (
								<div className={styles.auctionItem} key={index}>
									<p className={styles.actionItemtextPrice}>
										수선 가격: {itemInfo.pitPrice}원
									</p>
									<img
										src={`${DATA_URL_APP}api/img/imgserve/itemimg/${itemInfo.itemImageUrl}`}
										alt={`Cloth ${index + 1}`}
										className={styles.clothImage}
									/>
									<p className={styles.actionItemtextTitle}>
										{itemInfo.itemName}
									</p>
									<p className={styles.actionItemtext}>
										요청자 이름: {itemInfo.userName}
									</p>
									<p className={styles.actionItemtext}>
										주소: {itemInfo.userAddr} {itemInfo.userAddrDetail}
									</p>
									<button
										className={styles.bidButton}
										onClick={() =>
											navigate(
												`/AuctionDetail?auctionId=${itemInfo.auctionId}`,
												{ state: itemInfo },
											)
										}
									>
										경매하기
									</button>
								</div>
							))
						) : (
							<div>아직 고객이 수선을 요청하지 않았습니다</div>
						)}
					</div>
					<p className={styles.requestTitle}>수선 요청</p>
					<table className={styles.requestTable}>
						<thead>
							<tr>
								<th>번호</th>
								<th>이름</th>
								<th>신청일</th>
								<th>진행 상태</th>
							</tr>
						</thead>
						<tbody>
							{requests.map((request) => (
								<tr key={request.id}>
									<td>{request.id}</td>
									<td>{request.name}</td>
									<td>{request.date}</td>
									<td
										className={
											styles[
												request.status === '진행중'
													? 'statusInProgress'
													: request.status === '수선 완료'
														? 'statusCompleted'
														: 'statusDefault'
											]
										}
									>
										{request.status}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Repair;
