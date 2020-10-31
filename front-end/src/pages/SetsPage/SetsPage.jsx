import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { DropDown } from '../../components';
import './SetsPage.css';
import 'animate.css';

const numbers = [1, 2, 3, 4, 5];

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
  ];

  function User({ user }) {
    return (
      <a className="card4 animate__animated animate__fadeInLeft" href="#">
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
  return (
    <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <Button>
          <Link to="/create-set">세트 만들기</Link>
        </Button>

        <div className="Sets-container">
          <p style={{ fontSize: '2.4em', fontWeight: '600', marginBottom: '1em' }}>세트 목록</p>
          <DropDown />
          {users.map((user) => (
            <User user={user} key={user.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetsPage;
