import React, { useState, useEffect, useRef } from 'react';

import { Form, Button } from 'react-bootstrap';
import './SetPage.css';

import { FiPlus, FiTrash2, FiAlignJustify } from 'react-icons/fi';

const SetPage = () => {
  // const [cards, setCards] = useState([{ term: 'T1', meaning: 'M1' }]);
  const [cards, setCards] = useState([]);

  var testRef = useRef(null);
  var meaning = useRef(null);
  var divAddCardForm = useRef(null);

  const handleCards = () => {
    console.log('ADD button clicked.');

    let inputTerm = divAddCardForm.current.children[1].children[0];
    let textareaMeaning = divAddCardForm.current.children[1].children[1];

    let newTerm = inputTerm.value;
    let newMeaning = textareaMeaning.value;

    let newObj = {
      term: newTerm,
      meaning: newMeaning,
    };

    console.log('before push : ', cards);
    setCards([...cards, newObj]);
    console.log('after push  : ', cards);
  };

  const handleKeyUp = (e) => {
    console.log(meaning.current.value);
    meaning.current.style.height = '5px';
    meaning.current.style.height = meaning.current.scrollHeight + 'px';
  };

  const onScroll = (e) => {
    // console.log(e);
    // console.log('divAddCardForm : ', divAddCardForm);
    // console.log('window.scrollY : ', window.scrollY);

    // console.log('divAddCardForm.current.offsetTop : ', divAddCardForm.current.offsetTop);
    // console.log('window.scrollY : ', window.scrollY);

    // if (testRef.current.offsetTop < window.scrollY) {
    //   testRef.current.classList.add('fixed');
    // } else {
    //   testRef.current.classList.remove('fixed');
    // }
    if (divAddCardForm.current.offsetTop < window.scrollY) {
      divAddCardForm.current.classList.add('fixed');
    } else {
      divAddCardForm.current.classList.remove('fixed');
    }

    console.log(divAddCardForm.current);
  };

  useEffect(() => {
    // console.log('testRef : ', testRef);
    // console.log('testRef.current : ', testRef.current);
    var setHeaderElement = testRef.current;
    // console.log('setHeaderElement : ', setHeaderElement);
    // console.log('setHeaderElement.offsetTop : ', setHeaderElement.offsetTop);

    // console.log('window object : ', window);
    window.scroll(() => {
      var window = window.scrollTop;
      // console.log('스크롤중!');
    });

    window.addEventListener('scroll', onScroll);
  });

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="set-header" ref={testRef} style={{ width: '80%', height: '250px' }}>
        <div className="" style={{ paddingTop: '1rem' }}>
          <div className="row">
            <div className="col-10">
              <span className="CreateSetHeader-title" style={{ paddingBottom: '2rem' }}>
                학습 세트 만들기
              </span>
              <div style={{ marginTop: '2rem' }}>
                <Form.Control className="inputbox" type="text" placeholder="제목을 입력하세요, 예: 생물학 - 22장: 진화" />
                <span className="title">제목</span>
                <br />
                <Form.Control className="inputbox" type="text" placeholder="설명을 추가하세요." />
                <span className="description">설명</span>
              </div>
            </div>
            <div className="col-2">
              <Button style={{ backgroundColor: 'skyblue', border: 'none' }}>저장</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="div-add-card-form" style={{ width: '80%', height: '250px' }} ref={divAddCardForm}>
        <span className="CreateSetHeader-title" style={{ paddingBottom: '2rem' }}>
          카드 추가
        </span>
        {/* <form id="input-form"> */}
        <div style={{ display: 'flex' }}>
          <Form.Control className="inputbox mx-3" type="text" placeholder="단어" style={{ width: '50%' }} />
          <Form.Control className="inputbox mx-3" as="textarea" placeholder="뜻" style={{ width: '50%', height: '38px' }} onKeyUp={handleKeyUp} ref={meaning} />
          <div>
            <Button type="submit" value="Add" onClick={handleCards}>
              ADD
            </Button>
          </div>
        </div>
        {/* </form> */}
      </div>

      <div className="set-content" style={{ width: '80%', height: '1550px' }}>
        <span className="CreateSetHeader-title" style={{ paddingBottom: '2rem' }}>
          카드 목록
        </span>
      </div>
    </div>
  );
};

export default SetPage;
