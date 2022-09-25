import React from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import img1 from "./../../images/banner/bnr1.jpg";
import img2 from "./../../images/background/bg5.jpg";
import config from "../../config.json";

const Success = () => {
  return (
    <div>
      <div>
        {/* <Header /> */}

        <div className="page-content bg-white">
          <div className="dlab-bnr-inr  bg-pt" style={{ backgroundImage: "url(" + config.homebannerimg + ")" }}>
            <div className="container">
              <div className="dlab-bnr-inr-entry">
                <h1 className="text-white">Site Construction in Progress</h1>
                <div className="breadcrumb-row">
                  <ul className="list-inline">
                    <li>
                      <Link to={"./"}>HOME</Link>
                    </li>
                    <li>Site Construction in Progress</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="content-block">
            <div className="section-fullcontact-form bg-white">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="page-notfound text-center">
                      <form method="post">
                        <strong>
                          <i className="fa fa-cog fa-spin fa-fw text-primary"></i>
                        </strong>
                        <h5 className="sub-title">Site Construction in Progress. Please wait..... </h5>
                        <h5 className="sub-title">We will be Live Soon.</h5>
                        <Link to={"./home"} className="btn btnhover">
                          Home
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

export default Success;
