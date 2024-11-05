import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/title.png';
import styles from '../styles/AuctionDetail.module.css';

function AuctionDetail() {
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
					<span onClick={() => (window.location.href = '/')}>로그아웃</span>
				</div>
			</header>
			<div className={styles.content}>
				<div className={styles.contentMain}>
					<p className={styles.welcome}>00수선 환영합니다</p>
					<div className={styles.contentView}>
						<p className={styles.title}>경매 상품</p>
						<div className={styles.auctionMain}>
							{/* 왼쪽 */}
							<div className={styles.auctionImage}>
								<p>제품명</p>
								<image></image>
								<p>#제품정보</p>
								<table>
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
											<td>원본 사이즈</td>
											<td>60</td>
											<td>70</td>
											<td>80</td>
											<td>90</td>
										</tr>
										<tr>
											<td>수선해야 될 사이즈</td>
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
								<div>
									<p>현재 최저가</p>
								</div>
								<div>
									<p>현재최저가</p>
									<p>2000원</p>
								</div>
								<div></div>
								<div>
									<input type="text"></input>
									<input type="button"></input>
								</div>
								<div>
									<p>이름: </p>
									<p>주소: </p>
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
