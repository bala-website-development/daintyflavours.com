import moment from "moment";
import React, { useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";

import config from "../../config.json";

const NavBarMenu = () => {
  const slider_content = config.slider;
  var btn = document.querySelector(".navicon");
  var aaa = document.querySelector(".myNavbar ");

  function toggleFunc() {
    return aaa.classList.toggle("show");
  }

  btn?.addEventListener("click", toggleFunc);

  /* Menu onpen/close */
  var menuBtn = document.querySelector(".menu-btn");
  var pizzaHeaderNav = document.querySelector(".pizza-header .header-nav");

  function menuBtnAddActive() {
    return pizzaHeaderNav.classList.add("active");
  }

  menuBtn?.addEventListener("mouseenter", menuBtnAddActive);

  function menuBtnRemoveActive() {
    return pizzaHeaderNav.classList.remove("active");
  }

  //pizzaHeaderNav.addEventListener("mouseleave", menuBtnRemoveActive);

  /* Test */

  // Sidenav li open close

  var navUl = [].slice.call(document.querySelectorAll(".navbar-nav > li"));
  for (var y = 0; y < navUl.length; y++) {
    navUl[y].addEventListener("click", function () {
      checkLi(this);
    });
  }

  function checkLi(current) {
    navUl.forEach((el) => el.classList.remove("open"));
    current.classList.add("open");
  }

  const [toggleShow, setToggleShow] = useState(false);
  const [cartDetails, setCartDetails] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(localStorage.getItem("cartUpdated"));
  const [menuMainCategory, setMenuMainCategory] = useState([]);
  const [menuCategory, setMenuCategory] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
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
          let _filter = data.data.filter((_d) => _d.type === "product" && _d.isactive === 1);
          _filter.push({ Expiration: moment().add(1, "d") });
          localStorage.setItem("maincategories", JSON.stringify(_filter));
          setMenuMainCategory(_filter.filter((a) => a.isactive === 1));
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

  const getCategories = async () => {
    console.log("entered");
    await fetch(config.service_url + "getuserscategory")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("main master category", data);
          let _filter = data.data.filter((_d) => _d.type === "product");
          _filter.push({ Expiration: moment().add(1, "d") });
          localStorage.setItem("categories", JSON.stringify(_filter));
          setMenuCategory(_filter);
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

  const checkExpirationForMainCategories = () => {
    let _expDate = "";
    // moment(orderhistory.orderdate).add(config.return_cancel_days, 'd') >= moment()
    let _localstorageData = JSON.parse(localStorage.getItem("maincategories"));
    let _getdate = _localstorageData.filter((f) => f?.Expiration);
    if (_getdate.length > 0) {
      _expDate = moment(_getdate[0]["Expiration"]);
    }
    if (_expDate <= moment()) {
      console.log("goinside");
      getMainCategories();
    }
  };

  const checkExpirationForCategories = () => {
    // moment(orderhistory.orderdate).add(config.return_cancel_days, 'd') >= moment()
    let _expDate = "";
    let _localstorageData = JSON.parse(localStorage.getItem("categories"));
    let _getdate = _localstorageData.filter((f) => f?.Expiration);
    if (_getdate.length > 0) {
      _expDate = moment(_getdate[0]["Expiration"]);
    }
    // var _expDate = moment(_localstorageData.filter(f => f?.Expiration)[0]["Expiration"])
    if (_expDate <= moment()) {
      console.log("goinside");
      getCategories();
    }
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
    if (localStorage.getItem("maincategories") === undefined || localStorage.getItem("maincategories") === null) {
      getMainCategories();
      console.log("fromservice");
    } else {
      if (menuMainCategory === undefined || menuMainCategory === null || menuMainCategory?.length === 0) {
        checkExpirationForMainCategories();
        setMenuMainCategory(JSON.parse(localStorage.getItem("maincategories")));
        console.log(menuMainCategory, "ls");
      }
    }

    if (localStorage.getItem("categories") === undefined || localStorage.getItem("categories") === null) {
      getCategories();
      console.log("fromservice");
    } else {
      if (menuCategory === undefined || menuCategory === null || menuCategory?.length === 0) {
        checkExpirationForCategories();
        setMenuCategory(JSON.parse(localStorage.getItem("categories")));
        console.log(menuCategory, "ls");
      }
    }

    // else {
    //   history.push("/");
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartUpdated]);

  return (
    <>
      {/* top nav bar */}
      <div className="sticky-top top-0">
        <nav class="navbar navbar-expand-lg navbar-light searchbarbg bg-light w-100 py-1 bg-white">
          <div class="container-fluid">
            <div className="d-flex align-items-center justify-content-end mr-3">
              <div className="align-items-center">
                <input name="search" onChange={(e) => setSearchFilter(e.target.value)} value={searchFilter} type="text" className="searchbar border px-3" placeholder="Search all our products" />
              </div>
              <div className="px-1"> </div>
              <div className="align-items-center">
                <Link to={{ pathname: "/shop", searchFilter: searchFilter }} className="">
                  <Link to={{ pathname: "/shop", searchFilter: searchFilter }} className="btn btn-sm btnhover">
                    <i class="fas fa-search mt-1"> </i>
                  </Link>
                </Link>
              </div>
            </div>

            <div class="d-flex align-items-center">
              <Link class="text-reset me-3 text-primary" to={"/shop-cart"}>
                <i class="fas fa-shopping-cart"></i>
                <span class="badge rounded-pill badge-notification mx-1">
                  <span class="badge rounded-pill badge-notification bg-danger">{cartDetails.length > 0 ? cartDetails.length : 0}</span>
                </span>
              </Link>

              {/* <div class="dropdown d-none">
                <a class="text-reset me-3 dropdown-toggle hidden-arrow" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                  <i class="fas fa-bell"></i>
                  <span class="badge rounded-pill badge-notification bg-danger">1</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <a class="dropdown-item" href="#">
                      Some news
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another news
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div> */}

              <div class="dropdown">
                {localStorage.getItem("uuid") === undefined || localStorage.getItem("uuid") === null ? (
                  <>
                    <a>
                      <Link to={"/shop-login"}>
                        <i className="ti-user"></i>
                        <span class="badge rounded-pill badge-notification">
                          <i class="fa-solid fa-circle-xmark text-danger"></i>
                        </span>
                      </Link>
                    </a>
                  </>
                ) : (
                  <>
                    <a class="dropdown-toggle d-flex align-items-center hidden-arrow" href="#" id="navbarDropdownMenuAvatar" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                      <Link to={"/shop-login"}>
                        <i className="ti-user"></i>
                        <span class="badge rounded-pill badge-notification">
                          <i class="fa-solid fa-circle-check text-success"></i>
                        </span>
                      </Link>
                    </a>

                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
                      <li>
                        <a class="dropdown-item" href="/myprofile">
                          My profile
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/orderhistory">
                          Order History
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/myprofile">
                          Change Password
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#" onClick={logout}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        <nav class=" d-flex navbar navbar-expand-lg navbar-light bg-light py-1 bg-white w-100 position-relative z-index999">
          <div class="container-fluid">
            <button class="navbar-toggler text-primary" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={toggle}>
              {/* <i class="fas fa-bars"></i> */}

              {toggleShow === true ? (
                <>
                  <i class="fa fa-times text-primary"></i>
                </>
              ) : (
                <>
                  <i class="fas fa-bars"></i>
                </>
              )}
            </button>
            <a class="navbar-brand mt-2 mt-lg-0" href="#">
              <Link to="/" className="text-primary">
                <p className="titlename2 text-primary mb-0 font-weight-normal"> {config.websitetitle}</p>
              </Link>
            </a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              {/* ---------- */}

              <ul className="navbar-nav">
                <li class="nav-item d-none">
                  <a class="dropdown-toggle align-items-center hidden-arrow  nav-link text-primary" href="/">
                    <i class="fa fa-home" aria-hidden="true"></i>
                  </a>
                </li>

                {menuMainCategory === null || menuMainCategory === undefined || menuMainCategory.length == 0 ? (
                  <li>
                    <Link>Loading...</Link>
                  </li>
                ) : (
                  menuMainCategory?.map(
                    (mmc) =>
                      mmc.id != null && (
                        <li class="nav-item dropdown">
                          <a class="dropdown-toggle align-items-center hidden-arrow nav-link text-dark" href="#" id={"navbarDropdownMenuAvatar" + mmc.maincategory} role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                            <span className="small">
                              {mmc.maincategory?.toUpperCase()} <i className="fa fa-angle-down"></i>
                            </span>
                          </a>
                          <ul class="dropdown-menu" aria-labelledby={"navbarDropdownMenuAvatar" + mmc.maincategory}>
                            {menuCategory &&
                              menuCategory
                                .filter((fil) => fil.maincategory === mmc.maincategory)
                                ?.map((mc) => (
                                  <li className="small">
                                    {/* <Link className="dropdown-item" to={{ pathname: "/shop", maincategory: mmc?.maincategory, bannerimage: mc?.banner_image, category: mc?.category }}> */}
                                    <Link className="dropdown-item" onClick={(e) => (localStorage.setItem("bannerurl", mc?.banner_image), localStorage.setItem("queryurl", "maincategory=" + mmc.maincategory + "&category=" + mc.category))} to={{ pathname: "/shop?maincategory=" + mmc.maincategory + "&category=" + mc.category }}>
                                      <span className="text-nowrap">{mc?.category}</span>
                                    </Link>
                                  </li>
                                ))}
                          </ul>
                        </li>
                      )
                  )
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div className="main-slider d-none ">
        <>
          {slider_content &&
            slider_content.map((slider) => (
              <>
                <div className="slideroverlay">
                  <img src={slider.image_url} className="img-fluid" />
                  <div className="text-center">
                    <Link to={"/shop"} className="btn btnhover border z-index">
                      Shop now
                    </Link>
                    <p className="font-weight-normal text-primary">{slider.prefix}</p>
                  </div>
                </div>
              </>
            ))}
        </>
      </div>
    </>
  );
};

export default NavBarMenu;
