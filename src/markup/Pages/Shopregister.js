import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/NavBarMenu";
import Footer from "./../Layout/Footer";
import { useForm } from "react-hook-form";
import uuid from "react-uuid";
import config from "../../config.json";
import bnr from "./../../images/banner/bnr1.jpg";
const Shopregister = ({ history }) => {
  const [message, setMessage] = useState("");
  const [valmessage, setValMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const onSubmit = (data, e) => {
    e.preventDefault();
    let datas = {
      userid: uuid(),
      createddate: new Date(),
      isactive: "1",
      city: data.city,
      phonenumber: data.phonenumber,
      address: data.address,
      state: data.state,
      password: data.password,
      pincode: data.pincode,
      email: data.email,
      name: data.firstname + " " + data.lastname,
      loggedin: false,
    };
    console.log("registered user", datas);

    fetch(config.service_url + "users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ datas }) })
      .then((response) => response.json())
      .then((data) => {
        console.log("regitered user", data);
        if (data.status === 200) {
          setMessage(data.message);
          setValMessage("");
          e.target.reset();
        } else {
          setValMessage(data.message);
          setMessage("");
        }
      })
      .catch((err) => {
        setValMessage("Something went wrong, Please try again later!!");
      });
  };

  return (
    <div>
      <Header active={"shop"} />
      <div className="page-content bg-white">
        <div className="dlab-bnr-inr  bg-pt" style={{ backgroundImage: "url(" + config.bannerimg1 + ")" }}>
          <div className="container">
            <div className="dlab-bnr-inr-entry">
              <h1 className="text-white">Register</h1>

              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to={"./"}>Home</Link>
                  </li>
                  <li>Register</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="section-full py-3 shop-account">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="m-b40 m-md-b20">Create An Account</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="p-a30 border-1 max-w800 m-auto radius-sm">
                  <div className="tab-content">
                    <form id="login" className="tab-pane active" onSubmit={handleSubmit(onSubmit)}>
                      <h3 className="m-b5">Personal Information</h3>
                      <p>If you have an account with us, please log in.</p>
                      <div id="personalinfo">
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label>First Name *</label>
                            <input name="firstname" required className="form-control" placeholder="First Name" type="text" {...register("firstname", { required: true })} />
                            {/* {errors.firstname && "First name is required"} */}
                          </div>
                          <div className="form-group col-md-6">
                            <label>Last Name *</label>
                            <input name="lastname" className="form-control" required placeholder="Last Name" type="text" {...register("lastname", { required: true })} />
                            {/* {errors.lastname && "Last name is required"} */}
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label>E-Mail</label>
                            <input name="email" placeholder="hello@example.com" className="form-control" type="email" {...register("email")} />
                          </div>
                          <div className="form-group col-md-6">
                            {" "}
                            <label>Phone Number *</label>
                            <input name="phonenumber" type="text" required className="form-control" placeholder="Enter Phone Number" {...register("phonenumber", { required: true })} />
                            {/* {errors.phonenumber && "Phone Number is required"} */}
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label>Password *</label>
                            <input name="password" required className="form-control " placeholder="Type Password" type="password" {...register("password", { required: true })} />
                            {/* {errors.password && "Password is required"} */}
                          </div>
                          <div className="form-group col-md-6">
                            <label>Confirm Password *</label>
                            <input name="cnfpassword" required className="form-control " placeholder="Type Password" type="password" {...register("cnfpassword", { required: true })} />
                            {/* {errors.cnfpassword && "Confirm Password is required"} */}
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Address *</label>
                          <input name="address" required type="text" className="form-control" placeholder="Address" {...register("address", { required: true })} />
                          {/* {errors.address && "Address is required"} */}
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6 d-none">
                            <label>Apartment *</label>
                            <input type="text" className="form-control" placeholder="Apartment" />
                          </div>
                          <div className="form-group col-md-6">
                            <label>Town/City *</label>
                            <input name="city" required type="text" className="form-control" placeholder="Town/City" {...register("city", { required: true })} />
                            {/* {errors.city && "City is required"} */}
                          </div>
                          <div className="form-group col-md-6">
                            <label>State/Country *</label>
                            <input name="state" required type="text" className="form-control" placeholder="State/Country" {...register("state", { required: true })} />
                            {/* {errors.state && "State/Country is required"} */}
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label>Postcode/Zip *</label>
                            <input name="pincode" required type="text" className="form-control" placeholder="Pincode" {...register("pincode", { required: true })} />
                            {/* {errors.pincode && "Pincode is required"} */}
                          </div>
                        </div>
                        <div className=" form-group  row">
                          <div className="form-group col-md-6">
                            <div className="text-success">{message}</div>
                            <div className="text-red">{valmessage}</div>
                            <button type="submit" className="btn btnhover">
                              Register
                            </button>
                          </div>
                        </div>
                      </div>
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

export default Shopregister;
