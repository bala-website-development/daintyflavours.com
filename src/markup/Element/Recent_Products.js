import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import bgimg2 from "./../../images/blog/grid/pic1.jpg";
import work_pic1 from "./../../images/our-work/pic1.jpg";
import work_pic2 from "./../../images/our-work/pic1.jpg";
import work_pic3 from "./../../images/our-work/pic1.jpg";
import config from "../../config.json";
const New_Products = (daintyproducts) => {
  const [products, setProducts] = useState([]);
  const [galleryimage, setGalleryImage] = useState([]);
  const [networkError, setNetworkError] = useState("");
  const [loading, setLoading] = useState(false);
  const getNewarrivalsProducts = async () => {
    setLoading(true);
    await fetch(config.service_url + "getFeaturedProducts")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          let active = data.data
            .filter((filter, index) => filter.isactive === 1 && index < config.newarrivalsproduct)
            .map((data) => {
              return data;
            });
          setProducts([]);
          setProducts(active);
        }
        setLoading(false);
        console.log("new arriavals", data);
      })
      .catch((err) => {
        setLoading(false);
        setNetworkError("Something went wrong, Please try again later!!");
        console.log("recentpost2", err);
      });
  };

  useEffect(() => {
    // getNewarrivalsProducts();
    let active = daintyproducts.daintyproducts
      .filter((filter, index) => filter.isfeatured === 1 && filter.isactive === 1 && index < config.newarrivalsproduct)
      .map((data) => {
        return data;
      });
    setProducts([]);
    setProducts(active);
    console.log("new daintyproducts", active);
    //coverting Latest product to Featured product. it is newest arrival as per this client.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="mt-3">
        <div className=" text-center">
          <h3>Our New Arrivals</h3>
          <div className="dlab-separator style1 bg-primary d-none"></div>
        </div>

        <div className="row">
          {loading && (
            <div className="container row">
              <div className="col-lg-12">
                <div className="page-notfound text-center">
                  <i className="fa fa-cog fa-spinner fa-fw text-primary text-small"></i>
                </div>
              </div>
            </div>
          )}
          {products.length > 0 &&
            !loading &&
            products.map((product) => (
              <div className="col-lg-3">
                <div className="item-box shop-item mr-1 ml-1 style text-white my-2 shadow rounded">
                  <div className="">
                    <Link className="text-light" to={{ pathname: `/shop-product-details/${product.p_id}` }}>
                      {/* <img className="homeimagerecent" src={product.p_image ? product.p_image : config.defaultimage} alt={config.websitetitle} /> */}

                      <div className="homeimagerecentdivimg" style={product.p_image ? { backgroundImage: "url(" + product.p_image + ")" } : { backgroundImage: "url(" + config.defaultimage + ")" }}></div>
                    </Link>
                  </div>

                  <div className="item-info text-center">
                    <span className="">
                      {" "}
                      <div className="cart-btn">
                        {product.p_price < product.p_actual_price && product.p_price !== 0 && product.p_price !== "" ? (
                          <>
                            <div className="text-dark">
                              <span style={{ "text-decoration": "line-through" }}>
                                {" "}
                                <span className="text-dark pricefont">
                                  <i class="fa fa-inr"></i> {product.p_actual_price || 0}{" "}
                                </span>
                              </span>
                              {"   |  "}
                              <span className="text-dark pricefont">
                                {"   "} <i class="fa fa-inr "></i> {product.p_price}
                              </span>{" "}
                              <span className="px-1 sale bg-primary text-light d-none">Sale</span>
                            </div>
                          </>
                        ) : (
                          <div className=" text-dark pricefont">
                            <span className="text-dark ">
                              <i class="fa fa-inr"> {"   "} </i>
                              {"   "}
                              {product.p_price}
                            </span>
                          </div>
                        )}
                      </div>
                    </span>

                    <div className="">
                      {" "}
                      <Link className="text-dark" to={{ pathname: `/shop-product-details/${product.p_id}` }}>
                        {" "}
                        <div className="textoverflow1 px-2">
                          <h6 className="text-primary ">{product.p_name}</h6>
                          <br />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="text-center mt-2">
        <a className="dbtn-primary  shadow" onClick={(e) => localStorage.setItem("queryurl", "maincategory=all&category=all")} href={"/shop?maincategory=all&category=all"}>
          Shop all <i className="fa fa-angle-right"></i>
        </a>
      </div>
    </div>
  );
};

export default New_Products;
