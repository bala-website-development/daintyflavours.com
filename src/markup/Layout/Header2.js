import React, { Component } from "react";
import { Link } from "react-router-dom";

import config from "../../config.json";
class Header2 extends Component {
  componentDidMount() {
    // sidebar open/close

    var btn = document.querySelector(".navicon");
    var aaa = document.querySelector(".myNavbar ");

    function toggleFunc() {
      return aaa.classList.toggle("show");
    }

    btn.addEventListener("click", toggleFunc);

    /* Menu onpen/close */
    var menuBtn = document.querySelector(".menu-btn");
    var pizzaHeaderNav = document.querySelector(".pizza-header .header-nav");

    function menuBtnAddActive() {
      return pizzaHeaderNav.classList.add("active");
    }

    menuBtn.addEventListener("mouseenter", menuBtnAddActive);

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
  }

  render() {
    return (
      <>
        <header className="site-header position-relative  mo-left header header-transparent pizza-header w-100">
          <div className="p-2 px-4 searchbarbg">
            <div className=" d-flex align-items-center justify-content-end">
              <div className="flex-grow-1 px-3">
                <form action="#">
                  <input name="search" value="" type="text" className="searchbar px-3" placeholder="Search all our products" />
                </form>
              </div>

              <div className="text-nowrap">Log in</div>
              <div className="px-3">Account</div>

              <div className="">
                <i className="ti-shopping-cart cart"></i>
              </div>
            </div>
          </div>
          <div className="sticky-header main-bar-wraper navbar-expand-lg">
            <div className="main-bar position-relative   ">
              <div className="container ">
                <div className="logo-header d-flex align-items-center">
                  <div>
                    <div className="titlename1 font-weight-normal text-nowrap">Dainty Flavour</div>
                  </div>
                </div>

                <button className="navbar-toggler collapsed navicon justify-content-end" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="bg-primary"></span>
                  <span className="bg-primary"></span>
                  <span className="bg-primary"></span>
                </button>

                <div className="extra-nav d-flex justify-content-between">
                  <div className="extra-cell">
                    <ul className="extra-info">
                      <li>
                        <div className="menu-btn ">
                          <span className="bg-primary"></span>
                          <span className="bg-primary"></span>
                          <span className="bg-primary"></span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="header-nav  bg-primary navbar-collapse aligntopsidebar  collapse navbar myNavbar active" id="navbarNavDropdown">
                  <ul className="nav navbar-nav">
                    <li className="active">
                      <Link to={""}>Home</Link>
                    </li>
                    <li>
                      <Link to={""}>
                        Pages<i className="fa fa-chevron-down"></i>
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to={"/about"}>
                            <span className="text-nowrap">About Us</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/about"}>
                            <span className="text-nowrap">About Us</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/about"}>
                            <span className="text-nowrap">About Us</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to={""}>
                        Pages<i className="fa fa-chevron-down"></i>
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to={"/about"}>
                            <span className="text-nowrap">About Us</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/about"}>
                            <span className="text-nowrap">About Us</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/about"}>
                            <span className="text-nowrap">About Us</span>
                          </Link>
                        </li>
                      </ul>
                    </li>{" "}
                    <li>
                      <Link to={""}>
                        Pages<i className="fa fa-chevron-down"></i>
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to={"/about"}>
                            <span className="text-nowrap">About Us</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/about"}>
                            <span className="text-nowrap">About Us</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/about"}>
                            <span className="text-nowrap">About Us</span>
                          </Link>
                        </li>
                      </ul>
                    </li>{" "}
                    <li>
                      <Link to={""}>
                        Pages<i className="fa fa-chevron-down"></i>
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to={"/about"}>
                            <span className="text-nowrap">About Us</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/contact"}>
                            <span className="text-nowrap">Contact Us</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <div className="dlab-social-icon">
                    <ul>
                      <li>
                        <Link className="site-button sharp-sm fa fa-facebook" to={""}></Link>
                      </li>

                      <li>
                        <Link className="site-button sharp-sm fa fa-instagram" to={""}></Link>
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
  }
}

export default Header2;
