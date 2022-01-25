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
      <div className="mt-3">
        <div className=" text-center">
          <h3>Our New Arrivals</h3>
          <div className="dlab-separator style1 bg-primary"></div>
        </div>
        <div id="tileview text-center">
          <div class="tiles-grid d-flex-row justify-content-between w-100">
            {products &&
              products.length > 0 &&
              products.map((fProduct, index) =>
                index === 0 || index === 3 ? (
                  <Link
                    to={{ pathname: `/shop-product-details/${fProduct.p_id}` }}
                    data-role="tile"
                    data-size="large"
                    className="w-100"
                    style={{
                      backgroundImage: "url(" + fProduct.p_image + ")",
                      backgroundSize: "100%",
                      backgroundSize: "cover",
                      overflow: "hidden",
                    }}
                  >
                    <div className="p-1">
                      {" "}
                      <span>{fProduct.p_name}</span>
                      <div>₹ {fProduct.p_price}</div>
                      <div></div>
                    </div>
                  </Link>
                ) : (
                  <Link
                    to={{ pathname: `/shop-product-details/${fProduct.p_id}` }}
                    data-role="tile"
                    data-size="medium"
                    className="w-100"
                    style={{
                      backgroundImage: "url(" + fProduct.p_image + ")",
                      backgroundSize: "100%",
                      backgroundSize: "cover",
                      overflow: "hidden",
                    }}
                  >
                    <div className="p-1">
                      {" "}
                      <span>{fProduct.p_name}</span>
                      <div>₹ {fProduct.p_price}</div>
                    </div>
                  </Link>
                )
              )}
            <div to={"/shop"} data-role="tile" data-size="medium" className="w-100">
              <div className="p-1">
                <span>Shop All</span>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="row w-100">
          {products.length > 0 &&
            products.map((product) => (
              <div className="">
                <div className="shop-item  text-white my-2">
                  <div className="w-100 d-flex row"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="text-center mt-2 d-none">
        <Link to={"/shop"} className="p-2 px-3  btn btn-md btnhover shadow m-t30">
          <i className="fa fa-angle-right m-r10"></i>Shop all
        </Link>
      </div>
    </div>
  );
};

export default Recent_Products;
