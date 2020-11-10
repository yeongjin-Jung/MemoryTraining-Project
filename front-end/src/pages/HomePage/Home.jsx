import React from 'react';
import { RecentSets, HomeTitle } from '../../components';
import './Home.css';

const Home = () => {
  return (
    <>
      <div className="Home-BackgroundColor"></div>
      <HomeTitle />
      <RecentSets className="RecentSets" />
    </>
  );
};

export default Home;
