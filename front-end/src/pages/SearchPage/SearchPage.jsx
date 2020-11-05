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
import { BsBoxArrowInDown } from 'react-icons/bs';

import axios from 'axios';
import SERVER from '../../api/server';

const SearchPage = (props) => {
  const [DropDownValue, setDropDownValue] = useState('name');
  // const bookList = [];
  const [bookList, setBookList] = useState([]);
  const searchValue = props.location.state.searchValue;
  const [isLoading, setIsLoading] = useState(true);

  const getBookList = async () => {
    console.log('getBookList called.');

    await axios.get(SERVER.BASE_URL + SERVER.ROUTES.search, { params: { keyword: searchValue } }).then((res) => {
      console.log(res);
      let tmpBookList = [];
      tmpBookList = [...res.data];
      // console.log('tmpBookList : ', tmpBookList);
      setBookList(tmpBookList);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getBookList();
  }, []);

  useEffect(() => {
    console.log('searchValue 바뀜.');
    console.log('searchValue : ', searchValue);
    getBookList();
  }, [searchValue]);

  const refToTop = useRef();
  const onChaneHandler = (Value) => {
    setDropDownValue(Value);
  };

  // {
  //   DropDownValue == 'name' &&
  //     bookList.sort(function (a, b) {
  //       // 오름차순
  //       return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
  //       // 광희, 명수, 재석, 형돈
  //     });
  // }

  // const Moment = require('moment');

  // {
  //   DropDownValue == 'date' &&
  //     bookList.sort(function (a, b) {
  //       // 내림차순
  //       return new Moment(a.date).format('YYYYMMDD') - new Moment(b.date).format('YYYYMMDD');
  //       // 광희, 명수, 재석, 형돈
  //     });
  // }

  return (
    <div className="search-root" ref={refToTop}>
      <div className="Home-BackgroundColor"></div>
      <div className="search-container">
        <p className="search-title">검색어 : {searchValue}</p>
        <div className="ButtonContainer">
          <SortDropDown className="searchDropDown" onChaneHandler={onChaneHandler} />
          <Link to="/create-set">
            <Button variant="outline-dark">
              <span style={{ fontWeight: '800' }}>세트 만들기</span>
            </Button>
          </Link>
        </div>
        {/* <div> */}

        {!isLoading && (
          <FadeIn className="FadeIn-container" duration={1000} delay={250} transitionDuration={1000}>
            {bookList.map((book) => (
              <Book book={book} key={book.id} />
            ))}
            {/* {DropDownValue == 'date' && bookList.map((user) => <User user={user} key={user.id} />)} */}
            {/* {DropDownValue == 'date' && bookList.filter((bookList) => bookList.title == 'liz').map((user) => <User user={user} key={user.id} />)} */}
            {/* {DropDownValue == 'Scrap' && bookList.filter((bookList) => bookList.title != 'liz').map((user) => <User user={user} key={user.id} />)} */}
            {/* </div> */}
          </FadeIn>
        )}
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

const Book = ({ book }) => {
  const [show, bookListhow] = useState(false);
  const [cardList, setCardList] = useState([]);
  const buttonRef = useRef(null);
  const [color, setColor] = useState('black');

  const handleShow = () => {
    console.log('handleShow called.');
    console.log('before : ', show);
    bookListhow(true);
    console.log('after : ', show);
  };

  const handleClose = () => {
    console.log('handleClose called.');
    console.log('before : ', show);
    bookListhow(false);
    console.log('after : ', show);
  };

  const getCardList = async () => {
    console.log('getBookList called.');
    // await axios.get(`http://127.0.0.1:8000/api/books/${book.id}`).then((res) => {
    await axios.get(SERVER.BASE_URL + book.id).then((res) => {
      console.log(res);
      let tmpCardList = [];
      tmpCardList = [...res.data];
      console.log('tmpCardList : ', tmpCardList);
      setCardList(tmpCardList);
    });
  };

  useEffect(() => {
    console.log('Book component useEffect called.');
  });

  useEffect(() => {
    if (show) {
      getCardList();
    }
  }, [show]);

  return (
    <div className="card-container">
      <div
        className="card4"
        onClick={(e) => {
          console.log('e.target.tagName : ', e.target.tagName);
          if (e.target.tagName == 'svg' || e.target.tagName == 'BUTTON') {
            if (color == 'black') {
              console.log('before : ', color);
              setColor('red');
              alert('스크랩되었습니다.');
              console.log('after : ', color);
            } else {
              setColor('black');
              alert('스크랩 해제되었습니다.');
            }
          } else {
            console.log(e.target.tagName);
            handleShow();
          }
        }}
      >
        <div className="real-card">
          <h3>
            {book.id} : {book.title}
          </h3>
          <p>{book.description}</p>
          <p>수정 날짜 : {book.updated_at}</p>
          <p>작성자 이메일: {book.user.email}</p>
          <p>작성자 이름 : {book.user.name}</p>
          <p className="small"></p>
          <div className="dimmer"></div>
          <div className="go-corner">
            <div className="go-arrow">→</div>
          </div>
        </div>
        <div>
          <Button>
            <BsBoxArrowInDown size={30} color={color} />
          </Button>
        </div>
      </div>

      <Rodal className="container-rodal" width={800} height={700} animation="door" visible={show} onClose={handleClose} duration={1000} closeOnEsc={true}>
        <div className="h1 text-center card-title" style={{ paddingTop: '10px', color: 'white' }}>
          {book.title}
        </div>

        {cardList.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </Rodal>
    </div>
  );
};

const Card = ({ card }) => {
  return (
    <div className="courses-container">
      <div className="course">
        <div className="course-info row">
          <div>
            <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{card.word}</span>
          </div>
          <div>
            <p>{card.meaning}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
