import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./../Layout/NavBarMenu";
import Footer from "./../Layout/Footer";
import config from "../../config.json";
//import ReactStars from "react-stars";
import "react-multi-carousel/lib/styles.css";
//import uuid from "react-uuid";
//import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as moment from "moment";
import img1 from "./../../images/banner/bnr1.jpg";
import { Modal } from "react-bootstrap";

const Myprofile = (props) => {
  //const { id } = props.match.params;
  //const [productDtl, setProductDtl] = useState({});
  //const [productReviews, setProductReviews] = useState([]);
  //const [validationMsg, setValidationMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [profile, setProfile] = useState([]);
  //const [networkError, setNetworkError] = useState("");
  const [smShow, setSmShow] = useState(false);
  const history = useHistory();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const handleVisible = () => {
    setSmShow(true);
    setTimeout(() => {
      setSmShow(false);
    }, 1000);
  };

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };
  const changePassword = async (e) => {
    e.preventDefault();
    let _data = {};
    _data.oldPassword = oldPassword;
    _data.newPassword = newPassword;
    _data.uuid = localStorage.getItem("uuid");
    await fetch(config.service_url + "changepassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ data: _data }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          localStorage.clear();
          history.push("/password-success");
        } else if (data.status === 499) {
          history.push("/shop-login");
        } else {
          setSuccessMsg(data.message);
          handleVisible();
        }
        console.log(data, "profile");
        console.log(profile, "profilestate");
      });
  };

  useEffect(() => {
    const getUserProfile = () => {
      fetch(config.service_url + "getuserprofile", { method: "POST", headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") }, body: JSON.stringify({ userid: localStorage.getItem("uuid") }) })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            // setSuccessMsg(data.message);
            setProfile(data.data);
            // handleVisible();
          } else if (data.status === 499) {
            history.push("/shop-login");
          } else {
            setSuccessMsg(data.message);
            handleVisible();
          }
          console.log(data, "profile");
          console.log(profile, "profilestate");
        });
    };
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: {}, mode: "blur" });
  const onSubmit = (userdetails, e) => {
    let methodname = "profile";
    setSuccessMsg("Please wait");
    setSmShow(true);
    e.preventDefault();
    if (localStorage.getItem("uuid") === undefined || localStorage.getItem("uuid") === null) {
      history.push("/");
    } else {
      userdetails.updateddate = new Date();

      //delete userdetails.password;
    }
    console.log("profile", JSON.stringify({ id: localStorage.getItem("uuid"), userdetails: userdetails }));
    fetch(config.service_url + `updateuserprofile`, { method: "POST", headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") }, body: JSON.stringify({ id: localStorage.getItem("uuid"), userdetails: userdetails }) })
      .then((response) => response.json())
      .then((data) => {
        console.log("regitered user", data);
        if (data.status === 200) {
          setSuccessMsg(data.message);
          handleVisible();
        } else if (data.status === 499) {
          history.push("/shop-login");
        } else {
          setSuccessMsg(data.message);
        }
      })
      .catch((err) => {
        setSuccessMsg("Something went wrong, Please try again later!!");
      });
  };
  return (
    <div>
      <Modal size="sm" show={smShow} onHide={() => setSmShow(false)}>
        <Modal.Header closeButton>{successMsg}</Modal.Header>
      </Modal>
      <Header />
      <div className="page-content bg-white">
        <div className="dlab-bnr-inr  bg-pt" style={{ backgroundImage: "url(" + config.bannerimg1 + ")" }}>
          <div className="container">
            <div className="dlab-bnr-inr-entry">
              <h1 className="text-white">Profile</h1>

              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to={"./"}>
                      <i className="fa fa-home"></i>
                    </Link>
                  </li>
                  <li>Profile</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="content-block">
          <div className="section-full py-2 bg-gray-light">
            <div className="container woo-entry">
              <div className="row">
                <div className="col-lg-12">
                  <div>
                    <div className="dlab-tabs product-description tabs-site-button m-t30">
                      <ul className="nav nav-tabs">
                        <li>
                          <Link className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-review">
                            Personal Info
                          </Link>
                        </li>
                      </ul>
                      {profile?.map((profile) => (
                        <div className="tab-content">
                          <div className="tab-pane active" id="pills-review">
                            <div id="review_form_wrapper1">
                              <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
                                <div id="review_form1">
                                  <div id="respond" className="comment-respond">
                                    <div className="comment-form-author">
                                      <label>
                                        Name <span className="required">*</span>
                                      </label>
                                      <input type="text" aria-required="true" defaultValue={profile.name} required name="name" {...register("name")} id="author" />
                                    </div>
                                    <div className="comment-form-author">
                                      <label>
                                        Email <span className="required">*</span>
                                      </label>
                                      <input type="text" aria-required="true" defaultValue={profile.email} required name="email" {...register("email")} id="author" />
                                    </div>
                                    <div className="comment-form-author">
                                      <label>
                                        Phone Number <span className="required">*</span>
                                      </label>
                                      <input type="number" aria-required="true" disabled={true} defaultValue={profile.phonenumber} required name="phonenumber" {...register("phonenumber")} id="author" />
                                    </div>

                                    <div className="form-submit">
                                      <button type="submit" className="btn btnhover">
                                        Update
                                      </button>
                                    </div>
                                  </div>

                                  <div id="respond" className="comment-respond">
                                    <div className="comment-form-author">
                                      <label>
                                        Billing/Shipping Address <span className="required">*</span>
                                      </label>
                                      <input type="text" aria-required="true" defaultValue={profile.address} required size="30" name="address" {...register("address")} id="author" />
                                    </div>
                                    <div className="comment-form-author">
                                      <label>
                                        City <span className="required">*</span>
                                      </label>
                                      <input type="text" aria-required="true" defaultValue={profile.city} required size="30" name="city" {...register("city")} id="author" />
                                    </div>
                                    <div className="comment-form-author">
                                      <label>
                                        State<span className="required">*</span>
                                      </label>
                                      <input type="text" aria-required="true" defaultValue={profile.state} required size="30" name="state" {...register("state")} id="author" />
                                    </div>
                                    <div className="comment-form-author">
                                      <label>
                                        Pincode<span className="required">*</span>
                                      </label>
                                      <input type="text" aria-required="true" defaultValue={profile.pincode} required size="30" name="pincode" {...register("pincode")} id="author" />
                                    </div>

                                    <div className="form-submit">
                                      <button type="submit" className="btn btnhover">
                                        Update
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <div id="review_form_wrapper2">
                              <div id="review_form2" className="comment-form">
                                <div id="respond" className="comment-respond">
                                  <div className="comment-form-author">
                                    <label>
                                      Current Password <span className="required">*</span>
                                    </label>
                                    <input type="password" aria-required="true" size="30" name="password" required={false} id="password" onChange={(e) => setOldPassword(e.target.value)} />
                                  </div>
                                  <div className="comment-form-author">
                                    <label>
                                      New Password <span className="required">*</span>
                                    </label>
                                    <input type="password" aria-required="true" size="30" name="newpwd" required={false} id="newpwd" onChange={(e) => setNewPassword(e.target.value)} />
                                  </div>
                                  <div className="comment-form-author">
                                    <label>
                                      Confirm Password <span className="required">*</span>
                                    </label>
                                    <input type="password" aria-required="true" size="30" name="cnfpwd" required={false} id="cnfpwd" onChange={(e) => setConfirmPwd(e.target.value)} />
                                  </div>

                                  <div className="form-submit">
                                    <button type="button" className="btn btnhover" onClick={(e) => changePassword(e)}>
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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

export default Myprofile;
