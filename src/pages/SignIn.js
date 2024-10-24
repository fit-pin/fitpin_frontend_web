import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import searchIcon from '../assets/img/search.png';
import styles from '../styles/SignIn.module.css';

function SignIn() {
    const navigate = useNavigate();
    return (
        <div className={styles.App}>
            <header className={styles.header}>
                <div>
                    <span onClick={() => navigate('/')}>
                        <img src={logo} className={styles.logo} alt="logo" />
                    </span>
                </div>
                <div className={styles.right}>
                    <span onClick={() => navigate('/FitComment')}>핏 코멘트</span>
                    <span onClick={() => navigate('/Service')}>고객센터</span>
                    <span onClick={() => navigate('/Login')} className={styles.bold}>수선 업체 로그인</span>
                </div>
            </header>
            <div className={styles.content}>
                <h2 className={styles.title}>회원가입</h2>
                <div className={styles.loginPromptContainer}>
                    <p className={styles.loginPrompt}>
                        이미 계정이 있나요? <span onClick={() => navigate('/Login')} className={styles.loginLink}>로그인</span>
                    </p>
                </div>
                <hr className={styles.underline} />
                <form className={styles.form}>
                    <h3 className={styles.sectionTitle}>기본정보</h3>
                    <div className={styles.inputGroup}>
                        <label>업장명</label>
                        <input type="text" placeholder="입력하세요" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>아이디</label>
                        <input type="text" placeholder="입력하세요" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>비밀번호</label>
                        <input type="password" placeholder="입력하세요" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>업장주소</label>
                        <div className={styles.addressSearch}>
                            <input type="text" placeholder="우편번호" />
                            <button type="button" className={styles.searchButton}>
                                <img src={searchIcon} className={styles.searchIcon} alt="search" />
                            </button>
                        </div>
                        <input type="text" placeholder="기본주소" />
                        <input type="text" placeholder="나머지주소" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>업장전화</label>
                        <div className={styles.phoneInput}>
                            <select className={styles.selectbox}>
                                <option value="02">02</option>
                                <option value="031">031</option>
                            </select>
                            <span className={styles.hyphen}>-</span>
                            <input type="text" placeholder="입력하세요" />
                            <span className={styles.hyphen}>-</span>
                            <input type="text" placeholder="입력하세요" />
                        </div>
                    </div>
                    <button type="submit" className={styles.submitButton}>가입하기</button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
