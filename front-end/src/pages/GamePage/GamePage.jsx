import React, { useState, useRef } from 'react';

import iconReact from '../../assets/images/react.svg';
import iconJS from '../../assets/images/js-badge.svg';
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

  // console.log('game props : ', props);
  // console.log('cardList state : ', cardList);

  useEffect(() => {
    // console.log('카드 길이 : ', cardList.length);

    // 카드를 최대 8개까지만 추출하는 작업!

    let tmpCardList = [];
    while (true) {
      if (cardList.length == 0 || randCardList.length == 8) break;

      let randIdx = parseInt(Math.random() * cardList.length);
      // console.log('randIdx : ', randIdx);

      let tmpCard = cardList[randIdx];
      cardList.splice(randIdx, 1);

      // console.log('splice 후 cardList 길이 : ', cardList.length);

      tmpCardList.push(tmpCard);
    }

    setRandCardList(tmpCardList);
    // console.log('추출된 카드들 : ', randCardList);
  }, []);

  return (
    <section className="memory-game">
      <div className="CardTest-background"></div>
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
        />
      ))}
    </section>
  );
};

const Card = ({ card, hasFlippedCard, setHasFlippedCard, firstCard, setFirstCard, secondCard, setSecondCard, lockBoard, setLockBoard }) => {
  const wordRef = useRef(null);
  const meaningRef = useRef(null);

  const [tmpSecondCard, setTmpSecondCard] = useState(secondCard);

  const [match, setMatch] = useState(false);

  useEffect(() => {
    // console.log('firstCard : ', firstCard);
    // console.log('secondCard : ', secondCard);
  }, [match]);

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
      disableCards();

      return;
    }

    unflipCards();
  };

  const flipCard = (ref) => {
    if (lockBoard) return;

    if (ref == firstCard) {
      console.log('둘이 같음.');
      return;
    }

    ref.current.classList.add('flip');

    if (!hasFlippedCard) {
      setHasFlippedCard(true);
      // firstCard = ref;
      setFirstCard(ref);
      // console.log('firstCard 선택됨. firstCard : ', firstCard);

      return;
    }

    setSecondCard(ref);
    setTmpSecondCard(ref);
    // setHasFlippedCard(false);

    checkForMatch();
  };

  const resetBoard = () => {
    setHasFlippedCard(false);
    setLockBoard(false);
    setFirstCard(null);
    setSecondCard(null);

    // [hasFlippedCard, lockBoard] = [false, false];
    // [firstCard, secondCard] = [null, null];
  };

  const disableCards = () => {
    console.log('disableCards called.');
    // e.preventDefault();
    // e.stopPropagation();

    firstCard.current.removeEventListener('click', flipCard);
    secondCard.current.removeEventListener('click', flipCard);

    resetBoard();
  };

  return (
    <>
      <div className="memory-card" ref={wordRef} cardid={card.id}>
        <div
          className="front-face"
          // src={iconReact}
          alt="React"
          onClick={() => {
            flipCard(wordRef);
          }}
        >
          단어 - {card.word}
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

      <div className="memory-card" ref={meaningRef} cardid={card.id}>
        <div
          className="front-face"
          // src={iconReact}
          alt="React"
          onClick={() => {
            flipCard(meaningRef);
          }}
        >
          뜻 - {card.meaning}
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
