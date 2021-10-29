import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import config from "../../config.json";
//import ReactStars from "react-stars";
import "react-multi-carousel/lib/styles.css";
//import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import img1 from "./../../images/banner/bnr1.jpg";

const Orderhistory = (props) => {
  //const [productDtl, setProductDtl] = useState({});
  //const [productReviews, setProductReviews] = useState([]);
  //const [validationMsg, setValidationMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [orderHistory, setOrderHistory] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  const getOrderHistory = async () => {
    await fetch(config.service_url + `getOrderHistory`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userid: localStorage.getItem("uuid") }) })
      .then((response) => response.json())
      .then((data) => {
        setOrderHistory(data.data);
        console.log(data.data, "order history");
      });
  };
  useEffect(() => {
    getOrderHistory();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data, e) => {
    e.preventDefault();
    fetch(config.service_url + `getOrderDetailsByOrderID`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderid: data.orderid }) })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setOrderDetails(data.data);
          console.log(data, "order detail ");
        } else {
          setSuccessMsg(data.message);
        }
      });
  };

  return (
    <div>
      <Header />
      <div className="page-content bg-white">
        <div className="dlab-bnr-inr overlay-black-middle" style={{ backgroundImage: "url(" + img1 + ")" }}>
          <div className="container">
            <div className="dlab-bnr-inr-entry">
              <h1 className="text-white">Order History</h1>

              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to={"./"}>
                      <i className="fa fa-home"></i>
                    </Link>
                  </li>
                  <li>Order History</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="content-block">
          <div className="section-full content-inner-1 bg-gray-light">
            <div className="container woo-entry">
              <div className="row">
                <div className="col-lg-12">
                  <div>
                    <div className="dlab-tabs product-description tabs-site-button m-t30">
                      <ul className="nav nav-tabs">
                        <li>
                          <Link className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-review">
                            Order History
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-des">
                            Order Status
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link" id="pills-payment-tab" data-bs-toggle="pill" data-bs-target="#pills-payment">
                            Payment
                          </Link>
                        </li>
                      </ul>

                      <div className="tab-content">
                        <div className="tab-pane " id="pills-des">
                          <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="comment-form-author">
                              <div className="row">
                                <div className="col">
                                  <label>
                                    Order id <span className="required">*</span>
                                  </label>
                                  <input type="text" aria-required="true" size="30" name="orderid" {...register("orderid", { required: true })} id="orderid" />
                                  {errors.orderid && "Order Id is required"}
                                </div>
                                <div className="col">
                                  <label className="text-light">.</label>
                                  <button type="submit" className="btn btnhover">
                                    Submit
                                  </button>
                                  <div>{successMsg}</div>
                                </div>
                              </div>
                            </div>
                          </form>

                          <div>
                            {orderDetails?.map((dtl) => {
                              return (
                                <div>
                                  <div className="p-1">
                                    <b>Order Date :</b> {dtl.orderdate}{" "}
                                  </div>

                                  <div className="p-1">
                                    <b>Order Status:</b> {dtl.orderstatus}{" "}
                                  </div>
                                  <div className="p-1">
                                    <b>Tax:</b> <i class="fa fa-inr"></i> {dtl.tax}{" "}
                                  </div>
                                  <div className="p-1">
                                    <b>Shipping:</b> <i class="fa fa-inr"></i> {dtl.shipping}{" "}
                                  </div>
                                  <div className="p-1">
                                    <b>
                                      Total(Tax+Shipping): <i class="fa fa-inr"></i> {dtl.grosstotal}{" "}
                                    </b>
                                  </div>
                                  <div className="p-1">
                                    <b>Payment Method:</b> {dtl.paymentmethod}
                                  </div>
                                  <div className="p-1">
                                    <b>Payment Status:</b> {dtl.paymentstatus}
                                  </div>

                                  <div className="p-1">
                                    <b>Delivery Status:</b> {dtl.deliverystatus}{" "}
                                  </div>
                                  {dtl.products.map((productDtl) => {
                                    return (
                                      <div>
                                        <div className="content-block">
                                          <div className="section-full py-3">
                                            <div className="container ">
                                              <div className="row">
                                                <div className="col-lg-1">
                                                  <Link to={{ pathname: `/shop-product-details/${productDtl.p_id}` }}>
                                                    <img src={productDtl.p_image} alt="" height="20" />
                                                  </Link>
                                                </div>
                                                <div className="col-lg-5">
                                                  <div>
                                                    <div className="mb-2">
                                                      <Link to={{ pathname: `/shop-product-details/${productDtl.p_id}` }}>{productDtl.p_name}</Link>
                                                    </div>
                                                    <div className="mb-2">
                                                      Price per Unit: <i class="fa fa-inr"></i> {productDtl.p_price} | Qty: {productDtl.p_quantity}
                                                    </div>{" "}
                                                    <div>
                                                      <b>
                                                        Total:<i class="fa fa-inr"></i>
                                                        {productDtl.p_quantity * productDtl.p_price}
                                                      </b>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="tab-pane active" id="pills-review">
                          <div id="review_form_wrapper">
                            <div id="review_form">
                              <div id="respond" className="comment-respond">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <h3>Your Order</h3>
                                    <table className="table-bordered check-tbl">
                                      <thead>
                                        <tr>
                                          <th>Order Id</th>
                                          <th>Order Date</th>
                                          <th>Order status</th>
                                          <th>Delivery Status</th>
                                          <th className="d-none">Delivery Date</th>
                                          <th>Payment Status</th>
                                          <th>Total</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {orderHistory?.map((orderhistory) => (
                                          <tr>
                                            <td className="font-weight-normal">{orderhistory.orderid}</td>
                                            <td className="font-weight-light">{orderhistory.orderdate}</td>
                                            <td className="font-weight-light">{orderhistory.orderstatus}</td>
                                            <td className="font-weight-light">{orderhistory.deliverystatus}</td>
                                            <td className="font-weight-light d-none">{orderhistory.deliverydate}</td>
                                            <td className="font-weight-light">{orderhistory.paymentstatus}</td>
                                            <td className="font-weight-light ">
                                              <span className="float-left">
                                                <i class="fa fa-inr"></i> {orderhistory.grosstotal}
                                              </span>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="tab-pane" id="pills-payment">
                          <div className="mb-2">
                            <h5>Pay Here</h5>
                            <img src={config.qrurl} className="border rounded w-50" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <Owl category={productDtl.p_category} /> */}
          <div class="mb-5">
            <div class="mt-5"></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Orderhistory;
