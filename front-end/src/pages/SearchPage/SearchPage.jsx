import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { SortDropDown } from '../../components';
import 'animate.css';
import './SearchPage.css';
import FadeIn from 'react-fade-in';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { FiExternalLink } from 'react-icons/fi';
import axios from 'axios';
import SERVER from '../../api/server';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import MaterialButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const SearchPage = (props) => {
  const [DropDownValue, setDropDownValue] = useState('name');

  // const [bookList, setBookList] = useState([]);
  const [bookNameList, setBookNameList] = useState([]);
  const [bookDateList, setBookDateList] = useState([]);

  const searchValue = props.location.state.searchValue;
  const [isLoading, setIsLoading] = useState(true);

  const getBookList = async () => {
    console.log('getBookList called.');

    await axios.get(SERVER.BASE_URL + SERVER.ROUTES.search, { params: { keyword: searchValue, order: 'name' } }).then((res) => {
      console.log('이름순 : ', res);
      let tmpBookList = [];
      tmpBookList = [...res.data];
      // console.log('tmpBookList : ', tmpBookList);
      setBookNameList(tmpBookList);
      // setIsLoading(false);
    });

    await axios.get(SERVER.BASE_URL + SERVER.ROUTES.search, { params: { keyword: searchValue, order: 'date' } }).then((res) => {
      console.log('최신순 : ', res);
      let tmpBookList = [];
      tmpBookList = [...res.data];
      // console.log('tmpBookList : ', tmpBookList);
      setBookDateList(tmpBookList);
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

  return (
    <div className="search-root" ref={refToTop}>
      <div className="Home-BackgroundColor"></div>
      <div className="search-container">
        <p className="search-title">검색어 : {searchValue}</p>
        <div className="ButtonContainer">
          <SortDropDown className="searchDropDown" onChaneHandler={onChaneHandler} />
          <Link to="/set-create">
            <Button className="set-create-btn">
              <span style={{ fontWeight: '600', color: 'black' }}>세트 만들기</span>
            </Button>
          </Link>
        </div>
        {/* <div> */}
        {!isLoading && bookNameList.length != 0 && (
          <FadeIn className="FadeIn-container" duration={1000} delay={250} transitionDuration={1000}>
            {/* {bookList.length != 0 && bookList.map((book) => <Book book={book} key={book.id} />)} */}

            {/* {bookList.map((book) => (
              <Book book={book} key={book.id} />
            ))} */}

            {DropDownValue == 'name' && bookNameList.map((book) => <Book book={book} key={book.id} />)}
            {DropDownValue == 'date' && bookDateList.reverse().map((book) => <Book book={book} key={book.id} />)}

            {/* </div> */}
          </FadeIn>
        )}
        {!isLoading && bookNameList.length == 0 && <div className="search-empty">검색 결과가 없습니다.</div>}
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
  const classes = useStyles();
  const [show, bookListhow] = useState(false);
  const [cardList, setCardList] = useState([]);
  const buttonRef = useRef(null);
  const [scrapFlag, setScrapFlag] = useState(book.scrap_flag ? true : false);

  const handleShow = () => {
    // console.log('handleShow called.');
    // console.log('before : ', show);
    bookListhow(true);
    // console.log('after : ', show);
  };

  const handleClose = () => {
    // console.log('handleClose called.');
    // console.log('before : ', show);
    bookListhow(false);
    // console.log('after : ', show);
  };

  const getCardList = async () => {
    console.log('getBookList called.');
    // await axios.get(`http://127.0.0.1:8000/api/books/${book.id}`).then((res) => {
    await axios.get(SERVER.BASE_URL + SERVER.ROUTES.getEntireCards + book.id).then((res) => {
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
          handleShow();
        }}
      >
        <div className="real-card">
          <h2>
            {/* {book.id} : {book.title} */}
            {book.title}
          </h2>
          <p>{book.description}</p>
          <p>수정 날짜 : {book.updated_at}</p>
          <p>작성자 이메일: {book.user.email}</p>
          <p>작성자 이름 : {book.user.name}</p>
          <p className="small"></p>
          <div className="dimmer"></div>
          <div className="go-corner-search">
            <div className="go-arrow">→</div>
          </div>
        </div>
        <div>
          <MaterialButton
            variant="contained"
            style={{ fontWeight: '800' }}
            color={scrapFlag ? 'secondary' : 'primary'}
            startIcon={scrapFlag ? <DeleteIcon /> : <FiExternalLink />}
            className={classes.button}
            onClick={(e) => {
              if (!scrapFlag) {
                setScrapFlag(true)
                axios.post(SERVER.BASE_URL + SERVER.ROUTES.scrap, { book_id: book.id }).then((res) => {
                  console.log('scrap axios res : ', res);
                });
              } else {
                setScrapFlag(false)
                axios.delete(SERVER.BASE_URL + SERVER.ROUTES.unscrap, { data: { book_id: book.id } }).then((res) => {
                  console.log('unscrap axios res : ', res);
                });
              }
              e.stopPropagation();
            }}
          >
            {scrapFlag ? <>스크랩해제</> : <>스크랩</>}
          </MaterialButton>
        </div>
      </div>

      <Rodal className="container-rodal realative" width={800} height={600} animation="door" visible={show} onClose={handleClose} duration={1000} closeOnEsc={true}>
        <SimpleBar style={{ height: '600px' }}>
          <div className="text-center card-title sticky-top rounded m-0" style={{ padding: '0.5rem', color: 'white', fontSize: '2em', lineHeight: '3.5rem' }}>
            {/* <div style={{ display: 'inline-block' }}> */}
            {book.title}&nbsp;
            {/* </div> */}
            <MaterialButton
              variant="contained"
              style={{ fontWeight: '800' }}
              color={scrapFlag ? 'secondary' : 'primary'}
              startIcon={scrapFlag ? <DeleteIcon /> : <FiExternalLink />}
              className={classes.button}
              onClick={(e) => {
                if (!scrapFlag) {
                  setScrapFlag(true)
                  axios.post(SERVER.BASE_URL + SERVER.ROUTES.scrap, { book_id: book.id }).then((res) => {
                    console.log('scrap axios res : ', res);
                  });
                } else {
                  setScrapFlag(false)
                  axios.delete(SERVER.BASE_URL + SERVER.ROUTES.unscrap, { data: { book_id: book.id } }).then((res) => {
                    console.log('unscrap axios res : ', res);
                  });
                }
                e.stopPropagation();
              }}
            >
              {scrapFlag ? <>스크랩해제</> : <>스크랩</>}
            </MaterialButton>
          </div>

          {cardList.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </SimpleBar>
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
