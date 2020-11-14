import React, { useState, useRef } from 'react';

import { AwesomeButton } from 'react-awesome-button';
import './GamePage.css';
import { useEffect } from 'react';

const GamePage = (props) => {
  const [cardList, setCardList] = useState(props.location.state.cardList);
  // const [cardList, setCardList] = useState([]);

  let [randCardList, setRandCardList] = useState([]);
  let [hasFlippedCard, setHasFlippedCard] = useState(false);
  let [lockBoard, setLockBoard] = useState(false);

  // let firstCard = useRef(null);
  // let secondCard = useRef(null);

  let [firstCard, setFirstCard] = useState(null);
  let [secondCard, setSecondCard] = useState(null);

  let [randList, setRandList] = useState([]);
  // console.log('game props : ', props);
  // console.log('cardList state : ', cardList);

  useEffect(() => {
    // console.log('카드 길이 : ', cardList.length);

    // 카드를 최대 8개까지만 추출하는 작업!

    let tmpCardList = [];
    let cnt = 0;
    while (true) {
      if (cardList.length == 0 || tmpCardList.length == 6) break;

      let randIdx = parseInt(Math.random() * cardList.length);
      // console.log('randIdx : ', randIdx);

      let tmpCard = cardList[randIdx];
      // console.log('tmpCard : ', tmpCard);
      tmpCard.order1 = Math.floor(Math.random() * 12);
      tmpCard.order2 = Math.floor(Math.random() * 12);

      cardList.splice(randIdx, 1);

      // console.log('splice 후 cardList 길이 : ', cardList.length);

      tmpCardList.push(tmpCard);
    }

    setRandCardList(tmpCardList);

    // console.log('추출된 카드들 : ', randCardList);
    let ttmpList = [];
    for (var i = 0; i < tmpCardList.length; i++) {
      ttmpList.push(Math.floor(Math.random() * tmpCardList.length));
    }

    // console.log('ttmpList : ', ttmpList);
    setRandList(ttmpList);
  }, []);

  return (
    <>
      <div className="CardTest-background"></div>
      {/* <AwesomeButton
        // style={{ marginTop: '1rem' }}
        className="aws-Quizback-btn"
        type="primary"
        onPress={() => {
          props.history.push({ pathname: '/set-detail', state: { book: props.location.state.book } });
        }}
      >
        <span>돌아가기</span>
      </AwesomeButton> */}

      <AwesomeButton
        className="aws-game-btn"
        type="primary"
        style={{ width: '100px', marginRight: '10px' }}
        onPress={() => {
          props.history.push({ pathname: '/set-detail', state: { book: props.location.state.book } });
        }}
      >
        <span>뒤로가기</span>
      </AwesomeButton>

      <div className="" style={{ marginTop: '2vh', display: 'flex', justifyContent: 'center' }}>
        <div className="" style={{ display: 'flex', justifyContent: 'space-around', width: '25vw', height: '10vh' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10vw', height: '10vh' }}>
            <div style={{ width: '20%', paddingBottom: '20%', backgroundColor: '#343148ff' }}></div>
            &nbsp;
            <span style={{ fontSize: '1.2rem' }}> : 단어</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10vw', height: '10vh' }}>
            <div style={{ width: '20%', paddingBottom: '20%', backgroundColor: '#d7c49eff' }}></div>
            &nbsp;
            <span style={{ fontSize: '1.2rem' }}> : 뜻</span>
          </div>
        </div>
      </div>
      <section className="memory-game">
        {randCardList.map((card) => (
          <Card
            card={card}
            key={card.id}
            hasFlippedCard={hasFlippedCard}
            setHasFlippedCard={setHasFlippedCard}
            firstCard={firstCard}
            setFirstCard={setFirstCard}
            secondCard={secondCard}
            setSecondCard={setSecondCard}
            lockBoard={lockBoard}
            setLockBoard={setLockBoard}
            idx={card.idx}
            randList={randList}
            order1={card.order1}
            order2={card.order2}
          />
        ))}
      </section>
    </>
  );
};

const Card = ({ card, hasFlippedCard, setHasFlippedCard, firstCard, setFirstCard, secondCard, setSecondCard, lockBoard, setLockBoard, idx, randList, order1, order2 }) => {
  const wordRef = useRef(null);
  const meaningRef = useRef(null);

  const [tmpFirstCard, setTmpFirstCard] = useState(firstCard);
  const [tmpSecondCard, setTmpSecondCard] = useState(secondCard);

  const [matchCnt, setMatchCnt] = useState(0);

  useEffect(() => {
    if (firstCard != null && tmpSecondCard != null) checkForMatch();
  }, [tmpFirstCard, tmpSecondCard]);

  useEffect(() => {
    console.log('matchCnt : ', matchCnt);
  }, [matchCnt]);

  const unflipCards = () => {
    setLockBoard(true);
    console.log('--------------------------------------------------');
    console.log('unflipCards called.');
    console.log('--------------------------------------------------');

    setTimeout(() => {
      firstCard.current.classList.remove('flip');
      secondCard.current.classList.remove('flip');
      // setLockBoard(false);
      resetBoard();
    }, 1500);
  };

  const checkForMatch = () => {
    console.log('-----------------------------------------------');
    console.log('checkForMatch called.');
    console.log('-----------------------------------------------');

    console.log('firstCard의 card id : ', firstCard.current.getAttribute('cardid'));
    console.log('secondCard의 card id : ', tmpSecondCard.current.getAttribute('cardid'));

    console.log('둘이 같냐? ', firstCard.current.getAttribute('cardid') == tmpSecondCard.current.getAttribute('cardid'));

    if (firstCard.current.getAttribute('cardid') == tmpSecondCard.current.getAttribute('cardid')) {
      setMatchCnt((prev) => prev + 1);
      console.log('같다');
      // setMatchCnt((prev) => prev + 1);
      disableCards();

      return;
    }

    unflipCards();
  };

  const flipCard = (ref) => {
    if (lockBoard) return;

    if (ref == firstCard) {
      console.log('같은 div 두 번 누름.');
      return;
    }

    console.log('flipCard 실행됨.');
    ref.current.classList.add('flip');

    if (!hasFlippedCard) {
      setHasFlippedCard(true);
      // firstCard = ref;
      setFirstCard(ref);
      setTmpFirstCard(ref);
      // console.log('firstCard 선택됨. firstCard : ', firstCard);

      return;
    }

    setSecondCard(ref);
    setTmpSecondCard(ref);
    // setHasFlippedCard(false);

    // checkForMatch();
  };

  const resetBoard = () => {
    setHasFlippedCard(false);
    setLockBoard(false);

    setFirstCard(null);
    setTmpFirstCard(null);
    setSecondCard(null);
    setTmpSecondCard(null);

    console.log('!!!!!!!!!!!!!!!!!!! resetBoard 실행됨');

    // [hasFlippedCard, lockBoard] = [false, false];
    // [firstCard, secondCard] = [null, null];
  };

  const disableCards = () => {
    console.log('disableCards called.');

    // e.preventDefault();
    // e.stopPropagation();

    // firstCard.current.removeEventListener('click', flipCard);
    // tmpSecondCard.current.removeEventListener('click', flipCard);
    console.log('firstCard : ', firstCard);
    console.log('tmpFirstCard : ', tmpFirstCard);
    let temp = firstCard;
    console.log('temp : ', temp);

    temp.current.disabled = true;
    // temp.current.setAttribute('disabled', true);
    console.log('tmpFirstCard : ', tmpFirstCard);
    // tmpFirstCard.current.firstChild.disabled = true;
    // firstCard.current.firstChild.disabled = true;

    console.log('firstCard.current.firstChild : ', firstCard.current.firstChild);
    firstCard.current.firstChild.setAttribute('disabled', true);
    // firstCard.current.setAttribute('disabled', true);

    console.log('tmpSecondCard : ', tmpSecondCard);

    // tmpSecondCard.current.disabled = true;
    tmpSecondCard.current.firstChild.setAttribute('disabled', true);

    resetBoard();
  };

  return (
    <>
      {/* <div className="memory-card" ref={wordRef} cardid={card.id} style={{ order: randList[idx - 1] }}> */}
      <div className="memory-card" ref={wordRef} cardid={card.id} style={{ order: order1 }}>
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          className="front-face-word"
          // src={iconReact}
          alt="React"
          onClick={() => {
            console.log('front clicked.');
            console.log('wordRef.current : ', wordRef.current);
            console.log('wordRef.current.firstChild : ', wordRef.current.firstChild);
            console.log('wordRef.current.firstChild.getAttribute("disabled") : ', wordRef.current.firstChild.getAttribute('disabled'));
            // if (!wordRef.current.firstChild.disabled) flipCard(wordRef);
            if (!wordRef.current.firstChild.getAttribute('disabled')) {
              flipCard(wordRef);
            }
          }}
        >
          {card.word}
        </div>
        <div
          className="back-face-word"
          // src={iconReact}
          alt="React"
          onClick={() => {
            flipCard(wordRef);
          }}
        ></div>
      </div>

      {/* <div className="memory-card" ref={meaningRef} cardid={card.id} style={{ order: randList[idx] }}> */}
      <div className="memory-card" ref={meaningRef} cardid={card.id} style={{ order: order2 }}>
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          className="front-face-meaning"
          // src={iconReact}
          alt="React"
          onClick={() => {
            // if (!meaningRef.current.disabled)
            if (!meaningRef.current.firstChild.getAttribute('disabled')) {
              flipCard(meaningRef);
            }
          }}
        >
          {card.meaning}
        </div>
        <div
          className="back-face-meaning"
          // src={iconReact}
          alt="React"
          onClick={() => {
            flipCard(meaningRef);
          }}
        ></div>
      </div>
    </>
  );
};

export default GamePage;
