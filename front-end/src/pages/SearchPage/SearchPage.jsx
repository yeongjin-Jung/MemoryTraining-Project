import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { SortDropDown } from '../../components';

import 'animate.css';
import './SearchPage.css';
import FadeIn from 'react-fade-in';

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

import { IconContext } from 'react-icons';
import { FcBookmark } from 'react-icons/fc';
import { FaBookmark } from 'react-icons/fa';
import { BsBookmark } from 'react-icons/bs';
import axios from 'axios';

const SearchPage = (props) => {
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

  useEffect(() => {
    console.log('SearchPage component useEffect called.');
    const searchValue = props.location.state.searchValue;

    console.log('SearchPage props : ', props);
    console.log('SearchPage props.location.state : ', props.location.state);
    console.log('SearchPage searchValue : ', searchValue);

    // axios.post('http://127.0.0.1:8000/api/books/search/', {});
  });

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

const User = ({ user }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    console.log('handleShow called.');
    console.log('before : ', show);
    setShow(true);
    console.log('after : ', show);
  };
  const handleClose = () => {
    console.log('handleClose called.');
    console.log('before : ', show);
    setShow(false);
    console.log('after : ', show);
  };

  useEffect(() => {
    console.log('User component useEffect called.');
  });

  return (
    <div className="card-container">
      <div className="card4" onClick={handleShow}>
        <h3>{user.title}</h3>
        <p>({user.username})</p>
        <p>{user.date}</p>
        <p className="small"></p>
        <div className="dimmer"></div>
        <div className="go-corner">
          <div className="go-arrow">→</div>
        </div>
      </div>

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}

      <Rodal className="container-rodal" width={800} height={500} animation="door" visible={show} onClose={handleClose} duration={1000} closeOnEsc={true}>
        {/* <div className="text-center">
          <Button className="btn-danger" style={{ borderRadius: '50%' }} onClick={handleClose}>
            X
          </Button>
        </div> */}
        <div className="h1 text-center card-title" style={{ paddingTop: '10px', color: 'white' }}>
          정보처리기사
        </div>
        {/* <hr /> */}
        {/* <div className="rodal-header container-fluid"></div> */}

        <div className="courses-container">
          <div className="course">
            {/* <div className="course-preview"></div> */}
            <div className="course-info row">
              <div>
                <button className="">
                  <BsBookmark className="bookmark" size={32} />
                </button>
              </div>
              <div className="">
                <span className stlye={{ fontSize: '30px' }}>
                  데이터 관리자(DA, Data Administrator)
                </span>
              </div>
              <div className="row">
                <p className="mx-3">
                  하나의 기업 또는 조직 내에서 데이터를 정의, 체계화, 감독 및 보안 업무를 담당할 뿐만 아니라 데이터에 대한 관리를 총괄하고 정보 활용에 대한 중앙 집중적인 계획 수립 및 통제를 수행한다.
                  전사적으로 수립된 데이터 표준 원칙, 데이터 표준, 데이터 표준 준수 여부 관리 등의 역할이 있다.
                </p>
              </div>
              {/* <div style={{ height: '30px' }}></div> */}
            </div>
          </div>
        </div>
        <div className="courses-container">
          <div className="course">
            {/* <div className="course-preview"></div> */}
            <div className="course-info row">
              <div>
                <button className="">
                  <BsBookmark className="bookmark" size={32} color="red" style={{ BackgroundColor: 'red' }} />
                </button>
              </div>
              <div className="">
                <span className stlye={{ fontSize: '30px' }}>
                  데이터 관리자(DA, Data Administrator)
                </span>
              </div>
              <div className="row">
                <p className="mx-3">
                  하나의 기업 또는 조직 내에서 데이터를 정의, 체계화, 감독 및 보안 업무를 담당할 뿐만 아니라 데이터에 대한 관리를 총괄하고 정보 활용에 대한 중앙 집중적인 계획 수립 및 통제를 수행한다.
                  전사적으로 수립된 데이터 표준 원칙, 데이터 표준, 데이터 표준 준수 여부 관리 등의 역할이 있다.
                </p>
              </div>
              {/* <div style={{ height: '30px' }}></div> */}
            </div>
          </div>
        </div>
        <div className="courses-container">
          <div className="course">
            {/* <div className="course-preview"></div> */}
            <div className="course-info row">
              <div>
                <button className="">
                  <FcBookmark size={32} />
                </button>
              </div>
              <div className="">
                <span className stlye={{ fontSize: '30px' }}>
                  데이터 관리자(DA, Data Administrator)
                </span>
              </div>
              <div className="row">
                <p className="mx-3">
                  하나의 기업 또는 조직 내에서 데이터를 정의, 체계화, 감독 및 보안 업무를 담당할 뿐만 아니라 데이터에 대한 관리를 총괄하고 정보 활용에 대한 중앙 집중적인 계획 수립 및 통제를 수행한다.
                  전사적으로 수립된 데이터 표준 원칙, 데이터 표준, 데이터 표준 준수 여부 관리 등의 역할이 있다.
                </p>
              </div>
              {/* <div style={{ height: '30px' }}></div> */}
            </div>
          </div>
        </div>
      </Rodal>
    </div>
  );
};

export default SearchPage;
