import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AwesomeButton } from 'react-awesome-button';

import './GamePage.css';

const GamePage = (props) => {
  const [cardList, setCardList] = useState(props.location.state.cardList);

  const [matchCnt, setMatchCnt] = useState(0);
  const [randCardList, setRandCardList] = useState([]);
  const [hasFlippedCard, setHasFlippedCard] = useState(false);
  const [lockBoard, setLockBoard] = useState(false);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [randList, setRandList] = useState([]);

  const [flag, setFlag] = useState(true);
  const [show, setShow] = useState(false);

  const [timerID, setTimerID] = useState(null);

  let res = useRef(null);

  const handleShow = () => setShow(true);
  const handleClose = (param) => {
    res.current = param;
    setShow(false);
    clearInterval(timerID);
    setTimerID(null);

    if (res.current != null && res.current) {
      //수정 console.log('다시하기 예.');
      setMatchCnt(0);
      setRandCardList([]);
      setRandList([]);
      setFirstCard(null);
      setSecondCard(null);
      setFlag(true);
    } else if (res.current != null && !res.current) {
      //수정 console.log('다시하기 아니오.');
      props.history.push({ pathname: '/set-detail', state: { book: props.location.state.book } });
    }
  };

  let globalCardList = useRef([]);

  useEffect(() => {
    if (flag == true) {
      setCardList(props.location.state.cardList);

      globalCardList = [...cardList];
      //수정 console.log('globalCardList 대입 후 : ', globalCardList);
      setCards();
    }
  }, [flag]);

  useEffect(() => {
    //수정 console.log('randCardList : ', randCardList);
  }, [randCardList]);

  const check = () => {
    //수정 console.log('1초마다 interval 도는중...');
    // //수정 console.log('res.current : ', res.current);
    res = null;
  };

  useEffect(() => {
    //수정 console.log('matchCnt : ', matchCnt);
    //수정 console.log('randCardList.length : ', randCardList.length);
    if (matchCnt != 0 && randCardList.length * 2 == matchCnt) {
      //수정 console.log('다맞춤.');
      handleShow();
      check();

      let tmid = setInterval(check, 1000);

      //수정 console.log('tmid : ', tmid);
      setTimerID(tmid);
    }
  }, [matchCnt]);

  // useEffect(() => {
  //   if (timerID != null) {
  //     clearInterval(timerID);
  //     setTimerID(null);
  //   }
  // }, [timerID]);

  const setCards = () => {
    let tmpCardList = [];

    // //수정 console.log('setCards function called. globalCardList : ', globalCardList);

    while (true) {
      if (globalCardList.length == 0 || tmpCardList.length == 6) break;

      let randIdx = parseInt(Math.random() * globalCardList.length);
      // //수정 console.log('randIdx : ', randIdx);

      let tmpCard = globalCardList[randIdx];
      // //수정 console.log('tmpCard : ', tmpCard);
      tmpCard.order1 = Math.floor(Math.random() * 12);
      tmpCard.order2 = Math.floor(Math.random() * 12);

      globalCardList.splice(randIdx, 1);

      // //수정 console.log('splice 후 cardList 길이 : ', cardList.length);

      tmpCardList.push(tmpCard);
    }

    setRandCardList(tmpCardList);

    // //수정 console.log('추출된 카드들 : ', randCardList);
    let ttmpList = [];
    for (var i = 0; i < tmpCardList.length; i++) {
      ttmpList.push(Math.floor(Math.random() * tmpCardList.length));
    }

    // //수정 console.log('ttmpList : ', ttmpList);
    setRandList(ttmpList);
    setFlag(false);
  };

  return (
    <>
      <div className="CardTest-background"></div>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header style={{ borderBottom: 'none' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Modal.Title style={{ justifyContent: 'center' }}>다시 하시겠습니까?</Modal.Title>
          </div>
          <button
            type="button"
            className="float-right"
            onClick={() => {
              // //수정 console.log('custom x button clicked.');
              handleClose(false);
            }}
          >
            <span aria-hidden="true">x</span>
            <span className="sr-only">Close</span>
          </button>
        </Modal.Header>
        <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="primary"
            onClick={() => {
              // res.current = true;
              handleClose(true);
            }}
          >
            예
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              // res.current = false;
              handleClose(false);
            }}
          >
            아니요
          </Button>
        </Modal.Footer>
      </Modal>

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
        <div className="" style={{ display: 'flex', justifyContent: 'space-around', width: '40vw', height: '10vw' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '30vw', height: '10vw' }}>
            {/* <div style={{ width: '20%', paddingBottom: '20%', backgroundColor: '#343148ff' }}></div> */}
            <div style={{ width: '20%', paddingBottom: '20%', background: 'linear-gradient(45deg, #4099ff, #73b4ff)' }}></div>
            &nbsp;
            <span className="header-word"> : 단어</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '30vw', height: '10vw' }}>
            {/* <div style={{ width: '20%', paddingBottom: '20%', backgroundColor: '#d7c49eff' }}></div> */}
            <div style={{ width: '20%', paddingBottom: '20%', background: 'linear-gradient(45deg, #ffb64d, #ffcb80)' }}></div>
            &nbsp;
            <span className="header-meaning"> : 뜻</span>
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
            matchCnt={matchCnt}
            setMatchCnt={setMatchCnt}
            show={show}
          />
        ))}
      </section>
    </>
  );
};

