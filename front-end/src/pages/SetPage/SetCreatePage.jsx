import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SERVER from '../../api/server';

import { Form } from 'react-bootstrap';
import { FiPlus, FiTrash2, FiEdit2, FiSave } from 'react-icons/fi';
import { BiListPlus } from 'react-icons/bi'
import MaterialButton from '@material-ui/core/Button';

import '../../assets/css/back-btn-styles.css';
import './SetCreatePage.css';

const SetCreatePage = (props) => {
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
    if (word.current.value == '' || meaning.current.value == '') {
      alert('단어와 뜻을 입력해주세요.');
      return;
    }

    const found = cards.find((card) => card.word == word.current.value || card.meaning == meaning.current.value);
    if (found != undefined) {
      alert('중복된 단어나 뜻이 이미 세트에 존재합니다.');
      return;
    }

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
    word.current.style.height = '43px';

    meaning.current.value = '';
    meaning.current.style.height = '43px';
  };

  const MeaninghandleKeyUp = (e) => {
    meaning.current.style.height = '5px';
    meaning.current.style.height = meaning.current.scrollHeight + 'px';
  };

  const WordhandleKeyUp = (e) => {
    word.current.style.height = '5px';
    word.current.style.height = word.current.scrollHeight + 'px';
  };

  const createSetDescriptionKeyUp = () => {
    // createSetDescription.current.style.height = '10px';
    createSetDescription.current.style.height = createSetDescription.current.scrollHeight + 'px';
  };

  return (
    <div className="container-fluid" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="set-create-BackgroundColor"></div>
      <div className="container" style={{ paddingTop: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ width: '500px' }}>
            <span className="CreateSetHeader-title">학습 세트 만들기</span>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <MaterialButton
              // className="aws-setsave-btn"
              variant="contained"
              style={{ fontWeight: '800', margin: '0 0.5rem' }}
              color={'primary'}
              startIcon={<BiListPlus size="32" />}
              // className={classes.button}
              onClick={() => {
                const found = cards.find((card) => card.isEditing != undefined && card.isEditing == true);
                if (found != undefined) {
                  alert('수정중인 카드가 존재합니다. 수정을 마치고 저장해주세요.');
                  return;
                }

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

                  console.log('--------------------------------------------------');
                  console.log('요청 보내는 cards : ', cards);
                  console.log('--------------------------------------------------');
                  axios
                    .post(SERVER.BASE_URL + SERVER.ROUTES.create, {
                      title: createSetTitle.current.value,
                      description: createSetDescription.current.value,
                      cards: cards.reverse(),
                    })
                    .then((res) => {
                      console.log('create axios res : ', res);
                      console.log('props.history : ', props.history);
                      alert(`[${res.data.title}] 세트가 생성되었습니다.`);
                      let tmpData = {
                        ...res.data,
                        write_flag: 1,
                      };
                      props.history.push({ pathname: '/set-detail', state: { book: tmpData } });
                    });
                }
              }}
            >세트 만들기</MaterialButton>
          </div>
        </div>
        <div className="draggable bg-color-white" style={{ marginTop: '10px', padding: '1.5rem' }}>
          <span className="CreateSetHeader-title">제목</span>
          <Form.Control className="inputbox create-set-title" type="text" style={{ borderRadius: 0 }} placeholder="제목을 입력하세요." ref={createSetTitle} maxLength={20} />
          <br />
          <span className="CreateSetHeader-title">설명</span>
          <Form.Control
            className="inputbox create-set-description"
            as="textarea"
            placeholder="설명을 입력하세요."
            style={{ width: '100%', height: '41px', borderRadius: 0 }}
            onKeyUp={createSetDescriptionKeyUp}
            ref={createSetDescription}
          />
          <div className="div-add-card-form" style={{ position: 'relative', width: '100%', height: '100px', marginTop: '60px' }} ref={divAddCardForm}>
            <span className="CreateSetHeader-title">카드 추가</span>
            <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
              <Form.Control className="inputbox mx-3 word-input" as="textarea" placeholder="단어" style={{ width: '40%', height: '43px', borderRadius: 0 }} onKeyUp={WordhandleKeyUp} ref={word} />
              <Form.Control className="inputbox mx-3 meaning-input" as="textarea" placeholder="뜻" style={{ width: '60%', height: '43px', borderRadius: 0 }} onKeyUp={MeaninghandleKeyUp} ref={meaning} />
              <MaterialButton
                variant="contained"
                color={'primary'}
                onClick={addCard}
              ><FiPlus size="24" /></MaterialButton>
            </div>
          </div>
          {/* </form> */}
          {/* <Divider /> */}
          <hr style={{ border: 0, height: '3px', background: '#ccc' }} />
          <div style={{ width: '100%', position: 'relative', marginTop: '50px' }}>
            <div style={{ marginBottom: '10px' }}>
              <span className="CreateSetHeader-title">카드 목록</span>
            </div>

            <div className="set-content" ref={contentRef}>
              {cards
                .sort((a, b) => {
                  return b.idx - a.idx;
                })
                .map((card) => (
                  <Card cards={cards} card={card} key={card.idx} onDelete={onDelete} onEdit={onEdit} onSave={onSave} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ cards, card, onDelete, onEdit, onSave }) => {
  var modifyword = useRef(null);
  var modifymeaning = useRef(null);

  useEffect(() => {
    // console.log('useEffect() called.');
    // console.log(modifyword);

    if (modifymeaning.current != null) {
      console.log(modifymeaning.current.value);

      modifyword.current.style.height = '5px';
      modifyword.current.style.height = modifyword.current.scrollHeight + 'px';

      modifymeaning.current.style.height = '5px';
      modifymeaning.current.style.height = modifymeaning.current.scrollHeight + 'px';
    }
  });

  const handleModifyWord = () => {
    modifyword.current.style.height = '5px';
    modifyword.current.style.height = modifyword.current.scrollHeight + 'px';
  };

  const handleModifyMeaning = () => {
    modifymeaning.current.style.height = '5px';
    modifymeaning.current.style.height = modifymeaning.current.scrollHeight + 'px';
  };

  return (
    <div className="added-card draggable bg-color-white" style={{ marginTop: '30px' }}>
      <div stlye={{ display: 'flex', backgroundColor: 'white' }}>
        <div className="div-card-index" style={{ display: 'flex', borderBottom: '1px solid lightgrey', marginBottom: '1rem' }}>
          <h3 style={{ alignSelf: 'center' }}>{card.idx + 1}번 카드</h3>
          {/* <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}> */}
          <div style={{ marginLeft: 'auto' }}>

            {card.isEditing ?
              <MaterialButton
                variant="text"
                style={{ fontWeight: '800' }}
                color={'primary'}
                onClick={() => {
                  const found = cards.find((ccard) => ccard.idx != card.idx && (ccard.word == modifyword.current.value || ccard.meaning == modifymeaning.current.value));
                  if (found != undefined) {
                    alert('중복된 단어나 뜻이 이미 세트에 존재합니다.');
                    return;
                  }

                  console.log(modifyword.current.value);
                  console.log(modifymeaning.current.value);
                  card.word = modifyword.current.value;
                  card.meaning = modifymeaning.current.value;
                  onSave(card);
                }}
              ><FiSave size="32" />저장</MaterialButton>
              :
              <MaterialButton
                variant="text"
                style={{ fontWeight: '800' }}
                color={'primary'}
                onClick={() => {
                  console.log('edit button clicked.');
                  onEdit(card.idx);
                }}
              ><FiEdit2 size="32" />수정</MaterialButton>
            }

            <MaterialButton
              variant="text"
              style={{ fontWeight: '800' }}
              color={'secondary'}
              onClick={() => {
                onDelete(card.idx);
              }}
            ><FiTrash2 size="32" />삭제</MaterialButton>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', padding: '1rem' }}>
          <div className="mx-3" style={{ width: '40%' }}>
            <span className="word">단어</span>
            {card.isEditing && (
              <Form.Control className="inputbox" as="textarea" placeholder={card.word} ref={modifyword} defaultValue={card.word} style={{ fontSize: '20px', borderRadius: 0 }} onKeyUp={handleModifyWord} />
            )}
            {!card.isEditing && (
              <pre style={{ borderBottom: '5px solid black', wordBreak: 'break-all' }}>
                <span style={{ fontSize: '20px' }}>{card.word}</span>
              </pre>
            )}
          </div>
          <div className="mx-3" style={{ width: '60%' }}>
            <span className="descpription">뜻</span>
            {card.isEditing && (
              <Form.Control className="inputbox" as="textarea" placeholder={card.meaning} ref={modifymeaning} defaultValue={card.meaning} style={{ fontSize: '20px', borderRadius: 0 }} onKeyUp={handleModifyMeaning} />
            )}
            {!card.isEditing && (
              <pre style={{ borderBottom: '5px solid black', wordBreak: 'break-all', overflowX: 'hidden' }}>
                <span style={{ fontSize: '20px' }}>{card.meaning}</span>
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetCreatePage;
