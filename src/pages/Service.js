import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import styles from '../styles/Service.module.css';
import axios from 'axios';
import { DATA_URL } from '../utils/Constant';

function Service() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [inquiries, setInquiries] = useState([]);
  const [totalPages, setTotalPages] = useState(1);  
  
  useEffect(() => {
    // URL에서 쿼리 파라미터로 페이지 번호를 받아오기
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page') ? parseInt(queryParams.get('page')) : 1;

    // 상태를 업데이트하여 현재 페이지를 설정
    setCurrentPage(page);
    fetchInquiries(page);
  }, [location.search]);

  // 서버에서 페이징된 데이터를 가져오는 함수
  const fetchInquiries = async (page) => {
    try {
      const response = await axios.get(`${DATA_URL}inquiry`, {
        params: { page: page - 1, size: 5 }  // 서버에 요청하는 페이지 번호와 크기 설정
      });
    const inquiriesData = response.data._embedded ? response.data._embedded.inquiryEntityList : [];
    setInquiries(inquiriesData);
    setTotalPages(response.data.page.totalPages);
    } catch (error) {
      console.error('데이터를 가져오는데 오류발생:', error);
    }
  };

  const handlePageClick = (pageNumber) => {
    navigate(`/Service?page=${pageNumber}`);
    setCurrentPage(pageNumber);
  };

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
            <li><span onClick={() => navigate('/Question')}>자주 묻는 질문</span></li>
            <li><span onClick={() => navigate('/Exchange')}>교환 및 환불</span></li>
          </ul>
        </div>
        <div className={styles.rightContent}>
          {inquiries.length > 0 ? (
            inquiries.map((inquiry, index) => (
              <div className={styles.inquiryBox} key={index} style={{ cursor: 'pointer' }}
              onClick={() => navigate('/Board', { state: { id: inquiry.id, page: currentPage } })}>
                <p className={styles.inquiryDate}>{inquiry.createdAt} {inquiry.queryType}</p>
                <p className={styles.inquiryText}>
                  <span style={{ fontWeight: 'bold' }}>{inquiry.subject}</span>
                  <span className={styles.inquiryAuthor}>{inquiry.name}</span>
                </p>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div className={styles.pagination}>
        <span
          className={styles.pageItem}
          onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
        >
          &lt;
        </span>
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`${styles.pageItem} ${currentPage === index + 1 ? styles.active : ''}`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <span
          className={styles.pageItem}
          onClick={() => handlePageClick(Math.min(totalPages, currentPage + 1))}
        >
          &gt;
        </span>
      </div>
    </div>
  );
}

export default Service;
