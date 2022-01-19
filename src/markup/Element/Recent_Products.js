import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import bgimg2 from "./../../images/blog/grid/pic1.jpg";
import work_pic1 from "./../../images/our-work/pic1.jpg";
import work_pic2 from "./../../images/our-work/pic1.jpg";
import work_pic3 from "./../../images/our-work/pic1.jpg";
import config from "../../config.json";
const Recent_Products = () => {
  const [products, setProducts] = useState([]);
  const [galleryimage, setGalleryImage] = useState([]);
  const [networkError, setNetworkError] = useState("");
  const getLatestProducts = async () => {
    await fetch(config.service_url + "getLatestProducts")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          let active = data.data
            .filter((filter, index) => filter.isactive === 1 && index < config.recentproduct)
            .map((data) => {
              return data;
            });
          setProducts([]);
          setProducts(active);
        }

        console.log("recentpost2", data);
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        console.log("recentpost2", err);
      });
  };

  useEffect(() => {
    getLatestProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="px-1">
        <div className=" text-left">
          <h3>Our New Arrivals</h3>

          <div className="dlab-separator style1 bg-primary"></div>
        </div>

        <div className="row ">
          {products.length > 0 &&
            products.map((product) => (
              <div className="col-lg-3 col-md-6 col-sm-6 ">
                <div className="item-box shop-item  text-white my-2">
                  <div className="dlab-media">
                    <img className="img-fluid homeimagerecent" src={product.p_image ? product.p_image : config.defaultimage} alt={config.websitetitle} />
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
                    <div>
                      {" "}
                      <Link className="text-dark" to={{ pathname: `/shop-product-details/${product.p_id}` }}>
                        {" "}
                        <div>
                          <b>{product.p_name}</b>
                        </div>
                      </Link>
                    </div>
                    <span className="">
                      {" "}
                      <div className="cart-btn">
                        {product.p_actual_price !== product.p_price && product.p_price !== 0 && product.p_price !== "" ? (
                          <>
                            <div className=" text-dark">
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
                              <span className="px-1 sale bg-primary text-light ">Sale</span>{" "}
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
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="text-center mt-2">
        <Link to={"/shop"} className="p-2 px-3  btn btn-md btnhover shadow m-t30">
          <i className="fa fa-angle-right m-r10"></i>Shop all
        </Link>
      </div>
    </div>
  );
};

export default Recent_Products;
