import React from 'react';
import 'animate.css';
import './RecentSets.css';

const RecentSets = () => {
  return (
    <section class="bg">
      <h1 class="title">최근 학습한 세트</h1>
      <div className="card-container">
        {/* <div className="card-background">
          <div className="card"></div>
        </div>
        <div className="card-background">
          <div className="card"></div>
        </div>
        <div className="card-background">
          <div className="card"></div>
        </div>
        <div className="card-background">
          <div className="card"></div>
        </div> */}
        <div class="cards-list">
          <div class="card 1">
            <div class="card_title title-white">
              <p>Card Title</p>
            </div>
          </div>

          <div class="card 1">
            <div class="card_title title-white">
              <p>Card Title</p>
            </div>
          </div>

          <div class="card 1">
            <div class="card_title title-white">
              <p>Card Title</p>
            </div>
          </div>

          <div class="card 1">
            <div class="card_title title-white">
              <p>Card Title</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentSets;