const Card = ({ card, hasFlippedCard, setHasFlippedCard, firstCard, setFirstCard, secondCard, setSecondCard, lockBoard, setLockBoard, order1, order2, matchCnt, setMatchCnt, show }) => {
  const wordRef = useRef(null);
  const meaningRef = useRef(null);

  const [tmpFirstCard, setTmpFirstCard] = useState(firstCard);
  const [tmpSecondCard, setTmpSecondCard] = useState(secondCard);

  const [toggle, setToggle] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!show) {
      //수정 console.log('toggle.current : ', toggle.current);
      setToggle('flip');
      setTimeout(() => {
        // toggle = '';
        setToggle('');
        setDisabled(false);
      }, 5000);
    }
  }, []);

  useEffect(() => {
    if (firstCard != null && tmpSecondCard != null) checkForMatch();
  }, [tmpFirstCard, tmpSecondCard]);

  useEffect(() => {
    //수정 console.log('matchCnt : ', matchCnt);
  }, [matchCnt]);

  const unflipCards = () => {
    setLockBoard(true);
    //수정 console.log('--------------------------------------------------');
    //수정 console.log('unflipCards called.');
    //수정 console.log('--------------------------------------------------');

    setTimeout(() => {
      firstCard.current.classList.remove('flip');
      secondCard.current.classList.remove('flip');
      // setLockBoard(false);
      resetBoard();
    }, 1000);
  };

  const checkForMatch = () => {
    //수정 console.log('-----------------------------------------------');
    //수정 console.log('checkForMatch called.');
    //수정 console.log('-----------------------------------------------');

    //수정 console.log('firstCard의 card id : ', firstCard.current.getAttribute('cardid'));
    //수정 console.log('secondCard의 card id : ', tmpSecondCard.current.getAttribute('cardid'));

    //수정 console.log('둘이 같냐? ', firstCard.current.getAttribute('cardid') == tmpSecondCard.current.getAttribute('cardid'));

    if (firstCard.current.getAttribute('cardid') == tmpSecondCard.current.getAttribute('cardid')) {
      setMatchCnt((prev) => prev + 1);
      //수정 console.log('같다');
      // setMatchCnt((prev) => prev + 1);
      disableCards();

      setMatchCnt((prev) => prev + 1);

      return;
    }

    unflipCards();
  };

  const flipCard = (ref) => {
    if (lockBoard) return;

    if (ref == firstCard) {
      //수정 console.log('같은 div 두 번 누름.');
      return;
    }

    //수정 console.log('flipCard 실행됨.');
    ref.current.classList.add('flip');

    if (!hasFlippedCard) {
      setHasFlippedCard(true);
      // firstCard = ref;
      setFirstCard(ref);
      setTmpFirstCard(ref);
      // //수정 console.log('firstCard 선택됨. firstCard : ', firstCard);

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

    //수정 console.log('!!!!!!!!!!!!!!!!!!! resetBoard 실행됨');

    // [hasFlippedCard, lockBoard] = [false, false];
    // [firstCard, secondCard] = [null, null];
  };

  const disableCards = () => {
    //수정 console.log('disableCards called.');

    // e.preventDefault();
    // e.stopPropagation();

    // firstCard.current.removeEventListener('click', flipCard);
    // tmpSecondCard.current.removeEventListener('click', flipCard);
    //수정 console.log('firstCard : ', firstCard);
    //수정 console.log('tmpFirstCard : ', tmpFirstCard);
    let temp = firstCard;
    //수정 console.log('temp : ', temp);

    temp.current.disabled = true;
    // temp.current.setAttribute('disabled', true);
    //수정 console.log('tmpFirstCard : ', tmpFirstCard);
    // tmpFirstCard.current.firstChild.disabled = true;
    // firstCard.current.firstChild.disabled = true;

    //수정 console.log('firstCard.current.firstChild : ', firstCard.current.firstChild);
    firstCard.current.firstChild.setAttribute('disabled', true);
    // firstCard.current.setAttribute('disabled', true);

    //수정 console.log('tmpSecondCard : ', tmpSecondCard);

    // tmpSecondCard.current.disabled = true;
    tmpSecondCard.current.firstChild.setAttribute('disabled', true);

    resetBoard();
  };

  return (
    <>
      {/* <div className="memory-card" ref={wordRef} cardid={card.id} style={{ order: randList[idx - 1] }}> */}
      <div className={`memory-card ${toggle}`} ref={wordRef} cardid={card.id} style={{ order: order1 }}>
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          className="front-face-word"
          // src={iconReact}
          alt="React"
          onClick={() => {
            // //수정 console.log('front clicked.');
            // //수정 console.log('wordRef.current : ', wordRef.current);
            // //수정 console.log('wordRef.current.firstChild : ', wordRef.current.firstChild);
            // //수정 console.log('wordRef.current.firstChild.getAttribute("disabled") : ', wordRef.current.firstChild.getAttribute('disabled'));
            // //수정 console.log('typeof wordRef.current.firstChild.getAttribute("disabled") : ', typeof wordRef.current.firstChild.getAttribute('disabled'));
            //수정 console.log('!wordRef.current.firstChild.hasAttribute("disabled") : ', !wordRef.current.firstChild.hasAttribute('disabled'));
            // if (!wordRef.current.firstChild.getAttribute('disabled')) {
            if (!wordRef.current.firstChild.hasAttribute('disabled') && !wordRef.current.firstChild.getAttribute('disabled')) {
              //수정 console.log('!wordRef.current.firstChild.hasAttribute("disabled") : ', !wordRef.current.firstChild.hasAttribute('disabled'));
              flipCard(wordRef);
            }
          }}
          disabled={disabled}
        >
          {card.word}
        </div>
        <div
          className="back-face-word"
          // src={iconReact}
          alt="React"
          onClick={() => {
            // //수정 console.log('back clicked.');
            // //수정 console.log('wordRef.current : ', wordRef.current);
            // //수정 console.log('wordRef.current.firstChild : ', wordRef.current.firstChild);
            // //수정 console.log('wordRef.current.firstChild.getAttribute("disabled") : ', wordRef.current.firstChild.getAttribute('disabled'));
            // //수정 console.log('typeof wordRef.current.firstChild.getAttribute("disabled") : ', typeof wordRef.current.firstChild.getAttribute('disabled'));
            //수정 console.log('!wordRef.current.firstChild.hasAttribute("disabled") : ', !wordRef.current.firstChild.hasAttribute('disabled'));
            // if (!wordRef.current.firstChild.getAttribute('disabled')) {
            if (!wordRef.current.firstChild.hasAttribute('disabled') && !wordRef.current.firstChild.getAttribute('disabled')) {
              //수정 console.log('!wordRef.current.firstChild.hasAttribute("disabled") : ', !wordRef.current.firstChild.hasAttribute('disabled'));
              flipCard(wordRef);
            }
          }}
          disabled={disabled}
        ></div>
      </div>

      {/* <div className="memory-card" ref={meaningRef} cardid={card.id} style={{ order: randList[idx] }}> */}
      <div className={`memory-card ${toggle}`} ref={meaningRef} cardid={card.id} style={{ order: order2 }}>
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          className="front-face-meaning"
          // src={iconReact}
          alt="React"
          onClick={() => {
            // //수정 console.log('front clicked.');
            // //수정 console.log('meaningRef.current : ', meaningRef.current);
            // //수정 console.log('meaningRef.current.firstChild : ', meaningRef.current.firstChild);
            // //수정 console.log('typeof meaningRef.current.firstChild.getAttribute("disabled") : ', typeof meaningRef.current.firstChild.getAttribute('disabled'));
            // //수정 console.log('meaningRef.current.firstChild.hasAttribute("disabled") : ', meaningRef.current.firstChild.hasAttribute('disabled'));
            if (!meaningRef.current.firstChild.hasAttribute('disabled') && !meaningRef.current.firstChild.getAttribute('disabled')) {
              flipCard(meaningRef);
            }
          }}
          disabled={disabled}
        >
          {card.meaning}
        </div>
        <div
          className="back-face-meaning"
          // src={iconReact}
          alt="React"
          onClick={() => {
            // //수정 console.log('front clicked.');
            // //수정 console.log('meaningRef.current : ', meaningRef.current);
            // //수정 console.log('meaningRef.current.firstChild : ', meaningRef.current.firstChild);
            // //수정 console.log('typeof meaningRef.current.firstChild.getAttribute("disabled") : ', typeof meaningRef.current.firstChild.getAttribute('disabled'));
            // //수정 console.log('meaningRef.current.firstChild.hasAttribute("disabled") : ', meaningRef.current.firstChild.hasAttribute('disabled'));
            if (!meaningRef.current.firstChild.hasAttribute('disabled') && !meaningRef.current.firstChild.getAttribute('disabled')) {
              flipCard(meaningRef);
            }
          }}
          disabled={disabled}
        ></div>
      </div>
    </>
  );
};

export default GamePage;
