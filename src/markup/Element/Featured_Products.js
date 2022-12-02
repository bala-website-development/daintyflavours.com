import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import bgimg2 from "./../../images/blog/grid/pic1.jpg";
import work_pic1 from "./../../images/our-work/pic1.jpg";
import work_pic2 from "./../../images/our-work/pic1.jpg";
import work_pic3 from "./../../images/our-work/pic1.jpg";
import config from "../../config.json";
const Featured_Product = (props) => {
  const [products, setProducts] = useState([]);
  const [galleryimage, setGalleryImage] = useState([]);
  const [networkError, setNetworkError] = useState("");
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const getHomePageCategoryfromService = async () => {
    console.log("entered");
    await fetch(config.service_url + "getuserscategory")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          let active1 = data.data.filter((_d) => _d.type === "product" && _d.isactive === 1 && _d.featured === true);
          active1.sort(function (a, b) {
            return a.forder - b.forder;
          });
          //order by forder ascending
          setProducts(active1);
        }
      })
      .catch((err) => {
        // setNetworkError("Something went wrong, Please try again later!!");
        // console.log(networkError);
      });
  };

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;

    return { innerWidth };
  }
  const getHomePageCategoryfromLocalstorage = async () => {
    console.log("recentpost", products);
    if (JSON.parse(localStorage.getItem("categories")) !== null) {
      let active1 = JSON.parse(localStorage.getItem("categories"))
        .filter((filter1, index) => filter1.isactive === 1 && filter1.featured === true)
        .map((data) => {
          return data;
        });

      active1.sort(function (a, b) {
        return a.forder - b.forder;
      });
      //order by forder ascending
      setProducts(active1);
      console.log("getHomePageCategory", active1);
    }
  };

  useEffect(() => {
    getHomePageCategoryfromService();
    console.log("windowSize", windowSize.innerWidth);
    // getHomePageCategoryfromLocalstorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-1">
      <div className="text-center">
        <h3>Our Featured Products</h3>
        <div className="dlab-separator style1 bg-primary"></div>
      </div>
      <div id="tileview text-center d-none">
        <div class="tiles-grid d-flex-row justify-content-between w-100 d-none">
          <div data-role="tile" data-size="xlarge" className="w-100 bg-dark">
            a
          </div>
          <div data-role="tile" data-size="large" className="w-100"></div>
          <div data-role="tile" data-size="large" className="w-100"></div>
          <div data-role="tile" data-size="large" className="w-100"></div>
          <div data-role="tile" data-size="large" className="w-100"></div>
          <div data-role="tile" data-size="large" className="w-100"></div>
          <div data-role="tile" data-size="large" className="w-100"></div>
          <div data-role="tile" data-size="xlarge" className="w-100 bg-dark">
            a
          </div>{" "}
          <div data-role="tile" data-size="large" className="w-100"></div>
          <div data-role="tile" data-size="large" className="w-100"></div>
        </div>
      </div>
      {/* in use */}
      <div id="tileview text-center">
        <div class="tiles-grid d-flex-row justify-content-between w-100">
          {windowSize.innerWidth > 500 ? (
            products && products.length > 0 ? (
              products.map((fProduct, index) =>
                index === 0 || index === 7 ? (
                  <Link
                    data-role="tile"
                    data-size="xlarge"
                    className="w-100"
                    to={"/shop?category=" + fProduct.category + "&bannerimage=" + fProduct.banner_image}
                    style={{
                      backgroundImage: "url(" + fProduct.thumbnail_image + ")",
                      backgroundSize: "100%",
                      backgroundSize: "cover",
                      overflow: "hidden",
                    }}
                  >
                    <Link to={"/shop?category=" + fProduct.category + "&bannerimage=" + fProduct.banner_image}>
                      <div className="p-1 py-3 font-weight-bold bg-primary-opacity text-white text-center">
                        <span>
                          {fProduct.category} <i className="fa fa-angle-double-right m-r10"></i>
                        </span>
                      </div>
                    </Link>
                  </Link>
                ) : (
                  <Link
                    data-role="tile"
                    data-size="large"
                    className="w-100"
                    to={"/shop?category=" + fProduct.category + "&bannerimage=" + fProduct.banner_image}
                    style={{
                      backgroundImage: "url(" + fProduct.thumbnail_image + ")",
                      backgroundSize: "100%",
                      backgroundSize: "cover",
                      overflow: "hidden",
                    }}
                  >
                    <Link to={{ pathname: "/shop?category=" + fProduct.category, bannerimage: fProduct.banner_image }}>
                      <div className="p-1 py-3 font-weight-bold bg-primary-opacity text-white text-center">
                        <span>
                          {fProduct.category} <i className="fa fa-angle-double-right m-r10"></i>{" "}
                        </span>
                      </div>
                    </Link>
                  </Link>
                )
              )
            ) : (
              <span className="container row w-100">Loading...</span>
            )
          ) : products && products.length > 0 ? (
            products.map((fProduct, index) =>
              index === 0 || index === 7 ? (
                <div
                  data-role="tile"
                  data-size="xlarge"
                  className="w-100"
                  style={{
                    backgroundImage: "url(" + fProduct.thumbnail_image + ")",
                    backgroundSize: "100%",
                    backgroundSize: "cover",
                    overflow: "hidden",
                  }}
                >
                  <Link to={"/shop?category=" + fProduct.category + "&bannerimage=" + fProduct.banner_image}>
                    <div className="p-1 py-3 font-weight-bold bg-primary-opacity text-white text-center">
                      <span>
                        {fProduct.category} <i className="fa fa-angle-double-right m-r10"></i>
                      </span>
                    </div>
                  </Link>
                </div>
              ) : (
                <div
                  data-role="tile"
                  data-size="large"
                  className="w-100"
                  style={{
                    backgroundImage: "url(" + fProduct.thumbnail_image + ")",
                    backgroundSize: "100%",
                    backgroundSize: "cover",
                    overflow: "hidden",
                  }}
                >
                  <Link to={{ pathname: "/shop?category=" + fProduct.category, bannerimage: fProduct.banner_image }}>
                    <div className="p-1 py-3 font-weight-bold bg-primary-opacity text-white text-center">
                      <span>
                        {fProduct.category} <i className="fa fa-angle-double-right m-r10"></i>{" "}
                      </span>
                    </div>
                  </Link>
                </div>
              )
            )
          ) : (
            <span className="container row w-100">Loading...</span>
          )}
        </div>
      </div>
      {/* not in use */}

      <br />
      <br />
      <div className="text-center mt-2 d-none">
        <Link to={"/shop"} className="p-2 px-3 btn btn-md btnhover shadow m-t30">
          Shop all <i className="fa fa-angle-right m-r10"></i>
        </Link>
      </div>
    </div>
  );
};

export default Featured_Product;
