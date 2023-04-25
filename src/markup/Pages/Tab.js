import React, { useState, useEffect } from "react";
import moment from "moment";
import { TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import config from "../../config.json";
const img = "https://firebasestorage.googleapis.com/v0/b/tucfbclouddb.appspot.com/o/tuc%20admin%20qa-e1eb083-cc55-b73c-6826-1fe64a6002bd%2Fproducts%2F7b25283-664-efa6-cc2e-7d1c8ade43bf?alt=media&token=2b33790b-6b6b-427a-b9f4-c38405670d70";
const Popupss = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [masterMainCategory, setMasterMainCategory] = useState([]);
  const [message, setMessage] = useState("");
  const [networkError, setNetworkError] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [masterCategory, setMasterCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const toggle = (tab) => {
    console.log("tab", tab);
    if (activeTab !== tab) setActiveTab(tab);
  };
  const handleVisible = () => {
    setSmShow(true);
    setTimeout(() => {
      setSmShow(false);
    }, 1000);
  };
  const getMainCategories = async () => {
    console.log("entered");
    await fetch(config.service_url + "getmaincategoryforusers")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("main master category", data);
          let _filter = data.data.filter((_d) => _d.type === "product");
          setMasterMainCategory(_filter);
          localStorage.setItem("cartUpdated", true);
        } else if (data.status === 400) {
        }
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        console.log(networkError);
      });
  };
  const getCategories = async () => {
    await fetch(config.service_url + "getuserscategory")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("master category", data);
          let _filter = data.data.filter((_d) => _d.type === "product");
          setMasterCategory(_filter);
          localStorage.setItem("cartUpdated", true);
        } else if (data.status === 400) {
        }
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        console.log(networkError);
      });
  };
  const getBrands = async () => {
    console.log("entered");
    await fetch(config.service_url + "getusersbrand")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("brands", data);
          let _filter = data.data.filter((_d) => _d.type === "product" && _d.brand !== "undefined");
          _filter.push({ Expiration: moment().add(1, "d") });
          localStorage.setItem("brand", JSON.stringify(_filter));
          setBrand(_filter);
        } else if (data.status === 400) {
          //setMenuMainCategory([]);
        }
      })
      .catch((err) => {
        // setNetworkError("Something went wrong, Please try again later!!");
        // console.log(networkError);
      });
  };

  useEffect(() => {
    getMainCategories();
    getCategories();
    // loopWithSlice(0, postsPerPage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div class="section-full bg-white pizza-full-menu" style={{ backgroundImage: "url(" + config.pagebgimage + ")", backgroundSize: "100%" }}>
      <div tabs>
        <div className="divbg1 pizza-items">
          <div className="container">
            <ul className="nav nav-tabs pizza-items filters">
              {masterMainCategory &&
                masterMainCategory?.map((mmc, index) => (
                  <li className="nav-item item">
                    <input type="radio" />
                    <Link
                      className={classnames({ active: activeTab === index }, "item-icon-box nav-link px-1 ")}
                      onClick={() => {
                        toggle(index);
                      }}
                    >
                      {/* <img src={mmc.icon_image ? mmc.icon_image : config.defaulticon} alt={config.websitetitle} className={"iconimage"} /> */}
                      <div className="item-info text-center">
                        <span className="item-title font-weight-normal">{mmc.maincategory}</span>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="my-4">
        <div className="container-fluid">
          <TabContent activeTab={activeTab}>
            {masterMainCategory &&
              masterMainCategory?.map((mmc, index) => (
                <TabPane tabId={index}>
                  <div className={activeTab === index ? "row tab-pane fade show active" : "row tab-pane fade"}>
                    {masterCategory &&
                      masterCategory
                        ?.filter((filter) => filter.maincategory === mmc.maincategory && mmc.type === "product" && filter.maincategory != "brands")
                        ?.map((mc) => (
                          <div className="col-sm-2 m-b30">
                            <div className="item-box shop-item style2">
                              <div className="">
                                <img src={mc.thumbnail_image ? mc.thumbnail_image : config.defaultimage} className="img-fluid " alt={config.websitetitle} />
                              </div>

                              <div className="item-info text-center">
                                <span className="font-weight-normal">
                                  <Link
                                    className="text-uppercase"
                                    onClick={(e) => (localStorage.setItem("bannerurl", mc?.banner_image), localStorage.setItem("categorydes", mc?.categorydes == undefined ? "" : mc?.categorydes), localStorage.setItem("queryurl", "maincategory=" + mmc.maincategory + "&category=" + mc.category))}
                                    to={{
                                      pathname: "/shop",
                                      search: "?maincategory=" + mmc.maincategory + "&category=" + mc.category,
                                      bannerimage: mc?.banner_image,
                                      categorydes: mc?.categorydes,
                                    }}
                                  >
                                    <span className="text-nowrap">{mc?.category}</span>
                                  </Link>
                                </span>

                                <div className="cart-btn">
                                  <Link
                                    className="text-uppercase btn btnhover p-1 px-2 "
                                    onClick={(e) => (localStorage.setItem("bannerurl", mc?.banner_image), localStorage.setItem("categorydes", mc?.categorydes == undefined ? "" : mc?.categorydes), localStorage.setItem("queryurl", "maincategory=" + mmc.maincategory + "&category=" + mc.category))}
                                    to={{
                                      pathname: "/shop",
                                      search: "?maincategory=" + mmc.maincategory + "&category=" + mc.category,
                                      bannerimage: mc?.banner_image,
                                      categorydes: mc?.categorydes,
                                    }}
                                  >
                                    View all <i className="ti-angle-double-right"></i>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                    {mmc.maincategory == "BRANDS" &&
                      JSON.parse(localStorage.getItem("brand"))
                        ?.filter((b) => b)
                        .map(
                          (brand, index) =>
                            brand !== null &&
                            brand.brand !== undefined && (
                              <div className="col-sm-2 m-b30">
                                <div className="item-box shop-item style2">
                                  <div className="">
                                    <img src={config.defaultimage} className="img-fluid " alt={config.websitetitle} />
                                  </div>

                                  <div className="item-info text-center">
                                    <span className="font-weight-normal">
                                      <Link
                                        className="text-uppercase"
                                        onClick={(e) => (localStorage.setItem("bannerurl", brand?.banner_image), localStorage.setItem("categorydes", brand?.categorydes == undefined ? "" : brand?.categorydes), localStorage.setItem("queryurl", "brand=" + brand.brand))}
                                        to={{
                                          pathname: "/shop",
                                          search: "?brand=" + brand.brand,
                                          bannerimage: brand?.banner_image,
                                          categorydes: brand?.categorydes,
                                        }}
                                      >
                                        <span className="text-nowrap">{brand?.brand}</span>
                                      </Link>
                                    </span>

                                    <div className="cart-btn">
                                      <Link
                                        className="text-uppercase btn btnhover p-1 px-2 "
                                        onClick={(e) => (localStorage.setItem("bannerurl", brand?.banner_image), localStorage.setItem("categorydes", brand?.categorydes == undefined ? "" : brand?.categorydes), localStorage.setItem("queryurl", "brand=" + brand?.brand))}
                                        to={{
                                          pathname: "/shop",
                                          search: "?brand=" + brand.brand,
                                          bannerimage: brand?.banner_image,
                                          categorydes: brand?.categorydes,
                                        }}
                                      >
                                        View all <i className="ti-angle-double-right"></i>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                        )}
                  </div>
                </TabPane>
              ))}
          </TabContent>
        </div>
      </div>
    </div>
  );
};

export default Popupss;
