import React, { useState } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import './StudyPage.css';
const StudyPage = () => {
  const [flippy, setflippy] = useState('');

  return (
    <div className="studyBackground">
      <Flippy
        className="flippy"
        flipOnHover={false} // default false
        flipOnClick={true} // default false
        flipDirection="horizontal" // horizontal or vertical
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
  );
};

export default StudyPage;
