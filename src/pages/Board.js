import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import styles from '../styles/Board.module.css';
import axios from 'axios';
import { DATA_URL } from '../utils/Constant';

function Board() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};
    const [inquiry, setInquiry] = useState(null); // 문의 데이터를 저장할 상태

    // 문의 상세 정보를 서버에서 가져오는 함수
    useEffect(() => {
        if (id) {
            const fetchInquiryDetail = async () => {
                try {
                    const response = await axios.get(`${DATA_URL}inquiry/${id}`); // id 기반으로 서버에서 데이터 조회
                    setInquiry(response.data); // 조회한 데이터를 상태에 저장
                } catch (error) {
                    console.error('문의 상세 정보를 가져오는데 오류 발생:', error);
                }
            };
            fetchInquiryDetail(); // 컴포넌트 마운트 시 데이터 가져오기
        }
    }, [id]);

    // 이미지 팝업을 여는 함수
    const openImagePopup = () => {
        const imageUrl = `${DATA_URL}inquiryImg/${inquiry.attachmentPath.split('\\').pop()}`;
        const img = new Image();
        img.src = imageUrl;

        // 이미지가 로드된 후에 창 크기 설정
        img.onload = () => {
            const imgWidth = img.width;
            const imgHeight = img.height;

            // 팝업 창의 크기를 이미지 크기와 비슷하게 설정
            const popupWidth = imgWidth > 1000 ? 1000 : imgWidth;
            const popupHeight = imgHeight > 600 ? 600 : imgHeight;

            // 창의 크기와 위치를 설정하여 팝업을 엽니다
            const left = (window.screen.width / 2) - (popupWidth / 2);
            const top = (window.screen.height / 2) - (popupHeight / 2);

            window.open(imageUrl, '_blank', `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes`);
        };

        img.onerror = () => {
            alert('이미지를 불러오는 중 오류가 발생했습니다.');
        };
    };

    // 삭제 요청을 처리하는 함수
    const handleDelete = async () => {
        const password = window.prompt('비밀번호를 입력하세요.');
        if (password) {
            if (window.confirm('정말로 삭제하시겠습니까?')) { // 삭제 확인
                    try {
                        // 삭제 요청을 서버로 전송
                        const response = await axios.delete(`${DATA_URL}inquiry/${id}`, {
                            params: { password },
                        });
                        alert(response.data);
                        navigate('/Service');
                    } catch (error) {
                        if (error.response && error.response.status === 403) {
                            alert('비밀번호가 맞지 않습니다.');
                        } else {
                            console.error('삭제 중 오류 발생:', error);
                            alert('삭제 중 오류가 발생했습니다.');
                    }
                }
            }
        } else {
            alert('비밀번호를 입력해야 삭제할 수 있습니다.');
        }
    };

    // 비밀번호 검증 요청
    const handleEdit = async () => {
        const password = window.prompt('비밀번호를 입력하세요.');
        if (password) {
            try {
                // 비밀번호를 params로 전달
                const response = await axios.post(`${DATA_URL}inquiry/${id}/checkpwd`, null, {
                    params: { password }
                });
                if (response.status === 200) {
                    alert('비밀번호 검증이 완료되었습니다.');
                    navigate('/UpdateAsk', { state: { id, inquiry } });
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    alert('비밀번호가 맞지 않습니다.');
                } else {
                    console.error('비밀번호 검증 중 오류 발생:', error);
                    alert('비밀번호 검증 중 오류가 발생했습니다.');
                }
            }
        } else {
            alert('비밀번호를 입력해야 수정할 수 있습니다.');
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
            {inquiry ? (
                        <form className={styles.form}>
                            <div className={styles.formGroup}>
                                <div className={styles.subject}>{inquiry.subject}</div>
                                <div className={styles.date}>{inquiry.createdAt}</div>
                            </div>
                            <hr className={styles.underline} />
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="name">작성자</label>
                                <div>{inquiry.name}</div>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="queryType">문의유형</label>
                                <div>{inquiry.queryType}</div>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="queryContent">문의 내용</label>
                                <div>{inquiry.queryContent}</div>
                            </div>
                                {/* 이미지가 있을 경우 이미지 보기 버튼 추가 */}
                                {inquiry.attachmentPath && (
                                <div className={styles.formGroup}>
                                    <button className={styles.imageButton} type="button" onClick={openImagePopup}>
                                        이미지 보기
                                    </button>
                                </div>
                            )}
                            <div className={styles.buttonGroup}>
                                <button className={styles.submitButton} type="button" onClick={handleEdit}>수정</button>
                                <button className={styles.cancelButton} type="button" onClick={handleDelete}>삭제</button>
                            </div>
                        </form>
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Board;
