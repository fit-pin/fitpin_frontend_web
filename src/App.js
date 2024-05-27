import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import "./App.css";

function App() {
  const DIVIDER_HEIGHT = 5;
  const outerDivRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위
      const pageHeight = window.innerHeight; // 화면 세로(100vh)

      if (deltaY > 0) {
        // 스크롤 내림
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          // 1페이지
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        } 
        
        else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          // 2페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(3);
        } 
        
        else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
          // 3페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(4);
        } 
        
        else if (scrollTop >= pageHeight && scrollTop < pageHeight * 4) {
          // 4페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 4 + DIVIDER_HEIGHT * 4,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(5);
        } 
        
        else if (scrollTop >= pageHeight && scrollTop < pageHeight * 5) {
          // 5페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 5 + DIVIDER_HEIGHT * 5,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(6);
        } 
        
        else if (scrollTop >= pageHeight && scrollTop < pageHeight * 6) {
          // 6페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 6 + DIVIDER_HEIGHT * 6,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(7);
        } 
        
        else if (scrollTop >= pageHeight && scrollTop < pageHeight * 7) {
          // 7페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 7 + DIVIDER_HEIGHT * 7,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(8);
        } 
        
        else if (scrollTop >= pageHeight && scrollTop < pageHeight * 8) {
          // 8페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 8 + DIVIDER_HEIGHT * 8,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(9);
        } 
        
        else {
          // 9페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 9 + DIVIDER_HEIGHT * 9,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        // 스크롤 올림
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //1페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } 
        
        else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          // 2페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(1);
        } 
        
        else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
          // 3페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        } 
        
        else if (scrollTop >= pageHeight && scrollTop < pageHeight * 4) {
          // 4페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(3);
        } 
        
        else if (scrollTop >= pageHeight && scrollTop < pageHeight * 5) {
          // 5페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(4);
        } 
        
        else if (scrollTop >= pageHeight && scrollTop < pageHeight * 6) {
          // 6페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(5);
        } 
        else if (scrollTop >= pageHeight && scrollTop < pageHeight * 7) {
          // 7페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(6);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 8) {
          // 8페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(7);
        } else {
          // 9페이지
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(8);
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  return (
    <div ref={outerDivRef} className="outer">
      


      <div class="inner">
        <div className="menu-bar">
          <div className="left-section">
            <span className="logo">Fit</span>fin
          </div>
          <div className="right-section">
            <span className="menu-item">핏 코멘트</span>
            <span className="menu-item">고객센터</span>
            <span className="menu-item">수선 업체 로그인</span>
          </div>
        </div>
      </div>

      <div className="divider"></div>



      <div className="inner bg-black container">
        <div className="left-section">
          <img src="finger1.png" alt="finger1" className="leftimage" />
        </div>
        <div className="right-section">
          <span className="white">내가 사고 싶은 제품을 고르고</span>
        </div>
      </div>

      <div className="divider"></div>



      <div className="inner bg-white container">
        <div className="left-section">
          <img src="cloth1.png" alt="cloth1" className="leftimage" />
        </div>
        <div className="right-section">
          <span>원하는 사이즈로 커스텀하면</span>
        </div>
      </div>

      <div className="divider"></div>



      <div className="inner bg-black">
        <div className="left-section">
          <img src="box1.png" alt="box1" className="leftimage" />
        </div>
        <div className="right-section">
          <span className="white">문 앞으로 배송해드려요</span>
        </div>
      </div>

      <div className="divider"></div>



      <div className="inner bg-white">
        <div className="left-section">
          <span>클릭 한 번이면 수선이 뚝딱</span>
          <span>내가 원하는 제품을 원하는 핏으로 수선할 수 있어요</span>
          <span>사고 싶은 제품을 선택한 뒤 내가 원하는 핏으로 사이즈를 조절해요</span>
          <span>번거롭게 수선집에 가지 않아도 클릭 한 번이면 수선된 옷이 집 앞으로 배송돼요</span>
        </div>
        <div className="right-section">
          <img src="iPhone1.png" alt="iPhone1" className="leftimage" />
        </div>
      </div>

      <div className="divider"></div>



      <div className="inner bg-white">
        <div className="left-section">
          <img src="iPhone2.png" alt="iPhone2" className="leftimage" />
        </div>
        <div className="right-section">
          <span>메인 페이지</span>
          <span>내 체형, 취향을 모두 만족시킬</span>
          <span>옷을 핏핀이 추천해드려요</span>
        </div>
      </div>

      <div className="divider"></div>



      <div className="inner bg-white">
        <div className="left-section">
          <span>사이즈 정보 페이지</span>
          <span>궁금한 제품의 사진을 찍으면</span>
          <span>핏핀이 사이즈 정보를 알려드려요</span>
        </div>
        <div className="right-section">
          <img src="iPhone3.png" alt="iPhone3" className="leftimage" />
        </div>
      </div>

      <div className="divider"></div>



      <div className="inner bg-white">
        <div className="left-section">
          <img src="iPhone4.png" alt="iPhone4" className="leftimage" />
          <img src="iPhone5.png" alt="iPhone5" className="leftimage" />
        </div>
        <div className="right-section">
          <span>핏 코멘트 페이지</span>
          <span>다른 사람들의 실착 후기가 궁금하다면?</span>
          <span>핏 코멘트에서 확인해요</span>
        </div>
      </div>

      <div className="divider"></div>



      <div className="inner bg-white">
        9
      </div>
    </div>
  );
}

export default App;