import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { DropDown } from '../../components';
import './SetsPage.css';
import 'animate.css';

const SetsPage = () => {
  const users = [
    {
      id: 1,
      username: 'velopert',
      title: '정보처리기사',
    },
    {
      id: 2,
      username: 'tester',
      title: '토익영어',
    },
    {
      id: 3,
      username: 'liz',
      title: '전기기사',
    },
    {
      id: 4,
      username: 'liz',
      title: '전기기사',
    },
    {
      id: 5,
      username: 'liz',
      title: '전기기사',
    },
    {
      id: 6,
      username: 'liz',
      title: '전기기사',
    },
    {
      id: 7,
      username: 'liz',
      title: '전기기사',
    },
  ];

  function User({ user }) {
    return (
      <a className="card4 " href="#">
        <h3>{user.title}</h3>
        <p>({user.username})</p>
        <p className="small"></p>
        <div className="dimmer"></div>
        <div className="go-corner" href="#">
          <div className="go-arrow">→</div>
        </div>
      </a>
    );
  }
  const scrollToTop = (e) => {
    window.scrollTo(0, 1000);
  };
  const refToTop = useRef();

  return (
    <div className="Sets-root" ref={refToTop}>
      <div className="Sets-container">
        <p style={{ fontSize: '2.4em', fontWeight: '600' }}>세트 목록</p>
        <div className="ButtonContainer">
          <DropDown className="SetsDropDown" />
          <Button variant="outline-dark">
            <Link to="/create-set">
              <span style={{ fontWeight: '800' }}>세트 만들기</span>
            </Link>
          </Button>
        </div>
        {users.map((user) => (
          <User user={user} key={user.id} />
        ))}
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

export default SetsPage;
