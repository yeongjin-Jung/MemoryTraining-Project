import React, { useEffect } from 'react';
import { useState } from 'react';
import Pdf from 'react-to-pdf';
import './TestPaperPage.css';

const ref = React.createRef();
const TestPaperPage = (props) => {
  const cards = props.location.state.cardList;
  const book = props.location.state.book;

  const [randomcard, setRandomcard] = useState([]);

  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  useEffect(() => {
    console.log(book);
    setRandomcard(shuffleArray(cards));
  }, []);

  function Card({ data, index }) {
    return (
      <div className="testpaper-qestion">
        <p className="qestion-problem">
          {index}번 . {data.word}
        </p>
        <p className="qestion-answer">{data.meaning}</p>
      </div>
    );
  }

  return (
    <div className="testpaper-root">
      <button
        className="backbtn"
        onClick={() => {
          props.history.push({ pathname: '/set-detail', state: { book: book } });
        }}
      >
        <p className="backbtn-text">뒤로가기</p>
      </button>
      <div className="Home-BackgroundColor"></div>
      <Pdf targetRef={ref} filename="나만의 시험지.pdf">
        {({ toPdf }) => (
          <button className="pdf-create-btn" onClick={toPdf}>
            <p>PDF로 다운로드</p>
          </button>
        )}
      </Pdf>
      <div className="testpaper-context">
        <div className="testpaper-context-main">
          <div ref={ref}>
            <div className="testpaper-title">
              <p>{book.title}</p>
            </div>
            <div className="testpaper-qestion-container">
              {randomcard.map((data, index) => (
                <div className="testpaper-qestion-box" key={index}>
                  <Card data={data} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPaperPage;
