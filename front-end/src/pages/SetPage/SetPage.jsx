import React, { useState, useEffect, useRef } from 'react';

import { Form, Button } from 'react-bootstrap';
import './SetPage.css';

import { FiPlus, FiTrash2, FiAlignJustify } from 'react-icons/fi';

import * as _ from 'lodash';

const SetPage = () => {
  const [cards, setCards] = useState([]);
  let orderedCards = [];

  var testRef = useRef(null);
  var contentRef = useRef(null);
  var meaning = useRef(null);
  var divAddCardForm = useRef(null);

  const onDelete = (idx) => {
    console.log(`onDelete called. idx : ${idx}`);
    console.log('cards : ', cards);
    var index = cards.findIndex((i) => i.idx == idx);
    cards.splice(index, 1);

    let tmpCards = [...cards];
    for (var i = 0; i < cards.length; i++) {
      tmpCards[i].idx = cards.length - i - 1;
    }

    setCards(tmpCards);
  };

  const addCard = () => {
    console.log('ADD button clicked.');

    let inputTerm = divAddCardForm.current.children[1].children[0];
    let textareaMeaning = divAddCardForm.current.children[1].children[1];
    let newTerm = inputTerm.value;
    let newMeaning = textareaMeaning.value;

    let newObj = {
      idx: cards.length,
      term: newTerm,
      meaning: newMeaning,
    };

    setCards([...cards, newObj]);
  };

  const handleKeyUp = (e) => {
    console.log(meaning.current.value);
    meaning.current.style.height = '5px';
    meaning.current.style.height = meaning.current.scrollHeight + 'px';
  };

  const getDragAfterElement = (container, y) => {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY },
    ).element;
  };

  useEffect(() => {
    let draggables = document.querySelectorAll('.draggable');
    draggables.forEach((draggable) => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });

      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
      });
    });

    let containers = document.querySelectorAll('.set-content');
    containers.forEach((container) => {
      container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        console.log('afterElement : ', afterElement);
        // console.log('afterElement.childNodes : ', afterElement.childNodes);
        // console.log('typeof afterElement : ', typeof afterElement);
        // let idx = afterElement.getElementByTagName('H2');
        // console.log('afterElements idx : ', idx);
        const draggable = document.querySelector('.dragging');
        console.log('draggable : ', draggable);
        if (afterElement == null) {
          // container.appendChild(draggable);
        } else {
          console.log('afterElement.getElementsByTagName(H2)[0] : ', afterElement.getElementsByTagName('H2')[0]);
          // container.insertBefore(draggable, afterElement);
        }
      });
    });
  });

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="set-header" ref={testRef} style={{ width: '80%', height: '250px' }}>
        <div className="" style={{ paddingTop: '1rem' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '500px' }}>
                  <span className="CreateSetHeader-title">학습 세트 만들기</span>
                  {/* <span>학습 세트 만들기</span> */}
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                  <Button style={{ backgroundColor: 'skyblue', border: 'none' }}>저장</Button>
                </div>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <Form.Control className="inputbox" type="text" placeholder="제목을 입력하세요." />
                <span className="card-title">제목</span>
                <br />
                <Form.Control className="inputbox" type="text" placeholder="설명을 입력하세요." />
                <span className="card-description">설명</span>
              </div>
            </div>
            {/* <div style={{ display: 'flex', justifyContent: 'flex-end', width: '10%' }}></div> */}
          </div>
        </div>
      </div>

      <div className="div-add-card-form" style={{ width: '80%', height: '150px' }} ref={divAddCardForm}>
        <span className="CreateSetHeader-title" style={{ paddingBottom: '2rem' }}>
          카드 추가
        </span>
        {/* <form id="input-form"> */}
        <div style={{ display: 'flex' }}>
          <Form.Control className="inputbox mx-3" type="text" placeholder="단어" style={{ width: '50%' }} />
          <Form.Control className="inputbox mx-3" as="textarea" placeholder="뜻" style={{ width: '50%', height: '38px' }} onKeyUp={handleKeyUp} ref={meaning} />
          <div>
            <Button type="submit" value="Add" onClick={addCard}>
              <FiPlus />
            </Button>
          </div>
        </div>
        {/* </form> */}
      </div>

      <div style={{ width: '80%' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span className="CreateSetHeader-title">카드 목록</span>
        </div>

        <div className="set-content" ref={contentRef}>
          {cards
            .sort((a, b) => {
              return b.idx - a.idx;
            })
            .map((card) => (
              <Card card={card} key={card.idx} onDelete={onDelete} />
            ))}
        </div>
      </div>
    </div>
  );
};

const Card = ({ card, onDelete }) => {
  return (
    <div className="added-card draggable" style={{ marginBottom: '10px' }}>
      <div stlye={{ display: 'flex', backgroundColor: 'white' }}>
        <div className="div-card-index" style={{ display: 'flex', borderBottom: '1px solid lightgrey', marginBottom: '1rem' }}>
          <h2>{card.idx + 1}</h2>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <FiAlignJustify size="32" />
            <Button
              variant="danger"
              onClick={() => {
                onDelete(card.idx);
              }}
            >
              <FiTrash2 size="32" />
            </Button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '2rem' }}>
          <div className="mx-3" style={{ width: '40%' }}>
            <h2 style={{ borderBottom: '5px solid black' }}>{card.term}</h2>
            <span className="term">단어</span>
          </div>
          <div className="mx-3" style={{ width: '40%' }}>
            <h2 style={{ borderBottom: '5px solid black' }}>{card.meaning}</h2>
            <span className="descpription">뜻</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPage;
