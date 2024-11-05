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
    const [comments, setComments] = useState([]); // 댓글 목록 상태
    const [newComment, setNewComment] = useState(''); // 새 댓글 입력 상태
    const username = localStorage.getItem('username');

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

            const fetchComments = async () => {
                try {
                    const response = await axios.get(`${DATA_URL}inquiry/${id}/comments`);
                    setComments(response.data);
                } catch (error) {
                    console.error('댓글 목록을 가져오는데 오류 발생:', error);
                }
            };
            fetchComments();
            fetchInquiryDetail();
        }
    }, [id]);

    // 댓글 제출 함수
    const handleCommentSubmit = async () => {
        if (newComment.trim() === '') {
            alert('댓글을 입력하세요.');
            return;
        }
        try {
            await axios.post(`${DATA_URL}inquiry/${id}/comments`, newComment, {
                headers: { 'Content-Type': 'text/plain' },
            });
            setNewComment(''); // 댓글 입력 필드 초기화
            // 댓글 목록 갱신
            const updatedComments = await axios.get(`${DATA_URL}inquiry/${id}/comments`);
            setComments(updatedComments.data);
        } catch (error) {
            console.error('댓글 등록 중 오류 발생:', error);
            alert('댓글 등록 중 오류가 발생했습니다.');
        }
    };

    // 비밀번호 검증
    const checkPassword = async (id, password) => {
        try {
            const response = await axios.post(`${DATA_URL}inquiry/${id}/checkpwd`, null, {
                params: { password },
            });
            return response.status === 200;
        } catch (error) {
            if (error.response && error.response.status === 403) {
                alert('비밀번호가 맞지 않습니다.');
            } else {
                console.error('비밀번호 검증 중 오류 발생:', error);
                alert('비밀번호 검증 중 오류가 발생했습니다.');
            }
            return false;
        }
    };

    // 삭제
    const handleDelete = async () => {
        if (username === 'admin') {
            // admin인 경우 비밀번호 없이 삭제 가능
            if (window.confirm('정말로 삭제하시겠습니까?')) {
                try {
                    const response = await axios.delete(`${DATA_URL}inquiry/${id}`);
                    alert(response.data);
                    navigate('/Service');
                } catch (error) {
                    console.error('삭제 중 오류 발생:', error);
                    alert('삭제 중 오류가 발생했습니다.');
                }
            }
        } else {
            // 일반 사용자는 비밀번호 입력
            const password = window.prompt('비밀번호를 입력하세요.');
            if (password) {
                try {
                    const isPasswordCorrect = await checkPassword(id, password); // 비밀번호 검증
                    if (isPasswordCorrect && window.confirm('정말로 삭제하시겠습니까?')) {
                        const response = await axios.delete(`${DATA_URL}inquiry/${id}`);
                        alert(response.data);
                        navigate('/Service');
                    }
                } catch (error) {
                    console.error('삭제 중 오류 발생:', error);
                    alert('삭제 중 오류가 발생했습니다.');
                }
            } else {
                alert('비밀번호를 입력해야 삭제할 수 있습니다.');
            }
        }
    };

    // 수정
    const handleEdit = async () => {
        if (username === 'admin') {
            // admin인 경우 비밀번호 없이 수정 가능
            navigate('/UpdateAsk', { state: { id, inquiry } });
        } else {
            // 일반 사용자는 비밀번호 입력
            const password = window.prompt('비밀번호를 입력하세요.');
            if (password) {
                const isPasswordCorrect = await checkPassword(id, password);
                if (isPasswordCorrect) {
                    alert('비밀번호 검증이 완료되었습니다.');
                    navigate('/UpdateAsk', { state: { id, inquiry } });
                }
            } else {
                alert('비밀번호를 입력해야 수정할 수 있습니다.');
            }
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
                                <div className={styles.label} htmlFor="name">작성자</div>
                                <div>{inquiry.name}</div>
                            </div>
                            <div className={styles.formGroup}>
                                <div className={styles.label} htmlFor="queryType">문의유형</div>
                                <div>{inquiry.queryType}</div>
                            </div>
                            <div className={styles.formGroup}>
                                <div className={styles.label} htmlFor="queryContent">문의 내용</div>
                                <div>{inquiry.queryContent}</div>
                            </div>
                                {/* 이미지가 있을 경우 이미지 보여줌 */}
                                {inquiry.attachmentPath && (
                                <div className={styles.formGroup}>
                                    <img
                                        src={`${DATA_URL}inquiryImg/${inquiry.attachmentPath.split('/').pop()}`}
                                        alt="첨부 이미지"
                                        className={styles.image}
                                    />
                                </div>
                            )}
                            <div className={styles.buttonGroup}>
                                <button className={styles.submitButton} type="button" onClick={handleEdit}>수정</button>
                                <button className={styles.cancelButton} type="button" onClick={handleDelete}>삭제</button>
                            </div>
                                {/* 댓글 입력과 목록 표시 */}
                                <div className={styles.formGroup}>
                                <hr className={styles.commentunderline} />
                                <h3>관리자 답변</h3>
                                <div className={styles.commentList}>
                                    {comments.map((comment) => (
                                        <div key={comment.id} className={styles.comment}>
                                            <div>{comment.content}</div>
                                            <div className={styles.commentdate}>{comment.createdAt}</div>
                                        </div>
                                    ))}
                                </div>
                                {/* admin인 경우에만 댓글 입력 필드 표시 */}
                                {username === 'admin' && (
                                    <div className={styles.commentformGroup}>
                                        <textarea
                                            className={styles.commentInput}
                                            placeholder="댓글을 입력하세요."
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                        />
                                        <button className={styles.commentButton} type="button" onClick={handleCommentSubmit}>
                                            댓글 등록
                                        </button>
                                    </div>
                                )}
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
