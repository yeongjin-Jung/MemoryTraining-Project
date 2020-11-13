import React, { useState, useEffect } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import { Link } from 'react-router-dom';
import CoreStyles from '../StudyPage/styles.scss';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/open-animation/open-animation.scss';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { useSpeechSynthesis } from 'react-speech-kit';
import 'simplebar/dist/simplebar.min.css';
import { BsBookmark } from 'react-icons/bs';
import { FcBookmark } from 'react-icons/fc';
import axios from 'axios';
import SERVER from '../../api/server';
import { AwesomeButton } from 'react-awesome-button';
import 'react-sweet-progress/lib/style.css';
import '../../assets/css/back-btn-styles.css';
import './StudyPage.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Flag from 'react-country-flags';

const ref = React.createRef();
const useStyles = makeStyles({
  root1: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  root2: {
    background: 'linear-gradient(45deg, #F0000 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
});

const StudyPage = (props) => {
  const { speak, cancel, voices } = useSpeechSynthesis();
  const cards = props.location.state.cardList;
  const book = props.location.state.book;
  const [cardList, setCardList] = useState(cards);

  useEffect(() => {
    window.onkeyup = function (e) {
      if (e.key == 'ArrowRight') {
        document.getElementsByClassName('awssld__next')[0].click();
      } else if (e.key == 'ArrowLeft') {
        document.getElementsByClassName('awssld__prev')[0].click();
      } else if (e.key == 'ArrowUp') {
        document
          .getElementsByClassName('awssld__box awssld--active')[0]
          .getElementsByClassName('awssld__content')[0]
          .getElementsByClassName('FlippyContainer-root')[0]
          .getElementsByClassName('FlippyContainer')[0]
          .getElementsByClassName('flippy-container')[0]
          .click();
      } else if (e.key == 'ArrowDown') {
        document
          .getElementsByClassName('awssld__box awssld--active')[0]
          .getElementsByClassName('awssld__content')[0]
          .getElementsByClassName('FlippyContainer-root')[0]
          .getElementsByClassName('FlippyContainer')[0]
          .getElementsByClassName('flippy-container')[0]
          .click();
      }
    };

    return () => {
      window.speechSynthesis.cancel();
    };
  });

  const speechWord = (e, word, num) => {
    cancel();
    speak({
      text: word,
      voice: voices[num],
    });
    e.stopPropagation();
  };

  const speechMeaning = (e, meaning, num) => {
    cancel();
    speak({
      text: meaning,
      voice: voices[num],
    });
    e.stopPropagation();
  };

  const handleCard = (card) => {
    var idx = cardList.findIndex((ele) => ele.id == card.id);
    let tmpCardList = [...cardList];
    tmpCardList[idx].bookmark_flag = !tmpCardList[idx].bookmark_flag;

    setCardList(tmpCardList);
  };

  return (
    // <SimpleBar style={{ height: '100%' }}>
    <div className="StudyPageContainer">
      <div className="Study-BackgroundColor"></div>
      <AwesomeButton
        className="aws-studyback-btn"
        type="primary"
        onPress={() => {
          props.history.push({ pathname: '/set-detail', state: { book: book } });
        }}
      >
        <span>뒤로가기</span>
      </AwesomeButton>
      {cards.length == 0 && (
        <div className="FlippyContainer-root" key={0}>
          <div className="none-bookmark">
            <p>북마크 된 단어가 없습니다.</p>
          </div>
        </div>
      )}
      {cards.length != 0 && (
        <AwesomeSlider className="slider" infinite={false} bullets={false} animation="openAnimation" cssModule={(CoreStyles, AwesomeSliderStyles)}>
          {cards.map((data, index) => (
            <div className="FlippyContainer-root" key={index}>
              <Card data={data} handleCard={handleCard} book={book} speechWord={speechWord} speechMeaning={speechMeaning} />
            </div>
          ))}
        </AwesomeSlider>
      )}
    </div>
    // </SimpleBar>
  );
};

const Card = ({ data, handleCard, book, speechWord, speechMeaning }) => {
  const { cancel } = useSpeechSynthesis();
  const [card, setCard] = useState(data);
  const classes = useStyles();

  useEffect(() => {
    var nextClick = document.querySelector('.awssld__next');
    nextClick.onclick = function () {
      cancel();
    };

    var prevClick = document.querySelector('.awssld__prev');
    prevClick.onclick = function () {
      cancel();
    };
    setCard(data);
  });

  return (
    <div className="FlippyContainer">
      <Flippy
        className="flippy"
        flipOnHover={false} // default false
        flipOnClick={true} // default false
        flipDirection="vertical" // horizontal or vertical
      >
        <FrontSide className="FrontSide">
          <div className="bookmark-icon">
            <button
              onClick={(e) => {
                console.log('bookmark button clicked.');

                // 북마크가 안되어있는 상태라면 -> 북마크 활성화
                if (!card.bookmark_flag) {
                  axios.post(SERVER.BASE_URL + SERVER.ROUTES.bookmark, { book_id: book.id, card_id: card.id }).then((res) => {
                    console.log(res);
                  });
                }

                // 북마크가 되있는 상태라면 -> 북마크 해제
                else {
                  axios.delete(SERVER.BASE_URL + SERVER.ROUTES.unbookmark, { data: { book_id: book.id, card_id: card.id } }).then((res) => {
                    console.log(res);
                  });
                }

                handleCard(card);
                e.stopPropagation();
              }}
            >
              {card.bookmark_flag && <FcBookmark size={32} />}
              {!card.bookmark_flag && <BsBookmark size={32} />}
            </button>
          </div>
          <div className="word-type">단어</div>
          <div className="speech-button" style={{ display: 'flex', width: '50%', justifyContent: 'space-around', alignItems: 'center', top: '1.4em' }}>
            <Flag
              className="flag us"
              country="us"
              asSquare={true}
              onClick={(e) => {
                speechWord(e, data.word, 3);
              }}
            />

            <Flag
              className="flag kr"
              country="kr"
              asSquare={true}
              onClick={(e) => {
                speechWord(e, data.word, 13);
              }}
            />

            <Flag
              className="flag cn"
              country="cn"
              asSquare={true}
              onClick={(e) => {
                speechWord(e, data.word, 18);
              }}
            />
          </div>
          <div className="word-content">{data.word}</div>
        </FrontSide>
        <BackSide className="BackSide">
          <div className="bookmark-icon">
            <button
              onClick={(e) => {
                console.log('bookmark button clicked.');

                // 북마크가 안되어있는 상태라면 -> 북마크 활성화
                if (!card.bookmark_flag) {
                  axios.post(SERVER.BASE_URL + SERVER.ROUTES.bookmark, { book_id: book.id, card_id: card.id }).then((res) => {
                    console.log(res);
                  });
                }

                // 북마크가 되있는 상태라면 -> 북마크 해제
                else {
                  axios.delete(SERVER.BASE_URL + SERVER.ROUTES.unbookmark, { data: { book_id: book.id, card_id: card.id } }).then((res) => {
                    console.log(res);
                  });
                }

                handleCard(card);
                e.stopPropagation();
              }}
            >
              {card.bookmark_flag && <FcBookmark size={32} />}
              {!card.bookmark_flag && <BsBookmark size={32} />}
            </button>
          </div>
          <div className="word-type">뜻</div>
          <div className="speech-button" style={{ display: 'flex', width: '50%', justifyContent: 'space-around', alignItems: 'center', top: '1.4em' }}>
            <Flag
              className="flag us"
              country="us"
              asSquare={true}
              onClick={(e) => {
                speechMeaning(e, data.meaning, 3);
              }}
            />

            <Flag
              className="flag kr"
              country="kr"
              asSquare={true}
              onClick={(e) => {
                speechMeaning(e, data.meaning, 13);
              }}
            />

            <Flag
              className="flag cn"
              country="cn"
              asSquare={true}
              onClick={(e) => {
                speechMeaning(e, data.meaning, 18);
              }}
            />
          </div>
          <div className="meaning-content">{data.meaning}</div>
        </BackSide>
      </Flippy>
    </div>
  );
};

export default StudyPage;
