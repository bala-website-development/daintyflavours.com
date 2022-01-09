import React, { useEffect, useState } from "react";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import OurPartners from "./../Element/OurPartners";
import Slider from "./../Element/Slider";
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
    fetchCategories();
  }, []);
  return (
    <div>
      <Header active={"home"} />

      <div className="page-content bg-white">
        <div className="content-block">
          <Slider />
          <div>
            <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 300" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150">
              <path fill="#FFECEF" fill-opacity="1" d="M0,288L7.1,245.3C14.1,203,28,117,42,74.7C56.5,32,71,32,85,58.7C98.8,85,113,139,127,181.3C141.2,224,155,256,169,229.3C183.5,203,198,117,212,122.7C225.9,128,240,224,254,240C268.2,256,282,192,296,170.7C310.6,149,325,171,339,181.3C352.9,192,367,192,381,165.3C395.3,139,409,85,424,58.7C437.6,32,452,32,466,53.3C480,75,494,117,508,154.7C522.4,192,536,224,551,202.7C564.7,181,579,107,593,106.7C607.1,107,621,181,635,176C649.4,171,664,85,678,53.3C691.8,21,706,43,720,85.3C734.1,128,748,192,762,229.3C776.5,267,791,277,805,282.7C818.8,288,833,288,847,261.3C861.2,235,875,181,889,181.3C903.5,181,918,235,932,218.7C945.9,203,960,117,974,85.3C988.2,53,1002,75,1016,90.7C1030.6,107,1045,117,1059,144C1072.9,171,1087,213,1101,224C1115.3,235,1129,213,1144,213.3C1157.6,213,1172,235,1186,224C1200,213,1214,171,1228,149.3C1242.4,128,1256,128,1271,133.3C1284.7,139,1299,149,1313,144C1327.1,139,1341,117,1355,122.7C1369.4,128,1384,160,1398,176C1411.8,192,1426,192,1433,192L1440,192L1440,0L1432.9,0C1425.9,0,1412,0,1398,0C1383.5,0,1369,0,1355,0C1341.2,0,1327,0,1313,0C1298.8,0,1285,0,1271,0C1256.5,0,1242,0,1228,0C1214.1,0,1200,0,1186,0C1171.8,0,1158,0,1144,0C1129.4,0,1115,0,1101,0C1087.1,0,1073,0,1059,0C1044.7,0,1031,0,1016,0C1002.4,0,988,0,974,0C960,0,946,0,932,0C917.6,0,904,0,889,0C875.3,0,861,0,847,0C832.9,0,819,0,805,0C790.6,0,776,0,762,0C748.2,0,734,0,720,0C705.9,0,692,0,678,0C663.5,0,649,0,635,0C621.2,0,607,0,593,0C578.8,0,565,0,551,0C536.5,0,522,0,508,0C494.1,0,480,0,466,0C451.8,0,438,0,424,0C409.4,0,395,0,381,0C367.1,0,353,0,339,0C324.7,0,311,0,296,0C282.4,0,268,0,254,0C240,0,226,0,212,0C197.6,0,184,0,169,0C155.3,0,141,0,127,0C112.9,0,99,0,85,0C70.6,0,56,0,42,0C28.2,0,14,0,7,0L0,0Z"></path>
            </svg>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="section-head mb-0 text-center">
                <div className="my-4">
                  <img className="rounded d-none" width="200px" src={config.logo} alt="" />
                </div>
                <h3 className="text-primary">{config.aboutustitle}</h3>
                <p className="main-text">{config.aboutus1} </p>
                <p>{config.aboutus2}</p>
                <div className="text-center mb-3">
                  <Link to={"/about"} className="btn btn-md btnhover shadow m-t30">
                    <i className="fa fa-angle-right m-r10"></i>More..
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Tab />
          </div>

          <div>
            <div className="section-head mb-0 text-center">
              <div className="my-4">
                <h3 className="text-primary">View our Gallery</h3>
              </div>
            </div>
            <div className="text-center mt-2">
              <Link to={"/Gallery"} className="btn btn-md btnhover shadow m-t30">
                <i className="fa fa-angle-right m-r10"></i>Gallery
              </Link>
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
                      <Link to={"/our-journey"} className="btn btn-md btnhover shadow m-t30">
                        <i className="fa fa-angle-right m-r10"></i>More..
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-full my-5 ">
            <div className="container">
              <div className="row faq-area1">
                <div className="recentproduct px-3">
                  <Featured_Products></Featured_Products>
                  <Recent_Product></Recent_Product>
                </div>
                <div className="col-lg-12 m-b30 d-none">
                  <Accord />
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
        <h1 className="titlename font-weight-light">Join our Newletter for latest offers and Baking tips</h1>
      </div>
      <A_Newsletter />
      <ScrollToTop />

      <Footer />
    </div>
  );
};

export default Index1;
