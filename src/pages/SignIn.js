import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/Find Your Fit Pin.png';
import styles from '../styles/SignIn.module.css';
import axios from 'axios';
import { useState } from 'react';
import DaumPost from './DaumPost';

function SignIn() {
    const navigate = useNavigate();

    const [phnum1, setPhnum1] = useState('02');
    const [phnum2, setPhnum2] = useState('');
    const [phnum3, setPhnum3] = useState('');

    const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);  // 중복 체크 상태 관리
    const [errors, setErrors] = useState({});
    
    const joinurl = 'http://fitpin-web-back.kro.kr/join';
    const checkurl = 'http://fitpin-web-back.kro.kr/check-username';

    // 전화번호 업데이트 함수
    const updatePhoneNumber = (part1, part2, part3) => {
        setForm(prevForm => ({
            ...prevForm,
            phone: `${part1}-${part2}-${part3}`
        }));
    };

    const [form, setForm] = useState({
        company:'',
        username:'',
        password:'',
        zipcode:'',
        address1:'',
        address2:'',
        phone:''
    });

    // 유효성 검사 함수
    const validateForm = () => {
        let newErrors = {};

        if (!form.company) newErrors.company = "업장명을 입력하세요.";
        if (!form.username) newErrors.username = "아이디를 입력하세요.";
        if (!form.password || form.password.length < 4) newErrors.password = "비밀번호는 최소 4자 이상이어야 합니다.";
        if (!form.address2) newErrors.address2 = "주소를 입력하세요.";
        if (!form.phone || !/^\d{2,3}-\d{3,4}-\d{4}$/.test(form.phone)) newErrors.phone = "올바른 전화번호를 입력하세요.";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // 입력 값이 변경될 때마다 중복 체크 호출
    const handleUsernameChange = (e) => {
        const newUsername = e.target.value;
        setForm({ ...form, username: newUsername });

        // 2글자 이상일 때만 중복 체크 실행
        if (newUsername.length >= 2) {
            checkUsernameAvailability(newUsername);
        } else {
            setIsUsernameAvailable(null);
        }
        // 입력 시 오류 제거
        if (errors.username) {
            setErrors({ ...errors, username: '' });
        }
    };

    // 아이디 중복 체크 함수
    const checkUsernameAvailability = async (username) => {
        try {
            const response = await axios.post(checkurl, { username }, {
                headers: { 'Content-Type': 'application/json' }
            });
            setIsUsernameAvailable(response.data);  // 서버에서 true/false 반환
        } catch (error) {
            console.error('아이디 중복체크 에러발생', error);
            setIsUsernameAvailable(null);
        }
    };

    // 각 필드가 변경될 때 해당 오류를 제거하는 핸들러
    const handleInputChange = (field, value) => {
        setForm({ ...form, [field]: value });

        // 입력 시 해당 필드에 대한 오류 제거
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    // 회원가입
    // url 변수저장
    const register = (e) => {
        e.preventDefault();

        if (validateForm()) {
            axios.post(joinurl, form, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(res => {
                console.log('res : ', JSON.stringify(res, null, 2));
                navigate('/Login');
                alert(form.username+'님 가입을 축하드립니다.');
            }).catch(err => {
                console.log('failed : ', err);
            });
        }
    };

    return (
        <div className={styles.App}>
            <header className={styles.header}>
                <div>
                    <span onClick={() => navigate('/')}>
                        <img src={logo} className={styles.logo} alt="logo" />
                    </span>
                </div>
                <div className={styles.right}>
                    <span onClick={() => navigate('/FitComment')}>핏 코멘트</span>
                    <span onClick={() => navigate('/Service')}>고객센터</span>
                    <span onClick={() => navigate('/Login')} className={styles.bold}>수선 업체 로그인</span>
                </div>
            </header>
            <div className={styles.content}>
                <h2 className={styles.title}>회원가입</h2>
                <div className={styles.loginPromptContainer}>
                    <p className={styles.loginPrompt}>
                        이미 계정이 있나요? <span onClick={() => navigate('/Login')} className={styles.loginLink}>로그인</span>
                    </p>
                </div>
                <hr className={styles.underline} />
                <form className={styles.form}>
                    <h3 className={styles.sectionTitle}>기본정보</h3>
                    <div className={styles.inputGroup}>
                        <label>업장명</label>
                        <input type="text" placeholder="입력하세요"
                        value={form.company} onChange={e => handleInputChange('company', e.target.value)}/>
                        {errors.company && <p className={styles.error}>{errors.company}</p>}
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <label>아이디</label>
                        <input type="text" placeholder="입력하세요" 
                        value={form.username} onChange={handleUsernameChange}/>
                        {errors.username && <p className={styles.error}>{errors.username}</p>}
                        {/* 아이디 중복 여부에 따른 메시지 */}
                        {isUsernameAvailable === true && <p className={styles.duerror1}>사용 가능한 아이디입니다.</p>}
                        {isUsernameAvailable === false && <p className={styles.duerror2}>이미 사용 중인 아이디입니다.</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label>비밀번호</label>
                        <input type="password" placeholder="입력하세요"
                        value={form.password} onChange={e => handleInputChange('password',e.target.value)}/>
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label>업장주소</label>
                        <div className={styles.addressSearch}>
                            <input type="text" placeholder="우편번호"
                            value={form.zipcode} onChange={e => setForm({...form,zipcode:e.target.value})}/>
                            {/*주소API 컴포넌트*/}
                            <DaumPost setFulladdr={(e) => setForm((prevForm) => ({ ...prevForm, address1: e }))}
                                        setZipcode={(e) => setForm((prevForm) => ({ ...prevForm, zipcode: e }))}/>
                        </div>
                        <input type="text" placeholder="기본주소"
                        value={form.address1} onChange={e => setForm({...form,address1:e.target.value})}/>
                        <input type="text" placeholder="나머지주소"
                        value={form.address2} onChange={e => handleInputChange('address2',e.target.value)}/>
                        {errors.address2 && <p className={styles.error}>{errors.address2}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label>업장전화</label>
                        <div className={styles.phoneInput}>
                            <select name={phnum1} onChange={e => {setPhnum1(e.target.value); updatePhoneNumber(e.target.value, phnum2, phnum3);}}
                            className={styles.selectbox}>
                                <option value="02">02</option>
                                <option value="031">031</option>
                            </select>
                            <span className={styles.hyphen}>-</span>
                            <input name={phnum2} onChange={(e) => {setPhnum2(e.target.value); updatePhoneNumber(phnum1, e.target.value, phnum3); handleInputChange('phone', e.target.value);}} type="text" placeholder="입력하세요"/>
                            <span className={styles.hyphen}>-</span>
                            <input name={phnum3} onChange={(e) => {setPhnum3(e.target.value); updatePhoneNumber(phnum1, phnum2, e.target.value);}} type="text" placeholder="입력하세요"/>
                        </div>
                        {errors.phone && <p className={styles.error}>{errors.phone}</p>}
                    </div>
                    <button type="submit" className={styles.submitButton} onClick={register}>가입하기</button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
