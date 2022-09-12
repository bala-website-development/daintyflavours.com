import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/NavBarMenu";
import Footer from "./../Layout/Footer";
import config from "../../config.json";
var img1 = require("./../../images/banner/bnr1.jpg");
var img2 = require("./../../images/background/bg5.jpg");

const Loading = () => {
  //const [count, setCount] = useState(localStorage.getItem("loadcount") || 0);
  useEffect(() => {
    window.location.reload(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Header />

      <div className="page-content bg-white">
        <div className="dlab-bnr-inr  bg-pt" style={{ backgroundImage: "url(" + config.bannerimg1 + ")" }}>
          <div className="container">
            <div className="dlab-bnr-inr-entry">
              <h1 className="text-white">Error 404</h1>

              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to={"./"}>
                      <i className="fa fa-home"></i>
                    </Link>
                  </li>
                  <li>Loading</li>
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
                      <p>Loading...</p>

                      <Link to={"./"} className="btn btnhover">
                        Go To Home
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
  );
};

export default Loading;
