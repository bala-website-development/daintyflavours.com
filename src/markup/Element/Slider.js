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
      <Carousel indicators={false}>
        {slider_content &&
          slider_content.map((slider) => (
            <Carousel.Item>
              <div className="slide" style={{ backgroundImage: "url(" + slider.image_url + ")" }}>
                {/* <img className="d-block w-100 slider" src={require('./../../images/main-slider/slide1.jpg')}	alt="Second slide"	/> */}
                <div className="content">
                  <span>{slider.prefix}</span>
                  <h3 className="title">{slider.title}</h3>
                  <h4 className="sub-title">{slider.description}</h4>

                  <Link to={"/shop"} className="btn btnhover border">
                    Shop now
                  </Link>
                </div>
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
};

export default Slider;
