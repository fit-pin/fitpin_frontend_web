import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import styles from '../styles/Ask.module.css';

function Ask() {
  const navigate = useNavigate();
  const inquiryurl = 'http://localhost:8080/inquiry';

  // 첨부된 파일이 이미지인지 확인하는 상태
  const [isFileValid, setIsFileValid] = useState(true);

  // 비공개 선택 상태 및 비밀번호 입력 상태 관리
  const [isPrivate, setIsPrivate] = useState(true); // 비공개 여부
  const [password, setPassword] = useState('');

  // 개별 필드의 오류 상태를 관리
  const [errors, setErrors] = useState({
    name: '',
    queryType: '',
    subject: '',
    queryContent: '',
    attachment: '',
    password: '',
  });

  const errorChange = (event) => {
    const { id, value } = event.target;

    // 값이 입력될 때 해당 필드의 오류 메시지 초기화
    if (value.trim() !== '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: '', // 오류 메시지를 빈 문자열로 설정
      }));
    }
  };
  // 이미지 파일 유효성 검사 함수
  const imgFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // 파일 확장자가 이미지가 아니면 오류 메시지 출력
      if (!file.type.startsWith('image/')) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          attachment: '이미지 파일만 첨부할 수 있습니다.',
        }));
        setIsFileValid(false); // 파일 유효성 상태를 false로 설정
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          attachment: '', // 오류 메시지 초기화
        }));
        setIsFileValid(true); // 파일 유효성 상태를 true로 설정
      }
    }
  };

  // 사용자의 게시글을 공개할지 비공개할지(임의로 수정도 못하게)
  const PrivacyChange = (event) => {
    setIsPrivate(event.target.value);
  };

  // 비밀번호 입력 시 호출
  const PasswordChange = (event) => {
    const input = event.target.value;
    const numericInput = input.replace(/[^0-9]/g, '');

    // 비밀번호는 4자리로 제한
    if (numericInput.length <= 4) {
      setPassword(numericInput);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: '', // 비밀번호 입력 시 오류 메시지 초기화
      }));
    }
  };

  const dataSubmit = async (event) => {
    event.preventDefault();

    // 폼의 데이터들을 FormData에 추가
    const name = event.target.name.value.trim();
    const queryType = event.target.queryType.value;
    const subject = event.target.subject.value.trim();
    const queryContent = event.target.queryContent.value.trim();

    // 유효성 검사
    const newErrors = {};
    if (!name) { newErrors.name = '이름을 입력해주세요.'; }
    if (!queryType) { newErrors.queryType = '문의 유형을 선택해주세요.'; }
    if (!subject) { newErrors.subject = '제목을 입력해주세요.'; }
    if (!queryContent) { newErrors.queryContent = '문의 내용을 입력해주세요.'; }
    if (isPrivate && password.length !== 4) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }

    // 이미지 파일 유효성 검사 실패 시 폼 제출 중단
    if (!isFileValid) {
      newErrors.attachment = '이미지 파일을 첨부해주세요.';
    }

    // 에러가 있으면 상태 업데이트하고 폼 제출 중단
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 에러가 없으면 오류 메시지를 초기화
    setErrors({});

    const formData = new FormData();
    formData.append('name', name);
    formData.append('queryType', queryType);
    formData.append('subject', subject);
    formData.append('queryContent', queryContent);
    formData.append('privacy', isPrivate);
    formData.append('password', password);

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

      if (res.ok) {
        alert('문의가 등록되었습니다.');
        navigate('/Service');
      } else {
        alert('문의 등록 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error 발생 :', error);
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
          <form className={styles.form} onSubmit={dataSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="name">이름</label>
              <input className={styles.inputname} type="text" id="name" placeholder="이름을 입력하세요." onChange={errorChange}/>
              <input className={styles.privateBtn} type="radio" id="public" name="privacy" value="public" onChange={PrivacyChange} defaultChecked />
              <label htmlFor="public">공개</label>
              <input className={styles.privateBtn} type="radio" id="private" name="privacy" value="private" onChange={PrivacyChange} />
              <label htmlFor="private">비공개</label>
              {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
            </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="password">비밀번호 (4자리)</label>
                <input className={styles.inputname} type="password" id="password" placeholder="비밀번호를 입력하세요."
                value={password} onChange={PasswordChange} />
                {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
              </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="queryType">문의유형</label>
              <select className={styles.input} id="queryType"  onChange={errorChange}>
                <option value="">문의 유형 선택</option>
                <option value="배송">배송</option>
                <option value="주문/결제">주문/결제</option>
                <option value="취소/교환/환불">취소/교환/환불</option>
                <option value="회원정보">회원정보</option>
                <option value="상품확인">상품확인</option>
                <option value="서비스">서비스</option>
                <option value="수선문의">수선문의</option>
                <option value="기타">기타</option>
              </select>
              {errors.queryType && <p className={styles.errorMessage}>{errors.queryType}</p>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="subject">제목</label>
              <input className={styles.input} type="text" id="subject" placeholder="제목을 입력하세요." onChange={errorChange}/>
              {errors.subject && <p className={styles.errorMessage}>{errors.subject}</p>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="queryContent">문의 내용</label>
              <textarea className={styles.textarea} id="queryContent" placeholder="문의할 내용을 입력하세요." onChange={errorChange}></textarea>
              {errors.queryContent && <p className={styles.errorMessage}>{errors.queryContent}</p>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="attachment">사진 첨부</label>
              <input className={styles.fileInput} type="file" id="attachment" accept="image/*" onChange={imgFileChange}/>
              {errors.attachment && <p className={styles.errorMessage}>{errors.attachment}</p>}
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
