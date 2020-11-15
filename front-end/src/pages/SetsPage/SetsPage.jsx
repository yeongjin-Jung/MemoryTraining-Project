/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { DropDown } from '../../components';
import FadeIn from 'react-fade-in';
import axios from 'axios';
import SERVER from '../../api/server';
import './unscrap-btn-styles.css';
import './SetsPage.css';
import 'animate.css';

import MaterialButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const SetsPage = (props) => {
  const [DropDownValue, setDropDownValue] = useState('all');
  const [bookList, setBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const refToTop = useRef();

  const onChanegeHandler = (Value) => {
    setDropDownValue(Value);
  };

  const getBookList = async () => {
    //수정 console.log('getBookList called.');

    await axios.get(SERVER.BASE_URL + SERVER.ROUTES.myset).then((res) => {
      //수정 console.log(res);
      let tmpBookList = [];
      tmpBookList = [...res.data];
      // //수정 console.log('tmpBookList : ', tmpBookList);
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
            <Button className="set-create-btn">
              <span style={{ fontWeight: '600', color: 'black' }}>세트 만들기</span>
            </Button>
          </Link>
        </div>

        {!isLoading && (
          <FadeIn delay={250} className="FadeIn-container">
            {DropDownValue == 'all' && bookList.map((book) => <Book book={book} key={book.id} history={props.history} getBookList={getBookList} />)}
            {DropDownValue == 'MySet' && bookList.filter((book) => book.write_flag == 1).map((book) => <Book book={book} key={book.id} history={props.history} getBookList={getBookList} />)}
            {DropDownValue == 'Scrap' && bookList.filter((book) => book.write_flag == 0).map((book) => <Book book={book} key={book.id} history={props.history} getBookList={getBookList} />)}
          </FadeIn>
        )}

        {!isLoading && bookList.length == 0 && <div className="sets-empty">세트가 비었습니다.</div>}
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

function Book({ book, history, getBookList }) {
  const classes = useStyles();
  const unscrapHandler = (e) => {
    axios.delete(SERVER.BASE_URL + SERVER.ROUTES.unscrap, { data: { book_id: book.id } }).then((res) => {
      //수정 console.log(res);
      getBookList();
    });
    e.stopPropagation();
    //수정 console.log(e);
  };

  return (
    <div className="card-container">
      <a
        className="card4"
        onClick={() => {
          //수정 console.log(`${book.id} clicked.`);
          // //수정 console.log('history : ', history);
          //수정 console.log('book : ', book);
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
        <div className="container-fluid" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {book.write_flag == 0 && (
            <MaterialButton
              variant="contained"
              onClick={(e) => {
                axios.delete(SERVER.BASE_URL + SERVER.ROUTES.unscrap, { data: { book_id: book.id } }).then((res) => {
                  getBookList();
                });
                e.stopPropagation();
              }}
              style={{ marginRight: '5vw', fontWeight: '800' }}
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
            >
              스크랩해제
            </MaterialButton>
          )}
        </div>
      </a>
    </div>
  );
}

export default SetsPage;
