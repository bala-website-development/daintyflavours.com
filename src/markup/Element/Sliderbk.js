import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
// import slider1 from "./../../images/main-slider/slide1.jpg";
// import slider2 from "./../../images/main-slider/slide2.jpg";
import config from "../../config.json";

const Slider = () => {
  const slider_content = config.sliderbk;
  return (
    <div className="main-slider">
      <Carousel indicators={true}>
        {slider_content &&
          slider_content.map((slider) => (
            <Carousel.Item>
              <div className="slide slidebottom d-flex justify-content-end" style={{ backgroundColor: "#fffff", backgroundImage: "url(" + slider.image_url + ")" }}>
                <div className=" mt-auto  px-3 ">
                  {/* <img className=" slidebottom slide w-100" src={slider.image_url} alt="Dainty Flavors" /> */}
                  {/* <span className="prefix">{slider.prefix}</span> */}
                  {/* <h3 className="title">{slider.title}</h3>
                  <h4 className="sub-title">{slider.description}</h4>
                  <Link to={"/shop"} className="btn btnhover border z-index">
                    Shop now
                  </Link> */}
                  <div classnames=" mt-auto p-2 ">
                    {" "}
                    <img className="logoheight" src={config.logo} alt="Dainty Flavors" />
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
      <div className="text-center p-3 mt-3">
        <Link className="btn btnhover border z-index" onClick={(e) => localStorage.setItem("queryurl", "maincategory=all&category=all")} to={{ pathname: "/shop?maincategory=all&category=all" }}>
          Shop all <i className="fa fa-angle-right m-r10"></i>
        </Link>
        <p className="font-weight-normal text-primary">{slider_content[0].prefix}</p>
      </div>
    </div>
  );
};

export default Slider;
