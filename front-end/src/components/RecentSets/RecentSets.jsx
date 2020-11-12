import React, { useState, useEffect } from 'react';
import 'animate.css';
import './RecentSets.css';
import axios from 'axios';
import SERVER from '../../api/server';
import backImg from '../../assets/images/logo_transparent.png';
// import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { IoIosCreate } from 'react-icons/io';
import SkillCard from './SkillCard';

const RecentSets = (props) => {
  // console.log('Recent', props)
  const [bookList, setBookList] = useState(null);

  useEffect(() => {
    axios.get(SERVER.BASE_URL + SERVER.ROUTES.myset).then((res) => {
      setBookList(res.data);
    });
  }, []);

  const renderComponent = () => {
    if (bookList === null) {
      // 렌더링 초기값 설정부분, 초기값을 null 로 두고 bookList 가 불러지기 전에는 비어있는 div 리턴
      return <div></div>;
    } else if (bookList.length > 0) {
      // bookList 가 존재할 때, 컴포넌트화
      if (bookList.length > 4) {
        bookList.length = 4;
      }
      var lengthArr = []; // map 함수 위한 배열

      for (var i = 0; i < bookList.length; i++) {
        // bookList 의 길이가 3이면 [1, 2, 3] 배열 만들어줌
        lengthArr.push(i + 1);
      }

      return lengthArr.map((
        i, // bookList 의 길이만큼 SkillCard 컴포넌트 생성
      ) => (
        <SkillCard history={props.history} key={i - 1} book={bookList} index={i - 1} /> // 컴포넌트 생성하면서 해당 인덱스를 prop 으로 넘겨줌
      ));
    } else {
      // bookList 가 존재하지 않을 때, Default 컴포넌트
      return (
        <div
          className="skill-card "
          onClick={() => {
            props.history.push({ pathname: '/set-create' });
          }}
        >
          <header className="skill-card__header">
            <img className="skill-card__icon" src={backImg} alt="HTML5 Logo" />
          </header>
          <section className="skill-card__body">
            <div>
              <h2 className="skill-card__title" style={{ color: 'black' }}>
                암기의정석
              </h2>
            </div>

            <span className="skill-card__duration">
              <IoIosCreate size={20} color={''} style={{ marginRight: '5px' }} />
              세트 만들러가기
            </span>
            <ul className="skill-card__knowledge">
              <li className="text-center">
                <Button className="RecetPage-set-create-btn" size="lg">
                  <p>세트 만들기</p>
                </Button>
              </li>
            </ul>
          </section>
        </div>
      );
    }
  };

  return (
    <section className="bg">
      <p className="title">세트 미리보기</p>
      {/* {bookList ? <p className="title">최근 스크랩한 세트</p> : <p className="title">암기의정석</p>} */}
      <div className="card-container">
        <div className="cards-list">{renderComponent()}</div>
      </div>
    </section>
  );
};

export default withRouter(RecentSets);
