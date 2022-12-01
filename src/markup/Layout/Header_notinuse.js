import React, { useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";
import config from "../../config.json";
import cart from "./../../images/icons/cart.png";
import user from "./../../images/icons/user.png";

const Header = (props) => {
  const [toggleShow, setToggleShow] = useState(false);
  const [cartDetails, setCartDetails] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(localStorage.getItem("cartUpdated"));
  const [menuMainCategory, setMenuMainCategory] = useState([]);
  const toggle = () => {
    setToggleShow((toggleShow) => !toggleShow);
  };
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push("/");
  };
  const getMainCategories = async () => {
    console.log("entered");
    await fetch(config.service_url + "getmaincategoryforusers")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("main master category", data);
          let _filter = data.data.filter((_d) => _d.type === "product");
          setMenuMainCategory(_filter);
          localStorage.setItem("cartUpdated", true);
        } else if (data.status === 400) {
          setMenuMainCategory([]);
        }
      })
      .catch((err) => {
        // setNetworkError("Something went wrong, Please try again later!!");
        // console.log(networkError);
      });
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
    getMainCategories();
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
            <div className="logo-header mostion">
              <Link to={"/"} className="dez-page titlename text-nowrap">
                <img src={config.logo} className="logoimage pr-1 d-none" alt={config.websitetitle} />
                {config.websitetitle}
              </Link>
            </div>
            <div className=" navbar-toggler collapsed px-3">
              <ul className="nav navbar-nav nav1">
                <li>
                  {localStorage.getItem("uuid") !== undefined && localStorage.getItem("uuid") !== null && (
                    <>
                      <Link to={"/shop-cart"}>
                        <i className="ti-shopping-cart cart font-weight-bold"></i>
                        <span className="mb-1 position-absolute top-50 start-100 translate-middle badge rounded-pill bg-danger text-light">{cartDetails.length > 0 ? cartDetails.length : 0}</span>
                      </Link>
                    </>
                  )}
                </li>
              </ul>
            </div>
            <button className="navbar-toggler collapsed navicon justify-content-end" type="button" onClick={toggle} data-toggle="collapse" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              {toggleShow === true ? (
                <>
                  <i class="fa fa-times"></i>
                </>
              ) : (
                <>
                  <span></span>
                  <span></span>
                  <span></span>
                </>
              )}
            </button>
            <div className={`header-nav navbar-collapse flex-grow-0 aligntopsidebar navbar myNavbar collapse  ${toggleShow ? "show" : "hide"}`} id="navbarNavDropdown">
              {toggleShow === true && (
                <div className="logo-header mostion d-none">
                  <Link to={"/"} className="dez-page">
                    <li>
                      <img src={config.logo} alt={config.websitetitle} />
                    </li>
                  </Link>
                </div>
              )}
              {toggleShow === true ? (
                <ul className="nav navbar-nav nav1 bg-primary   h-100 pt-5">
                  <li>
                    <div className="logo-header mostion  d-none">
                      <img src={config.logo} alt={config.websitetitle} className="w-50" />
                    </div>
                  </li>
                  <li>
                    {localStorage.getItem("uuid") === undefined || localStorage.getItem("uuid") === null ? (
                      <></>
                    ) : (
                      <>
                        <Link>Welcome, {localStorage.getItem("name")}</Link>
                      </>
                    )}
                  </li>

                  <li className={props?.active === "home" ? `active${toggleShow ? "open" : ""}` : ""}>
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li className={props?.active === "about" ? "active" : ""}>
                    <Link to={"/about"}>About Us</Link>
                  </li>
                  <li>
                    <Link className="text-nowrap" to={"/our-journey"}>
                      Our Journey
                    </Link>
                  </li>
                  <li className={props?.active === "shop" ? "active" : ""}>
                    <Link to={"/shop"}>Shop</Link>
                  </li>
                  <li className={props?.active === "gallery" ? "active" : ""}>
                    <Link to={"/gallery"}> Gallery</Link>
                  </li>
                  <li className={props?.active === "category" ? "active" : ""}>
                    <Link to={"/maincategories"}> Main Categories</Link>
                  </li>
                  <li className={props?.active === "contact" ? "active" : ""}>
                    <Link to={"/contact"}>Contact Us</Link>
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
                  <ul className={props.home ? "nav navbar-nav nav1" : "navbarbg nav navbar-nav nav1"}>
                    <li className={props?.active === "home" ? `active${toggleShow ? "open" : ""}` : ""}>
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li className={props?.active === "about" ? "active" : ""}>
                      <Link to={"#"}>
                        About <i className="fa fa-chevron-down"></i>
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link className="text-nowrap" to={"/about"}>
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link className="text-nowrap" to={"/our-journey"}>
                            Our Journey
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className={props?.active === "gallery" ? "active" : ""}>
                      <Link to={"/gallery"}> Gallery</Link>
                    </li>
                    <li className={props?.active === "shop" ? "active" : ""}>
                      <Link to={"/shop"}>Shop</Link>
                    </li>
                    <li className={props?.active === "category" ? "active" : ""}>
                      <Link to={"#"}>
                        {" "}
                        Main Categories <i className="fa fa-chevron-down"></i>
                      </Link>
                      <ul className="sub-menu">
                        {menuMainCategory &&
                          menuMainCategory.map((mmc) => (
                            <li>
                              <Link to={{ pathname: "/shop", maincategory: mmc.maincategory, bannerimage: mmc.banner_image }}>{mmc.maincategory}</Link>
                            </li>
                          ))}
                      </ul>
                    </li>

                    <li className={props?.active === "contact" ? "active" : ""}>
                      <Link to={"/contact"}>Contact Us</Link>
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
