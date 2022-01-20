import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import config from "../../config.json";
import img from "./../../images/banner/bnr3.jpg";
import loadingimg from "./../../images/load.gif";
import { Modal } from "react-bootstrap";
const Shopcart = () => {
  const [cartDetails, setCartDetails] = useState([]);
  const history = useHistory();
  const [cartUpdated, setCartUpdated] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [networkError, setNetworkError] = useState("");
  const [message, setMessage] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleVisible = () => {
    setSmShow(true);
    setTimeout(() => {
      setSmShow(false);
    }, 1000);
  };

  const updateCartQuantity = (cartid, quantity) => {
    fetch(config.service_url + "updateCartQuantity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: cartid, quantity: parseInt(quantity) }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("cart details", data);
        setCartUpdated(true);
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        console.log(networkError);
      });
  };

  const deleteCart = (cartid) => {
    console.log("cartid", cartid);
    fetch(config.service_url + "deleteCart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Id: cartid }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        console.log(message);
        setCartUpdated(true);
        handleVisible();
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        console.log(networkError);
      });
  };

  useEffect(() => {
    const fetchCartDetails = () => {
      setLoading((load) => !load);
      fetch(config.service_url + "getCartProducts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userid: localStorage.getItem("uuid") }) })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 500) {
            setSubTotal(0);
            setLoading((loading) => !loading);
            // return;
          }
          setCartDetails(data);
          console.log("netdata", data);
          // console.log("query_cartDetails", data1);
          setSubTotal(
            data
              .map((total) => {
                return parseInt(total.p_net_product_price === undefined ? total.p_price : total.p_net_product_price) * total.p_quantity || 0;
              })
              .reduce((a, b) => a + b, 0)
          );
          setLoading((loading) => !loading);
          console.log("cart details", data);
          setCartUpdated(false);
        })
        .catch(function (error) {
          setNetworkError("Something went wrong, Please try again later!!");
          console.log(networkError);
        });
    };
    if (localStorage.getItem("uuid") !== undefined && localStorage.getItem("uuid") !== null) {
      fetchCartDetails();
    } else {
      history.push("/shop-login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartUpdated]);

  return (
    <div>
      <Modal size="sm" show={smShow} onHide={() => setSmShow(false)}>
        <Modal.Header closeButton>Item Removed Sucessfully.</Modal.Header>
      </Modal>
      <Header />

      <div className="page-content bg-white">
        <div className="dlab-bnr-inr  bg-pt" style={{ backgroundImage: "url(" + config.bannerimg1 + ")" }}>
          <div className="container">
            <div className="dlab-bnr-inr-entry">
              <h1 className="text-white">Cart</h1>

              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to={"./"}>Home</Link>
                  </li>
                  <li>Shop Cart</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="section-full content-inner">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive m-b50">
                  <table className="table check-tbl">
                    <thead>
                      <div className="d-flex justify-content-between font-weigth-bold my-1 p-2 border-bottom">
                        <div className="w-25">
                          <b>Product</b>
                        </div>
                        <div className="w-30">
                          <b>Name</b>
                        </div>
                        <div className="w-25">
                          <b>Price</b>
                        </div>
                        <div className="w-25">
                          <b>Qty.</b>
                        </div>
                        <div className="w-25">
                          <b>Total</b>
                        </div>
                        <div className="w-25">
                          <b>Tax</b>
                        </div>
                        <div className="w-25">
                          <b>
                            Net Amount <i>*inclusive of tax</i>
                          </b>
                        </div>
                        <div className="w-10"></div>
                      </div>
                    </thead>
                    <tbody>
                      {!loading ? (
                        cartDetails.length > 0 ? (
                          cartDetails.map((cart, key) => (
                            <div className="d-flex justify-content-between align-items-center p-1 my-1 border-bottom">
                              <div className="w-25">
                                <img className="smallimage" src={cart.p_image ? cart.p_image : config.defaultimage} alt="" />
                              </div>
                              <div className="w-30">{cart.p_name}</div>
                              <div className="w-25">{cart.p_price}</div>
                              <div className="w-25">
                                <select id={key} className="drpquantity" onChange={(e) => updateCartQuantity(cart.id, e.target.value)} defaultValue={cart.p_quantity}>
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                                  <option value={6}>6</option>
                                  <option value={7}>7</option>
                                  <option value={8}>8</option>
                                  <option value={9}>9</option>
                                  <option value={10}>10</option>
                                </select>
                              </div>
                              <div className="w-25 text-nowrap">
                                {" "}
                                <i class="fa fa-inr"></i> {cart.p_price * cart.p_quantity}
                              </div>
                              <div className="w-25 text-nowrap">
                                {" "}
                                {cart.p_tax === undefined ? 0 : cart.p_tax} {"%"}
                              </div>
                              <div className="w-25 text-nowrap">
                                {" "}
                                <i class="fa fa-inr"></i> {parseInt(cart.p_price * cart.p_quantity) + cart.p_price * cart.p_quantity * ((cart.p_tax === undefined ? 0 : parseInt(cart.p_tax)) / 100)}
                              </div>
                              <div className="w-10">
                                <Link
                                  onClick={(e) => {
                                    deleteCart([cart.id]);
                                  }}
                                  data-dismiss="alert"
                                  aria-label="close"
                                  className="ti-close"
                                ></Link>
                              </div>
                            </div>
                          ))
                        ) : (
                          "No Items in your Cart"
                        )
                      ) : (
                        <div className="p-2">
                          <div className="p-2">Fetching cart deails, please wait...</div>
                          <img className="p-2" src={loadingimg} height="20" alt="Loading..."></img>
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 m-b30">
                {/* <form className="shop-form">
                  <h3>Calculate Shipping</h3>
                  <div className="form-group">
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Control as="select">
                        <option value="">Credit Card Type</option>
                        <option value="">Another option</option>
                        <option value="">A option</option>
                        <option value="">Potato</option>
                      </Form.Control>
                    </Form.Group>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-6">
                      <input type="text" className="form-control" placeholder="Credit Card Number" />
                    </div>
                    <div className="form-group col-lg-6">
                      <input type="text" className="form-control" placeholder="Card Verification Number" />
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Coupon Code" />
                  </div>
                  <div className="form-group">
                    <button className="btn btnhover" type="button">
                      Apply Coupon
                    </button>
                  </div>
                </form> */}
              </div>
              {cartDetails.length > 0 && (
                <div className="col-lg-6 col-md-6">
                  <h3>Cart Subtotal</h3>
                  <table className="table-bordered check-tbl">
                    <tbody>
                      <tr>
                        <td>Order Subtotal</td>
                        <td>
                          <i class="fa fa-inr"></i> {subTotal}
                        </td>
                      </tr>
                      <tr>
                        <td>Shipping</td>
                        <td>
                          <i class="fa fa-inr"></i> {subTotal < config.freeshippingcost ? config.shippingcost : 0}
                          <br />
                          <span className={subTotal < config.freeshippingcost ? "small" : "d-none"}>
                            {config.freeshippingmessage} <i class="fa fa-inr"></i> {config.freeshippingcost}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Tax({config.taxpercentage}%)</td>
                        <td>
                          <i class="fa fa-inr"></i> {(subTotal * config.taxpercentage) / 100}
                        </td>
                      </tr>
                      <tr className="bg-primary text-light">
                        <td>Total</td>
                        <td>
                          <i class="fa fa-inr"></i> {subTotal + (subTotal * config.taxpercentage) / 100 + (subTotal < config.freeshippingcost ? config.shippingcost : 0)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="form-group">
                    {/* <button className="btn btnhover" type="button">
                    Proceed to Checkout 
                  </button> */}
                    <Link to={{ pathname: "/shop-checkout", cartdetails: cartDetails }} className="btn btnhover">
                      <i className="ti-shopping-cart m-r5"></i> Proceed to Checkout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shopcart;
