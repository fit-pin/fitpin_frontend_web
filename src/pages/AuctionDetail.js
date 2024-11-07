import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import logo from '../assets/img/title.png';
import styles from '../styles/AuctionDetail.module.css';
import { DATA_URL, DATA_URL_APP } from '../utils/Constant';
import { getUserDataMemory, setUserDataMemory } from '../utils/AppData';
import WebSocketContext, {
	allUnSubscribe,
	subscribe,
} from '../utils/WebSocketConnect';
import axios from 'axios';

/**
 * @param {import('@stomp/stompjs').IMessage} message
 * @param {"time" | "price" | "roomData"} type
 * @param {React.Dispatch<React.SetStateAction<RecvPriceState>>} setAuctionValue
 * @param {String} token
 */
async function handleMassage(message, type, setAuctionValue, token) {
	switch (type) {
		case 'time':
			setAuctionValue((prev) => {
				return { ...prev, auctionTime: message.body };
			});
			break;
		case 'price':
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
			break;
		default:
			break;
	}
}

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

function AuctionDetail() {
	const webScoket = useContext(WebSocketContext);
	const auctionId = useSearchParams()[0].get('auctionId');
	const token = localStorage.getItem('accessToken');

	/** @type {[RepairRecvType[0], React.Dispatch<React.SetStateAction<RepairRecvType[0]>>]} */
	const [itemInfo, setItemInfo] = useState(useLocation().state);

	/** @type {[RecvPriceState, React.Dispatch<React.SetStateAction<RecvPriceState>>]} */
	const [auctionValue, setAuctionValue] = useState({
		auctionTime: 0,
		auctionList: [],
	});
	const [userDataState, setUserDataState] = useState(getUserDataMemory());

	// 유저 정보, 아이템 정보 추가로 요청하는
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

		axios
			.get(`${DATA_URL_APP}api/item-info/${itemInfo.itemKey}`)
			.then((res) => {
				/** @type {[]} */
				let sizes;
				if (itemInfo.pitItemOrder.itemType === '상의') {
					sizes = res.data.itemTopInfo;
				} else {
					sizes = res.data.itemBottomInfo;
				}

				for (const size of sizes) {
					if (size.itemSize === itemInfo.itemSize) {
						setItemInfo((prev) => {
							return { ...prev, originItem: size };
						});
						break;
					}
				}
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/** @type {React.MutableRefObject<HTMLInputElement>} */
	const PriceValueRef = useRef();

	// 서버 전송용
	const AuctionSendUrl = `/recv/Auction/${auctionId}`;

	// 서버 응답 받는용
	const AuctionRecvUrl = `/action/Auction/${auctionId}`;

	let size;
	if (itemInfo.pitItemOrder.itemType === '상의') {
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
		const client = await webScoket;

		PriceValueRef.current.value = '';
		if (!price) {
			return;
		}

		/**@type {sendPrice} */
		const body = {
			company: getUserDataMemory()?.company,
			price: price,
			token: token,
		};

		// 호가 보내기
		client.publish({
			destination: `${AuctionSendUrl}/price`,
			body: JSON.stringify(body),
		});
	};

	// 웹소켓 연결용
	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			webScoket
				.then((client) => {
					// 모든 구독 없에고 들감
					allUnSubscribe();

					// 접속 여부를 보냄
					client.publish({ destination: `${AuctionSendUrl}/connect/${token}` });

					// 시간 측정 용
					subscribe(client, `${AuctionRecvUrl}/time`, (m) =>
						handleMassage(m, 'time', setAuctionValue, token),
					);

					// 호가 받는 용
					subscribe(client, `${AuctionRecvUrl}/price`, (m) =>
						handleMassage(m, 'price', setAuctionValue, token),
					);

					// 접속 시 데이터 받기
					subscribe(client, `${AuctionRecvUrl}/roomData/${token}`, (m) =>
						handleMassage(m, 'roomData', setAuctionValue, token),
					);
				})
				.catch((e) => {
					console.log(e);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.App}>
			<header className={styles.header}>
				<div>
					<Link to="/">
						<img src={logo} className={styles.logo} alt="logo" />
					</Link>
				</div>
				<div className={styles.right}>
					<Link to="/Auction" className={styles.bold}>
						경매
					</Link>
					<Link to="/" className={styles.bold}>
						로그아웃
					</Link>
				</div>
			</header>
			<div className={styles.content}>
				<div className={styles.contentMain}>
					<p className={styles.welcome}>
						{getUserDataMemory()?.company} 수선 환영합니다
					</p>
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
								<p className={styles.itemTitle}>[ {itemInfo.itemName} ]</p>

								<img
									src={`${DATA_URL_APP}api/img/imgserve/itemimg/${itemInfo.itemImageUrl}`}
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
											{itemInfo.originItem
												? size.map((n, index) => (
														<td key={index}>
															{itemInfo.originItem[sizeMap.get(n)]}
														</td>
													))
												: size.map((_, index) => <td key={index}>0</td>)}
										</tr>
										<tr>
											<td className={styles.tableHeader}>수선 사이즈</td>
											{size.map((n, index) => (
												<td key={index}>
													{itemInfo.pitItemOrder[sizeMap.get(n)]}
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
										{auctionValue.price || itemInfo.pitPrice}원
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
										<p>이름: {itemInfo.userName}</p>
										<p>
											주소: {itemInfo.userAddr} {itemInfo.userAddrDetail}
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
