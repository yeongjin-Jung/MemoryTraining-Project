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
    // <Carousel className="my-carousel">
    //   <Carousel.Item interval={1000}>
    //     <img className="d-block w-100" src={require('../images/img-1.jpg')} alt="First slide" style={{ height: '65vh', width: '100%' }} />
    //     <Carousel.Caption>
    //       <h3>First slide label</h3>
    //       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, expedita?</p>
    //     </Carousel.Caption>
    //   </Carousel.Item>

    //   <Carousel.Item interval={1000}>
    //     <img className="d-block w-100" src={require('../images/img-2.jpg')} alt="Third slide" style={{ height: '65vh', width: '100%' }} />
    //     <Carousel.Caption>
    //       <h3>Second slide label</h3>
    //       <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, tempora.</p>
    //     </Carousel.Caption>
    //   </Carousel.Item>

    //   <Carousel.Item interval={1000}>
    //     <img className="d-block w-100" src={require('../images/img-3.jpg')} alt="Third slide" style={{ height: '65vh', width: '100%' }} />
    //     <Carousel.Caption>
    //       <h3>Third slide label</h3>
    //       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, exercitationem!</p>
    //     </Carousel.Caption>
    //   </Carousel.Item>

    //   <Carousel.Item interval={1000}>
    //     <img className="d-block w-100" src={require('../images/img-4.jpg')} alt="First slide" style={{ height: '65vh', width: '100%' }} />
    //     <Carousel.Caption>
    //       <h3>Fourth slide label</h3>
    //       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, laboriosam.</p>
    //     </Carousel.Caption>
    //   </Carousel.Item>

    //   <Carousel.Item interval={1000}>
    //     <img className="d-block w-100" src={require('../images/img-5.jpg')} alt="First slide" style={{ height: '65vh', width: '100%' }} />
    //     <Carousel.Caption>
    //       <h3>Fifth slide label</h3>
    //       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, enim!</p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    // </Carousel>

    // <div className="my-carousel" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
    //   <h2>mycarousel</h2>
    // </div>

    // <div className="my-carousel" style={{ position: 'relative' }}>
    //   <h2>Carousel</h2>
    // </div>
  );
};

export default MyCarousel;
