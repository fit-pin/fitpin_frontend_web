import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import logo from '../assets/img/title.png';
import styles from '../styles/RepairDetail.module.css';
import { DATA_URL, DATA_URL_APP } from '../utils/Constant';
import { getUserDataMemory, setUserDataMemory } from '../utils/AppData';
import { allUnSubscribe } from '../utils/WebSocketConnect';
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

function RepairDetail() {
	const token = localStorage.getItem('accessToken');
	const repairId = useSearchParams()[0].get('repairId');

	/** @type {[UserData | undefined, React.Dispatch<React.SetStateAction<UserData>>]} */
	const [userData, setUserData] = useState(getUserDataMemory());

	/** @type {[RepairRecvType, React.Dispatch<React.SetStateAction<RepairRecvType>>]} */
	const [actionData, setActionData] = useState(useLocation().state);

	/** @type {[ItemState, React.Dispatch<React.SetStateAction<ItemState>>]} */
	const [item, setItem] = useState();

	/** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
	const [isErrer, setIsError] = useState(false);

	// 유저 정보 요청
	useEffect(() => {
		// 모든 구독 없에고 들감

		allUnSubscribe();
		if (!token || !repairId) {
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

	// 유저 정보 요청
	useEffect(() => {
		// 모든 구독 없에고 들감

		allUnSubscribe();
		if (!token || !repairId) {
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
		if (!actionData?.itemName || !repairId) {
			return;
		}

		axios
			.get(`${DATA_URL_APP}api/item-info/${actionData?.itemKey}`)
			.then((res) => {
				/** @type {[]} */
				let sizes;
				if (actionData?.pitItemOrder.itemType === '상의') {
					sizes = res.data.itemTopInfo;
				} else {
					sizes = res.data.itemBottomInfo;
				}

				const itemImgName = res.data.itemImgName[0];

				for (const size of sizes) {
					if (size.itemSize === actionData?.itemSize) {
						setItem(size);
						if (!actionData.itemImageUrl) {
							setActionData((prev) => {
								return {
									...prev,
									itemImageUrl: itemImgName,
								};
							});
						}

						break;
					}
				}
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [actionData?.itemName]);

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

				const fiter = data.find((item) => item.repairId === Number(repairId));

				if (!fiter) {
					throw new Error('찾을 수 없음');
				}
				setActionData((prev) => {
					return {
						...prev,
						...fiter,
					};
				});
			})
			.catch((e) => {
				console.error(`이전 경매 불러오기 실패: ${e}`);
				setIsError(true);
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData?.company]);

	let size;
	if (actionData?.pitItemOrder?.itemType === '상의') {
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

	if (!token || repairId === null) {
		return <ErrorPage messge="유효하지 않는 접근입니다" navigate="/" />;
	}

	if (isErrer) {
		return (
			<ErrorPage
				messge="서버에서 값을 불러오던 도중 오류가 발생했습니다"
				navigate="/"
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
					<Link to="/" className={styles.bold}>
						로그아웃
					</Link>
				</div>
			</header>
			<div className={styles.content}>
				<div className={styles.contentMain}>
					<p className={styles.welcome}>{userData?.company} 수선 환영합니다</p>
					<div className={styles.contentView}>
						<p className={styles.title}>수선 상품</p>

						<div className={styles.auctionMain}>
							{/* 왼쪽 */}
							<div className={styles.auctionImage}>
								<p className={styles.itemTitle}>[ {actionData?.itemName} ]</p>

								<img
									src={`${DATA_URL_APP}api/img/imgserve/itemimg/${actionData?.itemImageUrl}`}
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
													{actionData?.pitItemOrder?.[sizeMap.get(n)]}
												</td>
											))}
										</tr>
									</tbody>
								</table>
							</div>

							{/* 오른쪽 */}
							<div className={styles.auctionInfo}>
								<div className={styles.auctionCulDiv}>
									<p>수선 가격: </p>
									<p className={styles.auctionCulPrice}>
										{actionData?.price || actionData?.pitPrice}원
									</p>
								</div>
								<div className={styles.auctionUserView}>
									<p className={styles.itemInfoTitle}>#고객정보</p>
									<div className={styles.auctionUserValue}>
										<p>이름: {actionData?.userName}</p>
										<p>
											주소: {actionData?.userAddr} {actionData?.userAddrDetail}
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

export default RepairDetail;
