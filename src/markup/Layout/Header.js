import React, { useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";
import config from "../../config.json";
import cart from "./../../images/icons/cart.png";

const Header = (props) => {
  const [toggleShow, setToggleShow] = useState(false);
  const [cartDetails, setCartDetails] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(localStorage.getItem("cartUpdated"));
  const toggle = () => {
    setToggleShow((toggleShow) => !toggleShow);
  };
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  useEffect(() => {
    const fetchCartDetails = () => {
      fetch(config.service_url + "getCartProducts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userid: localStorage.getItem("uuid") }) })
        .then((response) => response.json())
        .then((data) => {
          setCartDetails(data);

          console.log("cart details", data);
          setCartUpdated(false);
        })
        .catch(function (error) {});
    };
    if (localStorage.getItem("uuid") !== undefined && localStorage.getItem("uuid") !== null) {
      fetchCartDetails();
    }
    // else {
    //   history.push("/");
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartUpdated]);
  return (
    <header className="site-header header center mo-left header-style-2">
      <div className="sticky-header main-bar-wraper navbar-expand-lg">
        <div className="main-bar clearfix ">
          <div className="container clearfix d-flex align-items-center justify-content-end">
            <div className="logo-header mostion ">
              <Link to={"/"} className="dez-page">
                <img src={config.logo} alt="" class="d-none" />
                <b>SAKHI</b>
              </Link>
            </div>
            <button className="navbar-toggler collapsed navicon justify-content-end" type="button" onClick={toggle} data-toggle="collapse" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className={`header-nav navbar-collapse navbar myNavbar collapse justify-content-between ${toggleShow ? "show" : "hide"}`} id="navbarNavDropdown">
              {toggleShow === true && (
                <div className="logo-header mostion">
                  <Link to={"/"} className="dez-page">
                    <img src={config.logo} alt="" class="d-none" />
                    <b>SAKHI</b>
                  </Link>
                </div>
              )}
              {toggleShow === true ? (
                <ul className="nav navbar-nav nav1">
                  <li>
                    {localStorage.getItem("uuid") === undefined || localStorage.getItem("uuid") === null ? (
                      <></>
                    ) : (
                      <>
                        <Link>Welcome, {localStorage.getItem("name")}</Link>
                      </>
                    )}
                  </li>
                  <li>
                    {localStorage.getItem("uuid") !== undefined && localStorage.getItem("uuid") !== null && (
                      <Link to={"/shop-cart"}>
                        {" "}
                        <div className="btn bg-white">
                          <div className="text-small">
                            <span className="position-relative">
                              <img height="10" src={cart} alt="" />
                              <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger">{cartDetails.length > 0 ? cartDetails.length : 0}</span>
                            </span>
                          </div>
                        </div>
                      </Link>
                    )}
                  </li>

                  <li className={props?.active === "home" ? `active${toggleShow ? "open" : ""}` : ""}>
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li className={props?.active === "about" ? "active" : ""}>
                    <Link to={"/about-1"}>About Us</Link>
                  </li>
                  {/* <li className={props?.active === "service" ? "active" : ""}>
                    <Link to={"/our-services"}>Course</Link>
                  </li> */}
                  {/* <li className={props?.active === "menu" ? "active" : ""}>
                    <Link to={"/our-menu-1"}>Menu</Link>
                  </li> */}

                  {/* <li className={props?.active === "shop" ? "active" : ""}>
                    <Link to={"/blog-half-img-sidebar"}>Blog</Link>
                  </li> */}
                  <li className={props?.active === "shop" ? "active" : ""}>
                    <Link to={"/shop"}>Products</Link>
                    {/* <ul className="sub-menu">
                      <li>
                        <Link to={"/shop"}>Shop</Link>
                      </li>

                      <li>
                        <Link to={"/shop-checkout"}>Checkout</Link>
                      </li>

                      <li>
                        <Link to={"/shop-register"}>Register</Link>
                      </li>
                    </ul>
                   */}
                  </li>
                  <li className={props?.active === "contact" ? "active" : ""}>
                    <Link to={"/contact-1"}>Contact Us</Link>
                  </li>
                  {localStorage.getItem("uuid") === undefined || localStorage.getItem("uuid") === null ? (
                    <li>
                      <Link to={"/shop-login"}>Login</Link>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link to={"/myprofile"}>My Profile</Link>
                      </li>
                      <li>
                        <Link to={"/orderhistory"}>Order History</Link>
                      </li>
                      {localStorage.getItem("role") !== undefined && localStorage.getItem("role") === "admin" && (
                        <li>
                          <Link to={"/admin"}>Admin</Link>
                        </li>
                      )}
                      <li>
                        <Link onClick={logout}>
                          <span>LogOut</span>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              ) : (
                <>
                  <ul className="nav navbar-nav nav1">
                    <li className={props?.active === "home" ? `active${toggleShow ? "open" : ""}` : ""}>
                      <Link to={"/"}>Home</Link>
                      {/* <ul className="sub-menu">
                    <li><Link to={'/'}>Home 01</Link></li>
                    <li><Link to={'/index-2'}>Home 02</Link></li>
                  </ul> */}
                    </li>
                    <li className={props?.active === "about" ? "active" : ""}>
                      <Link to={"/about-1"}>About Us</Link>

                      {/* <ul className="sub-menu">
                    <li>
                      <Link to={"/about-1"}>About Us</Link>
                    </li>

                    <li>
                      <Link to={"./faq"}>FAQs</Link>
                    </li>
                   
                    <li>
                      <Link to={"./error-404"}>404 Error</Link>
                    </li>
                    <li>
                      <Link to={"/calendar"}>Calendar</Link>
                    </li>
                    <li>
                      <Link to={"/team"}>Team</Link>
                    </li>
                  </ul> */}
                    </li>
                    {/* <li className={props?.active === "service" ? "active" : ""}>
                      <Link to={"/our-services"}>Course</Link>
                    </li> */}
                    {/* <li className={props?.active === "menu" ? "active" : ""}>
                      <Link to={"/our-menu-1"}>Menu</Link>
                    </li> */}

                    {/* <li className={props?.active === "blog" ? "active" : ""}>
                      <Link to={"/blog-half-img-sidebar"}>Blog</Link>
                    </li> */}
                    <li className={props?.active === "shop" ? "active" : ""}>
                      <Link to={"/shop"}>Products</Link>
                    </li>
                    {/* <li className={props?.active === "shop" ? "active" : ""}>
                      <Link to={""}>
                        Shop <i className="fa fa-chevron-down"></i>
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to={"/shop"}>Shop</Link>
                        </li>
                        <li>
                      <Link to={"/shop-sidebar"}>Shop Sidebar</Link>
                    </li> */}
                    {/* <li>
                      <Link to={"/shop-product-details"}>Product Details</Link>
                    </li> */}

                    {/* <li>
                      <Link to={"/shop-wishlist"}>Wishlist</Link>
                    </li> 
                        <li>
                          <Link to={"/shop-checkout"}>Checkout</Link>
                        </li>

                        <li>
                          <Link to={"/shop-register"}>Register</Link>
                        </li>
                      </ul>
                    </li>*/}
                    <li className={props?.active === "contact" ? "active" : ""}>
                      <Link to={"/contact-1"}>Contact Us</Link>
                      {/* <ul className="sub-menu left">
                    <li>
                      <Link to={"/contact-1"}>Contact Us 1</Link>
                    </li>
                    <li>
                      <Link to={"/contact-2"}>Contact Us 2</Link>
                    </li>
                  </ul> */}
                    </li>
                    <li>
                      {localStorage.getItem("uuid") === undefined || localStorage.getItem("uuid") === null ? (
                        <Link to={"/shop-login"}>Login</Link>
                      ) : (
                        <>
                          <Link>
                            Welcome, {localStorage.getItem("name")} <i className="fa fa-chevron-down"></i>
                          </Link>
                          <ul className="sub-menu">
                            <li>
                              <Link to={"/myprofile"}>My Profile</Link>
                            </li>
                            <li>
                              <Link to={"/orderhistory"}>Order History</Link>
                            </li>
                            {localStorage.getItem("role") !== undefined && localStorage.getItem("role") === "admin" && (
                              <li className="d-none">
                                {/* <Link to={"/admin"}>Admin</Link> */}
                                <a href={config.admin_url} target="_blank">
                                  Admin
                                </a>
                              </li>
                            )}
                            <li>
                              <Link onClick={logout}>
                                <span>LogOut</span>
                              </Link>
                            </li>
                          </ul>
                        </>
                      )}
                    </li>
                    <li>
                      {localStorage.getItem("uuid") !== undefined && localStorage.getItem("uuid") !== null && (
                        <Link to={"/shop-cart"}>
                          <i className="ti-shopping-cart cart font-weight-bold"></i>
                          <span className="mb-1 position-absolute top-50 start-100 translate-middle badge rounded-pill bg-danger text-light">{cartDetails.length > 0 ? cartDetails.length : 0}</span>
                        </Link>
                      )}
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
