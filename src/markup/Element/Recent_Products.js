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
        let active = data
          .filter((filter) => filter.isactive === "1")
          .map((data) => {
            return data;
          });
        setProducts(active);
        console.log("recentpost2", products);
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
    <div className="row ">
      {products.length > 0 &&
        products.map((product) => (
          <div className="col-lg-3 col-md-6 col-sm-6 ">
            <div className="port-box1 homeimagerecent text-white my-2">
              <div className="dlab-media">
                <img className="homeimagerecent" src={product.p_image} alt="sukhaa" />
              </div>
              <div className="dlab-info">
                <h4 className="title ">
                  <Link className="text-light" to={{ pathname: `/shop-product-details/${product.p_id}` }}>
                    <div>
                      <i class="fa fa-inr"> {"   "} </i>
                      {"   "} {product.p_price}
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

export default Recent_Products;
