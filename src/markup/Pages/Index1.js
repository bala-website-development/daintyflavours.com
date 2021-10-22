import React, { useEffect, useState } from "react";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import OurPartners from "./../Element/OurPartners";
import Slider from "./../Element/Slider";
import Accord from "./../Element/Accord";
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
import Featured_Products from "./../Element/Featured_Products";
import SideBar from "./../Element/SideBar";
//Images
// var img1 = require("./../../images/background/bg5.jpg");
// var serblog1 = require("./../../images/our-services/pic1.jpg");
// var serblog2 = require("./../../images/our-services/pic2.jpg");
// var serblog3 = require("./../../images/our-services/pic3.jpg");
// var serblog4 = require("./../../images/our-services/pic4.jpg");
// var img2 = require("./../../images/background/bg1.jpg");
// var img3 = require("./../../images/background/bg5.jpg");
// var img4 = require("./../../images/background/bg4.jpg");

const blogNews = [
  {
    image: require("./../../images/blog/grid/pic1.jpg"),
    title: "Understand The Background Of Bakery Now.",
  },
  {
    image: require("./../../images/blog/grid/pic2.jpg"),
    title: "Seven Reliable Sources To Learn About Bakery.",
  },
  {
    image: require("./../../images/blog/grid/pic3.jpg"),
    title: "Ten Places That You Can Find Bakery.",
  },
];

const Index1 = () => {
  const [latestCat, setLatestCat] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      await fetch(config.service_url + "getHomePageCategory")
        .then((response) => response.json())
        .then((data) => setLatestCat(data));
      console.log("latestCat", latestCat);
    };
    fetchCategories();
  }, []);
  return (
    <div>
      <Header active={"home"} />

      <div className="page-content bg-white">
        <div className="content-block">
          <Slider />
          <div className="section-head mb-0 text-center">
            <div className="my-4">
              <h3 className="text-primary">Product Categories</h3>
            </div>
          </div>
          <p className="main-text"> </p>
          <div className="section-full mb-5">
            <div className="container">
              <div className="row service-area1">
                {latestCat &&
                  latestCat.map((cat) => (
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                      <div className="icon-bx-wraper text-center service-box1" style={{ backgroundImage: "url(" + cat.imageurl + ")" }}>
                        <div className="icon-content">
                          <h2 className="dlab-tilte text-white">{cat.title}</h2>
                          <p>{cat.subtitle}</p>
                          <div className="dlab-separator style1 bg-primary"></div>
                          <Link to={{ pathname: "/shop", category: cat.category }} className="btn btnhover">
                            More details <i className="fa fa-angle-double-right m-l5"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-head mb-0 text-center">
                    <div className="my-4">
                      <img className="rounded" width="200px" src={config.logo} alt="" />
                    </div>
                    <h3 className="text-primary">{config.aboutustitle}</h3>
                    <p className="main-text">{config.aboutus1} </p>
                    <p>{config.aboutus2}</p>
                    <div className="d-none">
                      <A_Newsletter />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-full content-inner service-area2 bg-img-fix bg-line-top bg-line-bottom" style={{ backgroundImage: "url(" + img4 + ")", backgroundSize: "cover" }}>
            <div className="container ">
              <div className="row ">
                <div className="col-lg-12">
                  <div className="section-head text-center">
                    <h2 className="text-white">Our Journey</h2>
                    <div className="dlab-separator style1 bg-primary"></div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 m-b30 d-none">
                  <img src={pic1} className="img-cover1 radius-sm" alt="tsalastudio" />
                </div>
                <div className="col-lg-12">
                  <div className="row p-l30">
                    <div className="col-lg-12 col-sm-12 m-b30">
                      <div className="icon-bx-wraper text-white service-box2">
                        <div className="icon-bx icon-bx-lg">
                          <Link to={""} className="icon-cell d-none">
                            <img src={icon2} alt="" />
                          </Link>
                        </div>
                        <div className="">
                          <p>{config.about_service}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-full my-5 ">
            <div className="container">
              <div className="row faq-area1">
                <div className="col-lg-12 m-b20">
                  <div className="m-r20">
                    <div className="section-head text-left">
                      <h2>Our Latest Prodcuts</h2>
                      <p className="text-bold">Dont miss our new arrivals</p>
                      <div className="dlab-separator style1 bg-primary"></div>
                    </div>
                    <Recent_Product></Recent_Product>
                  </div>
                  <div className="text-center mt-2">
                    <Link to={"/shop"} className="btn btn-md btnhover shadow m-t30">
                      <i className="fa fa-angle-right m-r10"></i>Shop all
                    </Link>
                  </div>
                  <div className="m-r20 mt-5">
                    <div className="section-head text-left">
                      <h2>Our Featured Prodcuts</h2>
                      <div className="dlab-separator style1 bg-primary"></div>
                    </div>
                    <div className="">
                      <Featured_Products></Featured_Products>
                    </div>
                    <div className="text-center mt-2">
                      <Link to={"/shop"} className="btn btn-md btnhover shadow m-t30">
                        <i className="fa fa-angle-right m-r10"></i>Shop all
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 m-b30 d-none">
                  <Accord />
                </div>
              </div>
            </div>
          </div>

          <div className="section-full bg-white">
            <div className="container ">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-head text-center">
                    <div className="icon-bx icon-bx-lg d-none">
                      <img src={cake1} alt="" />
                    </div>
                    <h3>We Are Professional at Our Skills</h3>
                    <p>More than 1000+ customers trusted us</p>
                  </div>
                </div>
              </div>
              <div className="row">
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
            <div className="container">
              <div className="row m-lr0 about-area1">
                <div className="col-lg-6 p-lr0">
                  <img className="img-cover" src={pic3} alt="" />
                </div>
                <div className="col-lg-6 p-lr0 d-flex align-items-center text-center">
                  <div className="about-bx">
                    <div className="section-head text-center text-white">
                      <h4 className="text-white">For More Offer</h4>
                      <p>Contact us</p>
                      <div className="icon-bx icon-bx-xxl">
                        <img src={config.logo} className="fluid" alt="sukhaa" />
                      </div>
                    </div>
                    <p>{config.contact_email}</p>
                    <p>{config.contact_phone1}</p>
                    <Link to={"contact"} className="btn-secondry border white btn btnhover btn-md">
                      <i className="fas fas-cart"></i>Contact
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="container my-4">
              {/* <OurPartners /> */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-head text-center">
                    <div className="icon-bx icon-bx-lg">
                      <img src={config.logo} alt="" />
                    </div>
                    <h3>Thanks for reaching us.</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index1;
