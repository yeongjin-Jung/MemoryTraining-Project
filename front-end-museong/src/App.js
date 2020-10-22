/* eslint-disable */

import React, { useState } from 'react';
import './App.css';

function App() {
  let [title, changeTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [up, changeUp] = useState(0);

  function change() {
    var newArray = [...title];
    newArray[0] = '여자 코트 추천';
    changeTitle(newArray);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>
      <button onClick={change}>버튼</button>
      <div className="list">
        <h3>
          {title[0]}
          <span
            onClick={() => {
              changeUp(up + 1);
            }}
          >
            👍
          </span>
          {up}
        </h3>
        <p>2월 17일 발행</p>
        <hr />
      </div>

      <div className="list">
        <h3>{title[1]}</h3>
        <p>2월 17일 발행</p>
        <hr />
      </div>

      <Modal />
    </div>
  );
}

function Modal() {
  return (
    <div className="modal">
      <h2>제목</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}

export default App;
