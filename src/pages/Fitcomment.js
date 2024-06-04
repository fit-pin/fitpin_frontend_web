import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import image from '../assets/img/product.png';
import searchIcon from '../assets/img/search.png';
import styles from '../styles/Fitcomment.module.css';

function Fitcomment() {
    return (
        <div className={styles.App}>
            <header className={styles.header}>
                <div>
                    <Link to="/">
                        <img src={logo} className={styles.logo} alt="logo" />
                    </Link>
                </div>
                <div className={styles.right}>
                    <Link to="/Fitcomment" className={styles.bold}>핏코멘트</Link>
                    <span onClick={() => window.location.href = '/Service'}>고객센터</span>
                </div>
            </header>
            <div className={styles.content}>
                <div className={styles.leftContent}>
                    <h2 className={styles.title}>핏 코멘트</h2>
                    <p className={styles.description}>
                        당신이 궁금한 옷을 검색해보세요!
                    </p>
                </div>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="검색어를 입력하세요"
                    />
                    <button className={styles.searchButton}>
                        <img src={searchIcon} className={styles.searchIcon} alt="search" />
                    </button>
                </div>
                <div className={styles.productGrid}>
                    {[1, 2, 3, 4].map((_, index) => (
                        <div className={styles.productBox} key={index}>
                            <div className={styles.imageContainer}>
                                <Link to="/Fitcomment2">
                                    <img src={image} className={styles.productImage} alt="product" />
                                </Link>
                            </div>
                            <div className={styles.productInfo}>
                                <p className={styles.brandName}>브랜드 이름</p>
                                <p className={styles.productDetails}>
                                    <span className={styles.productName}>옷 이름</span>
                                    <span className={styles.sizeInfo}>사이즈 기재</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Fitcomment;
