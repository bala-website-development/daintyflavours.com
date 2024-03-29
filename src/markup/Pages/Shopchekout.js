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
import secureLocalStorage from "react-secure-storage";
const Shopchekout = () => {
  const [cartDetails, setCartDetails] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  //const [lsDaintyCart, setlsDaintyCart] = useState(JSON.parse(localStorage.getItem("daintycart")));
  const [lsDaintyCart, setlsDaintyCart] = useState(JSON.parse(secureLocalStorage.getItem("daintycart")));
  const [productWeight, setProductWeight] = useState(0);
  const [networkError, setNetworkError] = useState("");
  const [loading, setLoading] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState("");
  const [pickup, setPickup] = useState(false);
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [checked, setChecked] = useState(false);
  const grossTotal = pickup ? Number(subTotal).toFixed(2) : Number(subTotal + (productWeight / 1000.0 <= 1 ? config.shippingcost : Math.ceil((productWeight / 1000) * config.shippingcost))).toFixed(2);

  const history = useHistory();
  const { register, handleSubmit } = useForm({ defaultValues: {} });
  const [userAddress, setUserAddress] = useState([]);

  const updatecart = (data, ls) => {
    try {
      setSubTotal(
        data
          .map((total) => {
            // return parseInt(total.p_net_product_price === undefined ? total.p_price : total.p_net_product_price) * total.p_quantity || 0;
            // return parseInt(total.p_price * total.p_quantity) + total.p_price * total.p_quantity * ((total.p_tax === undefined ? 0 : parseInt(total.p_tax)) / 100);
            return parseInt(total.p_price < total.p_net_product_price && total.p_price !== 0 && total.p_price !== "0" && total.p_price !== "" ? total.p_price * total.p_quantity : total.p_net_product_price * total.p_quantity);
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
      //setLoading((loading) => !loading);
      console.log("cart details", subTotal);
    } catch {}
  };
  const fetchCartDetails = () => {
    setLoading((load) => !load);
    fetch(config.service_url + "getCartProducts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userid: localStorage.getItem("uuid") }) })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 500) {
          setSubTotal(0);
          setLoading((loading) => !loading);
        }
        setCartDetails(data);
        updatecart(data, 0);
        setLoading((loading) => !loading);
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

  const onChangeYesBillingaddress = (event) => {
    //setChecked(event);
    if (event) {
      console.log(event);
      var n1 = document.getElementById("name");
      var n2 = document.getElementById("user_name");
      var e1 = document.getElementById("email");
      var e2 = document.getElementById("user_email");
      var po1 = document.getElementById("phonenumber");
      var po2 = document.getElementById("user_phonenumber");
      var a1 = document.getElementById("address");
      var a2 = document.getElementById("user_address");
      var c1 = document.getElementById("city");
      var c2 = document.getElementById("user_city");
      var s1 = document.getElementById("state");
      var s2 = document.getElementById("user_state");
      var p1 = document.getElementById("pincode");
      var p2 = document.getElementById("user_pincode");
      n2.value = "";
      setName(n1.value);
      setEmail(e1.value);
      setPhonenumber(po1.value);
      setAddress(a1.value);
      setCity(c1.value);
      setState(s1.value);
      setPincode(p1.value);
      // e2.value = "";
      // po2.value = "";
      // a2.value = "";
      // c2.value = "";
      // s2.value = "";
      // p2.value = "";
      setChecked(true);
    } else {
      setChecked(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("uuid") !== undefined && localStorage.getItem("uuid") !== null) {
      //user loggined in
      fetchCartDetails();
      getUserProfile();
    } else {
      if (lsDaintyCart && lsDaintyCart.length > 0) {
        setCartDetails(lsDaintyCart);
        updatecart(lsDaintyCart, 1);
      } else {
        history.push("/");
      }
      // user not logged in
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  const handleVisible = () => {
    setSmShow(true);
    setTimeout(() => {
      setSmShow(false);
    }, 1000);
  };
  const onSubmit = (data, e) => {
    console.log("checkout input", data);
    e.preventDefault();
    if (userAddress[0]) {
      delete userAddress[0].createddate;
      delete userAddress[0].userid;
      delete userAddress[0].password;
      delete userAddress[0].isactive;
      delete userAddress[0].updateddate;
      delete userAddress[0].token;
    }
    let userid_, methodname, userloggedin;
    if (localStorage.getItem("uuid") !== undefined && localStorage.getItem("uuid") !== null) {
      methodname = "placeOrder";
      userid_ = localStorage.getItem("uuid");
      userloggedin = true;
    } else {
      //guest user
      methodname = "gplaceOrder";
      userid_ = "guestuser_" + uuid();
      userloggedin = false;
    }
    let _data = {
      products: cartDetails,
      orderid: uuid(),
      orderstatus: "Ordered",
      paymentstatus: "NotReceived",
      paymentmethod: "Online",
      deliverystatus: pickup ? "Pickup" : "InProgress",
      deliverydate: "",
      deliverymethod: pickup ? "Pickup" : "Shipping",
      orderdate: new Date(),
      shipping: pickup ? 0 : productWeight / 1000.0 <= 1 ? config.shippingcost : Math.ceil((productWeight / 1000) * config.shippingcost),
      grosstotal: grossTotal,
      userid: userid_,
      usernotes: notes,
      upinotes: "",
      billingaddress: userAddress[0],
      billingaddress: {
        address: address,
        name: name,
        email: email,
        city: city,
        state: state,
        pincode: pincode,
        phonenumber: phonenumber,
        gstnumber: data.user_gstnumber === "" || undefined ? 0 : data.user_gstnumber,
      },
      shippingaddress: {
        address: data.address === "" ? userAddress[0].address : data.address,
        name: data.name === "" ? userAddress[0].name : data.name,
        email: data.email === "" ? userAddress[0].email : data.email,
        city: data.city === "" ? userAddress[0].city : data.city,
        state: data.state === "" ? userAddress[0].state : data.state,
        pincode: data.pincode === "" ? userAddress[0].pincode : data.pincode,
        phonenumber: data.phonenumber === "" ? userAddress[0].phonenumber : data.phonenumber,
        country: data.country === "" ? userAddress[0].country : data.country,
      },
    };
    console.log("checkout input", _data);
    console.log(_data);

    if (cartDetails.length > 0) {
      fetch(config.service_url + methodname, { method: "POST", headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") }, body: JSON.stringify({ data: _data }) })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            handleVisible();
            setMessage(data.message);
            setCartDetails([]);
            // call payemnt
            history.push({
              pathname: "/payment",
              state: { amount: Number(data.data.grosstotal).toFixed(2), orderid: data.data.orderid, orderstatus: data.data.orderstatus, paymentstatus: data.data.paymentstatus, contactno: data.data.billingaddress.phonenumber, name: data.data.billingaddress.name, email: data.data.billingaddress.email, deliverymethod: data.data.deliverymethod, userLoggedin: userloggedin },
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

        <div className="section-full">
          <div className="container">
            <form className="shop-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="row p-3">
                  <div className="col-lg-8  ">
                    <input type="checkbox" id="pickup" name="pickup" value="pickup" onClick={(e) => setPickup(e.target.checked)}></input>
                    <label for="pickup" className="text-primary">
                      <b>Check the box here, if you are picking the order</b>
                    </label>
                    {pickup ? " Pick up Address: " + config.pickup_address : ""}
                  </div>
                  <div className="col-lg-4">
                    <h4 className="text-primary">
                      Ordert Total: <i class="fa fa-inr mb-0"> </i>
                      <b> {grossTotal}</b>
                    </h4>
                  </div>
                </div>
                <hr />
                <div className="col-lg-6 col-md-12 m-b30">
                  <h3>{pickup ? "Your Address" : "Shipping Address"}</h3>

                  <div className="row">
                    <div className="form-group col-md-6">
                      Name
                      <input id="name" type="text" name="name" placeholder="First Name" defaultValue={userAddress[0]?.name} className="form-control" {...register("name")} required onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group col-md-6">
                      Email
                      <input id="email" type="text" name="email" className="form-control" placeholder="Email" defaultValue={userAddress[0]?.email} className="form-control" {...register("email")} required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group">
                    Phonenumber +91-
                    <input id="phonenumber" type="tel" min={0} maxlength="10" minlength="10" name="phonenumber" placeholder="Phonenumber" defaultValue={userAddress[0]?.phonenumber} className="form-control" {...register("phonenumber")} required onChange={(e) => setPhonenumber(e.target.value)} />
                  </div>
                  <div className="form-group">
                    Full Shipping Address
                    <input id="address" type="text" name="address" placeholder="Full Address" defaultValue={userAddress[0]?.address} className="form-control" {...register("address")} required onChange={(e) => setAddress(e.target.value)} />
                  </div>
                  <div className="form-group">
                    City/Town
                    <input id="city" type="text" name="city" placeholder="Village/Town/City" defaultValue={userAddress[0]?.city} className="form-control" {...register("city")} required onChange={(e) => setCity(e.target.value)} />
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      State
                      <input id="state" type="text" className="form-control" placeholder="State" defaultValue={userAddress[0]?.state} name="state" {...register("state")} required onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div className="form-group col-md-6">
                      Pincode
                      <input id="pincode" type="tel" min={0} maxlength="6" minlength="6" className="form-control" placeholder="Pincode" defaultValue={userAddress[0]?.pincode} name="pincode" {...register("pincode")} required onChange={(e) => setPincode(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <select id="country" className="form-control" {...register("country")} required name="country" defaultValue={userAddress[0]?.country}>
                        <option value="India">India</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 m-b30 m-md-b0">
                  <input type="checkbox" id="checked" name="checked" value={checked} onClick={(e) => onChangeYesBillingaddress(e.target.checked)}></input>
                  <label for="checked"> Use same shipping address</label>

                  <h3>
                    <button className="btn-link text-black " type="button" data-toggle="collapses" data-target="#different-address">
                      Billing Address <i className="fa fa-angle-downs"></i>
                    </button>
                  </h3>
                  <div id="different-address" className="collapse-no">
                    <div className="form-group">
                      <div className="row">
                        <div className="form-group col-md-6">
                          Name
                          <input id="user_name" type="text" name="user_name" disabled={checked} placeholder="First Name" value={name} className="form-control" {...register("user_name")} required onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                          Email
                          <input id="user_email" type="text" name="user_email" value={email} disabled={checked} className="form-control" placeholder="Email" className="form-control" {...register("user_email")} required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                      </div>
                      <div className="form-group">
                        Phonenumber +91-
                        <input id="user_phonenumber" type="tel" min={0} maxlength="10" minlength="10" name="user_phonenumber" disabled={checked} value={phonenumber} placeholder="Phonenumber" className="form-control" {...register("user_phonenumber")} required onChange={(e) => setPhonenumber(e.target.value)} />
                      </div>
                      <div className="form-group">
                        Full Shipping Address
                        <input id="user_address" type="text" name="user_address" disabled={checked} value={address} placeholder="Full Address" className="form-control" {...register("user_address")} required onChange={(e) => setAddress(e.target.value)} />
                      </div>
                      <div className="form-group">
                        City/Town
                        <input id="user_city" type="text" name="user_city" disabled={checked} placeholder="Village/Town/City" value={city} className="form-control" {...register("user_city")} required onChange={(e) => setCity(e.target.value)} />
                      </div>
                      <div className="row">
                        <div className="form-group col-md-6">
                          State
                          <input id="user_state" type="text" className="form-control" disabled={checked} value={state} placeholder="State" name="user_state" {...register("user_state")} required onChange={(e) => setState(e.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                          Pincode
                          <input id="user_pincode" type="number" maxlength="6" minlength="6" className="form-control" disabled={checked} value={pincode} placeholder="Pincode" name="user_pincode" {...register("user_pincode")} required onChange={(e) => setPincode(e.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                          <label>GST Number (Optional)</label>
                          <input name="user_gstnumber" type="text" className="form-control" placeholder="GST number" {...register("user_gstnumber", { required: false })} />
                        </div>
                      </div>
                      <p>If Billing address is different, please updated in your profile</p>
                    </div>
                  </div>
                  <div className="form-group">
                    <span>Notes/Special instructions about your order: </span>
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

                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!loading ? (
                        cartDetails && cartDetails.length > 0 && status === false ? (
                          cartDetails.map((cart, key) => (
                            <tr className="font-weight-normal">
                              <td className="product-item-img">
                                <img className="d-none" src={cart.p_image ? cart.p_image : config.defaultimage} alt={cart.p_name} />
                                <div className="small">
                                  {cart.p_name}{" "}
                                  <div>
                                    <i>{cart.p_productweight && " Wt.: " + cart.p_productweight + "gms"}</i>
                                  </div>
                                </div>{" "}
                              </td>

                              <td className="product-item-quantity">{cart.p_quantity}</td>
                              <td className="product-item-totle text-nowrap">
                                <i class="fa fa-inr"></i> {cart.p_price < cart.p_net_product_price && cart.p_price !== 0 && cart.p_price !== "0" && cart.p_price !== "" ? cart.p_price : cart.p_net_product_price * cart.p_quantity}
                                <div className="font-weight-light small">
                                  Inclusive of Tax:
                                  {cart.p_tax === undefined ? 0 : cart.p_tax} {"%"}
                                </div>
                              </td>
                              <td className="product-item-totle">
                                <i class="fa fa-inr"></i> {parseInt(cart.p_price < cart.p_net_product_price && cart.p_price !== 0 && cart.p_price !== "0" && cart.p_price !== "" ? cart.p_price * cart.p_quantity : cart.p_net_product_price * cart.p_quantity)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <>
                            No items in your Cart for check out.
                            <br />
                            <Link to={"/shop"} className="dbtn-primary m-t30">
                              Shop all <i className="fa fa-angle-right mt-1"></i>
                            </Link>{" "}
                          </>
                        )
                      ) : (
                        <div className="p-2">
                          <div className="p-2">Fetching Cart details, please wait...</div>
                          <img className="p-2" src={loadingimg} height="20" alt="Loading.."></img>
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
                {!loading ? (
                  cartDetails &&
                  cartDetails.length > 0 &&
                  status === false && (
                    <div className="col-lg-6">
                      {/* <form className="shop-form" onSubmit={placeOrder}> */}
                      <h3>Order Total</h3>
                      <table className="table-bordered check-tbl">
                        <tbody>
                          <tr>
                            <td>Subtotal</td>
                            <td className="product-price">
                              <i class="fa fa-inr"></i> {Number(subTotal).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td>Shipping</td>
                            <td class="align-right">
                              <i class="fa fa-inr"></i> {pickup ? 0 : productWeight / 1000.0 <= 1 ? config.shippingcost : Math.ceil((productWeight / 1000) * config.shippingcost)}
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

                          <tr className="fs-4">
                            <td className="text-primary">Ordert Total</td>
                            <td className="text-primary">
                              <i class="fa fa-inr"></i> {grossTotal}
                              {/* {pickup ? Number(subTotal).toFixed(2) : Number(subTotal + (productWeight / 1000.0 <= 1 ? config.shippingcost : Math.ceil((productWeight / 1000) * config.shippingcost))).toFixed(2)} */}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <h4>Payment Method - Online</h4>
                      <div>
                        <input type="checkbox" id="terms" name="terms" required value="terms"></input>
                        <label for="terms">Check here to indicate that you have read and agreed to the terms and conditions for the order.</label>
                        <br />
                      </div>
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
