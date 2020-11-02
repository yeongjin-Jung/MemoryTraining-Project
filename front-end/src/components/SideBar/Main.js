import React from 'react';
import { useIntl } from 'react-intl';
import Switch from 'react-switch';
import { FaHeart, FaBars } from 'react-icons/fa';

const Main = ({ collapsed, rtl, image, handleToggleSidebar, handleCollapsedChange, handleRtlChange, handleImageChange }) => {
  const intl = useIntl();
  const cardList = [
    { term: 'term1', meaning: 'meaning1' },
    { term: 'term2', meaning: 'meaning2' },
    { term: 'term3', meaning: 'meaning3' },
    { term: 'term4', meaning: 'meaning4' },
    { term: 'term5', meaning: 'meaning5' },
    { term: 'term6', meaning: 'meaning6' },
    { term: 'term7', meaning: 'meaning7' },
    { term: 'term8', meaning: 'meaning8' },
    { term: 'term9', meaning: 'meaning9' },
    { term: 'term10', meaning: 'meaning10' },
  ];
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
          {cardList.map((item) => (
            <a className="card4 " href="#">
              <h3>{item.term}</h3>
              <p>{item.meaning}</p>
              <p className="small"></p>
              <div className="dimmer"></div>
              <div className="go-corner" href="#">
                <div className="go-arrow">→</div>
              </div>
            </a>
          ))}

          {/* <a className="card4 " href="#">
            <h3>단어</h3>
            <p>뜻</p>
            <p className="small"></p>
            <div className="dimmer"></div>
            <div className="go-corner" href="#">
              <div className="go-arrow">→</div>
            </div>
          </a> */}
        </div>
      </div>
    </main>
  );
};

export default Main;
