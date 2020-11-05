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
    await axios.get(SERVER.BASE_URL + SERVER.ROUTES.getMySet + book.id).then((res) => {
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
        <div className="h1 text-center">{book.title}</div>
      </header>

      <div className="Sets-root">
        <div className="Sets-container">
          {cardList.map((card) => (
            <Card card={card} />
          ))}
        </div>
      </div>
    </main>
  );
};

const Card = ({ card }) => {
  return (
    <div className="courses-container">
      <div className="course">
        <div className="course-info row">
          <div>
            <button className="" onClick={() => {}}>
              <FcBookmark size={33} />
              <BsBookmark size={32} />
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
