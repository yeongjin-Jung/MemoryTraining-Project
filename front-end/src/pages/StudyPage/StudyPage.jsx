import React, { useState, useEffect } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import { Link } from 'react-router-dom';
import CoreStyles from '../StudyPage/styles.scss';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/open-animation/open-animation.scss';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import 'react-sweet-progress/lib/style.css';
import './StudyPage.css';
import Speech from 'react-speech';

const ref = React.createRef();

const StudyPage = (props) => {
  const cards = props.location.state.cardList;
  const book = props.location.state.book;

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    console.log('props =>', props);
    console.log('book : ', book);
  }, []);

  function Card({ data }) {
    return (
      <div className="FlippyContainer">
        <div className="Home-BackgroundColor"></div>

        <Flippy
          className="flippy"
          flipOnHover={false} // default false
          flipOnClick={true} // default false
          flipDirection="vertical" // horizontal or vertical
        >
          <FrontSide className="FrontSide">
            <div className="word-type">단어</div>
            <div className="speech-button" onClick={stopPropagation}>
              <Speech text={data.word} />
            </div>
            <p>{data.word}</p>
          </FrontSide>
          <BackSide className="BackSide">
            <div className="word-type">뜻</div>
            <div className="speech-button" onClick={stopPropagation}>
              <Speech text={data.meaning}></Speech>
            </div>
            <p>{data.meaning}</p>
          </BackSide>
        </Flippy>
      </div>
    );
  }

  return (
    <div className="StudyPageContainer">
      <button
        className="backbtn"
        onClick={() => {
          props.history.push({ pathname: '/set-detail', state: { book: book } });
        }}
      >
        <p className="backbtn-text">뒤로가기</p>
      </button>

      <AwesomeSlider className="slider" infinite={false} bullets={false} animation="openAnimation" cssModule={(CoreStyles, AwesomeSliderStyles)}>
        {cards.map((data, index) => (
          <div className="FlippyContainer-root" key={index}>
            <Card data={data} />
          </div>
        ))}
      </AwesomeSlider>
    </div>
  );
};

export default StudyPage;
