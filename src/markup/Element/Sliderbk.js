import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
// import slider1 from "./../../images/main-slider/slide1.jpg";
// import slider2 from "./../../images/main-slider/slide2.jpg";
import config from "../../config.json";

const Slider = () => {
  const [index, setIndex] = useState(2);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const slider_content = config.sliderbk;
  return (
    <div className="main-slider">
      <Carousel indicators={true} interval={10000} pause="false" activeIndex={index} onSelect={handleSelect}>
        {slider_content &&
          slider_content.map((slider) => (
            <Carousel.Item>
              <div className="slide slidebottom-none d-flex justify-content-end" style={{ backgroundColor: "#fffff", backgroundImage: "url(" + slider.image_url + ")" }}>
                <div className=" mt-auto  px-3 ">
                  {/* <img className=" slidebottom slide w-100" src={slider.image_url} alt="Dainty Flavors" /> */}
                  {/* <span className="prefix">{slider.prefix}</span> */}
                  {/* <h3 className="title">{slider.title}</h3>
                  <h4 className="sub-title">{slider.description}</h4>
                  <Link to={"/shop"} className="btn btnhover border z-index">
                    Shop now
                  </Link> */}
                  <div classnames=" mt-auto p-2 d-none">
                    {" "}
                    <img className="logoheight d-none" src={config.logo} alt="Dainty Flavors" />
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
      <div className="text-center p-3 mt-3">
        <Link className="dbtn-primary z-index" onClick={(e) => localStorage.setItem("queryurl", "maincategory=all&category=all")} to={{ pathname: "/shop", search: "?maincategory=all&category=all" }}>
          Shop all <i className="fa fa-angle-right"></i>
        </Link>

        <p className="mt-2 font-weight-normal text-primary">{slider_content[0].prefix}</p>
      </div>
    </div>
  );
};

export default Slider;
