import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/title.png';
import cloth1 from '../assets/img/cloth1.png';
import user1 from '../assets/img/user1.png';
import salesgraph from '../assets/img/salesgraph.png';
import styles from '../styles/Repair.module.css';

function Repair() {
    const navigate = useNavigate();

    const requests = [
        { id: 4, name: '#신청자이름', date: '2024-04-11', status: '주문 완료' },
        { id: 3, name: '#신청자이름', date: '2024-04-09', status: '진행중' },
        { id: 2, name: '#신청자이름', date: '2024-04-06', status: '수선 완료' },
        { id: 1, name: '#신청자이름', date: '2024-04-05', status: '수선 완료' },
    ];

    return (
        <div className={styles.App}>
            <header className={styles.header}>
                <div>
                    <img src={logo} className={styles.logo} alt="logo" onClick={() => navigate('/')} />
                </div>
                <div className={styles.right}>
                    <span className={styles.bold} onClick={() => navigate('/Auction')}>경매</span>
                    <span onClick={() => navigate('/')}>로그아웃</span>
                </div>
            </header>
            <div className={styles.content}>
                <div className={styles.leftContent}>
                    <p className={styles.welcome}>00수선 환영합니다</p>
                    <h1 className={styles.auctionTitle}>수선 경매</h1>
                    <div className={styles.auctionSection}>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div className={styles.auctionItem} key={index}>
                                <img src={cloth1} alt={`Cloth ${index + 1}`} className={styles.clothImage} />
                                <p className={styles.actionItemtext}>진행중인 경매 / 100</p>
                                <button className={styles.bidButton} onClick={() => navigate('/AuctionDetail')}>경매하기</button>
                            </div>
                        ))}
                    </div>
                    <p className={styles.requestTitle}>수선 요청</p>
                    <table className={styles.requestTable}>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>신청일</th>
                                <th>진행 상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request.id}>
                                    <td>{request.id}</td>
                                    <td>{request.name}</td>
                                    <td>{request.date}</td>
                                    <td className={styles[request.status === '진행중' ? 'statusInProgress' : request.status === '수선 완료' ? 'statusCompleted' : 'statusDefault']}>
                                        {request.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.rightContent}>
                    <p className={styles.rightTitleText}>상점 소개</p>
                    <div className={styles.storeInfo}>
                        <div className={styles.avatar}>
                            <img src={user1} alt="Store Avatar" />
                        </div>
                        <div className={styles.details}>
                            <h2>#00수선</h2>
                            <p><strong>사업자 등록증</strong>&nbsp;&nbsp;&nbsp; 2222-2222-2222</p>
                            <p><strong>주소</strong>&nbsp;&nbsp;&nbsp; 서울특별시 구로구 경인로 445</p>
                            <p><strong>가입일</strong>&nbsp;&nbsp;&nbsp; 2024-03-04</p>

                            <div className={styles.separator}></div>
                            <div className={styles.keywords}>
                                <p>수선키워드</p>
                                <span>#단추달기</span>
                                <span>#박음질</span>
                                <span>#바지기장</span>
                            </div>
                            <p className={styles.completionInfo}>완료한 의뢰
                                <span className={styles.completionInfo2}>100회</span></p>
                        </div>
                    </div>
                    <p className={styles.rightTitleText2}>판매량 그래프</p>
                    <div className={styles.salesGraph}>
                        <img src={salesgraph} alt="salesgraph" className={styles.salesGraphImage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Repair;
