import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./../Layout/Header";
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

          // console.log("query_cartDetails", data1);
          setSubTotal(
            data
              .map((total) => {
                return total.p_price * total.p_quantity || 0;
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
        <div className="dlab-bnr-inr overlay-black-middle bg-pt" style={{ backgroundImage: "url(" + img + ")" }}>
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
                      <tr>
                        <th>Product</th>
                        <th>Product name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {!loading ? (
                        cartDetails.length > 0 ? (
                          cartDetails.map((cart, key) => (
                            <tr className="alert">
                              <td className="product-item-img">
                                <img src={cart.p_image} alt="" />
                              </td>
                              <td className="product-item-name">{cart.p_name}</td>
                              <td className="product-item-price">{cart.p_price}</td>
                              <td className="product-item-quantity">
                                <div className="quantity btn-quantity max-w80">
                                  {/* <Form> */}
                                  <select id={key} className="drpquantity" onChange={(e) => updateCartQuantity(cart.id, e.target.value)} defaultValue={cart.p_quantity}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                  </select>
                                </div>
                              </td>
                              <td className="product-item-totle">
                                <i class="fa fa-inr"></i> {cart.p_price * cart.p_quantity}
                              </td>
                              <td className="product-item-close">
                                <Link
                                  onClick={(e) => {
                                    deleteCart([cart.id]);
                                  }}
                                  data-dismiss="alert"
                                  aria-label="close"
                                  className="ti-close"
                                ></Link>
                              </td>
                            </tr>
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
                          <div className={subTotal < config.freeshippingcost ? "small" : "d-none"}>
                            {config.freeshippingmessage} <i class="fa fa-inr"></i> {config.freeshippingcost}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Tax({config.taxpercentage}%)</td>
                        <td>
                          <i class="fa fa-inr"></i> {(subTotal * config.taxpercentage) / 100}
                        </td>
                      </tr>
                      <tr>
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
