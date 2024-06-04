import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import styles from '../styles/Service.module.css';

function Service() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(`Page ${pageNumber} clicked`);
  };

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <div className={styles.left}>
          <Link to="/">
            <img src={logo} className={styles.logo} alt="logo" />
          </Link>
        </div>
        <div className={styles.right}>
          <span onClick={() => window.location.href = '/Fitcomment'}>핏코멘트</span>
          {/* 고객센터 */}
          <Link to="/Service" className={styles.bold}>고객센터</Link>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <h2 className={styles.title}>고객센터</h2>
          <p className={styles.description}>
            게시판을 통해<br />
            문의 및 상담이 가능합니다
          </p>
          {/* 1:1 문의하기 */}
          <Link to="../Ask" className={styles.inquiryButton}>1:1 문의하기</Link>
          <ul className={styles.links}>
            <li><Link to="/faq">자주 묻는 질문</Link></li>
            <li><Link to="/exchange-refund">교환 및 환불</Link></li>
          </ul>
        </div>
        <div className={styles.rightContent}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div className={styles.inquiryBox} key={index}>
              <p className={styles.inquiryDate}>2024-04-24 교환 / 환불문의</p>
              <p className={styles.inquiryText}>
                <span style={{ fontWeight: 'bold' }}>문의합니다.</span>
                <span className={styles.inquiryAuthor}>나문희</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.pagination}>
        <span className={styles.pageItem} onClick={() => handlePageClick(currentPage - 1)}>&lt;</span>
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`${styles.pageItem} ${currentPage === index + 1 ? styles.active : ''}`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <span className={styles.pageItem} onClick={() => handlePageClick(currentPage + 1)}>&gt;</span>
      </div>
    </div>
  );
}

export default Service;
