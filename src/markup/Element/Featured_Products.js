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
  const [featuredproducts, setFeaturedProducts] = useState([]);
  const [galleryimage, setGalleryImage] = useState([]);
  const [networkError, setNetworkError] = useState("");
  const getFeaturedProducts = async () => {
    console.log("recentpost", featuredproducts);
    await fetch(config.service_url + "getFeaturedProducts")
      .then((response) => response.json())
      .then((data1) => {
        let active1 = data1
          .filter((filter1) => filter1.isactive === "1" && filter1.isfeatured === 1)
          .map((data1) => {
            return data1;
          });
        setFeaturedProducts(active1);
        console.log("featuredproduct", featuredproducts);
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        // console.log(networkError);
      });
  };

  useEffect(() => {
    getFeaturedProducts();
    // getGalleryDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row ">
      {featuredproducts.length > 0 &&
        featuredproducts.map((product) => (
          <div className="col-lg-3 col-md-6 col-sm-6 ">
            <div className="port-box1 homeimagerecent text-white my-2">
              <div className="dlab-media">
                <img className="homeimagerecent" src={product.p_image} alt="sukhaa" />
              </div>
              <div className="dlab-info">
                <h4 className="title ">
                  <Link className="text-light" to={{ pathname: `/shop-product-details/${product.p_id}` }}>
                    <div>
                      {product.p_actual_price !== product.p_price && product.p_price !== 0 && product.p_price !== "" ? (
                        <>
                          <div className="price text-light">
                            <span style={{ "text-decoration": "line-through" }}>
                              {" "}
                              <i class="fa fa-inr"></i> {product.p_actual_price || 0}{" "}
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
                          <i class="fa fa-inr"> {"   "} </i>
                          {"   "} {product.p_price}
                        </div>
                      )}
                    </div>
                    <div>{product.p_name}</div>
                  </Link>
                </h4>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Featured_Product;
