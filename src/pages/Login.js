import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import image from '../assets/img/Find Your Fit Pin2.png';
import styles from '../styles/Login.module.css';

function LoginForm() {
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
                        <span>신규 업체이신가요?</span>
                        <span onClick={() => navigate('/SignIn')} className={styles.registerLink}>회원가입</span>
                    </div>
                    <span onClick={() => navigate('/Repair')} className={styles.submitButton}>
                        <div className={styles.submitButtontext}>로그인</div></span>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
