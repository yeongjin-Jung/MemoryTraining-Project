import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import Switch from 'react-switch';
import { FaHeart, FaBars } from 'react-icons/fa';

import { FcBookmark } from 'react-icons/fc';
import { FaBookmark } from 'react-icons/fa';
import { BsBookmark } from 'react-icons/bs';
import axios from 'axios';

const Main = ({ collapsed, rtl, image, handleToggleSidebar, handleCollapsedChange, handleRtlChange, handleImageChange, book }) => {
  const intl = useIntl();
  const [cardList, setCardList] = useState([]);

  const getCardList = async () => {
    await axios.post('http://localhost:8000/api/books/~~~', { params: { setid: book.id } }).then((res) => {
      console.log(res);
      // setCardList(res.data);
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
        <div className="h1 text-center">세트명</div>
      </header>

      <div className="Sets-root">
        <div className="Sets-container">
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
                  <span stlye={{ fontSize: '30px' }}>card.word</span>
                </div>
                <div className="">
                  <p className="">card.meaning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
