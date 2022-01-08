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
              <div className="slide img-fluid" style={{ backgroundImage: "url(" + slider.image_url + ")" }}>
                {/* <div className="slide" style={{ backgroundColor: "#FFECEF" }}> */}
                <div className="slideroverlay">
                  {/* <img className="w-50 float-right bottom-0" src={"https://firebasestorage.googleapis.com/v0/b/tuc-shopping-dev.appspot.com/o/daintyflavour%2Fpngegg.png?alt=media&token=392f4d59-f387-445b-aea0-fb297ba68023"} alt="Dainty Flavour" /> */}
                  <div className="content text-left px-5">
                    <div className="">
                      <span className="prefix">{slider.prefix}</span>
                      <h3 className="title">{slider.title}</h3>
                      <h4 className="sub-title">{slider.description}</h4>

                      <Link to={"/shop"} className="btn btnhover border z-index">
                        Shop now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
};

export default Slider;
