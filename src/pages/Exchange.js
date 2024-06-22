import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import styles from '../styles/Exchange.module.css';

function Exchange() {
    const navigate = useNavigate();

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
                    <h2 className={styles.title}>교환 및 환불</h2>
                    <p className={styles.description}>
                        게시판을 통해<br />
                        문의 및 상담이 가능합니다
                    </p>
                    <button className={styles.inquiryButton} onClick={() => navigate('../Ask')}>1:1 문의하기</button>
                    <ul className={styles.links}>
                        <li><span onClick={() => navigate('/Service')}>고객센터</span></li>
                        <li><span onClick={() => navigate('/Question')}>자주 묻는 질문</span></li>
                    </ul>
                </div>
                <div className={styles.rightContent}>
                    <p className={styles.rightText}>
                        <p className={styles.rightTextB}>FitPin에서는 높은 품질의 브랜드와 제품을 소개하고 판매하며, <br/>고객에게 최고의 제품을 제공할 수 있도록
                        노력하고 있습니다. 배송을 하기전 주문된 제품의 상태를 확인 후<br/> 발송하고 있지만, 혹여 결함이 있는 제품이나 불만족스러운 상품을 수령하셨을 
                        경우 최대한 신속하고 <br/>정확하게 문제를 해결해드리도록 노력합니다. 자세한 교환 및 환불 조건은 아래를 참고 하시길 바랍니다.<br/>
                        </p><br/><br/>
                        <p className={styles.rightText2}>반품 및 환불 신청 방법</p>
                        <br/>
                        배송후 반품 및 환불은 Q&A게시판 혹은 이메일을 통해 주문취소 접수가 가능합니다.<br/>
                        게시판 답변 및 이메일을 통해 환불/교환 가능여부를 답변해 드립니다.<br/>
                        <br/>
                        <p className={styles.rightRed}>온라인 FitPin 스토어 구매건의 경우 교환/반품은 택배로만 진행이 가능합니다.</p>
                        <p className={styles.rightline}>반품 및 환불 관련 이메일 : help@fitpin-store.com</p>
                        <br/>
                        <p className={styles.rightText2}>주문취소 안내</p>
                        <br/>
                        입금전 주문취소는 마이페이지에서 직접 가능합니다.<br/>
                        배송전인 상품은 Q&A 게시판 혹은 이메일로 주문취소 접수가 가능합니다.<br/>
                        주문취소 및 환불은 이메일 혹은 고객센터를 통해 접수가 가능합니다.<br/>
                        배송후 주문 취소로 인한 환불은 반품 접수를 하신 후 해당 상품이 당사로 회수된 후에 이루어집니다.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Exchange;
