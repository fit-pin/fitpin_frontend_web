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
            </div>
        </div>
      </div>
		</div>
	);
}

export default AuctionDetail;
