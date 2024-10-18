import React from 'react';
import styles from '../styles/SignIn.module.css';
import searchIcon from '../assets/img/search.png';
import { useDaumPostcodePopup } from 'react-daum-postcode';


const DaumPost = ({setFulladdr, setZipcode}) => {
    const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(postcodeScriptUrl);

    const handleComplete = (data) => {
        let fulladdr = "";
        let zipcode = data.zonecode;

        if(data.userSelectedType === 'R'){
            fulladdr = data.roadAddress;
        } else {
            fulladdr = data.jibunAddress;
        }

        // 부모 컴포넌트로 전달
        setFulladdr(fulladdr);
        setZipcode(zipcode);

    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };
    return (
        <button type="button" onClick={handleClick} className={styles.searchButton}>
            <img src={searchIcon} className={styles.searchIcon} alt="search" />
        </button>
    );
};

export default DaumPost;