import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import styles from '../styles/Management.module.css';

function Fitcomment() {
    const navigate = useNavigate();
    const [isNumber, setisNumber] = useState('');
    const [isMessage, setisMessage] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            ManageClose(e);
        }
    };
    

    const ManageClose = () => {
        if (!isNumber) {
            alert("경매번호를 입력하세요.");
            return;
        }
        
        const confirmClose = window.confirm("경매를 종료하시겠습니까?");
        if (confirmClose) {
            setisMessage(`${isNumber}번의 경매가 종료되었습니다`);
            setisNumber('');
        }
    };
    
    return (
        <div className={styles.App}>
        <header className={styles.header}>
            <div>
                <img src={logo} className={styles.logo} alt="logo" onClick={() => navigate('/')} />
            </div>
            <div className={styles.right}>
                <span className={styles.bold} onClick={() => navigate('/Management')}>경매관리</span>
                <span onClick={() => navigate('/Fitcomment')}>핏코멘트</span>
                <span onClick={() => navigate('/Service')}>고객센터</span>
            </div>
        </header>
        <div className={styles.content}>
            <div className={styles.leftContent}>
                <h2 className={styles.title}>경매관리</h2>
                <p className={styles.description}>
                    종료하고 싶은 경매번호를 입력하세요.
                </p>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.form} onKeyDown={handleKeyDown}>
                    <div className={styles.formGroup}>
                        <input className={styles.inputname} type="text" id="name" placeholder="경매번호를 입력하세요."
                        value={isNumber} onChange={(e) => setisNumber(e.target.value)}/>
                        <button className={styles.submitButton} type="button" onClick={ManageClose}>종료하기</button>
                    </div>
                    {isMessage && (
                        <div className={styles.closedMessage}>{isMessage}</div>
                    )}
                </div>
            </div>
        </div>
    </div>
    );
}

export default Fitcomment;
