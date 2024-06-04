import React from 'react';
import logo from '../assets/img/Find Your Fit Pin.png';
import styles from '../styles/Ask.module.css';
import { Link } from 'react-router-dom';

function Ask() {
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
          <span onClick={() => window.location.href = '/Service'} className={styles.bold}>고객센터</span>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <h2 className={styles.title}>1:1 문의하기</h2>
          <p className={styles.description}>
            제품 사용, 오염, 전용 박스 손상, 라벨 제거,<br />
            사은품 및 부속 사용/분실 시, 교환/환불이 불가능 합니다.
          </p>
        </div>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="name">이름</label>
              <input className={styles.input} type="text" id="name" placeholder="입력하세요." />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="queryType">문의유형</label>
              <input className={styles.input} type="text" id="queryType" placeholder="입력하세요." />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="subject">제목</label>
              <input className={styles.input} type="text" id="subject" placeholder="입력하세요." />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="queryContent">문의 내용</label>
              <textarea className={styles.textarea} id="queryContent" placeholder="입력하세요."></textarea>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="attachment">사진 첨부</label>
              <input className={styles.fileInput} type="file" id="attachment" />
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.submitButton} type="submit">등록</button>
              <button className={styles.cancelButton} type="button" onClick={() => window.location.href = '/'}>취소</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Ask;
