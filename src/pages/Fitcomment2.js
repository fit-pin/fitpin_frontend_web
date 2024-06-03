import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import styles from '../styles/Fitcomment2.module.css';

import image1 from '../assets/img/fitcomment2/top1.jpg';
import image2 from '../assets/img/fitcomment2/top2.jpg';
import image3 from '../assets/img/fitcomment2/top3.jpg';
import image4 from '../assets/img/fitcomment2/top4.jpg';

function FitComment2() {
    return (
        <div className={styles.App}>
            <header className={styles.header}>
                <div className={styles.left}>
                    <img src={logo} className={styles.logo} alt="logo" />
                </div>
                <div className={styles.right}>
                    <Link to="/Fitcomment" className={styles.bold}>핏코멘트</Link>
                    <span onClick={() => window.location.href = '/Service'}>고객센터</span>
                </div>
            </header>
            <div className={styles.content}>
                <div className={styles.topSection}>
                    <h2 className={styles.title}>000님의 핏코멘트</h2>
                    <div className={styles.brandInfo}>
                        <h3>브랜드 | 옷 이름</h3>
                    </div>
                    <div className={styles.imageContainer}>
                        <img src={image1} alt="Product 1" className={styles.productImage} />
                        <span className={styles.arrow}>&gt;</span>
                        <img src={image2} alt="Product 2" className={styles.productImage} />
                        <span className={styles.arrow}>&gt;</span>
                        <img src={image3} alt="Product 3" className={styles.productImage} />
                        <span className={styles.arrow}>&gt;</span>
                        <img src={image4} alt="Product 4" className={styles.productImage} />
                    </div>
                </div>
                <div className={styles.infoSection}>
                    <div className={styles.basicInfo}>
                        <h3>기본정보</h3>
                        <div className={styles.row}>
                            <div className={styles.common}>SIZE</div>
                            <div className={styles.common2}>키</div>
                            <div className={styles.common3}>몸무게</div>
                        </div>
                        <div className={styles.row2}>
                            <div className={styles.common4}>S</div>
                            <div className={styles.common5}>155cm</div>
                            <div className={styles.common6}>50kg</div>
                        </div>
                    </div>
                    <div className={styles.optionInfo}>
                        <h3>선택 옵션</h3>
                        <div className={styles.optionBox}>
                            <div className={styles.option}>사이즈</div>
                            <div className={styles.option2}>조금 작아요</div>
                        </div>
                    </div>
                    <div className={styles.review}>
                        <h3>한줄평</h3>
                        <div className={styles.review2}>제가 산 사이즈는 M이고 평소에는 L을 입는데 이 옷은 M사이즈도 크게 느껴졌다 어쩌구</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FitComment2;
