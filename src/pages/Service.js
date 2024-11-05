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
  const username = localStorage.getItem('username');  
  
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
      // 각 문의에 대해 댓글 상태 확인
      const inquiriesWithComments = await Promise.all(
        inquiriesData.map(async (inquiry) => {
          try {
            const commentsResponse = await axios.get(`${DATA_URL}inquiry/${inquiry.id}/comments`);
            inquiry.hasComments = commentsResponse.data.length > 0; // 댓글이 있으면 true, 없으면 false
          } catch (error) {
            console.error('댓글 상태를 확인하는 중 오류 발생:', error);
            inquiry.hasComments = false;
          }
          return inquiry;
        })
      );

      setInquiries(inquiriesWithComments);
      setTotalPages(response.data.page.totalPages);
    } catch (error) {
      console.error('데이터를 가져오는데 오류발생:', error);
    }
  };

  const handlePrivateInquiryClick = async (id) => {

    if (username === 'admin') {
      navigate('/Board', { state: { id: id, page: currentPage } });
    } else {
      const password = prompt("비밀번호를 입력하세요.");
      if (password) {
        try {
          const response = await axios.post(`${DATA_URL}inquiry/${id}/checkpwd`, null, {
            params: { password }
          });
          if (response.status === 200) {
            alert('비밀번호 검증이 완료되었습니다.');
            navigate('/Board', { state: { id: id, page: currentPage } });
          }
        } catch (error) {
          alert('비밀번호가 맞지 않습니다.');
        }
      } else {
        alert('비밀번호를 입력해야 조회 가능합니다.');
      }
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
              onClick={() =>{
                if (inquiry.privacy === 'private') {
                  handlePrivateInquiryClick(inquiry.id);
                } else {
                  navigate('/Board', { state: { id: inquiry.id, page: currentPage } });
                }
              }}>
                <p className={styles.inquiryDate}>{inquiry.createdAt} {inquiry.queryType}
                  <span className={inquiry.hasComments ? styles.inquiryYes : styles.inquiryNo}>
                    {inquiry.hasComments ? '답변완료' : '답변대기'}
                  </span>
                </p>
                <p className={styles.inquiryText}>
                  <span style={{ fontWeight: 'bold' }}>
                    {inquiry.privacy === 'private' && username !== 'admin' ? '비공개 게시물' : inquiry.subject}
                  </span>
                  <span className={styles.inquiryAuthor}>
                    {inquiry.privacy === 'private' && username !== 'admin' ? '비공개' : inquiry.name}
                  </span>
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
