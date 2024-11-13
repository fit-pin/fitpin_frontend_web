import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import styles from '../styles/Management.module.css';
import WebSocketContext, {
	allUnSubscribe,
	subscribe,
} from '../utils/WebSocketConnect';
import ErrorPage from './ErrorPage';

function Fitcomment() {
	const webSocketContext = useContext(WebSocketContext);
	const token = localStorage.getItem('accessToken');
	const isAdmin = localStorage.getItem('username') === 'admin';

	const navigate = useNavigate();
	const [isNumber, setisNumber] = useState('');
	const [isMessage, setisMessage] = useState('');

	// 서버 전송용
	const SendAuctionEnd = `/recv/admin/end`;

	// 서버 응답용
	const RecvAuctionEnd = '/action/admin/end';

	// 웹소켓 연결용
	useEffect(() => {
		// 모든 구독 없에고 들감
		allUnSubscribe();

		if (!token || webSocketContext.state !== 'connect') {
			return;
		}

		const client = webSocketContext.client;

		// 경매 종료 알림
		subscribe(client, RecvAuctionEnd, (message) => {
			const body = JSON.parse(message.body);
			console.log(body);

			if (body.stats === true) {
				setisMessage(`${body.auctionId}번 경매를 종료했습니다`);
			} else {
				alert('해당 경매를 찾을 수 없습니다');
			}
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [webSocketContext.state]);

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			ManageClose(e);
		}
	};

	const ManageClose = () => {
		if (!isNumber) {
			alert('경매번호를 입력하세요.');
			return;
		}
		if (webSocketContext.state !== 'connect') {
			return;
		}
		const client = webSocketContext.client;

		const confirmClose = window.confirm('경매를 종료하시겠습니까?');
		if (confirmClose) {
			client.publish({
				destination: `${SendAuctionEnd}/${isNumber}`,
			});
		}
	};

	if (!token || !isAdmin) {
		return <ErrorPage messge="유효하지 않는 접근입니다" navigate="/" />;
	}

	return (
		<div className={styles.App}>
			<header className={styles.header}>
				<div>
					<img
						src={logo}
						className={styles.logo}
						alt="logo"
						onClick={() => navigate('/')}
					/>
				</div>
				<div className={styles.right}>
					<span className={styles.bold} onClick={() => navigate('/Management')}>
						경매관리
					</span>
					<span onClick={() => navigate('/Fitcomment')}>핏코멘트</span>
					<span onClick={() => navigate('/Service')}>고객센터</span>
				</div>
			</header>
			<div className={styles.content}>
				<div className={styles.leftContent}>
					<h2 className={styles.title}>경매관리</h2>
					<p className={styles.description}>
						종료하고 싶은 경매번호를 입력하세요.
					</p>
				</div>
				<div className={styles.formContainer}>
					<div className={styles.form} onKeyDown={handleKeyDown}>
						<div className={styles.formGroup}>
							<input
								className={styles.inputname}
								type="text"
								id="name"
								placeholder="경매번호를 입력하세요."
								value={isNumber}
								onChange={(e) => setisNumber(e.target.value)}
							/>
							<button
								className={styles.submitButton}
								type="button"
								onClick={ManageClose}
							>
								종료하기
							</button>
						</div>
						{isMessage && (
							<div className={styles.closedMessage}>{isMessage}</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Fitcomment;
