import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import styles from '../styles/Ask.module.css';

function Ask() {
  const navigate = useNavigate();
  const inquiryurl = 'http://localhost:8080/inquiry';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // 폼의 데이터들을 FormData에 추가
    formData.append('name', event.target.name.value);
    formData.append('queryType', event.target.queryType.value);
    formData.append('subject', event.target.subject.value);
    formData.append('queryContent', event.target.queryContent.value);

    // 이미지 파일 첨부
    const fileInput = event.target.attachment.files[0];
    if (fileInput) {
      formData.append('attachment', fileInput);
    }

    try {
      const res = await fetch(inquiryurl, {
        method: 'POST',
        body: formData,
      });

      if (res) {
        alert('문의가 등록되었습니다.');
        navigate('/Service');
      } else {
        alert('문의 등록 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <div className={styles.left}>
          <img src={logo} className={styles.logo} alt="logo" onClick={() => navigate('/')} />
        </div>
        <div className={styles.right}>
          <span onClick={() => navigate('/Fitcomment')}>핏코멘트</span>
          <span onClick={() => navigate('/Service')} className={styles.bold}>고객센터</span>
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
          <form className={styles.form} onSubmit={handleSubmit}>
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
              <button className={styles.cancelButton} type="button" onClick={() => navigate('/')}>취소</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Ask;
