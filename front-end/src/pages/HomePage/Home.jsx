import React from 'react';
import { RecentSets, HomeTitle } from '../../components';
import './Home.css';

const Home = (props) => {
  // console.log('Home', props)
  return (
    <>
      <div className="Home-BackgroundColor"></div>
      <HomeTitle />
      <RecentSets history={props.history} />
    </>
  );
};

export default Home;
