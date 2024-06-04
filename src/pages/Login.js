import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import image from '../assets/img/Find Your Fit Pin2.png';
import styles from '../styles/Login.module.css';

function LoginForm() {
    return (
        <div className={styles.App}>
            <header className={styles.header}>
                <div>
                    <Link to="/">
                        <img src={logo} className={styles.logo} alt="logo" />
                    </Link>
                </div>
                <div className={styles.right}>
                    <span onClick={() => window.location.href = '/FitComment'}>핏 코멘트</span>
                    <span onClick={() => window.location.href = '/Service'}>고객센터</span>
                    <Link to="/Login" className={styles.bold}>로그인</Link>
                </div>
            </header>
            <div className={styles.content}>
                <img src={image} className={styles.titleImage} alt="Find Your Fit Pin" />
                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>아이디</label>
                        <input type="text" placeholder="ID" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>비밀번호</label>
                        <input type="password" placeholder="PASSWORD" />
                    </div>
                    <div className={styles.linkGroup}>
                        <span>신규 사용자이신가요?</span>
                        <Link to="/SignIn" className={styles.registerLink}>회원가입</Link>
                    </div>
                    <button type="submit" className={styles.submitButton}>로그인</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
