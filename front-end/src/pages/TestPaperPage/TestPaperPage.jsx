import React from 'react';
import Pdf from 'react-to-pdf';
import './TestPaperPage.css';

const ref = React.createRef();
const TestPaperPage = () => {
  return (
    <div className="testpaper-root">
      <Pdf targetRef={ref} filename="나만의 시험지.pdf">
        {({ toPdf }) => (
          <button className="pdf-create-btn" onClick={toPdf}>
            PDF로 다운로드
          </button>
        )}
      </Pdf>
      <div className="testpaper-context" ref={ref}>
        <div className="testpaper-title">
          <p>시험지 제목</p>
        </div>
        <div className="testpaper-qestion-container">
          <div className="testpaper-qestion">
            <p className="qestion-problem">시험 문제</p>
            <p className="qestion-answer">답안</p>
          </div>
          <div className="testpaper-qestion">
            <p>시험 문제</p>
            <p>답안</p>
          </div>
          <div className="testpaper-qestion">
            <p>시험 문제</p>
            <p>답안</p>
          </div>
          <div className="testpaper-qestion">
            <p>시험 문제</p>
            <p>답안</p>
          </div>
          <div className="testpaper-qestion">
            <p>시험 문제</p>
            <p>답안</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPaperPage;
