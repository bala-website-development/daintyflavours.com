import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useHistory } from "react-router-dom";
import Footer from "./../Layout/Footer";
import config from "../../config.json";
import bnr from "./../../images/banner/bnr1.jpg";
import uuid from "react-uuid";
import { Modal } from "react-bootstrap";
import loadingimg from "./../../images/load.gif";
import Header2 from "./../Layout/NavBarMenu";
import queryString from "query-string";
import secureLocalStorage from "react-secure-storage";
import { UIStore } from "./../Store/UIStore";
import ReactPaginate from "react-paginate";
import Pagination from "./../Scripts/Pagination";
const Shop = (props) => {
  const query = new URLSearchParams(props.location.search);
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const queryurl = localStorage.getItem("queryurl");
  const [totalProduct, setTotalProduct] = useState(0);
  const daintyproducts = UIStore.useState((s) => s.daintyproducts);
  const [products, setProducts] = useState([]);
  // const [currentItem, setCurrentItem] = useState([]);
  const [allproducts, setAllProducts] = useState(daintyproducts);
  const [networkError, setNetworkError] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [message, setMessage] = useState("");
  const [bannerimagestate, setBannerimagestate] = useState(props.location.bannerimage ? props.location.bannerimage : localStorage.getItem("bannerurl"));
  const [categoryDes, setCategoryDes] = useState(localStorage.getItem("categorydes") || "");
  const [subcatstate, setSubcatstate] = useState(JSON.parse(localStorage.getItem("categories")));
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);
  const [masterCategory, setMasterCategory] = useState([]);
  const [mcatFilterApp, setMcatFilterApp] = useState(false);
  const [mcatFilterProd, setMcatFilterProd] = useState([]);
  const [lsDaintyCart, setlsDaintyCart] = useState(JSON.parse(localStorage.getItem("daintycart")));
  // const [postsToShow, setPostsToShow] = useState([]);
  const postsPerPage = 20;
  const [next, setNext] = useState(postsPerPage);
  const [end, setEnd] = useState(0);
  const history = useHistory();
  const cartcount = UIStore.useState((s) => s.cartcount);
  const queries = queryString.parse(queryurl);
  let category = queries.category || queries.brand;
  let maincategory = queries.maincategory;
  let searchFilter = props.location.searchFilter;
  let subcategory = queries.subcategory;
  let bannerimage = queries.bannerimage;
  console.log("bannerimagestate props", props.location.bannerimage);
  console.log("daintyproducts", daintyproducts);
  let arrayForHoldingPosts = [];
  let _arrayForHoldingPosts = [];
  let _filterOption = "";
  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentItem_ = products.slice(indexOfFirstItem, indexOfLastItem);
  const [currentItem, setCurrentItem] = useState(currentItem_);
  const getProductDetails = async () => {
    try {
      console.log("queryyy queries", props.location.searchFilter);
      console.log("queryyy", maincategory);
      //console.log("bannerimagestate", bannerimagestate);

      // let _filterOption = "";
      if ((query.get("subcategory") != "" || query.get("subcategory") != undefined) && subcategory != "" && subcategory !== undefined) {
        _filterOption = subcategory != "" && subcategory !== undefined ? subcategory : query.get("subcategory");
        localStorage.setItem("queryurl", "maincategory=" + query.get("maincategory") + "&category=" + query.get("category") + "&subcategory=" + _filterOption);
      } else if ((query.get("category") == "" || query.get("category") == undefined) && (query.get("maincategory") == "" || query.get("maincategory") == undefined)) {
        _filterOption = subcategory != "" && subcategory != undefined ? subcategory : category != "" && category !== undefined ? category : maincategory;
      } else {
        let _categories;
        if (query.get("brand") == "" || query.get("brand") == undefined) {
          _filterOption = query.get("category") != "" && query.get("category") !== undefined ? query.get("category") : query.get("maincategory");
          localStorage.setItem("categorydes", props.location.categorydes);
          localStorage.setItem("queryurl", "maincategory=" + query.get("maincategory") + "&category=" + query.get("category"));
          _categories = JSON.parse(localStorage.getItem("categories"));
          console.log("paaru", _categories);
          let _result =
            _categories &&
            _categories
              .filter((a) => a.category?.toUpperCase() == _filterOption?.toUpperCase() || a.maincategory == _filterOption)
              .map((b) => {
                return b;
              });
          if (_result?.length > 1) {
            _result = _result
              .filter((b) => b.maincategory?.toUpperCase() == query.get("maincategory")?.toUpperCase())
              .map((c) => {
                return c;
              });
          }

          localStorage.setItem("bannerurl", _result[0]?.banner_image);
          localStorage.setItem("categorydes", _result[0]?.categorydes);
        } else {
          _filterOption = JSON.parse(localStorage.getItem("brand"));
          localStorage.setItem("categorydes", props.location.categorydes);
          localStorage.setItem("queryurl", "brand=" + query.get("brand"));
          _categories = JSON.parse(localStorage.getItem("brand"));
          let _result = _categories
            .filter((a) => a?.brand?.toUpperCase() == _filterOption?.toUpperCase())
            .map((b) => {
              return b;
            });
          localStorage.setItem("bannerurl", _result[0]?.banner_image);
          localStorage.setItem("categorydes", _result[0]?.categorydes);
        }
      }
      const data = daintyproducts.length > 0 ? daintyproducts : allproducts;

      setTotalProduct(data.filter((a) => a.isactive === 1).length);
      if (category && (props.location.searchFilter === "" || props.location.searchFilter === undefined)) {
        if (category === "all" || props.location.searchFilter === "") {
          setProducts(data);
          console.log(products, "=> all active  products");
        } else {
          if (query.get("brand") != "" && query.get("brand") != undefined) {
            let selective = data
              .filter((filter) => filter.p_brand?.toUpperCase() === _filterOption?.toUpperCase() && filter.isactive === 1)
              .map((data) => {
                return data;
              });
            setProducts(selective);
            setFilter(selective);
            console.log("all active category products");
          } else if (query.get("subcategory") != "" && query.get("subcategory") != undefined) {
            let selective = data
              .filter((filter) => filter?.p_subcategory?.toUpperCase() === _filterOption?.toUpperCase() && filter.isactive === 1)
              .map((data) => {
                return data;
              });
            setProducts(selective);
            setFilter(selective);
            console.log("all sub category products");
          } else {
            // all active category products
            let selective = data
              .filter((filter) => filter.p_category.toUpperCase() === _filterOption.toUpperCase() && filter.isactive === 1)
              .map((data) => {
                return data;
              });
            setProducts(selective);
            setFilter(selective);
            Paginate();
            console.log("all active category products");
          }
        }
      } else if (maincategory && (props.location.searchFilter === "" || props.location.searchFilter === undefined)) {
        // Main category products
        console.log(props.location.searchFilter, maincategory, "maincategory");
        let selective = data
          .filter((filter) => filter.p_maincategory?.toUpperCase() === _filterOption.toUpperCase() && filter.isactive === 1)
          .map((data) => {
            return data;
          });
        setProducts(selective);
        setFilter(selective);
        console.log("Main category products");
      } else if (props.location.searchFilter) {
        // prodcut that is searched
        console.log(props.location.searchFilter, "search result");
        let selective = data.filter((fil) => {
          return Object.keys(fil).some((k) => fil[k]?.toString().toLowerCase().includes(props.location.searchFilter.toLowerCase().trim()));
        });
        setProducts(selective);
        setFilter(selective);
        Paginate();
      } else if (maincategory === "all" || maincategory === "") {
        console.log("mainprod with all products");
        let selective = data
          .filter((filter) => filter.isactive === 1)
          .map((data) => {
            return data;
          });

        setProducts(selective);
        setFilter(selective);
        Paginate();
      } else {
        console.log("all products");
        let active = data
          .filter((filter) => filter.isactive === 1)
          .map((data) => {
            return data;
          });

        setProducts(active);
        setFilter(active);

        // const slicedPosts = active.slice(0, postsPerPage);
        // arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
        // setProducts(arrayForHoldingPosts);
      }

      setLoading((loading) => !loading);
    } catch {
      loading && setLoading(false);
    }
  };
  const getAllProductDetails = async () => {
    setLoading((loading) => !loading);
    console.log("cakecategory", category);
    if (daintyproducts.length <= 0) {
      await fetch(config.service_url + "getproducts")
        .then((response) => response.json())
        .then((data) => {
          let active = data
            .filter((filter) => filter.isactive === 1)
            .map((data) => {
              return data;
            });
          setProducts(active);
          setAllProducts(active);
          setFilter(active);
          setCurrentPage(1);
          secureLocalStorage.setItem("daintyproducts", JSON.stringify(active));
        })
        .catch((err) => {
          setNetworkError("Something went wrong, Please try again later!!");
          console.log(networkError);
        });
    } else {
      setAllProducts(daintyproducts);
      console.log("prodcuts from local", daintyproducts);
    }
    setLoading((loading) => !loading);
  };
  // paging

  const Paginate = () => {
    // const indexOfLastItem = currentPage * postsPerPage;
    // const indexOfFirstItem = indexOfLastItem - postsPerPage;
    // const currentItem = products.slice(indexOfFirstItem, indexOfLastItem);
    console.log("currentItem_", currentItem_);
    setCurrentItem(currentItem_);
  };

  useEffect(() => {
    console.log("bala shop");
    //const queries = queryString.parse(queryurl);
    const queries = queryString.parse(props.location.search);
    if (daintyproducts && daintyproducts.length <= 0 && allproducts.length <= 0) getAllProductDetails();
    getProductDetails();
    Paginate();
    //getCategories();// un comment if you need you see the category in side bar
    setLoading((loading) => !loading);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location?.searchFilter, queryurl, localStorage.getItem("bannerurl")
    , query.get("category") != queryString.parse(queryurl)?.category
    , currentPage, currentItem_.length, products.length, allproducts.length, currentItem_ && currentItem_[0]?.p_category != query.get("category")]);

  const handleVisible = () => {
    setSmShow(true);
    setTimeout(() => {
      setSmShow(false);
    }, 3000);
  };
  const addItemsToCart = (pid, price, product) => {
    // setLoading((loading) => !loading);
    if (localStorage.getItem("uuid") === undefined || localStorage.getItem("uuid") === null) {
      // add to cart for Guest user - start
      let cartarray = [];
      let data = {
        userid: "guestuser",
        createddate: new Date(),
        isactive: 1,
        p_id: product.p_id,
        p_image: product.p_image,
        p_name: product.p_name,
        p_net_product_price: product.p_net_product_price,
        p_returnaccepted: product.p_returnaccepted,
        p_productweight: product.p_productweight,
        p_tax: product.p_tax,
        p_quantity: 1,
        updateddate: new Date(),
        p_price: product.p_price,
        id: uuid(),
      };
      console.log("befre", cartarray);
      cartarray.push(data);
      console.log("after", cartarray);
      // let lsDaintyCart_ = localStorage.getItem("daintycart");
      let lsDaintyCart_ = secureLocalStorage.getItem("daintycart");
      if (lsDaintyCart_ === undefined || lsDaintyCart_ === null || lsDaintyCart_?.length == 0) {
        console.log("lsDaintyCart", lsDaintyCart_);
        // localStorage.setItem("daintycart", JSON.stringify(cartarray));
        secureLocalStorage.setItem("daintycart", JSON.stringify(cartarray));
        setMessage("Item added to cart.");
        UIStore.update((s) => {
          s.cartcount = cartcount + 1;
        });
        handleVisible();
      } else {
        updateCartQuantityfromls(data, JSON.parse(lsDaintyCart_));
      }
      // history.push("/shop-login");
      // add to cart for Guest user - end
    } else {
      // add to cart for logged in user - start
      let data = {
        userid: localStorage.getItem("uuid"),
        createddate: new Date(),
        isactive: 1,
        p_id: product.p_id,
        p_quantity: 1,
        updateddate: new Date(),
        p_price: product.p_price,
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
    //setLoading((loading) => !loading);
  };
  const updateCartQuantityfromls = (newproduct, lsDaintyCart_) => {
    console.log("lsDaintyCartforquantity update", lsDaintyCart_);

    if (lsDaintyCart_.filter((a) => a.p_id == newproduct.p_id).length > 0) {
      console.log("first if");
      let array = lsDaintyCart_.filter((a) => a.p_id == newproduct.p_id);
      // let count = array[0].length + 1;
      let index = lsDaintyCart_.findIndex((fi) => fi.p_id == newproduct.p_id);
      lsDaintyCart_[index].p_quantity = parseInt(lsDaintyCart_[index].p_quantity) + 1;
      lsDaintyCart_[index].p_net_product_price = parseInt(lsDaintyCart_[index].p_price) * parseInt(lsDaintyCart_[index].quantity);
      setMessage("Item Updated to cart.");
      handleVisible();
    } else {
      console.log("second else");
      lsDaintyCart_.push(newproduct);
      UIStore.update((s) => {
        s.cartcount = cartcount + 1;
      });
      setMessage("Item Added to cart.");
      handleVisible();
    }
    //localStorage.removeItem("daintycart");
    secureLocalStorage.removeItem("daintycart");
    //localStorage.setItem("daintycart", JSON.stringify(lsDaintyCart_));
    secureLocalStorage.setItem("daintycart", JSON.stringify(lsDaintyCart_));
  };
  const applyFilter = (searchValue) => {
    console.log("searchvalue", searchValue);
    if (searchValue !== "") {
      const alldata = daintyproducts;
      const filteredData = alldata.filter((data) => {
        console.log("searchdata", data);
        return Object.keys(data).some((k) => data[k]?.toString().toLowerCase().includes(searchValue.toLowerCase().trim()));
      });

      setProducts(filteredData);
    } else {
      setProducts(allproducts);
    }
    //Paginate();
  };

  const sortAsc = (arr, field) => {
    const ascdata = arr.sort((a, b) => {
      console.log(arr, field);
      if (a[field] > b[field]) {
        console.log(a[field]);
        return -1;
      }
      if (b[field] > a[field]) {
        return 1;
      }
      return 0;
    });
    setProducts(ascdata);
    Paginate();
  };
  const sortSale = (arr, field) => {
    const ascdata = arr.sort((a, b) => {
      console.log(arr, field);
      if (a.p_price < a.p_net_product_price && a.p_price !== 0 && a.p_price !== "") {
        console.log(a[field]);
        return -1;
      }
      if (b[field] > a[field]) {
        return 1;
      }
      return 0;
    });
    setProducts(ascdata);
    Paginate();
  };
  const sortDsc = (arr, field) => {
    const ascdata = arr.sort((a, b) => {
      console.log(arr, field);
      if (a[field] > b[field]) {
        console.log(a[field]);
        return 1;
      }
      if (b[field] > a[field]) {
        return -1;
      }
      return 0;
    });
    setProducts(ascdata);
    Paginate();
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
    maincategory = undefined;
    category = undefined;
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
    } else {
      setMcatFilterProd(filter);
      setProducts(filter);
    }
  };

  return (
    <div>
      <Modal size="sm" show={smShow} onHide={() => setSmShow(false)}>
        <Modal.Header closeButton>
          {message} {message.includes("cart") ? <a href="/shop-cart"> View cart</a> : ""}
        </Modal.Header>
      </Modal>
      <Header2 active={"shop"} />

      <div className="page-content bg-white">
        {/* <div className="dlab-bnr-inr overlay-black-light divbg" style={bannerimageurl !== undefined || bannerimageurl !== "null" ? { backgroundImage: "url(" + banner + ")" } : { backgroundImage: "url(" + config.bannerimg1 + ")" }}> */}
        <div className="dlab-bnr-inr overlay-black-light divbg" style={{ backgroundImage: "url(" + localStorage.getItem("bannerurl") + ")" }}>
          <div className="container">
            <div className="dlab-bnr-inr-entry">
              <h1 className="text-white">{category != undefined ? (category == "all" ? "ALL PRODUCTS" : category.toUpperCase()) : "Shop"}</h1>

              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to={"./"}>HOME</Link>
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
                  <div className=" px-3 mb-3 d-none">
                    <aside className="side-bar shop-categories sticky-top">
                      {category !== undefined && maincategory !== undefined ? (
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
                <div className="p-2 text-center">{categoryDes === "undefined" ? "" : (categoryDes !== "undefined" || categoryDes !== undefined) && category !== "all" ? categoryDes : ""}</div>
                <div className="mb-4">
                  <div className="row border br30 p-2 m-0 bg-secondary-light">
                    <div className="col align-self-center bg-secondary-light">
                      <div className="">
                        <div class="dropdown">
                          <button class="btn btn-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Filter Products
                          </button>
                          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#">
                              <Link to={"#"} onClick={(e) => sortSale(products, "p_sale")} className="px-3  btn btn-secondary btn-sm btnhover ">
                                Sale Items
                              </Link>{" "}
                            </a>
                            <a class="dropdown-item" href="#">
                              <Link to={"#"} onClick={(e) => sortDsc(products, "p_price")} className="px-3  btn btn-secondary btn-sm btnhover ">
                                Price: Low to High
                              </Link>{" "}
                            </a>
                            <a class="dropdown-item" href="#">
                              <Link to={"#"} onClick={(e) => sortAsc(products, "p_price")} className="px-3 btn btn-secondary btn-sm btnhover ">
                                Price: High to Low
                              </Link>{" "}
                            </a>
                            <a class="dropdown-item" href="#">
                              <Link to={"#"} onClick={(e) => sortAsc(products, "p_name")} className="px-3 btn btn-secondary btn-sm btnhover ">
                                Name : A - Z
                              </Link>{" "}
                            </a>
                            <a class="dropdown-item" href="#">
                              <Link to={"#"} onClick={(e) => sortDsc(products, "p_name")} className="px-3 btn btn-secondary btn-sm btnhover ">
                                Name : Z - A
                              </Link>{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col align-self-center d-none">
                      <input type="text" className="form-control" placeholder="Filter Products" name="searchbox" id="searchbox" onChange={(e) => applyFilter(e.target.value)}></input>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 shopproducts">
                  <div>
                    {!loading && (
                      <div className="p-2">
                        {products.length}/{totalProduct} Products found.{" "}
                      </div>
                    )}
                    <div className="row m-1 ">
                      {!loading ? (
                        !loading && currentItem && currentItem.length > 0 ? (
                          currentItem.map((product) => (
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
                                    <h6 className="px-1 py-0">
                                      <Link to={{ pathname: `/shop-product-details/${product.p_id}` }}>{product.p_name}</Link>
                                      <br />
                                      <span className="text-primary small">{product.p_maincategory + " | " + product.p_category}</span>
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
                                  {product.p_quantity > 0 || product.p_quantity != 0 ? (
                                    <button disabled={product.p_quantity > 0 ? false : true} onClick={(e) => addItemsToCart(product.p_id, product.p_price, product)} className="btn btn-secondary btn-sm btnhover mb-3 px-1">
                                      <div className="d-flex align-items-center">
                                        <div className="pl-1">Add to cart</div>
                                        <div className="align-self-center">
                                          <i className="fa fa-shopping-cart fa-lg mx-1 cartbuttonbg"></i>
                                        </div>
                                      </div>
                                    </button>
                                  ) : (
                                    <button disabled={true} className="btn btn-secondary btn-sm btnhover mb-3">
                                      Out of Stock
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-2">
                            <div>
                              {" "}
                              <a className="btn btn-sm btnhover" href="/shop?maincategory=all&category=all">
                                View All
                              </a>
                            </div>
                          </div>
                        )
                      ) : (
                        <div class="position-relative">
                          <div className="p-2 start-50">
                            <div className="p-2">Fetching products, please wait for few seconds.</div>
                            <img className="p-2 w-5" src={loadingimg} height="10"></img>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* 
                    {!loading && <Pagination contentPerPage={postsPerPage} totalContent={products.length} paginate={paginate} currentPage={currentPage} productperpage={postsPerPage} />} */}

                    {!loading && <Pagination dataPerPage={postsPerPage} totalDataCount={products.length} paginate={paginate} currentPage={currentPage} />}
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
