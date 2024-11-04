import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/title.png';
import cloth2 from '../assets/img/cloth2.png'
import styles from '../styles/AuctionDetail_back.module.css';

function AuctionDetailBack() {
  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <div>
          <Link to="/">
            <img src={logo} className={styles.logo} alt="logo" />
          </Link>
        </div>
        <div className={styles.right}>
          <Link to="/Auction" className={styles.bold}>경매</Link>
          <span onClick={() => window.location.href = '/'}>로그아웃</span>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.centerContent}>
          <p className={styles.welcome}>00수선 환영합니다</p>
          <p className={styles.auctionTagTitle}>경매 상품</p>
          <div className={styles.auctionTime}>
            <p>마감까지 : <span className={styles.red}>06:00:00</span></p>
            <div />

            <div className={styles.Section1}>
              <p className={styles.text}>[ 시티보이 오버핏 빅사이즈 옥스포드 셔츠 ]</p>
              <div className={styles.background1}>
                <img src={cloth2} className={styles.cloth} alt="cloth2" />
              </div>
            </div>

            <div className={styles.Section2}>
              <hr className={styles.shorthr} />
              <p className={styles.text2}>현재최저가 : <span className={styles.blue}>10,000₩</span></p>
              <hr className={styles.shorthr2} />
              <div className={styles.auctionHistory}>
                <p className={styles.historyTitleText}>#입찰 내역</p>
                <p className={styles.historyText}>
                  경매가 시작되었습니다.
                  <br />
                  기본 입찰가는 10,000원부터 시작합니다
                  <br />
                  무신사에서 11,000원 입찰하였습니다
                  <br />
                  에이블리에서 10,000원 입찰하였습니다
                  <br />
                  <span className={styles.blue}>알림 !! 현재 최저가는 에이블리 입니다 !!</span>
                </p>
              </div>

              <p className={styles.currentPrice}></p>
              <div className={styles.bidSection}>
                <input type="text" className={styles.bidInput} value="10,000₩" />
                <button className={styles.bidButton}>입찰하기</button>
              </div>
            </div>
          </div>

          <div className={styles.Section3}>
            <div>
              <p className={styles.text3}>#제품정보</p>
              <table className={styles.productTable}>
                <thead>
                  <tr className={styles.gray}>
                    <th>cm</th>
                    <th>어깨너비</th>
                    <th>가슴단면</th>
                    <th>총장</th>
                    <th>소매길이</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.gray}>1</td>
                    <td>44</td>
                    <td>48</td>
                    <td>60</td>
                    <td>48</td>
                  </tr>
                  <tr>
                    <td className={styles.gray}>2</td>
                    <td>45</td>
                    <td>49</td>
                    <td>61</td>
                    <td>49</td>
                  </tr>
                  <tr>
                    <td className={styles.gray}>3</td>
                    <td>46</td>
                    <td>50</td>
                    <td>62</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td className={styles.gray}>4</td>
                    <td>49</td>
                    <td>51</td>
                    <td>63</td>
                    <td>55</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.Section4}>
            <div className={styles.clientInfo}>
              <div className={styles.text4}>#고객 정보</div>
              <p className={styles.text5}>이름 : 밀절미<br />
                주소 : 서울특별시 구로구 경인로 43길 49
                <br />
                <span className={styles.blue}>(고객님이 5km이내에 있습니다.)</span>
                <br />
                선택한 수선 키워드 : #기장수선
                <br />
                요청사항 : 총장 10cm 줄이기
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AuctionDetailBack;
