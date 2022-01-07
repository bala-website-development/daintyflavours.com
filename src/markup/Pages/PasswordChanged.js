import React from "react";
import { Link } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import img1 from "./../../images/banner/bnr1.jpg";
import img2 from "./../../images/background/bg5.jpg";
import config from "../../config.json";
const PasswordChanged = () => {
  return (
    <div>
      <div>
        <Header />

        <div className="page-content bg-white">
          <div className="dlab-bnr-inr  bg-pt" style={{ backgroundImage: "url(" + config.bannerimg1 + ")" }}>
            <div className="container">
              <div className="dlab-bnr-inr-entry">
                <h1 className="text-white">Success</h1>
                <div className="breadcrumb-row">
                  <ul className="list-inline">
                    <li>
                      <Link to={"./"}>
                        <i className="fa fa-home"></i>
                      </Link>
                    </li>
                    <li>Success</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="content-block">
            <div className="section-full content-inner-2 contact-form bg-white" style={{ backgroundImage: "url(" + img2 + ")", backgroundSize: "100%" }}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="page-notfound text-center">
                      <form method="post">
                        <strong>
                          <i className="fa fa-check text-primary"></i>
                        </strong>
                        <h5 className="sub-title">Password changed succesfully.</h5>
                        <Link to={"./shop-login"} className="btn btnhover">
                          Go To Login Page
                        </Link>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default PasswordChanged;
