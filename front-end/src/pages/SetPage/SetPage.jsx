import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FiPlus, FiTrash2, FiEdit2, FiSave } from 'react-icons/fi';
import axios from 'axios';
import SERVER from '../../api/server';
import { AwesomeButton } from 'react-awesome-button';
import '../../assets/css/back-btn-styles.css';
import './SetPage.css';

const SetPage = (props) => {
  const [cards, setCards] = useState([]);

  var testRef = useRef(null);
  var contentRef = useRef(null);
  var word = useRef(null);
  var meaning = useRef(null);
  var divAddCardForm = useRef(null);
  const createSetTitle = useRef(null);
  var createSetDescription = useRef(null);

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

  const onEdit = (idx) => {
    console.log(`onEdit button clicked. idx is ${idx}`);

    let tmpCards = [...cards];
    var index = cards.findIndex((i) => i.idx == idx);
    tmpCards[index].isEditing = true;

    setCards(tmpCards);
  };

  const onSave = (card) => {
    console.log(`onSave button clicked. idx is ${card.idx}`);
    let tmpCards = [...cards];
    var index = cards.findIndex((i) => i.idx == card.idx);

    tmpCards[index].word = card.word;
    tmpCards[index].meaning = card.meaning;
    tmpCards[index].isEditing = false;

    setCards(tmpCards);
  };

  const addCard = () => {
    if (word.current.value == '' && meaning.current.value == '') return;

    let inputWord = divAddCardForm.current.children[1].children[0];
    let textareaMeaning = divAddCardForm.current.children[1].children[1];
    let newWord = inputWord.value;
    let newMeaning = textareaMeaning.value;

    let newObj = {
      idx: cards.length,
      word: newWord,
      meaning: newMeaning,
      isEditing: false,
    };

    setCards([...cards, newObj]);

    word.current.value = '';
    meaning.current.value = '';
    meaning.current.style.height = '38px';
  };

  const MeaninghandleKeyUp = (e) => {
    meaning.current.style.height = '5px';
    meaning.current.style.height = meaning.current.scrollHeight + 'px';
    createSetDescription.current.style.height = '5px';
    createSetDescription.current.style.height = createSetDescription.current.scrollHeight + 'px';
  };

  const WordhandleKeyUp = (e) => {
    word.current.style.height = '5px';
    word.current.style.height = word.current.scrollHeight + 'px';
    createSetDescription.current.style.height = '5px';
    createSetDescription.current.style.height = createSetDescription.current.scrollHeight + 'px';
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="set-create-BackgroundColor"></div>
      <div className="set-header" ref={testRef} style={{ width: '92%', height: '250px' }}>
        <div className="" style={{ paddingTop: '1rem' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '500px' }}>
                  <span className="CreateSetHeader-title">학습 세트 만들기</span>
                  {/* <span>학습 세트 만들기</span> */}
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                  {/* <Button
                    style={{ backgroundColor: 'skyblue', border: 'none' }}
                    onClick={() => {
                      console.log('save button clicked.');
                      console.log('createSetTitle.current.value : ', createSetTitle.current.value);
                      console.log('createSetDescription.current.value : ', createSetDescription.current.value);

                      if (createSetTitle.current.value == '') {
                        alert('제목을 입력해주세요');
                      } else if (createSetDescription.current.value == '') {
                        alert('설명을 입력해주세요');
                      } else if (cards.length < 4) {
                        alert('최소 4개의 카드를 추가해주세요');
                      } else {
                        console.log('cards : ', cards);
                        const book = {
                          title: createSetTitle.current.value,
                          description: createSetDescription.current.value,
                        };
                        console.log('book : ', book);
                        console.log('cards : ', cards);

                        axios
                          // .post('http://127.0.0.1:8000/api/books/create/', {
                          .post(SERVER.BASE_URL + SERVER.ROUTES.create, {
                            title: createSetTitle.current.value,
                            description: createSetDescription.current.value,
                            cards: cards,
                          })
                          .then((res) => {
                            console.log('create axios res : ', res);
                            console.log('props.history : ', props.history);
                            props.history.push({ pathname: '/set-detail', state: { book: res.data } });
                          });
                        alert('저장되었습니다');
                      }
                    }}
                  >
                    저장
                  </Button> */}

                  <AwesomeButton
                    className="aws-setsave-btn"
                    type="setsave"
                    onPress={() => {
                      console.log('save button clicked.');
                      console.log('createSetTitle.current.value : ', createSetTitle.current.value);
                      console.log('createSetDescription.current.value : ', createSetDescription.current.value);

                      if (createSetTitle.current.value == '') {
                        alert('제목을 입력해주세요.');
                      } else if (createSetDescription.current.value == '') {
                        alert('설명을 입력해주세요.');
                      } else if (cards.length < 4) {
                        alert('최소 4개의 카드를 추가해주세요.');
                      } else {
                        console.log('cards : ', cards);
                        const book = {
                          title: createSetTitle.current.value,
                          description: createSetDescription.current.value,
                        };
                        console.log('book : ', book);
                        console.log('cards : ', cards);

                        axios
                          // .post('http://127.0.0.1:8000/api/books/create/', {
                          .post(SERVER.BASE_URL + SERVER.ROUTES.create, {
                            title: createSetTitle.current.value,
                            description: createSetDescription.current.value,
                            cards: cards,
                          })
                          .then((res) => {
                            console.log('create axios res : ', res);
                            console.log('props.history : ', props.history);
                            props.history.push({ pathname: '/set-detail', state: { book: res.data } });
                          });
                      }
                    }}
                  >
                    <span>저장</span>
                  </AwesomeButton>
                </div>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <span className="CreateSetHeader-title">제목</span>
                <Form.Control className="inputbox create-set-title" type="text" placeholder="제목을 입력하세요." ref={createSetTitle} />
                {/* <span className="">제목</span> */}

                <Form.Control className="inputbox create-set-description" as="textarea" placeholder="설명을 입력하세요." ref={createSetDescription} onKeyUp={MeaninghandleKeyUp} />
                {/* <span className="">설명</span> */}
                <div className="div-add-card-form" style={{ position: 'relative', width: '100%', height: '150px', marginTop: '2rem' }} ref={divAddCardForm}>
                  <span className="CreateSetHeader-title" style={{ paddingBottom: '2rem' }}>
                    카드 추가
                  </span>
                  {/* <form id="input-form"> */}
                  <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                    <Form.Control className="inputbox mx-3 word-input" as="textarea" placeholder="단어" style={{ width: '50%', height: '60px' }} onKeyUp={WordhandleKeyUp} ref={word} />
                    <Form.Control className="inputbox mx-3 meaning-input" as="textarea" placeholder="뜻" style={{ width: '50%', height: '60px' }} onKeyUp={MeaninghandleKeyUp} ref={meaning} />
                    <div>
                      <Button type="submit" value="Add" onClick={addCard}>
                        <FiPlus />
                      </Button>
                    </div>
                  </div>
                  {/* </form> */}
                  <div style={{ position: 'relative', marginTop: '2rem' }}>
                    <div style={{ marginBottom: '2rem' }}>
                      <span className="CreateSetHeader-title">카드 목록</span>
                    </div>

                    <div className="set-content" ref={contentRef}>
                      {cards
                        .sort((a, b) => {
                          return b.idx - a.idx;
                        })
                        .map((card) => (
                          <Card card={card} key={card.idx} onDelete={onDelete} onEdit={onEdit} onSave={onSave} />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div style={{ display: 'flex', justifyContent: 'flex-end', width: '10%' }}></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ card, onDelete, onEdit, onSave }) => {
  var modifyword = useRef(null);
  var modifymeaning = useRef(null);

  useEffect(() => {
    console.log('useEffect() called.');
    console.log(modifyword);

    if (modifymeaning.current != null) {
      console.log(modifymeaning.current.value);
      modifymeaning.current.style.height = '5px';
      modifymeaning.current.style.height = modifymeaning.current.scrollHeight + 'px';
    }
  });

  return (
    <div className="added-card draggable" style={{ marginBottom: '10px' }}>
      <div stlye={{ display: 'flex', backgroundColor: 'white' }}>
        <div className="div-card-index" style={{ display: 'flex', borderBottom: '1px solid lightgrey', marginBottom: '1rem' }}>
          <h2>{card.idx + 1}</h2>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            {card.isEditing && (
              <Button
                onClick={() => {
                  console.log(modifyword.current.value);
                  console.log(modifymeaning.current.value);
                  card.w0rd = modifyword.current.value;
                  card.meaning = modifymeaning.current.value;
                  onSave(card);
                }}
              >
                <FiSave size="32" />
              </Button>
            )}
            {!card.isEditing && (
              <Button
                onClick={() => {
                  console.log('edit button clicked.');
                  onEdit(card.idx);
                }}
              >
                <FiEdit2 size="32" />
              </Button>
            )}
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
            {card.isEditing && <Form.Control className="inputbox" type="text" placeholder={card.word} ref={modifyword} defaultValue={card.word} />}
            {!card.isEditing && <p style={{ borderBottom: '5px solid black', wordBreak: 'break-all' }}>{card.word}</p>}
            <span className="word">단어</span>
          </div>
          <div className="mx-3" style={{ width: '40%' }}>
            {card.isEditing && <Form.Control className="inputbox" as="textarea" placeholder={card.meaning} ref={modifymeaning} defaultValue={card.meaning} />}
            {!card.isEditing && <p style={{ borderBottom: '5px solid black', wordBreak: 'break-all' }}>{card.meaning}</p>}
            <span className="descpription">뜻</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPage;
