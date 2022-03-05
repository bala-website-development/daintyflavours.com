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
    // getHomePageCategoryfromLocalstorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-1">
      <div className="text-center">
        <h3>Our Featured Prodcuts</h3>
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

      <div id="tileview text-center">
        <div class="tiles-grid d-flex-row justify-content-between w-100">
          {products &&
            products.length > 0 &&
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
                  <Link to={{ pathname: "/shop", category: fProduct.category, bannerimage: fProduct.banner_image }} className="p-1">
                    <div className="p-1">
                      <span>{fProduct.category}</span>
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
                  <Link to={{ pathname: "/shop", category: fProduct.category, bannerimage: fProduct.banner_image }} className="p-1">
                    <div className="p-1">
                      <span>{fProduct.category}</span>
                    </div>
                  </Link>
                </div>
              )
            )}
        </div>
      </div>
      <div className="row d-none">
        {products.length > 0 &&
          products.map((product) => (
            <div className="col-lg-3">
              <div className="item-box shop-item style text-white my-2">
                <div className="">
                  <img className="homeimagerecent" src={product.p_image ? product.p_image : config.defaultimage} alt={config.websitetitle} />
                </div>
                <div className="dlab-info d-none">
                  <h4 className="title ">
                    <Link className="text-light" to={{ pathname: `/shop-product-details/${product.p_id}` }}>
                      <div>
                        {product.p_actual_price !== product.p_price && product.p_price !== 0 && product.p_price !== "" ? (
                          <>
                            <div className="price text-light">
                              <span style={{ "text-decoration": "line-through" }}>
                                {" "}
                                <span className="text-light">
                                  <i class="fa fa-inr"></i> {product.p_actual_price || 0}{" "}
                                </span>
                              </span>
                              {"   |  "}
                              <span className="text-light">
                                {"   "} <i class="fa fa-inr"></i> {product.p_price}
                              </span>{" "}
                              <span className="px-1 sale bg-primary text-light">Sale</span>
                            </div>
                          </>
                        ) : (
                          <div className="price text-light ">
                            <span className="text-light ">
                              <i class="fa fa-inr"> {"   "} </i>
                              {"   "}
                              {product.p_price}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>{product.p_name}</div>
                    </Link>
                  </h4>
                </div>
                <div className="item-info text-center">
                  <span className="">
                    {" "}
                    <div className="cart-btn">
                      {product.p_actual_price !== product.p_price && product.p_price !== 0 && product.p_price !== "" ? (
                        <>
                          <div className="text-dark">
                            <span style={{ "text-decoration": "line-through" }}>
                              {" "}
                              <span className="text-dark">
                                <i class="fa fa-inr"></i> {product.p_actual_price || 0}{" "}
                              </span>
                            </span>
                            {"   |  "}
                            <span className="text-dark">
                              {"   "} <i class="fa fa-inr "></i> {product.p_price}
                            </span>{" "}
                            <span className="px-1 sale bg-primary text-light d-none">Sale</span>
                          </div>
                        </>
                      ) : (
                        <div className=" text-dark ">
                          <span className="text-dark ">
                            <i class="fa fa-inr"> {"   "} </i>
                            {"   "}
                            {product.p_price}
                          </span>
                        </div>
                      )}
                    </div>
                  </span>

                  <div>
                    {" "}
                    <Link className="text-dark" to={{ pathname: `/shop-product-details/${product.p_id}` }}>
                      {" "}
                      <div>
                        <b className="text-primary">{product.p_name}</b>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="text-center mt-2">
        <Link to={"/shop"} className="p-2 px-3 btn btn-md btnhover shadow m-t30">
          <i className="fa fa-angle-right m-r10"></i>Shop all
        </Link>
      </div>
    </div>
  );
};

export default Featured_Product;
