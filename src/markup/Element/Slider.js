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
              <div className="slideroverlay ">
                <div className="slide img-fluid" style={{ backgroundImage: "url(" + slider.image_url + ")" }}>
                  <div className="content text-left px-5">
                    <div className="">
                      <Link to={"/shop"} className="btn btnhover border z-index">
                        Shop now
                      </Link>
                      <p className="font-weight-normal text-light">{slider.prefix}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-end h-100 w-100 p-4">
                    <img src={config.logo} className="logoimage" height="50" />
                  </div>
                </div>
              </div>
            </>
          ))}
      </>
    </div>
  );
};

export default Slider;
