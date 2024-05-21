import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import "./App.css";

function menuBar() {
  return (
      <div classname="menuBar">
        <Link classname="menubarleft" to={'/'}>Fitfin</Link>
        <Link classname="menubarright" to={'/'}>핏 코멘트</Link>
        <Link classname="menubarright" to={'/'}>고객센터</Link>
        <Link classname="menubarright" to={'/'}>수선 업체 로그인</Link>
      </div>
  )
}

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
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          // 2페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(3);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
          // 3페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(4);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 4) {
          // 4페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 4 + DIVIDER_HEIGHT * 4,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(5);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 5) {
          // 5페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 5 + DIVIDER_HEIGHT * 5,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(6);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 6) {
          // 6페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 6 + DIVIDER_HEIGHT * 6,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(7);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 7) {
          // 7페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 7 + DIVIDER_HEIGHT * 7,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(8);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 8) {
          // 8페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 8 + DIVIDER_HEIGHT * 8,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(9);
        } else {
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
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          // 2페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(1);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
          // 3페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 4) {
          // 4페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(3);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 5) {
          // 5페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(4);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 6) {
          // 6페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(5);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 7) {
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

      <div className="menuBar">
        <menuBar>Fitfin 핏 코멘트 고객센터 수선 업체 로그인</menuBar>
      </div>
      <div className="background">
        <h1>내가 원하는 옷을</h1>
        <h1>나만을 위한 수선과 함께</h1>
        <span>Find Your</span>
        <span>Fit fin</span>
      </div>
      <div className="divider"></div>

      <div className="inner bg-black">
        <img src="./image/finger1.png"></img>
      </div>
      <div className="divider"></div>Q  

      <div className="inner bg-white"></div>
      <div className="divider"></div>

      <div classname="inner bg-black"></div>
      <div className="divider"></div>

      <div classname="inner bg-black"></div>
      <div className="divider"></div>

      <div classname="inner bg-black"></div>
      <div className="divider"></div>

      <div classname="inner bg-black"></div>
      <div className="divider"></div>

      <div classname="inner bg-black"></div>
      <div className="divider"></div>

      <div classname="inner bg-black"></div>
    </div>
  );
}

export default App;