import React, { Component } from "react";
import { Link } from "react-router-dom";
import bgfoter from "./../../images/background/bg2.jpg";
import config from "../../config.json";

class Footer extends Component {
  render() {
    return (
      <>
        <footer className="" style={{ backgroundImage: "url(" + config.footerimage + ")", backgroundSize: "cover" }}>
          <div className="footer-top bg-line-top">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <div className="widget widget_getintuch py-0">
                    <h4 className="footer-title">Contact Us</h4>
                    <p>Have a question? Give us a call or email. We'd love to hear from you.</p>
                    <ul>
                      <li>
                        <i className="fa fa-map-marker"></i>

                        <span>{config.contact_address}</span>
                        <br />
                        <span>
                          <p>{config.storetiming}</p>
                        </span>
                      </li>
                      <li>
                        <i className="fa fa-phone"></i>
                        <p>{config.contact_phone1}</p>
                      </li>
                      <li class="d-none">
                        <i className="fa fa-mobile"></i>
                        <p>{config.contact_phone2}</p>
                      </li>
                      <li>
                        <i className="fa fa-envelope"></i>
                        <p>{config.contact_email}</p>
                      </li>
                    </ul>
                  </div>
                  <div className="m-t20">
                    <ul className="dlab-social-icon dlab-social-icon-lg">
                      <li>
                        <a href={config.fb} target="_blank" className="fa fa-facebook bg-primary mr-1"></a>
                      </li>
                      <li>
                        <a href={config.insta} target="_blank" className="fa fa-instagram bg-primary mr-1"></a>
                      </li>
                      <li className="d-none">
                        <a href={config.pins} target="_blank" className="fa fa-pinterest-p bg-primary mr-1"></a>
                      </li>
                      <li>
                        <a href={config.whatsappurl} target="_blank" className="fa fa-whatsapp bg-primary mr-1"></a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <div className="widget widget_services border-0">
                    <h4 className="footer-title">Quick Links/ Useful Links</h4>
                    <ul className="list-2">
                      <li>
                        <Link to={"/"}>Home</Link>
                      </li>
                      <li>
                        <Link to={"/about"}>About</Link>
                      </li>
                      {/* <li>
                        <Link to={"/our-journey"}>Our Journey</Link>
                      </li> */}

                      {/* <li>
                      <Link to={"/blog-half-img-sidebar"}>Blog</Link>
                    </li> */}
                      <li>
                        <Link to={"/gallery"}>Gallery</Link>
                      </li>
                      <li>
                        <Link to={"/maincategories"}>Category</Link>
                      </li>
                      <li>
                        <Link to={"/shop"}>Shop All</Link>
                      </li>
                      <li>
                        <Link to={"/contact"}>Contact</Link>
                      </li>
                      <li>
                        <Link to={"/shop-register"}>Register</Link>
                      </li>
                      <li>
                        <Link to={"/termsandcondition"}>Terms and Condition</Link>
                      </li>
                      <li>
                        <Link to={"/privacypolicy"}>Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to={"/orderhistory"}>Order Status</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 d-none">
                  <div className="widget border-0 ">
                    <h4 className="footer-title">Store Timings</h4>

                    <ul className="work-hour-list">
                      <li>
                        <span className="day" className="text-dark">
                          <span className="text-dark">Monday to Saturday</span>
                        </span>
                        <span className="timing text-dark">9.30am to 7.30pm</span>
                      </li>
                      <li className="d-none">
                        <span className="day ">
                          <span>Saturday</span>
                        </span>
                        <span className="timing">By Appointment</span>
                      </li>
                      <li className="text-dark">
                        <span className="day">
                          <span>Sunday</span>
                        </span>
                        <span className="timing">Closed</span>
                      </li>
                    </ul>
                  </div>
                  <div className="m-t20">
                    <ul className="dlab-social-icon dlab-social-icon-lg">
                      <li>
                        <a href={config.fb} target="_blank" className="fa fa-facebook bg-primary mr-1"></a>
                      </li>
                      <li>
                        <a href={config.insta} target="_blank" className="fa fa-instagram bg-primary mr-1"></a>
                      </li>
                      <li className="d-none">
                        <a href={config.pins} target="_blank" className="fa fa-pinterest-p bg-primary mr-1"></a>
                      </li>
                      <li>
                        <a href={config.whatsappurl} target="_blank" className="fa fa-whatsapp bg-success mr-1"></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 text-left">
                  {" "}
                  <span>
                    <div className="d-none">
                      Developed/Maintained by{" "}
                      <a href="https://www.theuniquecreations.com" className="font-weight-bold" target="blank">
                        theuniquecreations
                      </a>{" "}
                    </div>
                    <div class="text-dark">
                      © {new Date().getFullYear()} Copyright Owned by {config.websitetitle}.
                    </div>
                  </span>{" "}
                </div>

                <div className="col-lg-6 col-md-6 text-right">
                  <div className="widget-link">
                    <ul>
                      <li>
                        <a href={config.admin_url} className="font-weight-light text-dark" target="blank">
                          Admin
                        </a>{" "}
                      </li>
                      <li>
                        <a href="https://www.theuniquecreations.com/contact" className="font-weight-light text-dark" target="blank">
                          Contact developer
                        </a>{" "}
                      </li>
                      <li>
                        <a href="https://www.instagram.com/theuniquecreations.it" className="font-weight-light text-dark" target="blank">
                          <i className="fa fa-instagram" />
                        </a>{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default Footer;
