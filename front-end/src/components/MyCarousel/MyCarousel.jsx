import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import HTMLFlipBook from 'react-pageflip';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyCarousel = () => {
  return (
    <HTMLFlipBook width={750} height={500}>
      <div className="demoPage">
        <img className="d-block w-100" src={require('../images/img-1.jpg')} alt="First slide" style={{ height: '65vh', width: '100%' }} />
      </div>
      <div className="demoPage">
        <img className="d-block w-100" src={require('../images/img-2.jpg')} alt="Third slide" style={{ height: '65vh', width: '100%' }} />
      </div>
      <div className="demoPage">
        <img className="d-block w-100" src={require('../images/img-4.jpg')} alt="First slide" style={{ height: '65vh', width: '100%' }} />
      </div>
      <div className="demoPage">
        <img className="d-block w-100" src={require('../images/img-5.jpg')} alt="First slide" style={{ height: '65vh', width: '100%' }} />
      </div>
    </HTMLFlipBook>
  );
};

export default MyCarousel;
