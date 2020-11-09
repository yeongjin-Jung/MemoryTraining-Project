import React from 'react';
import { RecentSets, HomeTitle } from '../../components';
import './Home.css';

const Home = (props) => {
  return (
    <>
      <div className="Home-BackgroundColor"></div>
      <HomeTitle />
      <RecentSets className="RecentSets" props={props} />
    </>
  );
};

export default Home;
