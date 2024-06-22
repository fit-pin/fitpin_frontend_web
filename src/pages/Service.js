import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import styles from '../styles/Service.module.css';

function Service() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(`Page ${pageNumber} clicked`);
  };

  const inquiries = [
    {
      date: '2024-04-24',
      category: '교환문의',
      question: '교환 요청합니다.',
      author: '오주희'
    },
    {
      date: '2024-04-23',
      category: '배송문의',
      question: '배송 상태가 궁금합니다.',
      author: '임유나'
    },
    {
      date: '2024-04-22',
      category: '상품문의',
      question: '이 상품 재고 있나요?',
      author: '김효진'
    },
    {
      date: '2024-04-21',
      category: '결제문의',
      question: '결제가 안 돼요.',
      author: '서민지'
    },
    {
      date: '2024-04-20',
      category: '기타문의',
      question: '기타문의 드립니다.',
      author: '최수진'
    }
  ];

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <div className={styles.left}>
          <img src={logo} className={styles.logo} alt="logo" onClick={() => navigate('/')} />
        </div>
        <div className={styles.right}>
          <span onClick={() => navigate('/Fitcomment')}>핏코멘트</span>
          <span className={styles.bold} onClick={() => navigate('/Service')}>고객센터</span>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <h2 className={styles.title}>고객센터</h2>
          <p className={styles.description}>
            게시판을 통해<br />
            문의 및 상담이 가능합니다
          </p>
          <button className={styles.inquiryButton} onClick={() => navigate('../Ask')}>1:1 문의하기</button>
          <ul className={styles.links}>
            <li><span onClick={() => navigate('/faq')}>자주 묻는 질문</span></li>
            <li><span onClick={() => navigate('/exchange-refund')}>교환 및 환불</span></li>
          </ul>
        </div>
        <div className={styles.rightContent}>
          {inquiries.map((inquiry, index) => (
            <div className={styles.inquiryBox} key={index}>
              <p className={styles.inquiryDate}>{inquiry.date} {inquiry.category}</p>
              <p className={styles.inquiryText}>
                <span style={{ fontWeight: 'bold' }}>{inquiry.question}</span>
                <span className={styles.inquiryAuthor}>{inquiry.author}</span>
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
