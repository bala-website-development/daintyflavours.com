import moment from "moment";
import React, { useEffect, useState } from "react";
import { UIStore } from "./../Store/UIStore";
import { Link, useHistory } from "react-router-dom";
import cart from "./../../images/icons/cart.png";
import scart from "./../../images/icons/shopping-cart.png";
import user from "./../../images/icons/user.png";
import config from "../../config.json";
import secureLocalStorage from "react-secure-storage";
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
  const [lsDaintyCart, setlsDaintyCart] = useState(JSON.parse(secureLocalStorage.getItem("daintycart")));
  const [toggleShow, setToggleShow] = useState(false);
  const [cartDetails, setCartDetails] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(localStorage.getItem("cartUpdated"));
  const [menuMainCategory, setMenuMainCategory] = useState([]);
  const [offer, setOffer] = useState([]);
  const [menuCategory, setMenuCategory] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [menuSubCategory, setMenuSubCategory] = useState([]);
  const cartcount = UIStore.useState((s) => s.cartcount);
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
  const getOffer = async () => {
    console.log("getOffer");
    await fetch(config.service_url + "getoffer")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("offers", data);
          let _filter = data.data.filter((_d) => _d.type === "offer" && _d.isactive === 1);
          _filter.push({ Expiration: moment().add(1, "d") });
          localStorage.setItem("offer", JSON.stringify(_filter));
          setOffer(_filter.filter((a) => a.isactive === 1));
        } else if (data.status === 400) {
          setOffer([]);
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
  const getSubCategories = async () => {
    console.log("entered");
    await fetch(config.service_url + "getuserssubcategory")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("subcategory", data);
          let _filter = data.data.filter((_d) => _d.type === "product");
          _filter.push({ Expiration: moment().add(1, "d") });
          localStorage.setItem("subcategories", JSON.stringify(_filter));
          setMenuSubCategory(_filter);
        } else if (data.status === 400) {
          setMenuMainCategory([]);
        }
      })
      .catch((err) => {
        // setNetworkError("Something went wrong, Please try again later!!");
        // console.log(networkError);
      });
  };
  const getBrands = async () => {
    console.log("entered");
    await fetch(config.service_url + "getusersbrand")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("brands", data);
          let _filter = data.data.filter((_d) => _d.type === "product");
          _filter.push({ Expiration: moment().add(1, "d") });
          localStorage.setItem("brand", JSON.stringify(_filter));
          setMenuCategory(_filter);
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
      getSubCategories();
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      history.push({ pathname: "/shop", searchFilter: searchFilter });
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
    getOffer();
    if (localStorage.getItem("uuid") !== undefined && localStorage.getItem("uuid") !== null) {
      fetchCartDetails();
    } else {
      //get from local storage
      setCartDetails(lsDaintyCart);
    }
    if (localStorage.getItem("categories") === undefined || localStorage.getItem("maincategories") === null) {
      getMainCategories();
      console.log("fromservice main categories");
    } else {
      if (menuMainCategory === undefined || menuMainCategory === null || menuMainCategory?.length === 0) {
        checkExpirationForMainCategories();
        setMenuMainCategory(JSON.parse(localStorage.getItem("maincategories")));
        console.log(menuMainCategory, "ls");
      }
    }

    if (localStorage.getItem("subcategories") === undefined || localStorage.getItem("subcategories") === null) {
      getSubCategories();
      console.log("fromservice main categories");
    }

    if (localStorage.getItem("categories") === undefined || localStorage.getItem("categories") === null) {
      getCategories();
      getSubCategories();
      getBrands();
      console.log("fromservice categories");
    } else {
      if (menuCategory === undefined || menuCategory === null || menuCategory?.length === 0) {
        checkExpirationForCategories();
        setMenuCategory(JSON.parse(localStorage.getItem("categories")));
        console.log(menuCategory, "ls");
      }
      if (menuSubCategory === undefined || menuSubCategory === null || menuSubCategory?.length === 0) {
        checkExpirationForCategories();
        setMenuSubCategory(JSON.parse(localStorage.getItem("subcategories")));
        console.log(menuSubCategory, "ls");
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
            <div className="d-flex w-100">
              {/* <div className="">{config.showoffertext ? config.offertext : ""}</div> */}
              {config.showoffertext ? <div className="p-0" dangerouslySetInnerHTML={{ __html: offer?.map((off) => off.text) }} /> : config.offertext}
              <div></div>
            </div>
            <div className="d-flex align-items-center justify-content-end mr-3">
              <div className="align-items-cente w-100">
                <input name="search" onChange={(e) => setSearchFilter(e.target.value)} value={searchFilter} onKeyDown={handleKeyDown} type="text" className="searchbar border px-3" placeholder="Search all our products" />
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
                <i class="fas fa-shopping-cart d-none"></i>
                <img src={scart} className="iconsize1" />
                <span class="badge rounded-pill badge-notification mx-1">
                  <span class="badge rounded-pill badge-notification bg-danger d-none">{cartDetails && cartDetails.length > 0 ? cartDetails.length : 0}</span>

                  <span class="badge rounded-pill badge-notification bg-danger"> {cartcount}</span>
                </span>
              </Link>

              <div class="dropdown">
                {localStorage.getItem("uuid") === undefined || localStorage.getItem("uuid") === null ? (
                  <>
                    <a>
                      <Link to={"/shop-login"}>
                        <i className="ti-user d-none"></i>
                        <img src={user} className="iconsize1" />
                        <span class="badge rounded-pill badge-notification d-none">
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
          <div class="container-fluid1 container-fluid">
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
            <div class={toggleShow ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarSupportedContent">
              {/* ---------- */}

              <ul className="navbar-nav">
                <li class="nav-item dropdown">
                  <div>
                    <a class="dropdown-toggle align-items-center hidden-arrow text-uppercase nav-link  text-primary" href="/">
                      <i class="fa fa-home d-none" aria-hidden="true"></i>
                      <span className="small"> Home</span>
                    </a>
                  </div>
                </li>

                {menuMainCategory === null || menuMainCategory === undefined || menuMainCategory.length == 0 ? (
                  <li class="nav-item dropdown">
                    <div>
                      <span class="dropdown-toggle align-items-center hidden-arrow text-uppercase nav-link  text-primary" href="/">
                        <i class="fa fa-home d-none" aria-hidden="true"></i>
                        <span className="small"> Loading Menu</span>
                      </span>
                    </div>
                  </li>
                ) : (
                  menuMainCategory?.map(
                    (mmc) =>
                      mmc.id != null && (
                        <li id="dnav" class="dnav nav-item dropdown">
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
                                  <li className=" small ">
                                    <Link
                                      className="dropdown-item text-uppercase"
                                      onClick={(e) => (setToggleShow((toggleShow) => !toggleShow), localStorage.setItem("bannerurl", mc?.banner_image), localStorage.setItem("categorydes", mc?.categorydes == undefined ? "" : mc?.categorydes), localStorage.setItem("queryurl", "maincategory=" + mmc.maincategory + "&category=" + mc.category))}
                                      to={{
                                        pathname: "/shop",
                                        search: "?maincategory=" + mmc.maincategory + "&category=" + mc.category,
                                        bannerimage: mc?.banner_image,
                                      }}
                                    >
                                      <span className="text-nowrap">{mc?.category} » </span>
                                    </Link>

                                    <ul class="list-unstyled" aria-labelledby={"navbarDropdownMenuAvatar" + mc.category}>
                                      {menuSubCategory &&
                                        menuSubCategory
                                          .filter((f) => f.maincategory === mmc.maincategory && f.category === mc.category)
                                          ?.map((sm) => (
                                            <li className="small">
                                              <Link
                                                className=" dropdown-item text-uppercase"
                                                onClick={(e) => (setToggleShow((toggleShow) => !toggleShow), localStorage.setItem("bannerurl", mc?.banner_image), localStorage.setItem("categorydes", mc?.categorydes == undefined ? "" : mc?.categorydes), localStorage.setItem("queryurl", "maincategory=" + mmc.maincategory + "&category=" + mc.category + "&subcategory=" + sm.subcategory))}
                                                to={{
                                                  pathname: "/shop",
                                                  search: "?maincategory=" + mmc.maincategory + "&category=" + mc.category + "&subcategory=" + sm.subcategory,
                                                  bannerimage: mc?.banner_image,
                                                }}
                                              >
                                                <span className="text-nowrap">{sm?.subcategory}</span>
                                              </Link>
                                            </li>
                                          ))}
                                    </ul>
                                  </li>
                                ))}
                          </ul>
                        </li>
                      )
                  )
                )}

                <li>
                  <li class="nav-item dropdown">
                    <a class="dropdown-toggle align-items-center hidden-arrow nav-link text-dark" href="#" id={"navbarDropdownMenuAvatar" + "brand"} role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                      <span className="small">
                        BRAND <i className="fa fa-angle-down"></i>
                      </span>
                    </a>

                    <ul class="submenu-col2 dropdown-menu" aria-labelledby={"navbarDropdownMenuAvatar" + "BRAND"}>
                      {JSON.parse(localStorage.getItem("brand"))
                        ?.filter((b) => b)
                        .map(
                          (brand) =>
                            brand !== null && (
                              <li className="small">
                                <Link
                                  className="dropdown-item text-uppercase"
                                  onClick={(e) => (setToggleShow((toggleShow) => !toggleShow), localStorage.setItem("bannerurl", brand?.banner_image), localStorage.setItem("categorydes", brand?.categorydes == undefined ? "" : brand?.categorydes), localStorage.setItem("queryurl", "brand=" + brand.brand))}
                                  to={{
                                    pathname: "/shop",
                                    search: "?brand=" + brand.brand,
                                    bannerimage: brand?.banner_image,
                                  }}
                                >
                                  <span className="text-nowrap">{brand?.brand}</span>
                                </Link>
                              </li>
                            )
                        )}
                    </ul>
                  </li>
                </li>
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
