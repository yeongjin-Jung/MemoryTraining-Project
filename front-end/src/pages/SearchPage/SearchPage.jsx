import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { SortDropDown } from '../../components';
import 'animate.css';
import './SearchPage.css';
import FadeIn from 'react-fade-in';
const SearchPage = () => {
  const [DropDownValue, setDropDownValue] = useState('name');
  const users = [
    {
      id: 1,
      username: 'velopert',
      title: '정보처리기사',
      date: '2018-05-11',
    },
    {
      id: 2,
      username: 'tester',
      title: '토익영어',
      date: '2018-05-16',
    },
    {
      id: 3,
      username: 'aiz',
      title: '전기기사',
      date: '2012-05-11',
    },
    {
      id: 4,
      username: 'ㄱiz',
      title: '전기기사',
      date: '2014-05-11',
    },
    {
      id: 5,
      username: 'liz',
      title: '전기기사',
      date: '2013-06-11',
    },
    {
      id: 6,
      username: 'liz',
      title: '전기기사',
      date: '2011-08-11',
    },
    {
      id: 7,
      username: 'liz',
      title: '전기기사',
      date: '2012-08-11',
    },
  ];

  function User({ user }) {
    return (
      <div className="card-container">
        <a className="card4 " href="#">
          <h3>{user.title}</h3>
          <p>({user.username})</p>
          <p>{user.date}</p>
          <p className="small"></p>
          <div className="dimmer"></div>
          <div className="go-corner" href="#">
            <div className="go-arrow">→</div>
          </div>
        </a>
      </div>
    );
  }

  const refToTop = useRef();
  const onChaneHandler = (Value) => {
    setDropDownValue(Value);
  };
  {
    DropDownValue == 'name' &&
      users.sort(function (a, b) {
        // 오름차순
        return a.username < b.username ? -1 : a.username > b.username ? 1 : 0;
        // 광희, 명수, 재석, 형돈
      });
  }
  const Moment = require('moment');
  {
    DropDownValue == 'date' &&
      users.sort(function (a, b) {
        // 내림차순
        return new Moment(a.date).format('YYYYMMDD') - new Moment(b.date).format('YYYYMMDD');
        // 광희, 명수, 재석, 형돈
      });
  }

  return (
    <div className="search-root" ref={refToTop}>
      <div className="Home-BackgroundColor"></div>
      <div className="search-container">
        <p className="search-title">검색한 세트의 이름</p>
        <div className="ButtonContainer">
          <SortDropDown className="searchDropDown" onChaneHandler={onChaneHandler} />
          <Link to="/create-set">
            <Button variant="outline-dark">
              <span style={{ fontWeight: '800' }}>세트 만들기</span>
            </Button>
          </Link>
        </div>
        <FadeIn delay={250} className="FadeIn-container">
          {users.map((user) => (
            <User user={user} key={user.id} />
          ))}
          {/* {DropDownValue == 'date' && users.map((user) => <User user={user} key={user.id} />)} */}
          {/* {DropDownValue == 'date' && users.filter((sets) => sets.username == 'liz').map((user) => <User user={user} key={user.id} />)} */}
          {/* {DropDownValue == 'Scrap' && users.filter((sets) => sets.username != 'liz').map((user) => <User user={user} key={user.id} />)} */}
        </FadeIn>
      </div>
      <a
        onClick={() => {
          setTimeout(() => {
            refToTop.current.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }}
      >
        <button className="to-top">Top</button>
      </a>
    </div>
  );
};

export default SearchPage;
