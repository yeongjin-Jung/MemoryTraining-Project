import React from 'react';

import './RecentSets.scss';

const RecentSets = () => {
  return (
    // <div className="recent-sets" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25vh' }}>
    //   <h2>RecentSets</h2>
    // </div>
    <div className="container" style={{ width: '100%', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '2em' }}>최근 학습한 세트</h2>

      <div className="flex-items" style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <a className="card4" href="#">
            <h3 style={{ textDecoration: 'underline' }}>정보처리기사</h3>
            <p className="small">Card description with lots of great facts and interesting details.</p>
            <div className="dimmer"></div>
            <div className="go-corner" href="#">
              <div className="go-arrow">→</div>
            </div>
          </a>
        </div>

        <div>
          <a className="card4" href="#">
            <h3 style={{ textDecoration: 'underline' }}>한국사</h3>
            <p className="small">Card description with lots of great facts and interesting details.</p>
            <div className="dimmer"></div>
            <div className="go-corner" href="#">
              <div className="go-arrow">→</div>
            </div>
          </a>
        </div>

        <div>
          <a className="card4" href="#">
            <h3 style={{ textDecoration: 'underline' }}>GSAT</h3>
            <p className="small">Card description with lots of great facts and interesting details.</p>
            <div className="dimmer"></div>
            <div className="go-corner" href="#">
              <div className="go-arrow">→</div>
            </div>
          </a>
        </div>

        <div>
          <a className="card4" href="#">
            <h3 style={{ textDecoration: 'underline' }}>토익</h3>
            <p className="small">Card description with lots of great facts and interesting details.</p>
            <div className="dimmer"></div>
            <div className="go-corner" href="#">
              <div className="go-arrow">→</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecentSets;
