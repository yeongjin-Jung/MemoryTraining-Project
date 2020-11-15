import React from 'react';
import Marquee from 'react-double-marquee';
import backImg from '../../assets/images/logo_transparent.png';

const SkillCard = (props) => {
  return (
    <div
      className="skill-card"
      onClick={() => {
        props.history.push({ pathname: '/set-detail', state: { book: props.book[props.index] } });
      }}
    >
      <header className="skill-card__header">
        <img className="skill-card__icon" src={backImg} alt="HTML5 Logo" />
      </header>
      <section className="skill-card__body">
        <div>
          <h2 className="skill-card__title" style={{ color: 'black' }}>
            <Marquee>
              {props.book[props.index].title}
            </Marquee>
          </h2>
        </div>

        <span className="skill-card__duration">작성자 : {props.book[props.index].user.name}</span>
        <ul className="skill-card__knowledge">
          <li className="book-description">설명 : {props.book[props.index].description}</li>
          <li>
            생성된 날짜 : {props.book[props.index].created_at}
          </li>
        </ul>
      </section>
    </div>
  );
}

export default SkillCard;