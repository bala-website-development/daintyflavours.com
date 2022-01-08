import React, { Component } from "react";
import { Link } from "react-router-dom";

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

    pizzaHeaderNav.addEventListener("mouseleave", menuBtnRemoveActive);

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
      <header className="site-header  mo-left header header-transparent pizza-header">
        <div className="sticky-header main-bar-wraper navbar-expand-lg">
          <div className="main-bar clearfix ">
            <div className="container clearfix">
              <div className="logo-header mostion">
                <Link to="./">
                  <img src={require("./../../images/logo-2.png")} alt="" />
                </Link>
                <div>
                  <h1 className="titlename font-weight-normal text-nowrap">Dainty Flavour</h1>
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
                      <div className="header-phone-no text-primary">
                        <img src="images/icons/telephone.png" alt="" />
                        <span className="text-primary">24/7 Bakery service</span>
                        <h3 className="text-primary">+91 72598 92390</h3>
                      </div>
                    </li>
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

              <div className="dlab-quik-search ">
                <form action="#">
                  <input name="search" value="" type="text" className="form-control" placeholder="Type to search" />
                  <span id="quik-search-remove">
                    <i className="ti-close"></i>
                  </span>
                </form>
              </div>

              <div className="header-nav  bg-primary navbar-collapse aligntopsidebar  collapse navbar myNavbar" id="navbarNavDropdown">
                <div className=" py-4"></div>

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
                        <Link to={"/about"}>About Us</Link>
                      </li>
                      <li>
                        <Link to={"/our-services"}>Our Services</Link>
                      </li>

                      <li>
                        <Link to={"/team"}>Clients</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to={""}>
                      Categories<i className="fa fa-chevron-down"></i>
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to={"/our-menu"}>Menu Style 1</Link>
                      </li>
                      <li>
                        <Link to={"/our-menu-2"}>Menu Style 2</Link>
                      </li>
                      <li>
                        <Link to={"/our-menu-3"}>Menu Style 3</Link>
                      </li>
                      <li>
                        <Link to={"/our-menu-4"}>Menu Style 4</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="has-mega-menu">
                    <Link to={""}>
                      Categories<i className="fa fa-chevron-down"></i>
                    </Link>
                    <ul className="mega-menu">
                      <li>
                        {" "}
                        <Link to={""}>Blog Grid</Link>
                        <ul>
                          <li>
                            <Link to={"/blog-grid-2"}>Grid 2</Link>
                          </li>
                          <li>
                            <Link to={"/blog-grid-2-sidebar"}>Grid 2 sidebar</Link>
                          </li>
                          <li>
                            <Link to={"/blog-grid-2-sidebar-left"}>Grid 2 sidebar left</Link>
                          </li>
                          <li>
                            <Link to={"/blog-grid-3"}>Grid 3</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        {" "}
                        <Link to={""}>Blog Half Image</Link>
                        <ul>
                          <li>
                            <Link to={"/blog-half-img"}>Half image</Link>
                          </li>
                          <li>
                            <Link to={"/blog-half-img-sidebar"}>Half image sidebar</Link>
                          </li>
                          <li>
                            <Link to={"/blog-half-img-left-sidebar"}>Half image sidebar left</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        {" "}
                        <Link to={""}>Blog Large Image</Link>
                        <ul>
                          <li>
                            <Link to={"/blog-large-img"}>Large image</Link>
                          </li>
                          <li>
                            <Link to={"/blog-large-img-sidebar"}>Large image sidebar</Link>
                          </li>
                          <li>
                            <Link to={"/blog-large-img-left-sidebar"}>Large image sidebar left</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        {" "}
                        <Link to={""}>Blog Details</Link>
                        <ul>
                          <li>
                            <Link to={"/blog-single"}>Single</Link>
                          </li>
                          <li>
                            <Link to={"/blog-single-sidebar"}>Single sidebar</Link>
                          </li>
                          <li>
                            <Link to={"/blog-single-left-sidebar"}>Single sidebar right</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to={""}>
                      Shop <i className="fa fa-chevron-down"></i>
                    </Link>
                  </li>

                  <li>
                    <Link to={"/contact"}>Contact Us</Link>
                  </li>
                  <li>
                    <Link to={"/shop-login"}>Login</Link>
                  </li>
                </ul>
                <div className="dlab-social-icon">
                  <ul>
                    <li>
                      <Link className="site-button sharp-sm fa fa-facebook" to={""}></Link>
                    </li>
                    <li>
                      <Link className="site-button sharp-sm fa fa-twitter" to={""}></Link>
                    </li>
                    <li>
                      <Link className="site-button sharp-sm fa fa-linkedin" to={""}></Link>
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
    );
  }
}

export default Header2;
