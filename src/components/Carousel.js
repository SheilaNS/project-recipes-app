import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import CarouselCards from './CarouselCards';

function Carousel() {
  const { meals, drinks } = useContext(AppContext);
  const location = useLocation();
  const path = location.pathname.split('/')[0];

  const [content, setContent] = useState([]);
  useEffect(() => {
    const arr = path === 'foods' ? meals : drinks;
    setContent(arr);
  }, []);
  return (
    <div
      id="multi-item-example"
      className="carousel slide carousel-multi-item"
      data-ride="carousel"
    >

      {/* <!--Controls--> */}
      <div className="controls-top">
        <a
          className="btn-floating"
          href="#multi-item-example"
          data-slide="prev"
        >
          <i className="fa fa-chevron-left" />
        </a>
        <a className="btn-floating" href="#multi-item-example" data-slide="next">
          <i className="fa fa-chevron-right" />
        </a>
      </div>
      {/* <!--/.Controls--> */}

      {/* <!--Indicators--> */}
      <ol className="carousel-indicators">
        <li data-target="#multi-item-example" data-slide-to="0" className="active" />
        <li data-target="#multi-item-example" data-slide-to="1" />
        <li data-target="#multi-item-example" data-slide-to="2" />
      </ol>
      {/* <!--/.Indicators--> */}

      {/* <!--Slides--> */}
      <div className="carousel-inner" role="listbox">

        {/* <!--First slide--> */}
        <div className="carousel-item active">

          <div className="row">
            <CarouselCards recipe={ content[0] } index={ 0 } />
            <CarouselCards recipe={ content[1] } index={ 1 } />
          </div>

        </div>
        {/* <!--/.First slide--> */}

        {/* <!--Second slide--> */}
        <div className="carousel-item">

          <div className="row">
            <CarouselCards recipe={ content[2] } index={ 2 } />
            <CarouselCards recipe={ content[3] } index={ 3 } />
          </div>

        </div>
        {/* <!--/.Second slide--> */}

        {/* <!--Third slide--> */}
        <div className="carousel-item">

          <div className="row">
            <CarouselCards recipe={ content[4] } index={ 4 } />
            <CarouselCards recipe={ content[5] } index={ 5 } />
          </div>
        </div>
        {/* <!--/.Third slide--> */}

      </div>
      {/* <!--/.Slides--> */}

    </div>
  );
}

export default Carousel;
