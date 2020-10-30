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
      <AwesomeSlider className="slider" bullets={false} animation="openAnimation" cssModule={(CoreStyles, AwesomeSliderStyles)}>
        <div className="FlippyContainer">
          <Flippy
            className="flippy"
            flipOnHover={false} // default false
            flipOnClick={true} // default false
            flipDirection="vertical" // horizontal or vertical
            ref={(r) => setflippy(r)} // to use toggle method like this.flippy.toggle()
            // if you pass isFlipped prop component will be controlled component.
            // and other props, which will go to div
            /// these are optional style, it is not necessary
          >
            <FrontSide
              style={{
                backgroundColor: '#41669d',
              }}
            >
              RICK
            </FrontSide>
            <BackSide style={{ backgroundColor: '#175852' }}>ROCKS</BackSide>
          </Flippy>
        </div>
        <div className="FlippyContainer">
          <Flippy
            className="flippy"
            flipOnHover={false} // default false
            flipOnClick={true} // default false
            flipDirection="vertical" // horizontal or vertical
            ref={(r) => setflippy(r)} // to use toggle method like this.flippy.toggle()
            // if you pass isFlipped prop component will be controlled component.
            // and other props, which will go to div
            /// these are optional style, it is not necessary
          >
            <FrontSide
              className="FrontSide"
              style={{
                backgroundColor: '#41669d',
              }}
            >
              RICK
            </FrontSide>
            <BackSide style={{ backgroundColor: '#175852' }}>ROCKS</BackSide>
          </Flippy>
        </div>
        <div className="FlippyContainer">
          <Flippy
            className="flippy"
            flipOnHover={false} // default false
            flipOnClick={true} // default false
            flipDirection="vertical" // horizontal or vertical
            ref={(r) => setflippy(r)} // to use toggle method like this.flippy.toggle()
            // if you pass isFlipped prop component will be controlled component.
            // and other props, which will go to div
            /// these are optional style, it is not necessary
          >
            <FrontSide
              style={{
                backgroundColor: '#41669d',
              }}
            >
              RICK
            </FrontSide>
            <BackSide style={{ backgroundColor: '#175852' }}>ROCKS</BackSide>
          </Flippy>
        </div>
        <div className="FlippyContainer">
          <Flippy
            className="flippy"
            flipOnHover={false} // default false
            flipOnClick={true} // default false
            flipDirection="vertical" // horizontal or vertical
            ref={(r) => setflippy(r)} // to use toggle method like this.flippy.toggle()
            // if you pass isFlipped prop component will be controlled component.
            // and other props, which will go to div
            /// these are optional style, it is not necessary
          >
            <FrontSide
              style={{
                backgroundColor: '#41669d',
              }}
            >
              RICK
            </FrontSide>
            <BackSide style={{ backgroundColor: '#175852' }}>ROCKS</BackSide>
          </Flippy>
        </div>
      </AwesomeSlider>
    </div>
  );
};

export default StudyPage;
