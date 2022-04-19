import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./../Layout/NavBarMenu";
import Footer from "./../Layout/Footer";
import loadingimg from "./../../images/load.gif";
import { Form } from "react-bootstrap";
import config from "../../config.json";
import bnr from "./../../images/banner/bnr1.jpg";
import uuid from "react-uuid";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Shopchekout = () => {
  const [cartDetails, setCartDetails] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [productWeight, setProductWeight] = useState(0);
  const [networkError, setNetworkError] = useState("");
  const [loading, setLoading] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState("");

  const history = useHistory();
  const { register, handleSubmit } = useForm({ defaultValues: {} });
  // const onSubmit = data => console.log(data);
  const [userAddress, setUserAddress] = useState([]);

  // setCartDetails(props.location.cartdetails);
  // setSubTotal(cartDetails.map(total => { return total.p_price * total.p_quantity }).reduce((a, b) => a + b, 0));
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
        // setSubTotal(
        //   data
        //     .map((total) => {
        //       return total.p_price * total.p_quantity || 0;
        //     })
        //     .reduce((a, b) => a + b, 0)
        // );
        setSubTotal(
          data
            .map((total) => {
              return parseInt(total.p_net_product_price === undefined ? total.p_price : total.p_net_product_price) * total.p_quantity || 0;
            })
            .reduce((a, b) => a + b, 0)
        );
        setProductWeight(
          data
            .map((wt) => {
              return parseInt(wt.p_productweight === 0 ? 0 : wt.p_productweight * wt.p_quantity) || 0;
            })
            .reduce((a, b) => a + b, 0)
        );
        setLoading((loading) => !loading);
        console.log("cart details", data);
      })
      .catch(function (error) {
        setNetworkError("Something went wrong, Please try again later!!");
        console.log(networkError);
      });
  };

  const getUserProfile = async () => {
    await fetch(config.service_url + "getuserprofile", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") },
      body: JSON.stringify({ userid: localStorage.getItem("uuid") }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setUserAddress(data.data);
        } else if (data.status === 499) {
          history.push("/shop-login");
        } else {
          setMessage(data.message);
          handleVisible();
        }
      })
      .catch((err) => {
        setMessage("Something went wrong, Please try again later!!");
        handleVisible();
      });
  };

  useEffect(() => {
    fetchCartDetails();
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  const handleVisible = () => {
    setSmShow(true);
    setTimeout(() => {
      setSmShow(false);
    }, 1000);
  };
  const onSubmit = (data, e) => {
    e.preventDefault();
    delete userAddress[0].createddate;
    delete userAddress[0].userid;
    delete userAddress[0].password;
    delete userAddress[0].isactive;
    delete userAddress[0].updateddate;
    delete userAddress[0].token;
    let _data = {
      products: cartDetails,
      orderid: uuid(),
      orderstatus: "Ordered",
      paymentstatus: "NotReceived",
      paymentmethod: "Online",
      deliverystatus: "InProgress",
      deliverydate: "",
      orderdate: new Date(),
      //shipping: subTotal < config.freeshippingcost ? config.shippingcost : 0,
      //grosstotal: subTotal + (subTotal < config.freeshippingcost ? config.shippingcost : 0),
      shipping: productWeight / 1000.0 <= 1 ? config.shippingcost : Math.ceil((productWeight / 1000) * config.shippingcost),
      grosstotal: subTotal + (productWeight / 1000.0 <= 1 ? config.shippingcost : Math.ceil((productWeight / 1000) * config.shippingcost)),
      userid: localStorage.getItem("uuid"),
      usernotes: notes,
      billingaddress: userAddress[0],
      shippingaddress: {
        address: data.address === "" ? userAddress[0].address : data.address,
        name: data.name === "" ? userAddress[0].name : data.name,
        email: data.email === "" ? userAddress[0].email : data.email,
        city: data.city === "" ? userAddress[0].city : data.city,
        state: data.state === "" ? userAddress[0].state : data.state,
        pincode: data.pincode === "" ? userAddress[0].pincode : data.pincode,
        phonenumber: data.phonenumber === "" ? userAddress[0].phonenumber : data.phonenumber,
      },
    };
    console.log("input", data);
    console.log(_data);
    if (cartDetails.length > 0) {
      fetch(config.service_url + "placeOrder", { method: "POST", headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") }, body: JSON.stringify({ data: _data }) })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            handleVisible();
            setMessage(data.message);
            setCartDetails([]);
            // call payemnt
            history.push({
              pathname: "/payment",
              state: { amount: data.data.grosstotal, orderid: data.data.orderid, orderstatus: data.data.orderstatus, paymentstatus: data.data.paymentstatus, contactno: data.data.billingaddress.phonenumber, name: data.data.billingaddress.name, email: data.data.billingaddress.email },
            });
            setStatus(true);
          } else if (data?.status === 499) {
            history.push("/shop-login");
          } else {
            setMessage(data.message);
            setStatus(true);
          }
        })
        .catch((err) => {
          setNetworkError("Something went wrong, Please try again later!!");
          console.log(networkError);
        });
    }
  };

  return (
    <div>
      <Modal size="sm" show={smShow} onHide={() => setSmShow(false)}>
        <Modal.Header closeButton>{message}</Modal.Header>
      </Modal>
      <Header active={"shop"} />

      <div className="page-content bg-white">
        <div className="dlab-bnr-inr  bg-pt" style={{ backgroundImage: "url(" + config.bannerimg1 + ")" }}>
          <div className="container">
            <div className="dlab-bnr-inr-entry">
              <h1 className="text-white">Checkout</h1>

              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to={"./"}>Home</Link>
                  </li>
                  <li>Checkout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="section-full content-inner">
          <div className="container">
            <form className="shop-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-lg-6 col-md-12 m-b30">
                  <h3>Full Shipping Address</h3>
                  {/* <div className="form-group">
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Control as="select">
                        <option value="">Åland Islands</option>
                        <option value="">Afghanistan</option>
                        <option value="">Albania</option>
                        <option value="">Algeria</option>
                        <option value="">Andorra</option>
                        <option value="">Angola</option>
                        <option value="">Anguilla</option>
                        <option value="">Antarctica</option>
                        <option value="">Antigua and Barbuda</option>
                        <option value="">Argentina</option>
                        <option value="">Armenia</option>
                        <option value="">Aruba</option>
                        <option value="">Australia</option>
                      </Form.Control>
                    </Form.Group>
                  </div> */}
                  <div className="row">
                    <div className="form-group col-md-6">
                      Name
                      <input type="text" name="name" placeholder="First Name" defaultValue={userAddress[0]?.name} className="form-control" {...register("name")} required />
                    </div>
                    <div className="form-group col-md-6">
                      Email
                      <input type="text" name="email" className="form-control" placeholder="Email" defaultValue={userAddress[0]?.email} className="form-control" {...register("email")} required />
                    </div>
                  </div>
                  <div className="form-group">
                    Phonenumber
                    <input type="text" name="phonenumber" placeholder="Phonenumber" defaultValue={userAddress[0]?.phonenumber} className="form-control" {...register("phonenumber")} required />
                  </div>
                  <div className="form-group">
                    Full Shipping Address
                    <input type="text" name="address" placeholder="Full Address" defaultValue={userAddress[0]?.address} className="form-control" {...register("address")} required />
                  </div>
                  <div className="form-group">
                    City/Town
                    <input type="text" name="city" placeholder="Village/Town/City" defaultValue={userAddress[0]?.city} className="form-control" {...register("city")} required />
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      State
                      <input type="text" className="form-control" placeholder="State" defaultValue={userAddress[0]?.state} name="state" {...register("state")} required />
                    </div>
                    <div className="form-group col-md-6">
                      Pincode
                      <input type="text" className="form-control" placeholder="Pincode" defaultValue={userAddress[0]?.pincode} name="pincode" {...register("pincode")} required />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 m-b30 m-md-b0">
                  <h3>
                    <button className="btn-link text-black " type="button" data-toggle="collapse" data-target="#different-address">
                      User notes / Instructions / Billing Address <i className="fa fa-angle-down"></i>
                    </button>
                  </h3>
                  <div id="different-address" className="collapse">
                    <p>If Billing address is different, please updated in your profile</p>

                    <div className="form-group">
                      <div className="font-weight-bold">Billing Address:</div>
                      <div>Name : {userAddress[0]?.name}</div>
                      <div>Eamil : {userAddress[0]?.email}</div>
                      <div>
                        Address : {userAddress[0]?.address}, {userAddress[0]?.city}, {userAddress[0]?.state}, {userAddress[0]?.pincode}{" "}
                      </div>
                      <div>Phone : {userAddress[0]?.phonenumber}</div>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea type="textarea" rows="3" className="form-control" placeholder="Notes about your order, e.g. special notes for delivery, contact phone number" onChange={(e) => setNotes(e.target.value)}></textarea>
                  </div>
                </div>
              </div>
              {/* </form> */}
              <div className="dlab-divider bg-gray-dark text-gray-dark icon-center">
                <i className="fa fa-circle bg-white text-gray-dark"></i>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <h3>Your Order</h3>
                  <table className="table-bordered check-tbl">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th class="d-none">Product name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Net Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!loading ? (
                        cartDetails.length > 0 && status === false ? (
                          cartDetails.map((cart, key) => (
                            <tr className="font-weight-normal">
                              <td className="product-item-img">
                                <img src={cart.p_image ? cart.p_image : config.defaultimage} alt={cart.p_name} />
                                <div>
                                  {cart.p_name}{" "}
                                  <div>
                                    <i>{cart.p_productweight && " Wt.: " + cart.p_productweight + "gms"}</i>
                                  </div>
                                </div>{" "}
                              </td>
                              <td className="product-item-price">{cart.p_price}</td>
                              <td className="product-item-quantity">{cart.p_quantity}</td>
                              <td className="product-item-totle text-nowrap">
                                <i class="fa fa-inr"></i> {cart.p_price * cart.p_quantity}
                              </td>
                              <td className="product-item-totle">
                                <i class="fa fa-inr"></i> {(cart.p_net_product_price === undefined ? cart.p_price : cart.p_net_product_price) * cart.p_quantity}
                              </td>
                            </tr>
                          ))
                        ) : (
                          "No items in your Cart for check out."
                        )
                      ) : (
                        <div className="p-2">
                          <div className="p-2">Fetching Cart deails, please wait...</div>
                          <img className="p-2" src={loadingimg} height="20" alt="Loading.."></img>
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
                {!loading ? (
                  cartDetails.length > 0 &&
                  status === false && (
                    <div className="col-lg-6">
                      {/* <form className="shop-form" onSubmit={placeOrder}> */}
                      <h3>Order Total</h3>
                      <table className="table-bordered check-tbl">
                        <tbody>
                          <tr>
                            <td>Order Subtotal</td>
                            <td className="product-price">
                              <i class="fa fa-inr"></i> {subTotal}
                            </td>
                          </tr>
                          <tr>
                            <td>Shipping</td>
                            <td class="align-right">
                              <i class="fa fa-inr"></i> {productWeight / 1000.0 <= 1 ? config.shippingcost : Math.ceil((productWeight / 1000) * config.shippingcost)}
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>
                              <div className={"small"}>
                                Total Product Weight: {productWeight / 1000.0} Kgs. ; Cost/Kg: <i class="fa fa-inr"></i>
                                {config.shippingcost}
                                <br />
                                {config.shippingmessage}
                                <br />
                                {config.internationalshippingmessage}
                                <br />
                              </div>
                            </td>
                          </tr>
                          {/* <tr>
                            <td>Tax({config.taxpercentage}%)</td>
                            <td>
                              <i class="fa fa-inr"></i> {(subTotal * (config.taxpercentage / 100)).toFixed(2)}
                            </td>
                          </tr> */}
                          <tr className="bg-primary text-light">
                            <td>Total</td>
                            <td>
                              <i class="fa fa-inr"></i> {subTotal + (productWeight / 1000.0 <= 1 ? config.shippingcost : Math.ceil((productWeight / 1000) * config.shippingcost))}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <h4>Payment Method - Online</h4>

                      <div className="d-none">
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Name on Card" />
                        </div>
                        <div className="form-group">
                          <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Control as="select">
                              <option value=""></option>
                              <option value="Cash on Delivary">Cash on Delivary</option>
                              <option value="Others">Others</option>
                            </Form.Control>
                          </Form.Group>
                        </div>
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Credit Card Number" />
                        </div>
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Card Verification Number" />
                        </div>
                      </div>
                      <div className="form-group">
                        {cartDetails.length > 0 && status === false && (
                          <button disabled={loading} className="btn button-lg btnhover btn-block" type="submit">
                            Place Order Now - Pay Online{" "}
                          </button>
                        )}
                        <div className="d-none">
                          <h4>Payment Method - Offline</h4>
                          <h6>Please place the order and scan QR code to pay in the next screen.</h6>
                          {cartDetails.length > 0 && status === false && (
                            <button disabled={loading} className="btn button-lg btnhover btn-block" type="submit">
                              Place Order Now - Pay Offline{" "}
                            </button>
                          )}
                        </div>
                      </div>
                      {/* </form> */}
                    </div>
                  )
                ) : (
                  <div></div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shopchekout;
