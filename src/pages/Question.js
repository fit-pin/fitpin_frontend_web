import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import styles from '../styles/Question.module.css';

function Question() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const inquiries = [
    {
      category: '교환/반품/환불',
      question: '교환 기간은 어떻게 되나요?',
      answer: '고객님께서 교환 택배 발송 후 상품이 저희 쪽으로 입고되면, 상품 검수 후 이상이 없는 경우 교환이 진행됩니다. (토, 일 및 공휴일 제외) 제품 수령까지는 교환 출고 후 택배사의 사정에 따라 1~3일 정도 소요될 수 있습니다.'
    },
    {
      category: '주문/배송',
      question: '배송 중 상품이 분실 되었을 땐 어떻게 하나요?',
      answer: '배송 과정 중 상품 분실, 손상 혹은 누락이 발생할 경우 고객센터로 연락 주시면 신속하게 처리 도와드리겠습니다. 아래 메일 또는 1:1문의하기 / Q&A 게시판 통하여 남겨주시면 빠른 시일내에 답변드리도록 하겠습니다.'
    },
    {
      category: '주문/배송',
      question: '온라인에서 주문한 제품의 배송추적을 하고 싶어요.',
      answer: '홈페이지 마이페이지 -> 주문내역을 통해 배송 추적이 가능합니다. 비회원 주문 건의 경우 로그인 페이지 하단에서 주문자명과 주문번호를 입력하여 내역을 확인하실 수 있습니다.'
    },
    {
      category: '교환/반품/환불',
      question: '환불기간은 어떻게 되나요?',
      answer: '고객님께서 반품 택배 발송 후 상품이 저희 쪽으로 입고되면, 상품 검수 후 이상이 없는 경우 환불이 진행됩니다. (토, 일 및 공휴일 제외)'
    },
    {
      category: '교환/반품/환불',
      question: '반품 주소를 알고 싶어요.',
      answer: '교환 및 반품 주소'
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
          <h2 className={styles.title}>자주 묻는 질문</h2>
          <p className={styles.description}>
            게시판을 통해<br />
            문의 및 상담이 가능합니다
          </p>
          <button className={styles.inquiryButton} onClick={() => navigate('../Ask')}>1:1 문의하기</button>
          <ul className={styles.links}>
            <li><span onClick={() => navigate('/Service')}>고객 센터</span></li>
            <li><span onClick={() => navigate('/Exchange')}>교환 및 환불</span></li>
          </ul>
        </div>
        <div className={styles.rightContent}>
          {inquiries.map((inquiry, index) => (
            <div className={styles.inquiryBox} key={index}>
              <div className={styles.inquiryText} onClick={() => toggleOpen(index)}>
                <p className={styles.inquiryDate}>{inquiry.category}</p>
                <p className={styles.question}>
                  {inquiry.question}
                </p>
                <span className={styles.arrow}>{openIndex === index ? '▲' : '▼'}</span>
              </div>
              {openIndex === index && <p className={styles.inquiryAnswer}>{inquiry.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Question;
