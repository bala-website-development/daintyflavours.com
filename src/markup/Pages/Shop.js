import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import config from "../../config.json";
import bnr from "./../../images/banner/bnr1.jpg";
import uuid from "react-uuid";
import { Modal } from "react-bootstrap";
import loadingimg from "./../../images/load.gif";
const Shop = (props) => {
  const [products, setProducts] = useState([]);
  const [networkError, setNetworkError] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);
  const [masterCategory, setMasterCategory] = useState([]);
  const [mcatFilterApp, setMcatFilterApp] = useState(false);
  const [mcatFilterProd, setMcatFilterProd] = useState([]);
  // const [postsToShow, setPostsToShow] = useState([]);
  const postsPerPage = 20;
  const [next, setNext] = useState(postsPerPage);
  const [end, setEnd] = useState(0);
  const history = useHistory();
  let bannerimageurl = props.location.bannerimage;
  let arrayForHoldingPosts = [];
  let _arrayForHoldingPosts = [];
  const getProductDetails = async () => {
    setLoading((loading) => !loading);
    console.log("banner image", props.location.bannerimage);
    console.log("cakecategory", props.location.category);
    console.log("both", props.location.category, props.location.maincategory);
    let _filterOption = props.location?.category != "" && props.location?.category !== undefined ? props.location?.category : props.location?.maincategory;
    await fetch(config.service_url + "getproducts")
      .then((response) => response.json())
      .then((data) => {
        if (props.location.category) {
          let selective = data
            .filter((filter) => filter.p_category.toUpperCase() === _filterOption.toUpperCase() && filter.isactive === 1)
            .map((data) => {
              return data;
            });
          setProducts(selective);
          setFilter(selective);

          console.log(selective, "selective");
        } else if (props.location.maincategory) {
          console.log("mainprod", data);
          let selective = data
            .filter((filter) => filter.p_maincategory?.toUpperCase() === _filterOption.toUpperCase() && filter.isactive === 1)
            .map((data) => {
              return data;
            });
          setProducts(selective);
          setFilter(selective);

          console.log(selective, "selective");
        } else {
          let active = data
            .filter((filter) => filter.isactive === 1)
            .map((data) => {
              return data;
            });
          setProducts(active);
          setFilter(active);
          //loopWithSlice(0, postsPerPage);
          const slicedPosts = active.slice(0, postsPerPage);
          arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
          setProducts(arrayForHoldingPosts);
          console.log(data, "products");
        }
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        console.log(networkError);
      });
    setLoading((loading) => !loading);
  };
  const getAllProductDetails = async () => {
    setLoading((loading) => !loading);
    console.log("cakecategory", props.location.category);
    await fetch(config.service_url + "getproducts")
      .then((response) => response.json())
      .then((data) => {
        let active = data
          .filter((filter) => filter.isactive === 1)
          .map((data) => {
            return data;
          });
        setProducts(active);
        setFilter(active);
        console.log(data, "products");
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        console.log(networkError);
      });
    setLoading((loading) => !loading);
  };
  // paging
  const loopWithSlice = (start, end) => {
    console.log("slice", start, end, mcatFilterApp);
    var slicedPosts = [];

    if (mcatFilterApp) {
      slicedPosts = mcatFilterProd.slice(start, end);
      setEnd(end);
      console.log("sliced products inside apply", products);
    } else {
      slicedPosts = filter.slice(start, end);
      setEnd(end);
    }
    arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
    setProducts(arrayForHoldingPosts);
    console.log("sliced products", arrayForHoldingPosts);
  };

  const LoadMoreForFilteredProducts = (IsFiltered, FilteredProduct) => {
    console.log("slice", IsFiltered, FilteredProduct, mcatFilterProd);
    var slicedPosts = [];
    // let sliced = FilteredProduct.slice(0, postsPerPage);
    // _arrayForHoldingPosts = [..._arrayForHoldingPosts, ...sliced];
    // setProducts(_arrayForHoldingPosts);
    // setNext(0);
    // setEnd(0);
    setProducts(filter);
    if (IsFiltered || mcatFilterApp) {
      slicedPosts = FilteredProduct.slice(0, postsPerPage);
      setNext(0 + postsPerPage);
      setEnd(end);
      console.log("inside check", products, next, end);
    } else {
      slicedPosts = filter.slice(0, end);
      setEnd(end);
    }
    arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
    setProducts(arrayForHoldingPosts);
    console.log("sliced products", products);
  };

  useEffect(() => {
    getProductDetails();
    getCategories();
    // loopWithSlice(0, postsPerPage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location?.category, props.location?.maincategory]);
  const handleShowMorePosts = () => {
    console.log("page", next, next + postsPerPage);
    loopWithSlice(0, next + postsPerPage);
    setNext(next + postsPerPage);
  };
  const handleVisible = () => {
    setSmShow(true);
    setTimeout(() => {
      setSmShow(false);
    }, 1000);
  };
  const addItemsToCart = (pid, price) => {
    setLoading((loading) => !loading);
    if (localStorage.getItem("uuid") === undefined || localStorage.getItem("uuid") === null) {
      history.push("/shop-login");
    } else {
      let data = {
        userid: localStorage.getItem("uuid"),
        createddate: new Date(),
        isactive: "1",
        p_id: pid,
        p_quantity: 1,
        updateddate: new Date(),
        p_price: price,
        id: uuid(),
      };

      fetch(config.service_url + "addCart", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data }) })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            console.log("cart items", data);
            setMessage(data.message);
            handleVisible();
            localStorage.setItem("cartUpdated", true);
          } else if (data.status === 400) {
            console.log("cart items", data);
            setMessage("Item alerady added in cart.");
            handleVisible();
            localStorage.setItem("cartUpdated", true);
          }
        })
        .catch((err) => {
          setNetworkError("Something went wrong, Please try again later!!");
          console.log(networkError);
        });
    }
    setLoading((loading) => !loading);
  };

  const applyFilter = (searchValue) => {
    console.log("searchvalue", searchValue);
    if (searchValue !== "") {
      const filteredData = filter.filter((data) => {
        console.log("searchdata", data);
        return Object.keys(data).some((k) => data[k]?.toString().toLowerCase().includes(searchValue.toLowerCase().trim()));
      });

      setProducts(filteredData);
    } else {
      setProducts(products);
    }
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
          setMessage("No Data");
          handleVisible();
        }
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        console.log(networkError);
      });
  };

  const handleChange = (value, e) => {
    console.log("handlechange", e.target.checked);

    const _checkeddata = masterCategory.map((mc) => {
      if (mc.category === value && e.target.checked === true) {
        mc.checked = "true";
        return mc;
      } else if (mc.category === value && e.target.checked === false) {
        mc.checked = "false";
        return mc;
      } else {
        if (mc.category !== value && mc.checked !== "true") {
          mc.checked = "false";
          return mc;
        } else {
          mc.checked = "true";
          return mc;
        }
      }
    });
    setMasterCategory(_checkeddata);
    console.log(_checkeddata);
  };
  const applyClearCategory = () => {
    // getProductDetails();
    setProducts(filter);
    const clearedMCategory = masterCategory.map((anyone, index) => {
      document.getElementById("mcat" + index).checked = "";
      anyone.checked = "";
      return anyone;
    });
    setMasterCategory(clearedMCategory);
    setMcatFilterApp(false);
    props.location.maincategory = undefined;
    props.location.category = undefined;
    // loopWithSlice(0, next + postsPerPage, false);
    // setNext(postsPerPage);
    let sliced = filter.slice(0, postsPerPage);
    _arrayForHoldingPosts = [..._arrayForHoldingPosts, ...sliced];
    setProducts(_arrayForHoldingPosts);
    setNext(postsPerPage);
    setEnd(0);
  };
  const applyCategory = () => {
    setMcatFilterApp(true);
    // setEnd(0);
    // setNext(postsPerPage);
    console.log(masterCategory.filter((anyone) => anyone.checked === "true"));

    if (
      masterCategory.filter((anyone) => {
        return anyone.checked === "true";
      })?.length > 0
    ) {
      const finalDATa = [];
      const filteredData = filter.filter((data) => {
        masterCategory.forEach((mc) => {
          // console.log(mc.category, data.p_category, mc.checked);
          if (mc.category === data.p_category && mc.checked === "true") {
            console.log("final data", data);
            finalDATa.push(data);
          }
        });
      });
      console.log(finalDATa);
      setMcatFilterProd(finalDATa);
      setProducts(finalDATa);
      // let sliced = finalDATa.slice(0, postsPerPage);
      // _arrayForHoldingPosts = [..._arrayForHoldingPosts, ...sliced];
      // setProducts(_arrayForHoldingPosts);
      // setNext(postsPerPage);
      // setEnd(0);
      LoadMoreForFilteredProducts(true, finalDATa);
    } else {
      // let sliced = filter.slice(0, postsPerPage);
      // _arrayForHoldingPosts = [..._arrayForHoldingPosts, ...sliced];
      // setProducts(_arrayForHoldingPosts);
      // setNext(postsPerPage);
      // setEnd(0);
      setMcatFilterProd(filter);
      setProducts(filter);
      LoadMoreForFilteredProducts(true, filter);
    }
  };

  return (
    <div>
      <Modal size="sm" show={smShow} onHide={() => setSmShow(false)}>
        <Modal.Header closeButton>{message}</Modal.Header>
      </Modal>
      <Header active={"shop"} />

      <div className="page-content bg-white">
        <div className="dlab-bnr-inr " style={bannerimageurl !== undefined ? { backgroundImage: "url(" + bannerimageurl + ")" } : { backgroundImage: "url(" + config.bannerimg1 + ")" }}>
          <div className="container">
            <div className="dlab-bnr-inr-entry">
              <h1 className="text-white">Shop</h1>

              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to={"./"}>
                      <i className="fa fa-home"></i>
                    </Link>
                  </li>
                  <li>Shop</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="content-block">
          <div className="section-full bg-gray-light">
            <div className="container">
              <div className="row mt-3">
                <div className="col-lg-3">
                  <div className="bg-white mb-3">
                    <aside className="side-bar shop-categories sticky-top">
                      {props.location?.category !== undefined && props.location?.maincategory !== undefined ? (
                        <Link className="btn btnhover" onClick={(e) => getAllProductDetails()}>
                          Shop All Products
                        </Link>
                      ) : (
                        <>
                          <div className="dlab-accordion advanced-search toggle" id="accordion">
                            <div className="panel">
                              <div className="acod-head">
                                <h5 className="acod-title">
                                  <Link data-toggle="collapse" data-target="#categories" to="#categories">
                                    Filter Product categories
                                  </Link>
                                </h5>
                              </div>

                              <div id="categories" className="acod-body collapse show">
                                <div className="acod-content">
                                  <div className="widget_services">
                                    {masterCategory?.map((mc, index) => (
                                      <div className="search-content">
                                        <input
                                          id={"mcat" + index}
                                          type="checkbox"
                                          defaultChecked={false}
                                          value={mc.checked}
                                          onChange={(e) => {
                                            handleChange(mc.category, e);
                                          }}
                                        />
                                        <label for={"mcat" + index} className="search-content-area">
                                          {mc.category}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                  <button className=" p-2 px-3 btn btnhover" onClick={(e) => applyCategory()}>
                                    Apply
                                  </button>{" "}
                                  <button className=" p-2 px-3 btn btnhover" onClick={(e) => applyClearCategory()}>
                                    Clear
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <Link className="btn btnhover mt-3" to="/maincategories">
                            Veiw all categories
                          </Link>
                        </>
                      )}
                    </aside>
                  </div>
                </div>

                <div className="col-lg-9 shopproducts">
                  <div>
                    <input type="text" className="form-control" placeholder="Search Products" name="searchbox" id="searchbox" onChange={(e) => applyFilter(e.target.value)}></input>

                    <div className="row m-1">
                      {!loading ? (
                        products && products.length > 0 ? (
                          products.map((product) => (
                            <div className="col-lg-3 col-md-4 col-xl-3 col-sm-3 p-1">
                              <div className="item-box shop-item">
                                <div className="item-img">
                                  <img className="thumbnailimage" src={product.p_image ? product.p_image : config.defaultimage} alt="" />
                                  {product.p_actual_price !== product.p_price && product.p_price !== 0 && product.p_price !== "" ? (
                                    <>
                                      <div className="price bg-white">
                                        <span style={{ "text-decoration": "line-through" }}>
                                          {" "}
                                          <i class="fa fa-inr"></i> {product.p_actual_price || 0}{" "}
                                        </span>
                                        {"   |  "}
                                        <span>
                                          {"   "} <i class="fa fa-inr"></i> {product.p_price}
                                        </span>
                                      </div>
                                      <div className="sale bg-primary text-light">Sale</div>
                                    </>
                                  ) : (
                                    <div className="price bg-white">
                                      <i class="fa fa-inr"> {"   "} </i>
                                      {"   "} {product.p_price}
                                    </div>
                                  )}
                                </div>
                                <div className="item-info text-center">
                                  <h4 className="item-title">
                                    <Link to={{ pathname: `/shop-product-details/${product.p_id}` }}>{product.p_name}</Link>
                                  </h4>
                                  <Link to={{ pathname: `/shop-product-details/${product.p_id}` }} className="btn btn-sm btnhover">
                                    Details
                                  </Link>{" "}
                                  {product.p_quantity > 0 || product.p_quantity != 0 ? (
                                    <button disabled={loading} onClick={(e) => addItemsToCart(product.p_id, product.p_price)} className="btn btn-sm btnhover">
                                      <i className="ti-shopping-cart m-r5"></i> Add to cart
                                    </button>
                                  ) : (
                                    <button disabled={true} className="btn btnhover">
                                      Out of Stock
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-2">
                            {" "}
                            No Records to display{" "}
                            <div>
                              {" "}
                              <Link className="btn btnhover" onClick={(e) => getAllProductDetails()}>
                                View All
                              </Link>
                            </div>
                          </div>
                        )
                      ) : (
                        <div class="position-relative">
                          <div className="p-2 start-50">
                            <div className="p-2">Fetching products Deails, please wait.....</div>
                            <img className="p-2 w-25" src={loadingimg} height="20"></img>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="aligncenter">
                      {end <= filter.length + postsPerPage && (
                        <button className="btn btnhover" onClick={handleShowMorePosts}>
                          Load more
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
