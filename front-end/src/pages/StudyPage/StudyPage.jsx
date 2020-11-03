import React, { useState } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import CoreStyles from '../StudyPage/styles.scss';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/open-animation/open-animation.scss';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';
import Switch from 'react-input-switch';
import './StudyPage.css';
import DarkModeToggle from 'react-dark-mode-toggle';

const StudyPage = () => {
  const cards = [
    {
      // id: 1,
      word: '정보처리기사',
      meaning: '뜻',
    },
    {
      // id: 2,
      word: '아하',
      meaning: '뜻',
    },
    {
      // id: 3,
      word: '붹',
      meaning: '뜻',
    },
  ];

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
            <p>{data.word}</p>
          </FrontSide>
          <BackSide className="BackSide">
            <p>{data.meaning}</p>
          </BackSide>
        </Flippy>
      </div>
    );
  }
  const [flippy, setflippy] = useState('');
  const [value, setValue] = useState('yes');
  // const [isDarkMode, setIsDarkMode] = useState(() => false);
  return (
    <div className="StudyPageContainer">
      {/* <p>진행률</p>
      <div className="StudyprogressContainer">
        <Progress className="Studyprogress" percent={88} />
        <Switch className="switch" on="yes" off="no" value={value} onChange={setValue} />
      </div> */}
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
