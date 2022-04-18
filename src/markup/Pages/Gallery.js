import React from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/NavBarMenu";
import Footer from "./../Layout/Footer";
import img1 from "./../../images/banner/bnr1.jpg";
import img2 from "./../../images/background/bg5.jpg";
import config from "../../config.json";
import Gallery from "./../Element/Gallery";

const Success = () => {
  return (
    <div>
      <div>
        <Header />

        <div className="page-content bg-white">
          <div className="dlab-bnr-inr  bg-pt" style={{ backgroundImage: "url(" + config.bannerimg1 + ")" }}>
            <div className="container">
              <div className="dlab-bnr-inr-entry">
                <h1 className="text-white">Gallery</h1>
                <div className="breadcrumb-row">
                  <ul className="list-inline">
                    <li>
                      <Link to={"./"}>
                        <i className="fa fa-home"></i>
                      </Link>
                    </li>
                    <li>Gallery</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="content-block">
            <div className="section-fullcontact-form bg-white">
              <div className="row py-3">
                <Gallery />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Success;
