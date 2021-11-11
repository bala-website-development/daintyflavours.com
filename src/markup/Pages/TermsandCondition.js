import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import OurPartners from "./../Element/OurPartners";
import CountUp from "react-countup";

import img1 from "./../../images/banner/bnr1.jpg";
import img2 from "./../../images/background/bg1.jpg";
import img3 from "./../../images/background/bg5.jpg";
import img4 from "./../../images/background/bg3.jpg";
import member1 from "./../../images/our-team/member1.jpg";
import member2 from "./../../images/our-team/member2.jpg";
import member3 from "./../../images/our-team/member3.jpg";
import member4 from "./../../images/our-team/member4.jpg";

import cake1 from "./../../images/cake1.jpg";
import pic5 from "./../../images/about/pic5.jpg";
import pic6 from "./../../images/about/pic6.jpg";
import config from "../../config.json";
const teamInfo = [
  {
    image: member1,
    name: "Nashid Martines",
    post: "Founder",
  },
  {
    image: member2,
    name: "Konne Backfiled",
    post: "Sous Chef",
  },
  {
    image: member3,
    name: "Valentino Morose",
    post: "Ceo & Founder",
  },
  {
    image: member4,
    name: "Hackson Willingham",
    post: "Master Chef",
  },
];

class About extends Component {
  render() {
    return (
      <div>
        <Header active="about" />

        <div className="page-content bg-white">
          <div className="dlab-bnr-inr overlay-black-middle" style={{ backgroundImage: "url(" + img1 + ")" }}>
            <div className="container">
              <div className="dlab-bnr-inr-entry">
                <h1 className="text-white">Terms and Condition</h1>

                <div className="breadcrumb-row">
                  <ul className="list-inline">
                    <li>
                      <Link to={"/"}>
                        <i className="fa fa-home"></i>
                      </Link>
                    </li>
                    <li>Terms and Condition</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="content-block">
            <div className="section-full bg-white content-inner">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-head text-center">
                      <div className="my-4">
                        <img src={config.logo} width="250px" className="rounded" alt="tsalastudio" />
                      </div>
                      <h3>Terms and Condition</h3>
                    </div>
                  </div>
                </div>
                <div className="row sp30">
                  <div className="col-lg-12 col-md-12 m-b30">
                    <div className="">
                      <p>{config.tc1}</p>
                      <p>{config.tc2}</p>
                      <p>{config.tc3}</p>
                      <p>{config.tc4}</p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-head">
                      <div className="my-4 d-none">
                        <img src={config.logo} width="250px" className="rounded" alt="tsalastudio" />
                      </div>
                      <h3 className="title text-primary">Contact us</h3>
                      <div>
                        <blockquote>
                          <p>Founder: {config.contact_name} </p>
                          <p>Address : {config.contact_address} </p>
                          <p>Contact : {config.contact_phone1}</p>
                          <p>
                            Email : <a href={"mailto:" + config.contact_email}>{config.contact_email}</a>
                          </p>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-full  bg-white">
              <div className="p-tb50">
                <div className="container">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="section-head text-center">
                        <h3>Thanks for reaching us</h3>
                        <p>We love our customers, so feel free to contact us.</p>
                        <Link to={"contact"} className="btn-secondry   btn btnhover btn-md">
                          <i className="fas fas-cart"></i>Contact us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <OurPartners /> */}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default About;
