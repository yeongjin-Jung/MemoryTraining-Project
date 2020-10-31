// 로그인 후 화면입니다.

// NAV, Carousel, Set div로 구성 예정입니다.

// 무성 작성 예정.

import React from 'react';
import { MyCarousel, RecentSets, HomeTitle } from '../components';
import { Route } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <>
      {/* <MyCarousel /> */}
      <div className="Home-BackgroundColor"></div>
      <HomeTitle />
      <RecentSets className="RecentSets" />
    </>
  );
};

export default Home;
