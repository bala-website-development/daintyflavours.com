import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/NavBarMenu";
import Footer from "./../Layout/Footer";
import { TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import config from "../../config.json";
import bnr from "./../../images/banner/bnr3.jpg";

const Shoplogin = ({ history }) => {
  const [fphonenumber, setFphonenumber] = useState("");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log("login user", data);
    fetch(config.service_url + "login", { method: "POST", headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") }, body: JSON.stringify({ phonenumber: data.phonenumber, password: data.password }) })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          localStorage.setItem("uuid", data.data.uuid);
          localStorage.setItem("name", data.data.name);
          localStorage.setItem("role", data.data.role);
          localStorage.setItem("accessToken", data.data.token);
          setMessage("");
          history.push("/shop");
        } else if (data?.status === 499) {
          history.push("/shop-login");
        } else {
          //alert(data.message);
          setMessage(data.message);
        }
      })
      .catch((err) => {
        setMessage("Something went wrong, Please try again later!!");
      });
  };
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const forgetPwd = () => {
    if (fphonenumber === "") {
      setMessage("Please enter registerd phone number");
      return;
    }

    let data = {
      phonenumber: fphonenumber,
      adminLabel: config.websitetitle,
      adminEmail: config.fromemail,
    };

    fetch(config.service_url + "userforgetpassword", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data }) })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          localStorage.clear();
          setFphonenumber("");
          setMessage("Please check your registerd email.");
        } else if (data.status === 499) {
          history.push("/shop-login");
        } else {
          setMessage(data.message);
          console.log("error", data.message);
        }
      })
      .catch((err) => {
        setMessage("Something went wrong, Please try again later!!");
      });
  };
  return (
    <div>
      <Header />
      <div className="page-content bg-white">
        <div className="dlab-bnr-inr  bg-pt" style={{ backgroundImage: "url(" + config.bannerimg1 + ")" }}>
          <div className="container">
            <div className="dlab-bnr-inr-entry">
              <h1 className="text-white">Login</h1>

              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to={"./"}>Home</Link>
                  </li>
                  <li>Login</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="section-full  py-3 shop-account">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="m-t0 m-b40 m-md-b20">Already Registered?</h2>
              </div>
            </div>
            <div className="row align-content-stretch">
              <div className="col-lg-6 col-md-12 m-b30">
                <div className="p-a30 border-1 h100">
                  <div className="tab-content">
                    <h3 className="m-b10">New Customer</h3>
                    <p className="m-b15">By creating an account with our store, you will be able to move through the checkout process faster, view and track your orders in your account and more.</p>
                    <Link to={"/shop-register"} className="btn btnhover">
                      Create An Account
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 m-b30">
                <div className="p-a30 border-1 radius-sm">
                  <div className="tab-content tab-form nav">
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="1">
                        <form id="login" onSubmit={handleSubmit(onSubmit)} className="tab-pane active col-12 p-a0">
                          <h3 className="m-b5">Login</h3>
                          <p>If you have an account with us, please log in.</p>
                          <div className="form-group">
                            <label>Phone Number *</label>
                            <input name="phonenumber" required type="number" className="form-control" defaultValue="hello@example.com" {...register("phonenumber")} />
                            {/* {errors.phonenumber && "Phone Number is required"} */}
                          </div>
                          <div className="form-group">
                            <label>Password *</label>
                            <input name="password" required type="password" className="form-control" {...register("password")} />
                            {/* {errors.password && "Password is required"} */}
                          </div>
                          <div className="text-left">
                            <div className="text-red">{message}</div>
                            <button className="btn btnhover m-r5">Login</button>
                            <Link
                              to={"#"}
                              data-toggle="tab"
                              id="#forgot-password"
                              className={classnames({ active: activeTab === "1" }) + " m-l5"}
                              onClick={() => {
                                toggle("2");
                              }}
                            >
                              <i className="fa fa-unlock-alt"></i> Forgot Password
                            </Link>
                          </div>
                        </form>
                      </TabPane>
                      <TabPane tabId="2">
                        <form id="forgot-password" className={activeTab === "2" ? "tab-pane fade col-12 p-a0  show" : " tab-pane fade col-12 p-a0 "}>
                          <h4>Forget Password ?</h4>
                          <p>We will send you an email with your password details. </p>
                          <div className="form-group">
                            <label className="">Phone Number *</label>

                            <input name="forgetphonenumber" value={fphonenumber} type="number" className=" border form-control w-100" onChange={(e) => setFphonenumber(e.target.value)} />
                          </div>
                          <div>{message}</div>
                          <div className="text-left gray-btn">
                            <Link
                              className={classnames({ active: activeTab === "2" }) + " btn  gray"}
                              onClick={() => {
                                toggle("1");
                              }}
                              data-toggle="tab"
                              to={"#"}
                            >
                              Back
                            </Link>
                            <button type="button" className="btn btnhover pull-right" onClick={(e) => forgetPwd()}>
                              Reset your Password
                            </button>
                          </div>
                        </form>
                      </TabPane>
                    </TabContent>
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

export default Shoplogin;
