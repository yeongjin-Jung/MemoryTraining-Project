// 로그인 후 화면입니다.

// NAV, Carousel, Set div로 구성 예정입니다.

// 무성 작성 예정.

import React from 'react';
import { MyCarousel, RecentSets } from '../components';
import { Route } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <MyCarousel />
      <RecentSets />
    </>
  );
};

export default Home;
