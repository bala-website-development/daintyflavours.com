import React, { useState } from "react";
import { TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
const img = "https://firebasestorage.googleapis.com/v0/b/tucfbclouddb.appspot.com/o/tuc%20admin%20qa-e1eb083-cc55-b73c-6826-1fe64a6002bd%2Fproducts%2F7b25283-664-efa6-cc2e-7d1c8ade43bf?alt=media&token=2b33790b-6b6b-427a-b9f4-c38405670d70";
const Popupss = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div class="section-full bg-white pizza-full-menu">
      <div tabs>
        <div className="bg-primary pizza-items">
          <div className="container">
            <ul className="nav nav-tabs pizza-items filters">
              <li className="nav-item item">
                <input type="radio" />
                <Link
                  className={classnames({ active: activeTab === "1" }, "item-icon-box nav-link")}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  <i className="flaticon-pizza-slice"></i>
                  <span>INGREDIENTS</span>
                </Link>
              </li>
              <li className="nav-item item">
                <input type="radio" />
                <Link
                  className={classnames({ active: activeTab === "2" }, "item-icon-box nav-link")}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  <i className="flaticon-burger"></i>
                  <span>BAKEWARE</span>
                </Link>
              </li>
              <li className="nav-item item">
                <input type="radio" />
                <Link
                  className={classnames({ active: activeTab === "3" }, "item-icon-box nav-link")}
                  onClick={() => {
                    toggle("3");
                  }}
                >
                  <i className="flaticon-french-fries"></i>
                  <span>CHOCOLATE</span>
                </Link>
              </li>
              <li className="nav-item item">
                <input type="radio" />
                <Link
                  className={classnames({ active: activeTab === "4" }, "item-icon-box nav-link")}
                  onClick={() => {
                    toggle("4");
                  }}
                >
                  <i className="flaticon-cola"></i>
                  <span>ACCESSORIES</span>
                </Link>
              </li>
              <li className="nav-item item">
                <input type="radio" />
                <Link
                  className={classnames({ active: activeTab === "5" }, "item-icon-box nav-link")}
                  onClick={() => {
                    toggle("5");
                  }}
                >
                  <i className="flaticon-hot-dog"></i>
                  <span>CAKECRAFT</span>
                </Link>
              </li>
              <li className="nav-item item">
                <input type="radio" />
                <Link
                  className={classnames({ active: activeTab === "6" }, "item-icon-box nav-link")}
                  onClick={() => {
                    toggle("6");
                  }}
                >
                  <i className="flaticon-cookies"></i>
                  <span>PACKAGING</span>
                </Link>
              </li>
              <li className="nav-item item">
                <input type="radio" />
                <Link
                  className={classnames({ active: activeTab === "7" }, "item-icon-box nav-link")}
                  onClick={() => {
                    toggle("7");
                  }}
                >
                  <i className="flaticon-sandwich"></i>
                  <span>DECORATION</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="my-4">
        <div className="container-fluid">
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <div className="row tab-pane fade show active">
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="">
                      <img src={img} className="" alt="Dainty Flavours" />
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Summer Pizza</Link>
                      </h4>

                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          View all <i className="ti-angle-double-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="">
                      <img src={img} className="" alt="Dainty Flavours" />
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Summer Pizza</Link>
                      </h4>

                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          View all <i className="ti-angle-double-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="">
                      <img src={img} className="" alt="Dainty Flavours" />
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Summer Pizza</Link>
                      </h4>

                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          View all <i className="ti-angle-double-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="row ">
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/burger/pic1.jpg")} alt="" />{" "}
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Pancakes</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/burger/pic2.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Pumpkin cakes</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/burger/pic3.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Muffin</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/burger/pic4.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Cupcakes</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/burger/pic5.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Birthday Cake</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div className="row ">
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item1.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Biscuits</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item2.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Pancakes</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item3.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Muffin</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item4.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Pancakes</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item5.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Pumpkin cakes</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="4">
              <div className="row ">
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item5.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Muffin</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item3.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Cupcakes</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item2.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Birthday Cake</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item7.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Biscuits</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item8.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Pancakes</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="5">
              <div className="row ">
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item3.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Muffin</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item4.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Pancakes</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item6.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"shop-product-details"}>Pumpkin cakes</Link>>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item8.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Muffin</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item2.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Cupcakes</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>

            <TabPane tabId="6">
              <div className="row ">
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item3.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Muffin</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item4.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Pancakes</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item6.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Pumpkin cakes</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item8.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Muffin</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item2.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Cupcakes</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>

            <TabPane tabId="7">
              <div className="row ">
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item3.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Pancakes</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item4.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Pumpkin cakes</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item5.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Muffin</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item5.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Cupcakes</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dz-col col m-b30">
                  <div className="item-box shop-item style2">
                    <div className="item-img">
                      <Link>
                        <img src={require("./../../images/product/item7.jpg")} alt="" />
                      </Link>
                    </div>
                    <div className="item-info text-center">
                      <h4 className="item-title">
                        <Link to={"/shop-product-details"}>Birthday Cake</Link>
                      </h4>
                      <h5 className="price text-primary">
                        <del>45</del>
                        <span>$40</span>
                      </h5>
                      <div className="cart-btn">
                        <Link to={"/shop-product-details"} className="btn btnhover radius-xl">
                          <i className="ti-shopping-cart"></i> Add To Cart
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </div>
  );
};

export default Popupss;
