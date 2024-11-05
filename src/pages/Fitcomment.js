import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import searchIcon from '../assets/img/search.png';
import styles from '../styles/Fitcomment.module.css';
import { DATA_URL_APP } from '../utils/Constant';
import axios from 'axios';

function Fitcomment() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const commentInfo = async () => {
            try {
                const response = await axios.get(`${DATA_URL_APP}api/fit_comment/get_fitcomment`,{});
                setProducts(response.data);
            } catch (error) {
                console.error('Error fitcomment data:', error);
            }
        };
        commentInfo();
    }, []);

    // 검색기능
    const filteredProducts = products.filter((product) =>
        product.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
        <div className={styles.App}>
        <header className={styles.header}>
            <div>
                <img src={logo} className={styles.logo} alt="logo" onClick={() => navigate('/')} />
            </div>
            <div className={styles.right}>
                <span className={styles.bold} onClick={() => navigate('/Fitcomment')}>핏코멘트</span>
                <span onClick={() => navigate('/Service')}>고객센터</span>
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
                <input type="text" className={styles.searchInput} placeholder="검색어를 입력하세요"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <button className={styles.searchButton}>
                    <img src={searchIcon} className={styles.searchIcon} alt="search" />
                </button>
            </div>
            <div className={styles.productGridContainer}>
                <div className={styles.productGrid}>
                    {filteredProducts.map((product, index) => (
                        <div className={styles.productBox} key={index} onClick={() => navigate('/Fitcomment2',
                        { state : { fitStorageKey : product.fitStorageKey,
                            userEmail : product.userEmail
                        }})}>
                            <div className={styles.imageContainer}>
                                <img
                                    src={`${DATA_URL_APP}api/img/imgserve/fitstorageimg/${product.fitStorageImg}`}
                                    className={styles.productImage}
                                    alt="product"
                                />
                            </div>
                            <div className={styles.productInfo}>
                                <p className={styles.brandName}>{product.itemBrand}</p>
                                <p className={styles.productDetails}>
                                    <span className={styles.productName}>{product.itemName}</span>
                                    <span className={styles.sizeInfo}>{product.itemSize}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
}

export default Fitcomment;
