import React, { useEffect, useState } from "react";
import Header from "./../Layout/NavBarMenu";
import NavBarMenu from "./../Layout/NavBarMenu";
import Footer from "./../Layout/Footer";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import OurPartners from "./../Element/OurPartners";
import Slider from "./../Element/Slider";
import Sliderbk from "./../Element/Sliderbk";
import Accord from "./../Element/Accord";
import ScrollToTop from "./../Element/ScrollToTop";
import config from "../../config.json";
import img1 from "./../../images/background/bg5.jpg";
import img2 from "./../../images/background/bg1.jpg";
import img3 from "./../../images/background/bg5.jpg";
import img4 from "./../../images/banner/bnr1.jpg";
import cake1 from "./../../images/cake1.jpg";
import pic1 from "./../../images/about/picbanket.png";
import icon2 from "./../../images/icons/service-icon/icon2.png";
import icon3 from "./../../images/icons/service-icon/icon3.png";
import icon4 from "./../../images/icons/service-icon/icon4.png";
import icon5 from "./../../images/icons/service-icon/icon5.png";
import icon1 from "./../../images/icons/service-icon/icon1.png";
import work_pic1 from "./../../images/our-work/pic1.jpg";
import work_pic2 from "./../../images/our-work/pic2.jpg";
import work_pic3 from "./../../images/our-work/pic3.jpg";
import pic3 from "./../../images/about/pic3.jpg";
import A_Newsletter from "./A_Newsletter";
import Recent_Product from "./../Element/Recent_Products";
import Testimonial from "./../Element/Testimonial";
import Instagram from "./../Element/InstagramFeed";

import Featured_Products from "./../Element/Featured_Products";
import SideBar from "./../Element/SideBar";
import Tab from "./../Pages/Tab";
//Images
// var img1 = require("./../../images/background/bg5.jpg");
// var serblog1 = require("./../../images/our-services/pic1.jpg");
// var serblog2 = require("./../../images/our-services/pic2.jpg");
// var serblog3 = require("./../../images/our-services/pic3.jpg");
// var serblog4 = require("./../../images/our-services/pic4.jpg");
// var img2 = require("./../../images/background/bg1.jpg");
// var img3 = require("./../../images/background/bg5.jpg");
// var img4 = require("./../../images/background/bg4.jpg");

const Index1 = () => {
  const [latestCat, setLatestCat] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      await fetch(config.service_url + "getHomePageCategory")
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            let active = data
              .filter((filter, index) => filter.isactive === 1 && filter.type === "home")
              .map((data) => {
                return data;
              });

            setLatestCat(active);
          }
        })
        .catch((err) => {
          setLatestCat([]);
        });

      //add filer type=home
      console.log("latestCat", latestCat);
    };
    //fetchCategories();
  }, []);
  return (
    <div>
      {/* <Header active={"home"} home={true} /> */}
      <NavBarMenu active={"home"} home={true} />
      {config.homeslider ? <Sliderbk /> : <Slider />}

      <div className="page-content bg-white">
        <div className="content-block">
          <div className="row d-none" style={{ backgroundImage: "url(" + config.pagebgimage + ")", backgroundSize: "100%" }}>
            <div className="col-lg-12">
              <div className="section-head mb-0 text-center">
                <div className="my-4">
                  <h4 className="text-primary">{config.aboutustitle} </h4>
                  <a href={"/about"} className="btn btn-sm p-1 btnhover">
                    <i className="fa fa-angle-right m-r10"></i>More..
                  </a>{" "}
                </div>
                <div className="d-none">
                  <p className="main-text">{config.aboutus1} </p>
                  <p>{config.aboutus2}</p>
                  <div className="text-center mb-3 ">
                    <a href={"/about"} className=" m-t30">
                      <i className="fa fa-angle-right m-r10"></i>More..
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="position-relative d-none">
            <Tab />
          </div>
          <div className="section-full my-1  " style={{ backgroundImage: "url(" + config.pagebgimage + ")", backgroundSize: "100%" }}>
            <div className="container ">
              <div className="faq-area1">
                <div className="recentproduct">
                  <Featured_Products></Featured_Products>
                  <Recent_Product></Recent_Product>
                </div>

                <div className="col-lg-12 m-b30 d-none">
                  <Accord />
                </div>
              </div>
            </div>
          </div>

          <div className="section-full my-4 service-area2 bg-img-fix bg-line-top bg-line-bottom" style={{ backgroundImage: "url(" + config.servicebgimage + ")", backgroundSize: "cover" }}>
            <div className="container ">
              <div className="row">
                <div className="col-lg-12 col-sm-12 m-b30">
                  <div className="text-center">
                    <h2 className="text-white mt-4">Our Journey</h2>

                    <span className="text-white">{config.about_service}</span>
                    <div className="text-center mt-2">
                      <Link to={"/our-journey"} className="btn btn-sm btnhover shadow m-t30">
                        <i className="fa fa-angle-right m-r10"></i>More..
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="testimonial" className="container">
            <Testimonial />
          </div>
          <div className="section-full bg-white">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-head text-center">
                    <div className="icon-bx icon-bx-lg d-none">
                      <img src={cake1} alt="" />
                    </div>
                    <h3>We Are Professional at Our Skills</h3>
                    <p>More than 100+ customers trusted us</p>
                  </div>
                </div>
              </div>
              <div className="row d-none">
                <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
                  <div className="counter-style-1 text-center">
                    <div className="counter-num text-primary">
                      <span className="counter">
                        <CountUp end={15} />
                      </span>
                      <small>+</small>
                    </div>
                    <span className="counter-text">Years of Experience</span>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
                  <div className="counter-style-1 text-center">
                    <div className="counter-num text-primary">
                      <span className="counter">
                        <CountUp end={10} />
                      </span>
                    </div>
                    <span className="counter-text">Awards Wins</span>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
                  <div className="counter-style-1 text-center">
                    <div className="counter-num text-primary">
                      <span className="counter">
                        <CountUp end={30} />
                      </span>
                      <small>+</small>
                    </div>
                    <span className="counter-text">Happy Clients</span>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
                  <div className="counter-style-1 text-center">
                    <div className="counter-num text-primary">
                      <span className="counter">
                        <CountUp end={99} />
                      </span>
                    </div>
                    <span className="counter-text">Perfect Products</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="container ">
              <div className="row m-lr0 about-area1">
                <div className="col-lg-6 p-lr0">
                  <img className="img-cover" src={config.aboutus_imageurl2} alt="" />
                </div>
                <div className="col-lg-6 p-lr0  about-bx align-items-center text-center text-dark">
                  <div className="about-bx">
                    <div className="section-head text-center text-dark">
                      <h4 className="text-dark">For More Offer</h4>
                      Contact us
                      <h1 className="titlename font-weight-normal title"> {config.websitetitle} </h1>
                    </div>
                    <p className="text-dark">{config.contact_email}</p>
                    <p className="text-dark">{config.contact_phone1}</p>
                    <Link to={"contact"} className="btn-secondry border white btn btnhover btn-md">
                      <i className="fas fas-cart"></i>Contact
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="container my-4">
              {/* <OurPartners /> */}
              <div className="section-head text-center">
                <h3>
                  <a href={config.insta} target="_blank">
                    Find Us on Instagram
                  </a>
                </h3>
              </div>
              <Instagram />
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-head text-center">
                    <h3>Thanks for reaching us.</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center ">
        <h3 className=" font-weight-light">Join the BakeryBits club for offers, new products, recepies, tips and much more!</h3>
      </div>
      <A_Newsletter />
      <ScrollToTop />

      <Footer />
    </div>
  );
};

export default Index1;
