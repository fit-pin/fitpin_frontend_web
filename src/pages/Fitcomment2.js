import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import styles from '../styles/Fitcomment2.module.css';
import { DATA_URL_APP } from '../utils/Constant';
import axios from 'axios';

function FitComment2() {
    const navigate = useNavigate();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [userinfo, setUserinfo] = useState([]);
    const { fitStorageKey } = location.state || {};
    const { userEmail } = location.state || {};

    useEffect(() => {
        const commentInfo = async () => {
            try {
                const response = await axios.get(`${DATA_URL_APP}api/fit_comment/get_fitcomment/${fitStorageKey}`,{});
                const user_res = await axios.get(`${DATA_URL_APP}api/userbodyinfo/${userEmail}`,{})
                setUserinfo(user_res.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fitcomment :', error);
            }
        };
            if(fitStorageKey){
            commentInfo();
        }
    }, [fitStorageKey, userEmail]);

    return (
        <div className={styles.App}>
            <header className={styles.header}>
                <div className={styles.left}>
                    <img src={logo} className={styles.logo} alt="logo" onClick={() => navigate('/')} />
                </div>
                <div className={styles.right}>
                    <span className={styles.bold} onClick={() => navigate('/Fitcomment')}>핏코멘트</span>
                    <span onClick={() => navigate('/Service')}>고객센터</span>
                </div>
            </header>
            <div className={styles.content}>
                <div className={styles.topSection}>
                    <h2 className={styles.title}>{products.userName}님의 핏코멘트</h2>
                    <div className={styles.brandInfo}>
                        <h3>{products.itemBrand}&ensp;|&ensp;{products.itemName}</h3>
                    </div>
                    <div className={styles.imageContainer}>
                        <img src={`${DATA_URL_APP}api/img/imgserve/fitstorageimg/${products.fitStorageImg}`}
                        alt="Product 1"
                        className={styles.productImage} />
                    </div>
                </div>
                <div className={styles.infoSection}>
                    <div className={styles.basicInfo}>
                        <h3>기본정보</h3>
                        <div className={styles.row}>
                            <div className={styles.common}>분류</div>
                            <div className={styles.common2}>키</div>
                            <div className={styles.common3}>몸무게</div>
                        </div>
                        <div className={styles.row2}>
                            <div className={styles.common4}>{products.itemType}</div>
                            <div className={styles.common5}>{userinfo.userHeight}cm</div>
                            <div className={styles.common6}>{userinfo.userWeight}kg</div>
                        </div>
                    </div>
                    <div className={styles.optionInfo}>
                        <h3>선택 옵션</h3>
                        <div className={styles.optionBox}>
                            <div className={styles.option}>SIZE : {products.itemSize}</div>
                            <div className={styles.option2}>{products.option}</div>
                        </div>
                    </div>
                    <div className={styles.review}>
                        <h3>한줄평</h3>
                        <div className={styles.review2}>{products.fitComment}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FitComment2;
