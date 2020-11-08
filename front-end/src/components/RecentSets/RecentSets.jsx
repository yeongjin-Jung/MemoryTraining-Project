import React, { useState, useEffect } from 'react';
import 'animate.css';
import './RecentSets.css';
import axios from 'axios';
import SERVER from '../../api/server';

const RecentSets = () => {
  const [bookList, setBookList] = useState([]);

  const renderComponent = () => {
    if (bookList.length == 0) {
      return (
        <div className="card-overflow">
          <div className="card 1 animate__animated animate__fadeInLeft">
            <div className="card_content title-white">
              <p>스크랩한 세트가 없습니다.</p>
            </div>
          </div>
        </div>
      );
    } else if (bookList.length == 1) {
      return (
        <div className="card-overflow">
          <div className="card 1 animate__animated animate__fadeInLeft">
            <div className="card_content title-white">
              <p>{bookList[0].title}</p>
              <p>{bookList[0].user.name}</p>
            </div>
          </div>
        </div>
      );
    } else if (bookList.length == 2) {
      return (
        <>
          <div className="card-overflow">
            <div className="card 1 animate__animated animate__fadeInLeft">
              <div className="card_content title-white">
                <p>{bookList[0].title}</p>
                <p>{bookList[0].user.name}</p>
              </div>
            </div>
          </div>

          <div className="card-overflow">
            <div className="card 1 animate__animated animate__fadeInUp">
              <div className="card_content title-white">
                <p>{bookList[1].title}</p>
                <p>{bookList[1].user.name}</p>
              </div>
            </div>
          </div>
        </>
      );
    } else if (bookList.length == 3) {
      return (
        <>
          <div className="card-overflow">
            <div className="card 1 animate__animated animate__fadeInLeft">
              <div className="card_content title-white">
                <p>{bookList[0].title}</p>
                <p>{bookList[0].user.name}</p>
              </div>
            </div>
          </div>

          <div className="card-overflow">
            <div className="card 1 animate__animated animate__fadeInUp">
              <div className="card_content title-white">
                <p>{bookList[1].title}</p>
                <p>{bookList[1].user.name}</p>
              </div>
            </div>
          </div>

          <div className="card-overflow">
            <div className="card 1 animate__animated animate__fadeInDown">
              <div className="card_content title-white">
                <p>{bookList[2].title}</p>
                <p>{bookList[2].user.name}</p>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="card-overflow">
            <div className="card 1 animate__animated animate__fadeInLeft">
              <div className="card_content title-white">
                <p>{bookList[0].title}</p>
                <p>{bookList[0].user.name}</p>
              </div>
            </div>
          </div>

          <div className="card-overflow">
            <div className="card 1 animate__animated animate__fadeInUp">
              <div className="card_content title-white">
                <p>{bookList[1].title}</p>
                <p>{bookList[1].user.name}</p>
              </div>
            </div>
          </div>

          <div className="card-overflow">
            <div className="card 1 animate__animated animate__fadeInDown">
              <div className="card_content title-white">
                <p>{bookList[2].title}</p>
                <p>{bookList[2].user.name}</p>
              </div>
            </div>
          </div>

          <div className="card-overflow">
            <div className="card 1 animate__animated animate__fadeInRight">
              <div className="card_content title-white">
                <p>{bookList[3].title}</p>
                <p>{bookList[3].user.name}</p>
              </div>
            </div>
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
