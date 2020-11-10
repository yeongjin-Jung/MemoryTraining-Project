import React, { useState, useEffect } from 'react';
import 'animate.css';
import './RecentSets.css';
import axios from 'axios';
import SERVER from '../../api/server';
import Moment from 'react-moment';
import backImg from '../../assets/images/logo_transparent.png';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { IoIosCreate } from 'react-icons/io';
import Marquee from 'react-double-marquee';

const RecentSets = (props) => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    console.log('bookList =>', bookList);
    console.log('props =>', props);
  }, []);

  const renderComponent = () => {
    if (bookList.length == 0) {
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
    } else if (bookList.length == 1) {
      return (
        <div
          className="skill-card "
          onClick={() => {
            props.history.push({ pathname: '/set-detail', state: { book: bookList[0] } });
          }}
        >
          <header className="skill-card__header">
            <img className="skill-card__icon" src={backImg} alt="HTML5 Logo" />
          </header>
          <section className="skill-card__body">
            <div>
              <h2 className="skill-card__title" style={{ color: 'black' }}>
                <Marquee>{bookList[0].title}</Marquee>
              </h2>
            </div>

            <span className="skill-card__duration">작성자 : {bookList[0].user.name}</span>
            <ul className="skill-card__knowledge">
              <li className="book-description">설명 : {bookList[0].description}</li>
              <li>
                생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[0].created_at}</Moment>
              </li>
            </ul>
          </section>
        </div>
      );
    } else if (bookList.length == 2) {
      return (
        <>
          <div
            className="skill-card"
            onClick={() => {
              props.history.push({ pathname: '/set-detail', state: { book: bookList[0] } });
            }}
          >
            <header className="skill-card__header">
              <img className="skill-card__icon" src={backImg} alt="HTML5 Logo" />
            </header>
            <section className="skill-card__body">
              <div>
                <h2 className="skill-card__title" style={{ color: 'black' }}>
                  <Marquee>{bookList[0].title}</Marquee>
                </h2>
              </div>

              <span className="skill-card__duration">작성자 : {bookList[0].user.name}</span>
              <ul className="skill-card__knowledge">
                <li className="book-description">설명 : {bookList[0].description}</li>
                <li>
                  생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[0].created_at}</Moment>
                </li>
              </ul>
            </section>
          </div>

          <div
            className="skill-card"
            onClick={() => {
              props.history.push({ pathname: '/set-detail', state: { book: bookList[1] } });
            }}
          >
            <header className="skill-card__header">
              <img className="skill-card__icon" src={backImg} alt="HTML5 Logo" />
            </header>
            <section className="skill-card__body">
              <div>
                <h2 className="skill-card__title" style={{ color: 'black' }}>
                  <Marquee>{bookList[1].title}</Marquee>
                </h2>
              </div>

              <span className="skill-card__duration">작성자 : {bookList[1].user.name}</span>
              <ul className="skill-card__knowledge">
                <li className="book-description">설명 : {bookList[1].description}</li>
                <li>
                  생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[1].created_at}</Moment>
                </li>
              </ul>
            </section>
          </div>
        </>
      );
    } else if (bookList.length == 3) {
      return (
        <>
          <div
            className="skill-card"
            onClick={() => {
              props.history.push({ pathname: '/set-detail', state: { book: bookList[0] } });
            }}
          >
            <header className="skill-card__header">
              <img className="skill-card__icon" src={backImg} alt="HTML5 Logo" />
            </header>
            <section className="skill-card__body">
              <div>
                <h2 className="skill-card__title" style={{ color: 'black' }}>
                  <Marquee>{bookList[0].title}</Marquee>
                </h2>
              </div>

              <span className="skill-card__duration">작성자 : {bookList[0].user.name}</span>
              <ul className="skill-card__knowledge">
                <li className="book-description">설명 : {bookList[0].description}</li>
                <li>
                  생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[0].created_at}</Moment>
                </li>
              </ul>
            </section>
          </div>

          <div
            className="skill-card"
            onClick={() => {
              props.history.push({ pathname: '/set-detail', state: { book: bookList[1] } });
            }}
          >
            <header className="skill-card__header">
              <img className="skill-card__icon" src={backImg} alt="HTML5 Logo" />
            </header>
            <section className="skill-card__body">
              <div>
                <h2 className="skill-card__title" style={{ color: 'black' }}>
                  <Marquee>{bookList[1].title}</Marquee>
                </h2>
              </div>

              <span className="skill-card__duration">작성자 : {bookList[1].user.name}</span>
              <ul className="skill-card__knowledge">
                <li className="book-description">설명 : {bookList[1].description}</li>
                <li>
                  생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[1].created_at}</Moment>
                </li>
              </ul>
            </section>
          </div>

          <div
            className="skill-card"
            onClick={() => {
              props.history.push({ pathname: '/set-detail', state: { book: bookList[2] } });
            }}
          >
            <header className="skill-card__header">
              <img className="skill-card__icon" src={backImg} alt="HTML5 Logo" />
            </header>
            <section className="skill-card__body">
              <div>
                <h2 className="skill-card__title" style={{ color: 'black' }}>
                  <Marquee>{bookList[2].title}</Marquee>
                </h2>
              </div>

              <span className="skill-card__duration">작성자 : {bookList[2].user.name}</span>
              <ul className="skill-card__knowledge">
                <li className="book-description">설명 : {bookList[2].description}</li>
                <li>
                  생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[2].created_at}</Moment>
                </li>
              </ul>
            </section>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            className="skill-card animate__animated animate__fadeInLeft"
            onClick={() => {
              props.history.push({ pathname: '/set-detail', state: { book: bookList[0] } });
            }}
          >
            <header className="skill-card__header">
              <img className="skill-card__icon" src={backImg} alt="HTML5 Logo" />
            </header>
            <section className="skill-card__body">
              <div>
                <h2 className="skill-card__title" style={{ color: 'black' }}>
                  <Marquee>{bookList[0].title}</Marquee>
                </h2>
              </div>

              <span className="skill-card__duration">작성자 : {bookList[0].user.name}</span>
              <ul className="skill-card__knowledge">
                <li className="book-description">설명 : {bookList[0].description}</li>
                <li>
                  생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[0].created_at}</Moment>
                </li>
              </ul>
            </section>
          </div>
          <div
            className="skill-card animate__animated animate__fadeInUp"
            onClick={() => {
              props.history.push({ pathname: '/set-detail', state: { book: bookList[1] } });
            }}
          >
            <header className="skill-card__header">
              <img className="skill-card__icon" src={backImg} alt="HTML5 Logo" />
            </header>
            <section className="skill-card__body">
              <h2 className="skill-card__title" style={{ color: 'black' }}>
                <Marquee>{bookList[1].title}</Marquee>
              </h2>

              <span className="skill-card__duration">작성자 : {bookList[1].user.name}</span>
              <ul className="skill-card__knowledge">
                <li className="book-description">설명 : {bookList[1].description}</li>
                <li>
                  생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[1].created_at}</Moment>
                </li>
              </ul>
            </section>
          </div>
          <div
            className="skill-card animate__animated animate__fadeInDown"
            onClick={() => {
              props.history.push({ pathname: '/set-detail', state: { book: bookList[2] } });
            }}
          >
            <header className="skill-card__header">
              <img className="skill-card__icon" src={backImg} alt="HTML5 Logo" />
            </header>
            <section className="skill-card__body">
              <h2 className="skill-card__title" style={{ color: 'black' }}>
                <Marquee>{bookList[2].title}</Marquee>
              </h2>

              <span className="skill-card__duration">작성자 : {bookList[2].user.name}</span>
              <ul className="skill-card__knowledge">
                <li className="book-description">설명 : {bookList[2].description}</li>
                <li>
                  생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[2].created_at}</Moment>
                </li>
              </ul>
            </section>
          </div>
          <div
            className="skill-card animate__animated animate__fadeInRight"
            onClick={() => {
              props.history.push({ pathname: '/set-detail', state: { book: bookList[3] } });
            }}
          >
            <header className="skill-card__header">
              <img className="skill-card__icon" src={backImg} alt="HTML5 Logo" />
            </header>
            <section className="skill-card__body">
              <h2 className="skill-card__title" style={{ color: 'black' }}>
                <Marquee>{bookList[3].title}</Marquee>
              </h2>

              <span className="skill-card__duration">작성자 : {bookList[3].user.name}</span>
              <ul className="skill-card__knowledge">
                <li className="book-description">설명 : {bookList[3].description}</li>
                <li>
                  생성된 날짜 : <Moment format="YYYY/MM/DD">{bookList[3].created_at}</Moment>
                </li>
              </ul>
            </section>
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    axios.get(SERVER.BASE_URL + SERVER.ROUTES.myset).then((res) => {
      setBookList(res.data);
    });
  }, []);

  return (
    <section className="bg">
      <p className="title">최근 스크랩한 세트</p>
      <div className="card-container">
        <div className="cards-list">{renderComponent()}</div>
      </div>
    </section>
  );
};

export default withRouter(RecentSets);
