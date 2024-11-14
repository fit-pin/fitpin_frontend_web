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
 * @param {"connect" | "buyItem" | "endItem" | "price"} type
 * @param {string} company
 * */
async function handleMassage(message, setItems, type, company) {
	if (type === 'connect') {
		console.log(JSON.parse(message.body));
		/**@type {recvRepairListType} */
		const body = JSON.parse(message.body);

		const meperData = body.map((list) => {
			if (list.userList.includes(company)) {
				return {
					myAuction: {
						state: list.auction.state,
						auction: list.auction.actionData,
					},
				};
			} else {
				return {
					otherAuction: list.auction.actionData,
				};
			}
		});

		/** @type {RepairRecvType[]} */
		const otherAuction = await Promise.all(
			meperData
				.filter((list) => list.otherAuction)
				.flatMap(async (list) => {
					const item = list.otherAuction;

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

		const myAuction = await Promise.all(
			meperData
				.filter((list) => list.myAuction)
				.flatMap(async (list) => {
					const item = list.myAuction?.auction;

					try {
						const req = await axios.get(
							`${DATA_URL_APP}api/item-info/${item.itemKey}`,
						);

						item.itemImageUrl = req.data.itemImgName[0];

						return {
							...list.myAuction,
							auction: item,
						};
					} catch (error) {
						console.error(`앱 백엔드에 요청실패: ${error}`);
					}
				}),
		);

		setItems((prev) => {
			let my = prev?.myAuction;
			let other = prev?.otherAuction;

			if (prev?.otherAuction) {
				other = [...prev.otherAuction, ...otherAuction];
			} else {
				other = otherAuction;
			}

			if (prev?.myAuction) {
				my = [...prev.myAuction, ...myAuction];
			} else {
				my = myAuction;
			}

			return { ...prev, myAuction: my, otherAuction: other };
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
				return { ...prev, otherAuction: [...prev.otherAuction, ...mapBody] };
			} else {
				return { ...prev, otherAuction: mapBody };
			}
		});
	}

	if (type === 'endItem') {
		const endItem = Number(message.body);
		console.log(endItem);

		setItems((prev) => {
			const otherRes = prev.otherAuction.filter(
				(list) => list.auctionId !== endItem,
			);
			const myRes = prev.myAuction.filter((list) => list.auctionId !== endItem);

			return {
				...prev,
				otherAuction: otherRes,
				myAuction: myRes,
				reqestRefrash: !prev.reqestRefrash,
			};
		});
	}

	if (type === 'price') {
		/**@type {sendPrice} */
		const body = JSON.parse(message.body);

		setItems((prev) => {
			const otherRes = prev.otherAuction.map((list) => {
				if (list.auctionId === body.auctionId) {
					list.pitPrice = body.price;
				}
				return list;
			});

			const myRes = prev.myAuction.map((list) => {
				if (list.auction.auctionId === body.auctionId) {
					list.auction.pitPrice = body.price;
				}
				return list;
			});

			return { ...prev, otherAuction: otherRes, myAuction: myRes };
		});
	}
}

function Repair() {
	const token = localStorage.getItem('accessToken');

	const recvRepairList = `/action/repair/connect/${token}`;
	const recvBuyItem = '/action/repair/buyItem';
	const recvEndItem = '/action/repair/endItem';
	const recvAllPrice = '/action/auction/*/price';

	const SendConnect = '/recv/repair/connect';

	const navigate = useNavigate();
	const webSocketContext = useContext(WebSocketContext);

	/** @type {[RepairItemState, React.Dispatch<React.SetStateAction<RepairItemState>>]} */
	const [items, setItems] = useState({ reqestRefrash: false });
	/** @type {[UserData | undefined, React.Dispatch<React.SetStateAction<UserData>>]} */
	const [userData, setUserData] = useState(getUserDataMemory());

	const myAuction = items?.myAuction;
	const otherAuction = items?.otherAuction;

	// 웹소켓 연결용
	useEffect(() => {
		// 모든 구독 없에고 들감
		allUnSubscribe();

		if (!token || !userData?.company || webSocketContext.state !== 'connect') {
			return;
		}

		const client = webSocketContext.client;
		subscribe(client, recvRepairList, (m) =>
			handleMassage(m, setItems, 'connect', userData?.company),
		);
		subscribe(client, recvBuyItem, (m) =>
			handleMassage(m, setItems, 'buyItem', userData?.company),
		);
		subscribe(client, recvEndItem, (m) =>
			handleMassage(m, setItems, 'endItem', userData?.company),
		);
		subscribe(client, recvAllPrice, (m) =>
			handleMassage(m, setItems, 'price', userData?.company),
		);
		client.publish({
			destination: SendConnect,
			body: JSON.stringify({
				token: token,
				company: userData.company,
			}),
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [webSocketContext.state, userData?.company]);

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

	// 낙찰된 경매 목록 얻기용
	useEffect(() => {
		if (!token || !userData?.company) {
			return;
		}

		axios
			.get(`${DATA_URL}getauction/${userData?.company}`)
			.then((res) => {
				/** @type {RepairRecvType[]} */
				const data = res.data;
				console.log(data);

				if (!data.length) {
					return;
				}

				const resData = data.map((item) => {
					return {
						state: 'AUCTION_END',
						auction: item,
					};
				});

				setItems((prev) => {
					const prevAuction = prev.myAuction?.filter((item) =>
						resData.every((value) => {
							return value.auction?.auctionId !== item.auction?.auctionId;
						}),
					);

					let my;
					if (prev?.myAuction?.length) {
						my = [...prevAuction, ...resData];
					} else {
						my = resData;
					}

					return {
						...prev,
						myAuction: my,
					};
				});
			})
			.catch((e) => {
				console.error(`이전 경매 불러오기 실패: ${e}`);
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData?.company, items.reqestRefrash]);

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
									<strong>주소: </strong>
									{`${userData?.address1} ${userData?.address2}`}
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
						{otherAuction?.length ? (
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
								<th>제품명</th>
								<th>요청자</th>
								<th>주소</th>
								<th>수선 가격</th>
								<th>상태</th>
							</tr>
						</thead>
						<tbody>
							{myAuction?.length ? (
								myAuction.map((item, index) => (
									<tr
										key={index}
										style={{ cursor: 'pointer' }}
										onClick={(e) =>
											item.state === 'AUCTION_PROGRESS'
												? navigate(
														`/AuctionDetail?auctionId=${item.auction?.auctionId}`,
														{ state: item.auction },
													)
												: navigate(
														`/RepairDetail?repairId=${item.auction?.repairId}`,
														{ state: item.auction },
													)
										}
									>
										<td>{item.auction.itemName}</td>
										<td>{item.auction.userName}</td>
										<td>
											{item.auction.userAddr} {item.auction.userAddrDetail}
										</td>
										<td>{item.auction.pitPrice}원</td>
										<td
											className={
												styles[
													item.state === 'AUCTION_PROGRESS'
														? 'statusInProgress'
														: item.state.status === 'AUCTION_END'
															? 'statusCompleted'
															: 'statusDefault'
												]
											}
										>
											{item.state === 'AUCTION_PROGRESS'
												? '경매 진행중'
												: '경매 완료'}
										</td>
									</tr>
								))
							) : (
								<></>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Repair;
