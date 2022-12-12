import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import bgimg2 from "./../../images/blog/grid/pic1.jpg";
import work_pic1 from "./../../images/our-work/pic1.jpg";
import work_pic2 from "./../../images/our-work/pic1.jpg";
import work_pic3 from "./../../images/our-work/pic1.jpg";
import config from "../../config.json";
const Sale_Products = (daintyproducts) => {
  const [saleproducts, setSaleProducts] = useState([]);
  const [galleryimage, setGalleryImage] = useState([]);
  const [networkError, setNetworkError] = useState("");
  const [loading, setLoading] = useState(false);
  const getSaleProducts = async () => {
    setLoading(true);
    await fetch(config.service_url + "getproducts")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          let active = data
            .filter((filter, index) => filter.isactive === 1 && filter.isonsale === 1 && index < config.saleproduct)
            .map((data) => {
              return data;
            });
          //setSaleProducts([]);
          setSaleProducts(active);
          console.log("sale arriavalsactive");
        }
        setLoading(false);
        console.log("sale arriavals", data);
        console.log("sale arriavals1", saleproducts);
      })
      .catch((err) => {
        setLoading(false);
        setNetworkError("Something went wrong, Please try again later!!");
        console.log("recentpost2", err);
      });
  };

  useEffect(() => {
    //getSaleProducts();
    console.log("daintyproducts on sale", daintyproducts);
    let active = daintyproducts.daintyproducts
      .filter((filter, index) => filter.isactive === 1 && filter.isonsale === 1 && index < config.saleproduct)
      .map((data) => {
        return data;
      });
    setSaleProducts(active);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="mt-3">
        <div className=" text-center">
          <h3>Products on Sale</h3>
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
          <div className="row m-1 ">
            {!loading ? (
              saleproducts && saleproducts.length > 0 ? (
                saleproducts.map((product) => (
                  <div className="col-lg-3">
                    <div className="item-box shop-item mr-1 style text-white shadow rounded">
                      <div className="item-img1">
                        <Link to={{ pathname: `/shop-product-details/${product.p_id}` }}>
                          <div className="homeimagerecentdivimg" style={product.p_image ? { backgroundImage: "url(" + product.p_image + ")" } : { backgroundImage: "url(" + config.defaultimage + ")" }}></div>
                        </Link>
                        {product.p_price < product.p_net_product_price && product.p_price !== 0 && product.p_price !== "" ? (
                          <>
                            <div className="sale bg-primary text-light">Sale</div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="item-info text-center">
                        <p className="small mb-0 textoverflow1">
                          <h6 className="px-1">
                            <Link to={{ pathname: `/shop-product-details/${product.p_id}` }}>{product.p_name}</Link>
                          </h6>{" "}
                        </p>

                        {product.p_price < product.p_net_product_price && product.p_price !== 0 && product.p_price !== "0" && product.p_price !== "" ? (
                          <>
                            <div className="text-primary pricefont">
                              <span style={{ "text-decoration": "line-through" }}>
                                {" "}
                                <i class="fa fa-inr"></i> {product.p_net_product_price || 0}{" "}
                              </span>
                              {"   |  "}
                              <span>
                                {"   "} <i class="fa fa-inr"></i> {product.p_price}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="text-primary pricefont">
                            <i class="fa fa-inr"> {"   "} </i>
                            {"   "} {product.p_net_product_price}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-2"> Currently there is no active Offers </div>
              )
            ) : (
              <div class="position-relative">
                <div className="p-2 start-50">
                  <div className="p-2">Fetching products details, please wait.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-center mt-1">
        <a className="dbtn-primary" onClick={(e) => localStorage.setItem("queryurl", "maincategory=all&category=all")} href={"/shop?maincategory=all&category=all"}>
          Shop all <i className="fa fa-angle-right"></i>
        </a>
      </div>
    </div>
  );
};

export default Sale_Products;
