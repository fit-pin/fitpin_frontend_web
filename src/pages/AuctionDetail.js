import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/img/title.png';
import styles from '../styles/AuctionDetail.module.css';
import { DATA_URL_APP } from '../utils/Constant';
import { getUserDataMemory } from '../utils/AppData';

function AuctionDetail() {
	/** @type {RepairRecvType[0]} */
	const location = useLocation().state;

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
					<p className={styles.welcome}>{getUserDataMemory().company} 수선 환영합니다</p>
					<div className={styles.contentView}>
						<p className={styles.title}>경매 상품</p>
						<div className={styles.auctionTimeDiv}>
							<p className={styles.auctionTimeTitle}>마감까지: </p>
							<p className={styles.auctionTime}>01:00:00</p>
						</div>

						<div className={styles.auctionMain}>
							{/* 왼쪽 */}
							<div className={styles.auctionImage}>
								<p className={styles.itemTitle}>[ {location.itemName} ]</p>

								<img
									src={`${DATA_URL_APP}api/img/imgserve/itemimg/${location.itemImageUrl}`}
									className={styles.cloth}
									alt="cloth2"
								/>
								<p className={styles.itemInfoTitle}>#제품정보</p>
								<table className={styles.table}>
									<thead>
										<tr>
											<td>cm</td>
											<td>총장</td>
											<td>어깨너비</td>
											<td>가슴단면</td>
											<td>소매길이</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className={styles.tableHeader}>원본 사이즈</td>
											<td>60</td>
											<td>70</td>
											<td>80</td>
											<td>90</td>
										</tr>
										<tr>
											<td className={styles.tableHeader}>수선 사이즈</td>
											<td>30</td>
											<td>30</td>
											<td>30</td>
											<td>30</td>
										</tr>
									</tbody>
								</table>
							</div>

							{/* 오른쪽 */}
							<div className={styles.auctionInfo}>
								<div className={styles.auctionCulDiv}>
									<p>현재최저가: </p>
									<p className={styles.auctionCulPrice}>2000원</p>
								</div>
								<div className={styles.auctionView}>
									<p className={styles.auctionViewTitle}>#입찰내역</p>
									<div className={styles.auctionViewText}>
										<div>
											<div className={styles.auctionMessageDiv}>
												<p className={styles.auctionMessage}>대충수선</p>
												<p className={styles.auctionMessage}>11:11</p>
											</div>
										</div>
									</div>
								</div>
								<div className={styles.auctionInputDiv}>
									<input
										type="text"
										className={styles.auctionInputPrice}
										placeholder="입찰할 가격(원)"
									/>
									<input
										type="button"
										className={styles.auctionInputBT}
										value="입찰하기"
									/>
								</div>
								<div className={styles.auctionUserView}>
									<p className={styles.itemInfoTitle}>#고객정보</p>
									<div className={styles.auctionUserValue}>
										<p>이름: {location.userName}</p>
										<p>주소: {location.userAddr} {location.userAddrDetail}</p>
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
