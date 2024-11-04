import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/title.png';
import styles from '../styles/Repair.module.css';
import axios from 'axios';
import { DATA_URL, WEBSOCKET_RECV } from '../utils/Constant';
import WebSocketContext from '../utils/WebSocketConnect';

/**
 * @param {import('@stomp/stompjs').IMessage} message
 * @param {React.Dispatch<React.SetStateAction<RepairRecvType[]>>} setItems */
async function handleMassage(message, setItems) {
	/**@type {RepairRecvType} */
	const body = JSON.parse(message.body);
	console.log(body);

	body.items = await Promise.all(
		body.items.map(async (item) => {
			//TODO: 이거 나중에 상수화 해야함
			try {
				const req = await axios.get(
					`http://fitpitback.kro.kr:8080/api/item-info/${item.itemKey}`,
				);
				console.log(req.data);

				return {
					...item,
					itemImageUrl: req.data.itemImgName[0],
					fitPrice: req.data.pitPrice,
				};
			} catch (error) {
				console.error(`앱 백엔드에 요청실패: ${error}`);
			}
		}),
	);

	setItems((prev) => {
		return [...prev, body];
	});
}

function Repair() {
	const navigate = useNavigate();
	const webScoket = useContext(WebSocketContext);

	/** @type {[Array<RepairRecvType>, React.Dispatch<React.SetStateAction<RepairRecvType[]>>]} */
	const [items, setItems] = useState([]);

	useEffect(() => {
		webScoket.then((client) => {
			client.subscribe(WEBSOCKET_RECV, (m) => handleMassage(m, setItems));
		}).catch(e => {
			console.log(e);
		});

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
						<p className={styles.welcome}>00수선 환영합니다</p>
						<div className={styles.storeInfo}>
							<div className={styles.details}>
								<h2>#00수선</h2>
								<p>
									<strong>주소:</strong> 서울특별시 구로구 경인로 445
								</p>
								<p>
									<strong>전화번호: </strong> 010-1234-1234
								</p>
								<p>
									<strong>가입일</strong> 2024-03-04
								</p>
							</div>
						</div>
					</div>
					<h1 className={styles.auctionTitle}>수선 경매</h1>

					<div className={styles.auctionSection}>
						{items.length ? (
							items.map((payInfo) =>
								payInfo.items.map((itemInfo, index) => (
									<div className={styles.auctionItem} key={index}>
										<p className={styles.actionItemtextPrice}>
											수선 가격: {itemInfo.fitPrice}원
										</p>
										<img
											//TODO: 이거 나중에 상수화 해야함
											src={`http://fitpitback.kro.kr:8080/api/img/imgserve/itemimg/${itemInfo.itemImageUrl}`}
											width={'130px'}
											alt={`Cloth ${index + 1}`}
											className={styles.clothImage}
										/>
										<p className={styles.actionItemtextTitle}>
											{itemInfo.itemName}
										</p>
										<p className={styles.actionItemtext}>
											요청자 이름: {payInfo.userName}
										</p>
										<p className={styles.actionItemtext}>
											주소: {payInfo.userAddr} {payInfo.userAddrDetail}
										</p>
										<button
											className={styles.bidButton}
											onClick={() => navigate('/AuctionDetail')}
										>
											경매하기
										</button>
									</div>
								)),
							)
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
