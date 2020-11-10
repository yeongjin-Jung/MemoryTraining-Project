import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import Switch from 'react-switch';
import { FaHeart, FaBars } from 'react-icons/fa';

import { FcBookmark } from 'react-icons/fc';
import { FaBookmark } from 'react-icons/fa';
import { BsBookmark } from 'react-icons/bs';
import axios from 'axios';
import SERVER from '../../api/server';
import './Main.css';

import Aside from './Aside';

const Main = ({ collapsed, rtl, toggled, history, image, handleToggleSidebar, handleCollapsedChange, handleRtlChange, handleImageChange, book }) => {
  const intl = useIntl();

  const [entireCardList, setEntireCardList] = useState([]);
  const [bookmarkedCardList, setBookmarkedCardList] = useState([]);

  const [entireQuizList, setEntireQuizList] = useState([]);
  const [bookmarkedQuizList, setBookmarkedQuizList] = useState([]);

  const getEntireCardList = async () => {
    await axios.get(SERVER.BASE_URL + SERVER.ROUTES.getEntireCards + book.id).then((res) => {
      // console.log('getEntireCardList res: ', res);
      setEntireCardList(res.data);
    });
  };

  const getBookmarkedCardList = async () => {
    await axios
      .get(SERVER.BASE_URL + SERVER.ROUTES.getEntireCards + book.id, {
        params: {
          bookmark: 'True',
        },
      })
      .then((res) => {
        // console.log('getBookmarkedCardList res: ', res);
        setBookmarkedCardList(res.data);
      });
  };

  const getEntireQuizList = async () => {
    await axios.get(SERVER.BASE_URL + SERVER.ROUTES.getEntireQuizs + book.id).then((res) => {
      // console.log('RES getEntireQuizList: ', res);
      setEntireQuizList(res.data);
    });
  };

  const getBookmarkedQuizList = async () => {
    await axios
      .get(SERVER.BASE_URL + SERVER.ROUTES.getEntireQuizs + book.id, {
        params: {
          bookmark: 'True',
        },
      })
      .then((res) => {
        // console.log('getBookmarkedQuizList quiz: ', res);
        setBookmarkedQuizList(res.data);
      });
  };

  useEffect(() => {
    console.log('Main.js useEffect called.');
    getEntireCardList();
    getBookmarkedCardList();
    getEntireQuizList();
    getBookmarkedQuizList();
  }, []);

  return (
    <>
      <Aside
        book={book}
        collapsed={collapsed}
        rtl={rtl}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        history={history}
        entireCardList={entireCardList}
        bookmarkedCardList={bookmarkedCardList}
        entireQuizList={entireQuizList}
        bookmarkedQuizList={bookmarkedQuizList}
      />
      <main>
        <div className="sidebar-btn">
          <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
            <FaBars />
          </div>
        </div>
        <header>
          {/* <div className="h1 text-center">
          {book.title}&nbsp; (<FcBookmark /> : 북마크 표시)
        </div> */}
          <div className="text-center">
            <div className="h1">
              {book.title}
              <div className="h3">
                &nbsp; (<FcBookmark /> : 북마크 표시)
              </div>
            </div>
          </div>
        </header>

        <div className="CardList-root">
          <div className="CardList-container">
            {entireCardList.map((card) => (
              <Card book={book} card={card} key={card.id} getBookmarkedCardList={getBookmarkedCardList} getEntireQuizList={getEntireQuizList} getBookmarkedQuizList={getBookmarkedQuizList} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

const Card = ({ book, card, getBookmarkedCardList, getEntireQuizList, getBookmarkedQuizList }) => {
  const [color, setColor] = useState(card.bookmark_flag ? 'red' : 'black');

  useEffect(() => {
    // console.log('useEffect -> color : ', color);
  });

  const handleBookmark = async () => {
    await axios.post(SERVER.BASE_URL + SERVER.ROUTES.bookmark, { book_id: book.id, card_id: card.id }).then((res) => {
      console.log(res);
      getBookmarkedCardList();
      getEntireQuizList();
      getBookmarkedQuizList();
    });
  };

  const handleUnBookmark = async () => {
    await axios.delete(SERVER.BASE_URL + SERVER.ROUTES.unbookmark, { data: { book_id: book.id, card_id: card.id } }).then((res) => {
      console.log(res);
      getBookmarkedCardList();
      getEntireQuizList();
      getBookmarkedQuizList();
    });
  };

  return (
    <div className="courses-container">
      <div className="course">
        <div className="course-info">
          <div>
            <button
              className=""
              onClick={() => {
                if (color == 'black') {
                  // console.log('bookmark.');
                  setColor('red');
                  // console.log('book.id : ', book.id);
                  // console.log('card.id : ', card.id);
                  // axios.post(SERVER.BASE_URL + SERVER.ROUTES.bookmark, { book_id: book.id, card_id: card.id }).then((res) => {
                  //   console.log(res);
                  //   getBookmarkedCardList();
                  //   getBookmarkedQuizList();
                  // });
                  handleBookmark();
                } else {
                  // console.log('unbookmark.');
                  setColor('black');
                  // console.log('book.id : ', book.id);
                  // console.log('card.id : ', card.id);
                  // axios.delete(SERVER.BASE_URL + SERVER.ROUTES.unbookmark, { data: { book_id: book.id, card_id: card.id } }).then((res) => {
                  //   console.log(res);
                  //   getBookmarkedCardList();
                  //   getBookmarkedQuizList();
                  // });
                  handleUnBookmark();
                }
              }}
            >
              {color == 'red' && <FcBookmark size={32} />}
              {color == 'black' && <BsBookmark size={32} />}
            </button>
          </div>
          <div className="Card-word">
            <p>
              <big style={{ fontWeight: 900 }}>단어 : </big>
              {card.word}
            </p>
          </div>
          <div className="Card-meaning">
            <p>
              <big>뜻 : </big>
              {card.meaning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
