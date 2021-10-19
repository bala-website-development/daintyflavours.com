import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
//import GoogleMaps from "simple-react-google-maps";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import bgimg1 from "./../../images/banner/bnr3.jpg";
import bgimg2 from "./../../images/background/bg5.jpg";
import config from "../../config.json";
import { Modal } from "react-bootstrap";
const Contact = () => {
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: {} });
  const onSubmit = (data, e) => {
    console.log("data123", data);
    // const emailBody = <>
    //   <div>
    //     <p>{"Hello", `${data.c_name}`} <br /> Thanks for reaching us, we will get back to you shortly.</p>
    //     <br />
    //     <p>{"Regards,"}<br /><a href="https://www.tsalastudio.com">Tsala Studio Team</a> </p>

    //   </div></>
    const body = "<p>Hello " + data.c_name + "," + "</p>" + "<p>Thanks for reaching us, we will get back to you shorlty.</p>" + "<br/><p>Regards,</p> <p><a href='https://www.tsalastudio.com'>Tsala Studio Team</a></p>" + "<table  style='border: 1px solid black'>" + " <tr  style='border: 1px solid black'><td> <i>Name:</i></td> <td> <i>" + data.c_name + "</i></td></tr>" + "<tr style='border: 1px solid black'><td><i>Email:</i></td><td> <i>" + data.c_email + "</i></td></tr>" + "<tr style='border: 1px solid black'><td><i>Message:</i></td><td> <i>" + data.c_message + "</i></td></tr>" + "</table>";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: config.fromemail,
        to: data.c_email + "," + config.fromemail,
        subject: config.subject + data.c_name,
        text: "",
        html: body,
      }),
    };
    console.log(requestOptions);
    try {
      fetch(config.email_service_url, requestOptions).then((response) => console.log(response.json()));
      //.then((data) => this.setState({ responsemessage: "Thanks for Contacting us." }));
      //this.setState({ responsemessage: "Thanks for Contacting us." });
      setSuccessMsg("Thanks for Contacting us.");
      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header active="contact" />
      <div className="page-content bg-white">
        <div className="dlab-bnr-inr overlay-black-middle" style={{ backgroundImage: "url(" + bgimg1 + ")" }}>
          <div className="container">
            <div className="dlab-bnr-inr-entry">
              <h1 className="text-white">Contact</h1>

              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to={"./"}>
                      <i className="fa fa-home"></i>
                    </Link>
                  </li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="content-block">
          <div className="section-full content-inner-2 contact-form bg-white">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 d-flex m-md-b30 m-lg-b30">
                  <div className="p-a30 border contact-area border-1 align-self-stretch radius-sm bg-white">
                    <h3 className="m-b5">Quick Contact</h3>
                    <p> Better yet, see us in person! We love our customers, so feel free to visit during normal business hours.</p>
                    <p>If you have any questions simply use the following contact details.</p>
                    <ul className="no-margin">
                      <li className="icon-bx-wraper left m-b30">
                        <div className="icon-bx-xs border-1 text-primary">
                          {" "}
                          <Link to={""} className="icon-cell">
                            <i className="ti-location-pin"></i>
                          </Link>{" "}
                        </div>
                        <div className="icon-content">
                          <h6 className="text-uppercase m-tb0 dlab-tilte">Address:</h6>
                          <p>{config.contact_address}</p>
                        </div>
                      </li>
                      <li className="icon-bx-wraper left  m-b30">
                        <div className="icon-bx-xs border-1 text-primary">
                          {" "}
                          <Link to={""} className="icon-cell">
                            <i className="ti-email"></i>
                          </Link>{" "}
                        </div>
                        <div className="icon-content">
                          <h6 className="text-uppercase m-tb0 dlab-tilte">Email:</h6>
                          <p>{config.contact_email}</p>
                        </div>
                      </li>
                      <li className="icon-bx-wraper left">
                        <div className="icon-bx-xs border-1 text-primary">
                          <Link to={""} className="icon-cell">
                            <i className="ti-mobile"></i>
                          </Link>{" "}
                        </div>
                        <div className="icon-content">
                          <h6 className="text-uppercase m-tb0 dlab-tilte">PHONE</h6>
                          <p>{config.contact_phone1}</p>
                        </div>
                      </li>
                    </ul>
                    <div className="m-t20">
                      <ul className="dlab-social-icon dlab-social-icon-lg">
                        <li>
                          <a href={"https://www.facebook.com/tsalastudio/"} target="_blank" className="fa fa-facebook bg-primary mr-1"></a>
                        </li>
                        <li>
                          <a href={"https://www.instagram.com/tsalastudio/"} target="_blank" className="fa fa-instagram bg-primary mr-1"></a>
                        </li>
                        <li>
                          <a href={"https://www.pinterest.com/tsalaquiltingstudio/"} target="_blank" className="fa fa-pinterest-p bg-primary mr-1"></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 m-md-b30 m-lg-b30">
                  <div className="p-a30 bg-gray clearfix radius-sm contact-form-box">
                    <h3 className="m-b20">Send Message Us</h3>
                    <div className="dzFormMsg"></div>
                    <form method="post" className="dzForm" onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <div className="input-group">
                              <input name="c_name" type="text" required className="form-control" placeholder="Your Name" {...register("c_name")} />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <div className="input-group">
                              <input name="c_email" type="email" className="form-control" required placeholder="Your Email Id" {...register("c_email")} />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <div className="input-group">
                              <textarea name="c_message" rows="4" className="form-control" required placeholder="Your Message..." {...register("c_message")}></textarea>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-lg-12">
                          <div className="form-group recaptcha-bx">
                            <div className="input-group">
                              <div className="g-recaptcha" data-sitekey="6LefsVUUAAAAADBPsLZzsNnETChealv6PYGzv3ZN" data-callback="verifyRecaptchaCallback" data-expired-callback="expiredRecaptchaCallback"></div>
                              
                            </div>
                          </div>
                        </div> */}
                        <div className="col-lg-12">
                          <button name="submit" type="submit" value="Submit" className="btn btnhover">
                            {" "}
                            <span>Submit</span>{" "}
                          </button>
                        </div>
                        <div className="p-1 mt-1 border rounded">{successMsg}</div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* <div className="col-xl-4 col-lg-12 d-flex">
                  <GoogleMaps
                    apiKey={"AIzaSyBbHk3eFodSk_DSGzv8dd_dIJpZvVDyg4s "}
                    style={{ height: "500px", width: "100%" }}
                    zoom={6}
                    center={{ lat: 37.4224764, lng: -122.0842499 }}
                    markers={{ lat: 37.4224764, lng: -122.0842499 }} //optional
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
