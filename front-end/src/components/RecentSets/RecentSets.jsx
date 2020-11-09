import React, { useState, useEffect } from 'react';
import 'animate.css';
import './RecentSets.css';
import axios from 'axios';
import SERVER from '../../api/server';
import Moment from 'react-moment';
import backImg from '../../assets/images/logo_transparent.png';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const RecentSets = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    console.log('bookList =>', bookList);
  }, []);

  const renderComponent = () => {
    if (bookList.length == 0) {
      return (
        <div className="card-overflow">
          {/* <div className="card 1 animate__animated animate__fadeInLeft"> */}
          {/* <div className="card_content title-white"> */}
          <p className="none-recent-card">스크랩한 세트가 없습니다.</p>

          <Link to="/set-create">
            <Button style={{ backgroundColor: 'white' }}>
              <span style={{ fontWeight: '800', color: 'black', borderColor: 'white' }}>세트 만들기</span>
            </Button>
          </Link>
          {/* </div> */}
          {/* </div> */}
        </div>
      );
    } else if (bookList.length == 1) {
      return (
        <div class="skill-card">
          <header class="skill-card__header">
            <img class="skill-card__icon" src={backImg} alt="HTML5 Logo" />
          </header>
          <section class="skill-card__body">
            <div>
              <h2 class="skill-card__title" style={{ color: 'black' }}>
                {bookList[0].title}
              </h2>
            </div>

            <span class="skill-card__duration">작성자 : {bookList[0].user.name}</span>
            <ul class="skill-card__knowledge">
              <li className="book-description">설명 : {bookList[0].description}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
              <li>
                생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[0].created_at}</Moment>
              </li>
              {/* <li>{bookList[0].user.name}</li> */}
            </ul>
          </section>
        </div>
      );
    } else if (bookList.length == 2) {
      return (
        <>
          <div class="skill-card">
            <header class="skill-card__header">
              <img class="skill-card__icon" src={backImg} alt="HTML5 Logo" />
            </header>
            <section class="skill-card__body">
              <div>
                <h2 class="skill-card__title" style={{ color: 'black' }}>
                  {bookList[0].title}
                </h2>
              </div>

              <span class="skill-card__duration">작성자 : {bookList[0].user.name}</span>
              <ul class="skill-card__knowledge">
                <li className="book-description">설명 : {bookList[0].description}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
                <li>
                  생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[0].created_at}</Moment>
                </li>
                {/* <li>{bookList[0].user.name}</li> */}
              </ul>
            </section>
          </div>

          <div class="skill-card">
            <header class="skill-card__header">
              <img class="skill-card__icon" src={backImg} alt="HTML5 Logo" />
            </header>
            <section class="skill-card__body">
              <div>
                <h2 class="skill-card__title" style={{ color: 'black' }}>
                  {bookList[1].title}
                </h2>
              </div>

              <span class="skill-card__duration">작성자 : {bookList[1].user.name}</span>
              <ul class="skill-card__knowledge">
                <li className="book-description">설명 : {bookList[1].description}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
                <li>
                  생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[1].created_at}</Moment>
                </li>
                {/* <li>{bookList[0].user.name}</li> */}
              </ul>
            </section>
          </div>
        </>
      );
    } else if (bookList.length == 3) {
      return (
        <>
          <div class="skill-card">
            <header class="skill-card__header">
              <img class="skill-card__icon" src={backImg} alt="HTML5 Logo" />
            </header>
            <section class="skill-card__body">
              <div>
                <h2 class="skill-card__title" style={{ color: 'black' }}>
                  {bookList[0].title}
                </h2>
              </div>

              <span class="skill-card__duration">작성자 : {bookList[0].user.name}</span>
              <ul class="skill-card__knowledge">
                <li className="book-description">설명 : {bookList[0].description}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
                <li>
                  생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[0].created_at}</Moment>
                </li>
                {/* <li>{bookList[0].user.name}</li> */}
              </ul>
            </section>
          </div>

          <div class="skill-card">
            <header class="skill-card__header">
              <img class="skill-card__icon" src={backImg} alt="HTML5 Logo" />
            </header>
            <section class="skill-card__body">
              <div>
                <h2 class="skill-card__title" style={{ color: 'black' }}>
                  {bookList[1].title}
                </h2>
              </div>

              <span class="skill-card__duration">작성자 : {bookList[1].user.name}</span>
              <ul class="skill-card__knowledge">
                <li className="book-description">설명 : {bookList[1].description}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
                <li>
                  생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[1].created_at}</Moment>
                </li>
                {/* <li>{bookList[0].user.name}</li> */}
              </ul>
            </section>
          </div>

          <div class="skill-card">
            <header class="skill-card__header">
              <img class="skill-card__icon" src={backImg} alt="HTML5 Logo" />
            </header>
            <section class="skill-card__body">
              <div>
                <h2 class="skill-card__title" style={{ color: 'black' }}>
                  {bookList[2].title}
                </h2>
              </div>

              <span class="skill-card__duration">작성자 : {bookList[2].user.name}</span>
              <ul class="skill-card__knowledge">
                <li className="book-description">설명 : {bookList[2].description}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
                <li>
                  생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[2].created_at}</Moment>
                </li>
                {/* <li>{bookList[0].user.name}</li> */}
              </ul>
            </section>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div class="skill-card">
            <header class="skill-card__header">
              <img class="skill-card__icon" src={backImg} alt="HTML5 Logo" />
            </header>
            <section class="skill-card__body">
              <div>
                <h2 class="skill-card__title" style={{ color: 'black' }}>
                  {bookList[0].title}
                </h2>
              </div>

              <span class="skill-card__duration">작성자 : {bookList[0].user.name}</span>
              <ul class="skill-card__knowledge">
                <li className="book-description">설명 : {bookList[0].description}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
                <li>
                  생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[0].created_at}</Moment>
                </li>
                {/* <li>{bookList[0].user.name}</li> */}
              </ul>
            </section>
          </div>
          <div class="skill-card">
            <header class="skill-card__header">
              <img class="skill-card__icon" src={backImg} alt="HTML5 Logo" />
              {/* <img class="skill-card__icon" src="https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg" alt="HTML5 Logo" /> */}
            </header>
            <section class="skill-card__body">
              <h2 class="skill-card__title" style={{ color: 'black' }}>
                {bookList[1].title}
              </h2>

              <span class="skill-card__duration">작성자 : {bookList[1].user.name}</span>
              <ul class="skill-card__knowledge">
                <li className="book-description">설명 : {bookList[1].description}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
                <li>
                  생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[1].created_at}</Moment>
                </li>
                {/* <li>{bookList[0].user.name}</li> */}
              </ul>
            </section>
          </div>
          <div class="skill-card">
            <header class="skill-card__header">
              <img class="skill-card__icon" src={backImg} alt="HTML5 Logo" />
              {/* <img class="skill-card__icon" src="https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg" alt="HTML5 Logo" /> */}
            </header>
            <section class="skill-card__body">
              <h2 class="skill-card__title" style={{ color: 'black' }}>
                {bookList[2].title}
              </h2>

              <span class="skill-card__duration">작성자 : {bookList[2].user.name}</span>
              <ul class="skill-card__knowledge">
                <li className="book-description">설명 : {bookList[2].description}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
                <li>
                  생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[2].created_at}</Moment>
                </li>
                {/* <li>{bookList[0].user.name}</li> */}
              </ul>
            </section>
          </div>
          <div class="skill-card">
            <header class="skill-card__header">
              <img class="skill-card__icon" src={backImg} alt="HTML5 Logo" />
              {/* <img class="skill-card__icon" src="https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg" alt="HTML5 Logo" /> */}
            </header>
            <section class="skill-card__body">
              <h2 class="skill-card__title" style={{ color: 'black' }}>
                {bookList[3].title}
              </h2>

              <span class="skill-card__duration">작성자 : {bookList[3].user.name}</span>
              <ul class="skill-card__knowledge">
                <li className="book-description">설명 : {bookList[3].description}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
                <li>
                  생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[3].created_at}</Moment>
                </li>
                {/* <li>{bookList[0].user.name}</li> */}
              </ul>
            </section>
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    axios.get(SERVER.BASE_URL + SERVER.ROUTES.myset).then((res) => {
      console.log(res);
      setBookList(res.data);
    });
  }, []);

  return (
    <section className="bg">
      <h1 className="title">최근 스크랩한 세트</h1>
      <div className="card-container">
        <div className="cards-list">{renderComponent()}</div>
      </div>
    </section>
  );
};

export default RecentSets;
