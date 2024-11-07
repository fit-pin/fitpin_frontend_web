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

/**
 * @param {import('@stomp/stompjs').IMessage} message
 * @param {React.Dispatch<React.SetStateAction<RepairRecvType>>} setItems */
async function handleMassage(message, setItems) {
	/**@type {RepairRecvType} */
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

	console.log(mapBody);
	setItems((prev) => {
		if (prev) {
			return [...prev, ...mapBody];
		} else {
			return mapBody;
		}
	});
}

function Repair() {
	const repairWebsocketUrl = '/action/buyItem';

	const navigate = useNavigate();
	const webScoket = useContext(WebSocketContext);

	/** @type {[RepairRecvType, React.Dispatch<React.SetStateAction<RepairRecvType>>]} */
	const [items, setItems] = useState();
	/** @type {[UserData | undefined, React.Dispatch<React.SetStateAction<UserData>>]} */
	const [userDataState, setUserDataState] = useState(getUserDataMemory());

	// 웹소켓 연결용
	useEffect(() => {
		// 모든 구독 없에고 들감
		allUnSubscribe();

		webScoket
			.then((client) => {
				subscribe(client, repairWebsocketUrl, (m) =>
					handleMassage(m, setItems),
				);
			})
			.catch((e) => {
				console.log(e);
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// 수선 업체 정보 얻기용
	useEffect(() => {
		const userName = localStorage.getItem('username');

		if (userName && !userDataState) {
			axios
				.get(`${DATA_URL}users/${userName}`)
				.then((res) => {
					setUserDataMemory(res.data);
					setUserDataState(res.data);
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
					<span className={styles.bold} onClick={() => navigate('/Auction')}>
						경매
					</span>
					<span onClick={Logout}>로그아웃</span>
				</div>
			</header>
			<div className={styles.content}>
				<div className={styles.leftContent}>
					<div className={styles.titlDiv}>
						<p className={styles.welcome}>
							{userDataState?.company} 수선 환영합니다
						</p>
						<div className={styles.storeInfo}>
							<div className={styles.details}>
								<h2>#{userDataState?.company} 수선</h2>
								<p>
									<strong>주소:</strong> {userDataState?.address1}{' '}
									{userDataState?.address2}
								</p>
								<p>
									<strong>전화번호: </strong> {userDataState?.phone}
								</p>
								<p>
									<strong>가입일</strong> {userDataState?.joinDate}
								</p>
							</div>
						</div>
					</div>
					<h1 className={styles.auctionTitle}>수선 경매</h1>

					<div className={styles.auctionSection}>
						{items ? (
							items.map((itemInfo, index) => (
								<div className={styles.auctionItem} key={index}>
									<p className={styles.actionItemtextPrice}>
										수선 가격: {itemInfo.pitPrice}원
									</p>
									<img
										src={`${DATA_URL_APP}api/img/imgserve/itemimg/${itemInfo.itemImageUrl}`}
										width={'130px'}
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
