import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Main.module.css';
import logo from '../assets/img/main/logo2.png';
import logo2 from '../assets/img/Find Your Fit Pin2.png';
import appStore from '../assets/img/main/apple.png';
import googlePlay from '../assets/img/main/google.png';
import background from '../assets/img/main/background.png';
import step1 from '../assets/img/main/step1.png';
import step2 from '../assets/img/main/step2.png';
import step3 from '../assets/img/main/step3.png';
import phone1 from '../assets/img/main/phone1.png';
import phone2 from '../assets/img/main/phone2.png';
import phone3 from '../assets/img/main/phone3.png';
import phone4 from '../assets/img/main/phone4.png';
import phone5 from '../assets/img/main/phone5.png';

function Main() {
    return (
        <div className={styles.App}>
            <header className={styles.header}>
                <div>
                    <Link to="/">
                        <img src={logo} className={styles.logo} alt="logo" />
                    </Link>
                </div>
                <div className={styles.right}>
                    <span onClick={() => window.location.href = '/Fitcomment'}>핏 코멘트</span>
                    <span onClick={() => window.location.href = '/Service'}>고객센터</span>
                    <span onClick={() => window.location.href = '/Login'}>로그인</span>
                </div>
            </header>
            <div className={styles.mainScreen} style={{ backgroundImage: `url(${background})` }}>
                <div className={styles.content}>
                    <div className={styles.textContainer}>
                        <h1 style={{ marginTop: '14vh' }}>내가 원하는 옷을</h1>
                        <h1>나만을 위한 수선과 함께</h1>
                        <img src={logo2} alt="logo2" className={styles.logo2} />
                    </div>
                    <div className={styles.buttonsContainer}>
                        <div className={styles.button}>
                            <img src={appStore} alt="App Store" className={styles.buttonImage} />
                            <span>App Store</span>
                        </div>
                        <div className={styles.button}>
                            <img src={googlePlay} alt="Google Play" className={styles.buttonImage2} />
                            <span>Google Play</span>
                        </div>
                    </div>
                    <div className={styles.box}>
                        집 앞 수선집에 직접 가지 않아도 되는 편리한 수선앱 핏핀.<br />
                        당신의 체형에 딱 맞는 옷을 추천해드릴게요.
                    </div>
                </div>
            </div>

            <div className={`${styles.section} ${styles.blackBackground}`}>
                <div className={styles.step}>
                    <img src={step1} alt="Step 1" className={styles.stepImage} />
                    <span>내가 사고 싶은<br />제품을 고르고</span>
                </div>
            </div>
            <div className={`${styles.section} ${styles.whiteBackground}`}>
                <div className={styles.step}>
                    <span className={styles.blackText}>원하는 사이즈로<br />커스텀하면</span>
                    <img src={step2} alt="Step 2" className={styles.stepImage} />
                </div>
            </div>
            <div className={`${styles.section} ${styles.blackBackground}`}>
                <div className={styles.step}>
                    <img src={step3} alt="Step 3" className={styles.stepImage} />
                    <span>문 앞으로<br />배송해드려요</span>
                </div>
            </div>

            <div className={`${styles.section} ${styles.whiteBackground2}`}>
                <div className={styles.phone1}>
                    <div className={styles.phone1_text}>
                        <span className={styles.phone1_title}>클릭 한 번이면<br />수선이 뚝딱<br /><br /></span>
                        내가 선택한 제품을 <span className={styles.phone1_bold}>원하는 핏으로<br /></span>
                        <span className={styles.phone1_bold}>수선</span>할 수 있어요<br />
                        <br />
                        사고 싶은 제품을 선택한 뒤<br />
                        <span className={styles.phone1_bold}>내가 원하는 핏으로 사이즈를 조절해요<br /><br /></span>
                        번거롭게 수선집에 가지 않아도<br />
                        <span className={styles.phone1_bold}>클릭 한 번</span>이면 수선된 옷이<br />
                        집 앞으로 <span className={styles.phone1_bold}>배송</span>돼요
                    </div>
                    <img src={phone1} alt="phone 1" className={styles.phoneImage} />
                </div>
            </div>

            <div className={`${styles.section} ${styles.whiteBackground2}`}>
                <div className={styles.phone1}>
                    <img src={phone2} alt="phone 2" className={styles.phoneImage2} />
                    <div className={styles.phone2_text}>
                        <span className={styles.phone1_title}>메인페이지<br /><br /></span>
                        <span className={styles.phone1_bold}>내 체형, 취향을 모두 만족시킬<br /></span>
                        옷을 핏핀이 추천해드려요
                    </div>
                </div>
            </div>
            <div className={`${styles.section} ${styles.whiteBackground2}`}>
                <div className={styles.phone1}>
                    <div className={styles.phone1_text}>
                        <span className={styles.phone1_title}>사이즈 정보 페이지<br /><br /></span>
                        궁금한 제품의 사진을 찍으면<br />
                        핏핀이 <span className={styles.phone1_bold}>사이즈</span> 정보를 알려드려요
                    </div>
                    <img src={phone3} alt="phone 3" className={styles.phoneImage} />
                </div>
            </div>
            <div className={`${styles.section} ${styles.whiteBackground2}`}>
                <div className={styles.phone1}>
                    <img src={phone4} alt="phone 4" className={styles.phoneImage2} />
                    <div className={styles.phone2_text}>
                        <span className={styles.phone1_title}>핏 코멘트 페이지<br /><br /></span>
                        <span className={styles.phone1_bold}>다른 사람들의 실착 후기가 궁금하다면 ?< br /></span>
                        핏 코멘트에서 확인해요
                    </div>
                </div>
            </div>
            <div className={`${styles.section} ${styles.whiteBackground2}`}>
                <div className={styles.phone1}>
                    <div className={styles.phone1_title2}>
                        <h1 style={{ marginTop: '14vh' }}>내가 원하는 옷을</h1>
                        <h1>나만을 위한 수선과 함께</h1>
                        <img src={logo2} alt="logo2" className={styles.logo2} />
                        <div className={styles.buttonsContainer2}>
                            <div className={styles.button}>
                                <img src={appStore} alt="App Store" className={styles.buttonImage} />
                                <span>App Store</span>
                            </div>
                            <div className={styles.button}>
                                <img src={googlePlay} alt="Google Play" className={styles.buttonImage2} />
                                <span>Google Play</span>
                            </div>
                        </div>
                    </div>
                    <img src={phone5} alt="phone 5" className={styles.phoneImage} />
                </div>
            </div>
            <div className={styles.box2}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        ㈜밀절미<br />
                        사업자 등록번호 : 000-11-22222 |<br />
                        08221 서울시 구로구 경인로 445 ([구]고척동 62-160) 동양미래대학교<br />
                    </div>
                    <div style={{marginTop:'2.5vh', marginLeft: '24vw', textAlign: 'right'}}>
                        TEL. 02-2610-1700 / FAX. 02-2688-5494<br />
                        COPYRIGHT(c) DONGYANG MIRAE UNIVERSITY. ALL RIGHTS RESERVED.
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Main;
