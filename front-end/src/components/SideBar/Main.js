import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import Switch from 'react-switch';
import { FaHeart, FaBars } from 'react-icons/fa';

import { FcBookmark } from 'react-icons/fc';
import { FaBookmark } from 'react-icons/fa';
import { BsBookmark } from 'react-icons/bs';
import axios from 'axios';
import SERVER from '../../api/server';

const Main = ({ collapsed, rtl, image, handleToggleSidebar, handleCollapsedChange, handleRtlChange, handleImageChange, book }) => {
  const intl = useIntl();
  const [cardList, setCardList] = useState([]);

  const getCardList = async () => {
    await axios.get(SERVER.BASE_URL + SERVER.ROUTES.getbook + book.id).then((res) => {
      console.log(res);
      setCardList(res.data);
    });
  };

  useEffect(() => {
    getCardList();
  }, []);

  return (
    <main>
      <div>
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

      <div className="Sets-root">
        <div className="Sets-container">
          {cardList.map((card) => (
            <Card book={book} card={card} key={card.id} />
          ))}
        </div>
      </div>
    </main>
  );
};

const Card = ({ book, card }) => {
  const [color, setColor] = useState(card.bookmark_flag ? 'red' : 'black');

  useEffect(() => {
    console.log('useEffect -> color : ', color);
  });

  return (
    <div className="courses-container">
      <div className="course">
        <div className="course-info row">
          <div>
            <button
              className=""
              onClick={() => {
                if (color == 'black') {
                  console.log('bookmark.');
                  setColor('red');
                  console.log('book.id : ', book.id);
                  console.log('card.id : ', card.id);
                  axios.post(SERVER.BASE_URL + SERVER.ROUTES.bookmark, { book_id: book.id, card_id: card.id }).then((res) => {
                    console.log(res);
                  });
                } else {
                  console.log('unbookmark.');
                  setColor('black');
                  console.log('book.id : ', book.id);
                  console.log('card.id : ', card.id);
                  axios.delete(SERVER.BASE_URL + SERVER.ROUTES.unbookmark, { data: { book_id: book.id, card_id: card.id } }).then((res) => {
                    console.log(res);
                  });
                }
              }}
            >
              {color == 'red' && <FcBookmark size={32} />}
              {color == 'black' && <BsBookmark size={32} />}
            </button>
          </div>
          <div className="">
            <span stlye={{ fontSize: '30px' }}>{card.word}</span>
          </div>
          <div className="">
            <p className="">{card.meaning}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
