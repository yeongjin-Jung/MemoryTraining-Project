/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { DropDown } from '../../components';
import './SetsPage.css';
import 'animate.css';
import FadeIn from 'react-fade-in';

import axios from 'axios';
import SERVER from '../../api/server';

const SetsPage = (props) => {
  const [DropDownValue, setDropDownValue] = useState('all');
  const [bookList, setBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const refToTop = useRef();

  const onChanegeHandler = (Value) => {
    setDropDownValue(Value);
  };

  const getBookList = async () => {
    console.log('getBookList called.');

    await axios.get(SERVER.BASE_URL + SERVER.ROUTES.myset).then((res) => {
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

  return (
    <div className="Sets-root" ref={refToTop}>
      <div className="Home-BackgroundColor"></div>
      <div className="Sets-container">
        <p style={{ fontSize: '2.7em', fontWeight: '600' }}>세트 목록</p>
        <div className="ButtonContainer">
          <DropDown className="SetsDropDown" onChanegeHandler={onChanegeHandler} />

          <Link to="/set-create">
            <Button style={{ backgroundColor: 'white' }}>
              <span style={{ fontWeight: '800', color: 'black' }}>세트 만들기</span>
            </Button>
          </Link>
        </div>

        {!isLoading && (
          <FadeIn delay={250} className="FadeIn-container">
            {DropDownValue == 'all' && bookList.map((book) => <Book book={book} key={book.id} history={props.history} />)}
            {DropDownValue == 'MySet' && bookList.filter((book) => book.write_flag == 1).map((book) => <Book book={book} key={book.id} history={props.history} />)}
            {DropDownValue == 'Scrap' && bookList.filter((book) => book.write_flag == 0).map((book) => <Book book={book} key={book.id} history={props.history} />)}
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

function Book({ book, history }) {
  return (
    <div className="card-container">
      <a
        className="card4"
        onClick={() => {
          console.log(`${book.id} clicked.`);
          // console.log('history : ', history);
          console.log('book : ', book);
          history.push({ pathname: '/set-detail', state: { book: book } });
        }}
      >
        <h3>{book.title}</h3>
        <p>{book.description}</p>
        <p>작성자 : {book.user.email}</p>
        <p className="small"></p>
        <div className="dimmer"></div>
        <div className="go-corner">
          <div className="go-arrow">→</div>
        </div>
      </a>
    </div>
  );
}

export default SetsPage;
