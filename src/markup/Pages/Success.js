import React from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import img1 from "./../../images/banner/bnr1.jpg";
import img2 from "./../../images/background/bg5.jpg";
import config from "../../config.json";

const Success = () => {
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
            <div className="section-fullcontact-form bg-white">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="page-notfound text-center">
                      <form method="post">
                        <strong>
                          <i className="fa fa-check text-primary"></i>
                        </strong>
                        <h5 className="sub-title">Order successfully placed.</h5>
                        <div className="mb-2 d-none">
                          <a href={config.razorpaylink} target="_blank" className="btn  btnhover">
                            Pay Here
                          </a>
                          <div className="p-3">Or Scan the QR</div>
                          <img src={config.qrurl} className="border rounded w-50" />
                        </div>
                        <Link to={"./orderhistory"} className="btn btnhover">
                          Go To Order History
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
