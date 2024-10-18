import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import image from '../assets/img/Find Your Fit Pin2.png';
import styles from '../styles/Login.module.css';
import axios from 'axios';
import { DATA_URL } from '../utils/Constant';


function LoginForm() {
    const navigate = useNavigate();

    //유효성검사
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        username:'',
        password:'',
    });

    // 유효성 검사 함수
    const validateForm = () => {
        let newErrors = {};
        if (!form.username) newErrors.username = "아이디를 입력하세요.";
        if (!form.password) newErrors.password = "비밀번호를 입력하세요";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 각 필드가 변경될 때 해당 오류를 제거하는 핸들러
    const handleInputChange = (field, value) => {
        setForm({ ...form, [field]: value });

        // 입력 시 해당 필드에 대한 오류 제거
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    // 로그인
    const login = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post(`${DATA_URL}login`, form, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true // CORS
            }).then(res => {
                console.log('로그인 성공:', res.headers);
                // AccessToken과 RefreshToken 저장
                localStorage.setItem('accessToken', res.data.accessToken);
                localStorage.setItem('refreshToken', res.data.refreshToken);
                navigate('/Repair');
            }).catch(err => {
                console.log('로그인 실패:', err);
                setErrors({ general: "로그인 실패" });
            });
        }
    };

    // 자동 로그인 처리: 페이지 로드 시 Refresh Token을 이용해 Access Token 재발급 시도
    useEffect(() => {
        const refresh = localStorage.getItem('refreshToken');
        if (refresh) {
            axios.post(`${DATA_URL}reissue`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true // 쿠키 사용
            }).then(res => {
                console.log('토큰 재발급 성공:', res.data);
                localStorage.setItem('accessToken', res.data.accessToken);
                navigate('/Repair');
            }).catch(err => {
                console.log('토큰 재발급 실패:', err);
            });
        }
    }, [navigate]);

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
                        <input type="text" placeholder="ID"
                        value={form.username} onChange={e => handleInputChange('username', e.target.value)} />
                        {errors.username && <p className={styles.error}>{errors.username}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label>비밀번호</label>
                        <input type="password" placeholder="PASSWORD"
                        value={form.password} onChange={e => handleInputChange('password', e.target.value)} />
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </div>
                    <div className={styles.linkGroup}>
                        <span>신규 업체이신가요?</span>
                        <span onClick={() => navigate('/SignIn')} className={styles.registerLink}>회원가입</span>
                    </div>
                    <span className={styles.submitButton}>
                        <div className={styles.submitButtontext} onClick={login}>로그인</div></span>
                        {errors.general && <p className={styles.Loginerror}>{errors.general}</p>}
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
