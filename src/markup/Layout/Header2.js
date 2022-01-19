import React, { useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";

import config from "../../config.json";

const Header2 = () => {
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
          let _filter = data.data.filter((_d) => _d.type === "product");
          localStorage.setItem("maincategories", JSON.stringify(_filter));
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

  const getCategories = async () => {
    console.log("entered");
    await fetch(config.service_url + "getuserscategory")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("main master category", data);
          let _filter = data.data.filter((_d) => _d.type === "product");
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
        setMenuMainCategory(JSON.parse(localStorage.getItem("maincategories")));
        console.log(menuMainCategory, "ls");
      }
    }

    if (localStorage.getItem("categories") === undefined || localStorage.getItem("categories") === null) {
      getCategories();
      console.log("fromservice");
    } else {
      if (menuCategory === undefined || menuCategory === null || menuCategory?.length === 0) {
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
      <header className="site-header position-relative  mo-left header header-transparent pizza-header w-100">
        <div className="p-2 px-4 searchbarbg">
          <div className=" d-flex align-items-center justify-content-end">
            <div className="flex-grow-1 px-3  d-flex align-items-center">
              {/* <form action="#"> */}

              <div>
                <input name="search" onChange={(e) => setSearchFilter(e.target.value)} value={searchFilter} type="text" className="searchbar px-3" placeholder="Search all our products" />
              </div>
              <div className="align-items-center">
                <Link to={{ pathname: "/shop", searchFilter: searchFilter }} className="mx-1 px-2 btn btn-sm btnhover">
                  {/* <i className="ti-search"></i> */}
                  Search
                </Link>
              </div>

              {/* </form> */}
            </div>

            <div className="text-nowrap px-3">Log in</div>

            <div className="">
              <i className="ti-shopping-cart cart"></i>
            </div>
          </div>
        </div>
        <div className="sticky-header bg-white main-bar-wraper navbar-expand-lg">
          <div className="main-bar position-relative   ">
            <div className="px-2">
              <div className="logo-header d-flex justify-content-end align-items-center">
                <div>
                  <div className="titlename1 font-weight-normal text-nowrap">
                    <Link to="/" className="text-primary">
                      {" "}
                      {config.websitetitle}
                    </Link>
                  </div>
                </div>
              </div>

              <button className="navbar-toggler collapsed navicon " type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="bg-primary"></span>
                <span className="bg-primary"></span>
                <span className="bg-primary"></span>
              </button>

              <div className="header-nav  align-items-center bg-white navbar-collapse   collapse navbar myNavbar active" id="navbarNavDropdown">
                <div>
                  <ul className="nav navbar-nav">
                    <li>
                      <Link to={"/"}>
                        <i className="text-primary fst-normal fa fa-home fa-3x"></i>
                      </Link>
                    </li>
                    {menuMainCategory === null || menuMainCategory === undefined || menuMainCategory.length == 0 ? (
                      <li>
                        <Link>Loading...</Link>
                      </li>
                    ) : (
                      menuMainCategory?.map((mmc) => (
                        <li>
                          <Link>
                            {mmc.maincategory.toUpperCase()}
                            <i className="fa fa-chevron-down"></i>
                          </Link>
                          <ul className="sub-menu">
                            {menuCategory &&
                              menuCategory
                                .filter((fil) => fil.maincategory === mmc.maincategory)
                                ?.map((mc) => (
                                  <li>
                                    <Link to={{ pathname: "/shop", maincategory: mmc.maincategory, bannerimage: mc.banner_image, category: mc.category }}>
                                      <span className="text-nowrap">{mc.category}</span>
                                    </Link>
                                  </li>
                                ))}
                          </ul>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
                <div className="dlab-social-icon widget d-none">
                  <ul>
                    <li>
                      <Link className="bg-primary site-button sharp-sm fa fa-facebook" to={""}></Link>
                    </li>

                    <li>
                      <Link className="bg-primary site-button sharp-sm fa fa-instagram" to={""}></Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header2;
