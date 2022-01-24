import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
// import slider1 from "./../../images/main-slider/slide1.jpg";
// import slider2 from "./../../images/main-slider/slide2.jpg";
import config from "../../config.json";

const Slider = () => {
  const slider_content = config.slider;
  return (
    <div className="main-slider">
      <>
        {slider_content &&
          slider_content.map((slider) => (
            <>
              <div className="slideroverlay">
                <img src={slider.image_url} className="img-fluid" />
                <div className="text-center">
                  <Link to={"/shop"} className="btn btnhover border z-index">
                    Shop now
                  </Link>
                  <p className="font-weight-normal text-primary">{slider.prefix}</p>
                </div>
              </div>
            </>
          ))}
      </>
    </div>
  );
};

export default Slider;
