import React from 'react';
import 'animate.css';
import './RecentSets.css';

const RecentSets = () => {
  return (
    <section className="bg">
      <h1 className="title">최근 학습한 세트</h1>
      <div className="card-container">
        <div className="cards-list">
          <div className="card-overflow">
            <div className="card 1 animate__animated animate__fadeInLeft">
              <div className="card_content title-white">
                <p>세트제목</p>
                <p>세트 작성자</p>
              </div>
            </div>
          </div>
          <div className="card-overflow">
            <div className="card 1 animate__animated animate__fadeInUp">
              <div className="card_content title-white">
                <p>세트제목</p>
                <p>세트 작성자</p>
              </div>
            </div>
          </div>
          <div className="card-overflow">
            <div className="card 1 animate__animated animate__fadeInDown">
              <div className="card_content title-white">
                <p> 세트제목</p>
                <p>세트 작성자</p>
              </div>
            </div>
          </div>
          <div className="card-overflow">
            <div className="card 1 animate__animated animate__fadeInRight">
              <div className="card_content title-white">
                <p>세트제목</p>
                <p>세트 작성자</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentSets;
