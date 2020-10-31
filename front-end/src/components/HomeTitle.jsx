import React, { useState } from 'react';
import './HomeTitle.css';
import '../assets/css/util.css';
import { withRouter } from 'react-router-dom';

const HomeTitle = (props) => {
  return (
    <div className="title-background" role="group" aria-label="actionButtons">
      <div className="container-title">
        <div className="wrap-title"></div>
        <p className="title-comment">암기의 정석이 어려분의 암기를 도와드립니다</p>
      </div>
    </div>
  );
};

export default withRouter(HomeTitle);
