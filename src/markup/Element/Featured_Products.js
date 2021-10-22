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
  const getPostDetails = async () => {
    console.log("recentpost", products);
    await fetch(config.service_url + "getFeaturedProducts")
      .then((response) => response.json())
      .then((data) => {
        let active = data
          .filter((filter) => filter.isactive === "1" && filter.isfeatured === 1)
          .map((data) => {
            return data;
          });
        setProducts(active);
        console.log("recentpost", products);
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        // console.log(networkError);
      });
  };
  const getGalleryDetails = async () => {
    await fetch(config.service_url + "getgallery")
      .then((response) => response.json())
      .then((data1) => {
        let active1 = data1
          .filter((filter1) => filter1.viewingallery === 1)
          .map((data1) => {
            return data1;
          });
        setGalleryImage(active1);
        console.log("galleryimages", galleryimage);
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        // console.log(networkError);
      });
  };
  useEffect(() => {
    // getPostDetails();
    // getGalleryDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row ">
      {products.length > 0 &&
        products.map((product) => (
          <div className="col-lg-3 col-md-6 col-sm-6 ">
            <div className="port-box1 text-white my-2">
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

export default Featured_Product;
