import React, { useContext, useEffect, useRef, useState } from 'react';
import {
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';
import logo from '../assets/img/title.png';
import styles from '../styles/AuctionDetail.module.css';
import { DATA_URL, DATA_URL_APP } from '../utils/Constant';
import { getUserDataMemory, setUserDataMemory } from '../utils/AppData';
import WebSocketContext, {
	allUnSubscribe,
	subscribe,
} from '../utils/WebSocketConnect';
import axios from 'axios';
import ErrorPage from './ErrorPage';

/** 의류 맵 */
const sizeMap = new Map();
sizeMap.set('총장', 'itemHeight');
sizeMap.set('어깨너비', 'itemShoulder');
sizeMap.set('가슴단면', 'itemChest');
sizeMap.set('소매길이', 'itemSleeve');
sizeMap.set('밑위', 'frontrise');
sizeMap.set('허리단면', 'itemWaists');
sizeMap.set('엉덩이 단면', 'itemhipWidth');
sizeMap.set('허벅지 단면', 'itemThighs');
sizeMap.set('밑면 단면', 'itemHemWidth');

/** 대충 초단위를 시:분:초 로 바꾸는 함수
 *
 * @param {number} seconds  */
function formatTime(seconds) {
	const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
	const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
	const secs = String(seconds % 60).padStart(2, '0');

	return `${hours}:${minutes}:${secs}`;
}

/**
 * @param {import('@stomp/stompjs').IMessage} message
 * @param {"time" | "price" | "roomData"} type
 * @param {React.Dispatch<React.SetStateAction<RecvPriceState>>} setAuctionValue
 * @param {String} token
 */
async function handleMassage(message, type, setAuctionValue, token) {
	if (type !== 'time') {
		console.log(JSON.parse(message.body));
	}

	if (type === 'roomData') {
		/** @type {RecvRoomData} */
		const body = JSON.parse(message.body);

		if (body.state === 'AUCTION_END') {
			setAuctionValue((prev) => {
				return {
					...prev,
					state: body.state,
					endPrice: body.recvPrice,
				};
			});
		}

		if (body.state === 'AUCTION_UNDEFINDE') {
			setAuctionValue((prev) => {
				return {
					...prev,
					state: body.state,
				};
			});
		}

		if (body.state === 'AUCTION_PROGRESS') {
			setAuctionValue((prev) => {
				return {
					...prev,
					state: body.state,
					actionData: {
						...prev?.actionData,
						...body?.actionData,
					},
				};
			});
		}
	}

	if (type === 'time') {
		setAuctionValue((prev) => {
			return { ...prev, auctionTime: message.body };
		});
	}

	if (type === 'price') {
		/** @type {RecvPriceState['auctionList'][0]} */
		const body = JSON.parse(message.body);

		if (token === body.token) {
			body.isMy = true;
		}

		body.time = new Date(body.time);

		setAuctionValue((prev) => {
			return {
				...prev,
				price: body.price,
				auctionList: [...prev.auctionList, body],
			};
		});
	}
}

function AuctionDetail() {
	const webSocketContext = useContext(WebSocketContext);
	const auctionId = useSearchParams()[0].get('auctionId');
	const token = localStorage.getItem('accessToken');
	const navigate = useNavigate();

	/** @type {[RecvPriceState, React.Dispatch<React.SetStateAction<RecvPriceState>>]} */
	const [auctionValue, setAuctionValue] = useState({
		state: 'AUCTION_PROGRESS',
		auctionTime: 0,
		auctionList: [],
		actionData: useLocation().state,
	});
	const itemInfo = auctionValue?.actionData;

	/** @type {[ItemState, React.Dispatch<React.SetStateAction<ItemState>>]} */
	const [item, setItem] = useState();

	/** @type {[UserData | undefined, React.Dispatch<React.SetStateAction<UserData>>]} */
	const [userData, setUserData] = useState(getUserDataMemory());

	// 서버 전송용
	const sendConnect = `/recv/auction/${auctionId}/connect`;
	const sendPrice = `/recv/auction/${auctionId}/price`;

	// 서버 응답용
	const recvRoomData = `/action/auction/${auctionId}/roomdata/${token}`;
	// 전체 경매 응답용
	const recvRoomAll = `/action/auction/${auctionId}/roomdata/all`;
	const recvPrice = `/action/auction/${auctionId}/price`;
	const recvTime = `/action/auction/${auctionId}/time`;

	// 웹소켓 연결용
	useEffect(() => {
		// 모든 구독 없에고 들감
		allUnSubscribe();

		console.log(userData?.company);
		if (
			!token ||
			!auctionId ||
			!userData?.company ||
			webSocketContext.state !== 'connect'
		) {
			return;
		}

		const client = webSocketContext.client;

		// 접속 시 데이터 받기
		subscribe(client, recvRoomData, (m) =>
			handleMassage(m, 'roomData', setAuctionValue, token),
		);

		// 전체 경매 응답 메시지 받기
		subscribe(client, recvRoomAll, (m) =>
			handleMassage(m, 'roomData', setAuctionValue, token),
		);

		// 호가 받는 용
		subscribe(client, recvPrice, (m) =>
			handleMassage(m, 'price', setAuctionValue, token),
		);

		// 시간 측정용
		subscribe(client, recvTime, (m) =>
			handleMassage(m, 'time', setAuctionValue, token),
		);

		// 접속 여부를 보냄
		client.publish({
			destination: sendConnect,
			body: JSON.stringify({
				token,
				company: userData?.company,
			}),
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [webSocketContext.state, userData?.company]);

	// 유저 정보 요청
	useEffect(() => {
		if (!token || !auctionId) {
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

	// 아이템 정보 요청
	useEffect(() => {
		if (!itemInfo?.itemName || !auctionId) {
			return;
		}

		axios
			.get(`${DATA_URL_APP}api/item-info/${itemInfo?.itemKey}`)
			.then((res) => {
				/** @type {[]} */
				let sizes;
				if (itemInfo?.pitItemOrder?.itemType === '상의') {
					sizes = res.data.itemTopInfo;
				} else {
					sizes = res.data.itemBottomInfo;
				}

				const itemImgName = res.data.itemImgName[0];

				for (const size of sizes) {
					if (size.itemSize === itemInfo?.itemSize) {
						setItem(size);
						if (!itemInfo.itemImageUrl) {
							setAuctionValue((prev) => {
								return {
									...prev,
									actionData: {
										...prev.actionData,
										itemImageUrl: itemImgName,
									},
								};
							});
						}

						break;
					}
				}
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemInfo?.itemName]);

	/** @type {React.MutableRefObject<HTMLInputElement>} */
	const PriceValueRef = useRef();

	let size;
	if (itemInfo?.pitItemOrder?.itemType === '상의') {
		size = ['총장', '어깨너비', '가슴단면', '소매길이'];
	} else {
		size = [
			'총장',
			'밑위',
			'허리단면',
			'엉덩이 단면',
			'허벅지 단면',
			'밑면 단면',
		];
	}

	const handleBid = async () => {
		const price = PriceValueRef.current.value;
		const client = webSocketContext.client;

		PriceValueRef.current.value = '';
		if (!price) {
			return;
		}

		/**@type {sendPrice} */
		const body = {
			auctionId,
			company: userData?.company,
			price: price,
			token: token,
		};

		// 호가 보내기
		client.publish({
			destination: sendPrice,
			body: JSON.stringify(body),
		});
	};

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

	if (!token || auctionId === null) {
		return <ErrorPage messge="유효하지 않는 접근입니다" navigate="/" />;
	}

	if (auctionValue.state === 'AUCTION_END') {
		const endPrice = auctionValue?.endPrice;
		return (
			<ErrorPage
				messge={`최종 낙찰가: ${endPrice?.price}\n낙찰 업체: ${endPrice?.company}`}
				navigate="/Repair"
			/>
		);
	}

	if (auctionValue.state === 'AUCTION_UNDEFINDE') {
		return (
			<ErrorPage
				messge="경매가 종료되었거나, 찾을 수 없는 경매 입니다."
				navigate="/Repair"
			/>
		);
	}

	return (
		<div className={styles.App}>
			<header className={styles.header}>
				<div>
					<Link to="/">
						<img src={logo} className={styles.logo} alt="logo" />
					</Link>
				</div>
				<div className={styles.right}>
					<span onClick={Logout}>로그아웃</span>
				</div>
			</header>
			<div className={styles.content}>
				<div className={styles.contentMain}>
					<p className={styles.welcome}>{userData?.company} 수선 환영합니다</p>
					<div className={styles.contentView}>
						<p className={styles.title}>경매 상품</p>
						<div className={styles.auctionTimeDiv}>
							<p className={styles.auctionTimeTitle}>마감까지: </p>
							<p className={styles.auctionTime}>
								{formatTime(auctionValue.auctionTime)}
							</p>
						</div>

						<div className={styles.auctionMain}>
							{/* 왼쪽 */}
							<div className={styles.auctionImage}>
								<p className={styles.itemTitle}>[ {itemInfo?.itemName} ]</p>

								<img
									src={`${DATA_URL_APP}api/img/imgserve/itemimg/${itemInfo?.itemImageUrl}`}
									className={styles.cloth}
									alt="cloth2"
								/>
								<p className={styles.itemInfoTitle}>#제품정보</p>
								<table className={styles.table}>
									<thead>
										<tr>
											<td>cm</td>
											{size.map((n, index) => (
												<td key={index}>{n}</td>
											))}
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className={styles.tableHeader}>원본 사이즈</td>
											{item
												? size.map((n, index) => (
														<td key={index}>{item[sizeMap.get(n)]}</td>
													))
												: size.map((_, index) => <td key={index}>0</td>)}
										</tr>
										<tr>
											<td className={styles.tableHeader}>수선 사이즈</td>
											{size.map((n, index) => (
												<td key={index}>
													{itemInfo?.pitItemOrder?.[sizeMap.get(n)]}
												</td>
											))}
										</tr>
									</tbody>
								</table>
							</div>

							{/* 오른쪽 */}
							<div className={styles.auctionInfo}>
								<div className={styles.auctionCulDiv}>
									<p>현재최저가: </p>
									<p className={styles.auctionCulPrice}>
										{auctionValue.price || itemInfo?.pitPrice}원
									</p>
								</div>
								<div className={styles.auctionView}>
									<p className={styles.auctionViewTitle}>#입찰내역</p>
									<div className={styles.auctionViewText}>
										<div>
											{auctionValue.auctionList.length ? (
												auctionValue.auctionList.map((item, index) => (
													<div className={styles.auctionMessageDiv} key={index}>
														<div className={styles.auctionMessageInfo}>
															<p>
																{item.isMy
																	? '내가 제시한 금액: '
																	: `${item.company}가 제시한 금액: `}
															</p>
															<p className={styles.auctionMessagePrice}>
																{item.price}원
															</p>
														</div>
														<p
															className={styles.auctionMessage}
														>{`${item.time.getHours()}:${item.time.getMinutes()}`}</p>
													</div>
												))
											) : (
												<></>
											)}
										</div>
									</div>
								</div>
								<div className={styles.auctionInputDiv}>
									<input
										type="number"
										ref={PriceValueRef}
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												handleBid();
											}
										}}
										className={styles.auctionInputPrice}
										placeholder="입찰할 가격(원)"
									/>
									<input
										type="button"
										onClick={() => handleBid()}
										className={styles.auctionInputBT}
										value="입찰하기"
									/>
								</div>
								<div className={styles.auctionUserView}>
									<p className={styles.itemInfoTitle}>#고객정보</p>
									<div className={styles.auctionUserValue}>
										<p>이름: {itemInfo?.userName}</p>
										<p>
											주소: {itemInfo?.userAddr} {itemInfo?.userAddrDetail}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AuctionDetail;
