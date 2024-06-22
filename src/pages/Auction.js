import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/title.png';
import user1 from '../assets/img/user1.png';
import salesgraph from '../assets/img/salesgraph.png';
import styles from '../styles/Auction.module.css';

function Auction() {
  const auctionItems = [
    { id: 3, type: '상의', keyword: '#바느질 #박음질', bid: '100,000원', applicationDate: '2024-06-20', endDate: '2024-06-25' },
    { id: 2, type: '상의', keyword: '#바느질 #박음질', bid: '100,000원', applicationDate: '2024-06-20', endDate: '2024-06-25' },
    { id: 1, type: '하의', keyword: '#단추달기 #지퍼수선', bid: '80,000원', applicationDate: '2024-06-18', endDate: '2024-06-23' },
  ];

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <div>
          <Link to="/">
            <img src={logo} className={styles.logo} alt="logo" />
          </Link>
        </div>
        <div className={styles.right}>
          <Link to="/Repair" className={styles.bold}>경매</Link>
          <span onClick={() => window.location.href = '/'}>로그아웃</span>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <p className={styles.welcome}>00수선 환영합니다</p>
          <h1 className={styles.auctionTitle}>경매 태그</h1>
          <div className={styles.auctionTag}>
            <p>#상의 #하의</p>
            <hr className={styles.taghr} />
            <p>#바느질 #박음질 #단추달기 #지퍼수선<br /> #기장수선 #남방수선 #티셔츠시보리수선 #단수선 <br /> #맨단트임수선 #바지통수선 #허리수선</p>
          </div>
          <h1 className={styles.requestTitle}>경매 목록</h1>
          <table className={styles.auctionTable}>
            <thead>
              <tr>
                <th>번호</th>
                <th>구분</th>
                <th>키워드</th>
                <th>입찰가</th>
                <th>신청일</th>
                <th>마감일</th>
              </tr>
            </thead>
            <tbody>
              {auctionItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.type}</td>
                  <td>{item.keyword}</td>
                  <td>{item.bid}</td>
                  <td className={styles[item.endDate === '2024-06-25' ? 'statusInProgress' : '']}>{item.applicationDate}</td>
                  <td className={styles[item.endDate === '2024-06-23' ? 'statusCompleted' : '']}>{item.endDate}</td>
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

export default Auction;
