import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./../Layout/NavBarMenu";
import Footer from "./../Layout/Footer";
import config from "../../config.json";
import ReactStars from "react-stars";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import uuid from "react-uuid";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as moment from "moment";
import img1 from "./../../images/banner/bnr1.jpg";
import { Modal } from "react-bootstrap";
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import secureLocalStorage from "react-secure-storage";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const Shopproduct = (props) => {
  const { id } = props.match.params;
  const [productDtl, setProductDtl] = useState({});
  const [productReviews, setProductReviews] = useState([]);
  const [validationMsg, setValidationMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [relatedProd, setRelatedProd] = useState([]);
  const [networkError, setNetworkError] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleVisible = () => {
    setSmShow(true);
    setTimeout(() => {
      setSmShow(false);
    }, 1000);
  };
  const addItemsToCart = (e) => {
    setLoading((loading) => !loading);
    e.preventDefault();
    if (localStorage.getItem("uuid") === undefined || localStorage.getItem("uuid") === null) {
      // add to cart for Guest user - start
      let cartarray = [];
      let data = {
        userid: "guestuser",
        createddate: new Date(),
        isactive: 1,
        p_id: productDtl.p_id,
        p_image: productDtl.p_image,
        p_name: productDtl.p_name,
        p_net_product_price: productDtl.p_net_product_price,
        p_price: productDtl.p_price < productDtl.p_net_product_price && productDtl.p_price !== 0 && productDtl.p_price !== "0" && productDtl.p_price !== "" ? productDtl.p_price : productDtl.p_net_product_price,
        p_returnaccepted: productDtl.p_returnaccepted,
        p_productweight: productDtl.p_productweight,
        p_tax: productDtl.p_tax,
        p_quantity: 1,
        updateddate: new Date(),
        id: uuid(),
      };
      console.log("befre", cartarray);
      cartarray.push(data);
      console.log("after", cartarray);
      //let lsDaintyCart_ = localStorage.getItem("daintycart");
      let lsDaintyCart_ = secureLocalStorage.getItem("daintycart");
      if (lsDaintyCart_ === undefined || lsDaintyCart_ === null) {
        console.log("lsDaintyCart", lsDaintyCart_);
        //localStorage.setItem("daintycart", JSON.stringify(cartarray));
        secureLocalStorage.setItem("daintycart", JSON.stringify(cartarray));
        setSuccessMsg("Item added to cart.");
        handleVisible();
      } else {
        updateCartQuantityfromls(data, JSON.parse(lsDaintyCart_));
        setSuccessMsg("Item Updated to cart.");
        handleVisible();
      }
      // add to cart for Guest user - end
    } else {
      let data = {
        userid: localStorage.getItem("uuid"),
        createddate: new Date(),
        isactive: "1",
        p_id: productDtl.p_id,
        p_quantity: 1,
        updateddate: new Date(),
        p_price: productDtl.p_price < productDtl.p_net_product_price && productDtl.p_price !== 0 && productDtl.p_price !== "0" && productDtl.p_price !== "" ? productDtl.p_price : productDtl.p_net_product_price,
        id: uuid(),
      };

      fetch(config.service_url + "addCart", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data }) })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            console.log("cart items", data);
            setSuccessMsg(data.message);
            handleVisible();
          }
        })
        .catch((err) => {
          setNetworkError("Something went wrong, Please try again later!!");
          console.log(networkError);
        });
    }
    setLoading((loading) => !loading);
  };
  const updateCartQuantityfromls = (newproduct, lsDaintyCart_) => {
    console.log("first if before");
    if (lsDaintyCart_.filter((a) => a.p_id == newproduct.p_id).length > 0) {
      console.log("first if2");
      let array = lsDaintyCart_.filter((a) => a.p_id == newproduct.p_id);
      let index = lsDaintyCart_.findIndex((fi) => fi.p_id == newproduct.p_id);
      lsDaintyCart_[index].p_quantity = parseInt(lsDaintyCart_[index].p_quantity) + 1;
      lsDaintyCart_[index].p_net_product_price = parseInt(lsDaintyCart_[index].p_price) * parseInt(lsDaintyCart_[index].quantity);
    } else {
      console.log("second else");
      lsDaintyCart_.push(newproduct);
    }
    //localStorage.removeItem("daintycart");
    secureLocalStorage.removeItem("daintycart");
    //localStorage.setItem("daintycart", JSON.stringify(lsDaintyCart_));
    secureLocalStorage.setItem("daintycart", JSON.stringify(lsDaintyCart_));
  };
  const getProductReviews = async () => {
    await fetch(config.service_url + `getProductReviews/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProductReviews(data);
        console.log(data, "reviews");
        if (data.length > 0) {
          const _allRatings = data.map((rating) => {
            return rating.rating;
          });
          setAvgRating((_allRatings.reduce((a, b) => a + b, 0) / data.length).toFixed(1));
        }
      });
  };
  useEffect(() => {
    const getRelatedProducts = async (category) => {
      console.log("dailtycategory", category);
      await fetch(config.service_url + `getRelatedProducts/${category}`)
        .then((response) => response.json())
        .then((data) => {
          setRelatedProd(data);
        });
    };
    const getProductDetailsByProductID = async () => {
      await fetch(config.service_url + `getproductbyId/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setProductDtl(data);
          console.log("category", data);
          if (data.p_category !== null && data.p_category !== undefined) {
            getRelatedProducts(data.p_category);
          }
        })
        .catch((err) => {
          setNetworkError("Something went wrong, Please try again later!!");
          console.log(networkError);
        });
    };

    getProductDetailsByProductID();
    getProductReviews();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const onSubmit = (data, e) => {
    e.preventDefault();
    if (rating === 0) return setValidationMsg("Please Select Rating.");
    else {
      let datas = {
        name: data.name,
        userid: localStorage.getItem("uuid"),
        rating: rating,
        createddate: new Date(),
        comments: data.comment,
        displaydate: moment().format("LLL"),
        isactive: 1,
      };
      console.log("add review", datas);
      fetch(config.service_url + "addReviews", { method: "POST", headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") }, body: JSON.stringify({ data: datas, product_id: productDtl.p_id }) })
        .then((response) => response.json())
        .then((data) => {
          console.log("regitered user", data);

          if (data.status === 200) {
            // alert(data.message);
            setValidationMsg("");
            setRating(0);
            setSuccessMsg(data.message);
            e.target.reset();
            getProductReviews();
          } else if (data?.status === 499) {
            history.push("/shop-login");
          }
        });
    }
  };

  return (
    <div>
      <Modal size="sm" show={smShow} onHide={() => setSmShow(false)}>
        <Modal.Header closeButton>
          {successMsg} {successMsg.includes("cart") ? <a href="/shop-cart"> View cart</a> : ""}
        </Modal.Header>
      </Modal>
      <Header />
      <div className="page-content bg-white">
        <div className="dlab-bnr-inr overlay-black-light bg-pt" style={{ backgroundImage: "url(" + config.bannerimg1 + ")" }}>
          <div className="container">
            <div className="dlab-bnr-inr-entry">
              <h1 className="text-white">Product Details</h1>

              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to={"/"}>HOME</Link>
                  </li>
                  <li>Product Details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="content-block">
          <div className="section-full content-inner-1 bg-gray-light">
            <div className="container woo-entry">
              <div className="row">
                <div className="col-lg-6 m-b30">
                  <div className="product-gallery on-show-slider lightgallery" id="lightgallery">
                    <div className="dlab-box prodcutdetailimage" style={productDtl.p_image ? { backgroundImage: "url(" + productDtl.p_image + ")" } : { backgroundImage: "url(" + config.defaultimage + ")" }}>
                      <div className="d-flex watermarkdiv justify-content-center w-100">
                        <div className="align-items-center d-none">
                          <img className="watermark" src={config.watermark} alt={config.websitetitle} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"widget widget_gallery gallery-grid-4"}>
                    <SimpleReactLightbox>
                      <SRLWrapper>
                        <ul id="lightgallery" className="lightgallery">
                          {productDtl.moreimageurl &&
                            productDtl.moreimageurl.length > 0 &&
                            productDtl.moreimageurl.map((url, index) => (
                              <>
                                <li>
                                  <div className="dlab-post-thum dlab-img-effect">
                                    <img src={url} className="galarythumbnailimage" alt={config.websitetitle} />
                                  </div>
                                </li>
                              </>
                            ))}
                        </ul>
                      </SRLWrapper>
                    </SimpleReactLightbox>
                  </div>
                </div>
                <div className="col-lg-6 m-b30 zindex800">
                  <Form className="cart sticky-top" onSubmit={addItemsToCart}>
                    <div className="dlab-post-title">
                      <h4 className="post-title medium">{productDtl.p_name}</h4>
                      <p className="m-b10 d-none">{productDtl.p_description}</p>
                      <div className="dlab-divider bg-gray tb15">
                        <i className="icon-dot c-square"></i>
                      </div>
                    </div>
                    <div className="relative">
                      <h3 className="m-tb10">
                        {productDtl.p_price < productDtl.p_net_product_price && productDtl.p_price !== 0 && productDtl.p_price !== "0" && productDtl.p_price !== "" ? (
                          <>
                            <div className="text-primary pricefont">
                              <span style={{ "text-decoration": "line-through" }}>
                                {" "}
                                <i class="fa fa-inr"></i> {productDtl.p_net_product_price || 0}{" "}
                              </span>
                              {"   |  "}
                              <span>
                                {"   "} <i class="fa fa-inr"></i> {productDtl.p_price}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="text-primary pricefont">
                            <i class="fa fa-inr"> {"   "} </i>
                            {"   "} {productDtl.p_net_product_price}
                          </div>
                        )}
                      </h3>
                      <div className="shop-item-rating">
                        <span className="rating-bx">
                          <ReactStars
                            count={5}
                            value={avgRating}
                            //onChange={ratingChanged}
                            size={14}
                            activeColor="#ffd700"
                            edit={false}
                          ></ReactStars>
                        </span>
                        <span>{avgRating}</span>
                      </div>
                    </div>
                    <div className="shop-item-tage">
                      <span>Main Category / Category :- </span>
                      <Link to={{ pathname: "/shop", search: "?maincategory=" + productDtl.p_maincategory, category: productDtl.p_maincategory }}>{productDtl.p_maincategory}</Link> <Link to={{ pathname: "/shop", search: "?category=" + productDtl.p_category, category: productDtl.p_category }}>{productDtl.p_category}</Link> <Link to={{ pathname: "/shop", subcategory: productDtl.p_submaincategory }}>{productDtl.p_submaincategory}</Link>{" "}
                    </div>
                    <div className="dlab-divider bg-gray tb15">
                      <i className="icon-dot c-square"></i>
                    </div>
                    <div className="py-2">
                      <div>{productDtl?.p_brand == "" || productDtl?.p_brand == undefined ? "" : " Brand Name - " + productDtl?.p_brand.toUpperCase()}</div>
                    </div>
                    <div className="py-2 d-none">
                      <div> Expiry Date - {productDtl.p_expirydate === "" || productDtl.p_expirydate === undefined || productDtl.p_expirydate === "0001-01-01" ? "N/A" : productDtl.p_expirydate}</div>
                    </div>
                    <div className="py-2">
                      <div> Net Weight - {productDtl.p_productweight === "" || productDtl.p_productweight === undefined ? "N/A" : productDtl.p_productweight + " gms"}</div>
                    </div>
                    <div className="py-2 d-none">
                      <div> Available Quantity - {productDtl.p_quantity}</div>
                    </div>
                    <div className="py-2 d-none">
                      <div> Return Accepted - {productDtl.p_returnaccepted || "" || undefined ? "Yes" : "No"}</div>
                    </div>

                    {productDtl.p_quantity > 0 ? (
                      <button disabled={loading} className="btn btnhover p-1" type="submit">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="pl-1">Add to cart</div>
                          <div className="align-self-center">
                            <i className="fa fa-shopping-cart mx-1 cartbuttonbg"></i>
                          </div>
                        </div>
                      </button>
                    ) : (
                      <button disabled={true} className="btn btnhover">
                        Out of Stock
                      </button>
                    )}
                  </Form>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div>
                    <div className="dlab-tabs product-description tabs-site-button m-t30">
                      <ul className="nav nav-tabs">
                        <li>
                          <Link className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-des">
                            Description
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-review">
                            Review({productReviews.length})
                          </Link>
                        </li>
                      </ul>

                      <div className="tab-content">
                        <div className="tab-pane active" id="pills-des">
                          <p>
                            <div dangerouslySetInnerHTML={{ __html: productDtl.p_description }} />
                          </p>
                          <p className="m-b0"></p>
                        </div>
                        <div className="tab-pane" id="pills-review">
                          {productReviews &&
                            productReviews.map((review) => (
                              <div id="comments">
                                <ol className="commentlist">
                                  <li className="comment">
                                    <div className="comment_container">
                                      {/* <img className="avatar avatar-60 photo" src={require("./../../images/testimonials/pic1.jpg")} alt="" /> */}
                                      <div className="comment-text">
                                        <div className="star-rating">
                                          <ReactStars
                                            count={5}
                                            value={review.rating}
                                            //onChange={ratingChanged}
                                            title={review.rating}
                                            size={14}
                                            activeColor="#ffd700"
                                          ></ReactStars>
                                        </div>
                                        <p className="meta">
                                          <strong className="author">{review.name}</strong>
                                          <span> {review.displaydate}</span>
                                        </p>
                                        <div className="description">
                                          <p>{review.comments}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ol>
                              </div>
                            ))}

                          <div id="review_form_wrapper">
                            <div id="review_form">
                              <div id="respond" className="comment-respond">
                                <h3 className="comment-reply-title" id="reply-title">
                                  Add a review
                                </h3>
                                <p>Your email address will not be published. Required fields are marked *</p>
                                <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
                                  <div className="comment-form-rating">
                                    <label className="pull-left m-r20">Your Rating</label>
                                    <div className="rating-widget">
                                      <div className="rating-stars">
                                        <ReactStars
                                          count={5}
                                          value={rating}
                                          onChange={(e) => {
                                            console.log("for rating", e);
                                            setRating(e);
                                          }}
                                          name="rating"
                                          size={20}
                                          activeColor="#ffd700"
                                          required
                                        ></ReactStars>
                                        <div>{validationMsg}</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="comment-form-author">
                                    <label>
                                      Name <span className="required">*</span>
                                    </label>
                                    <input type="text" required aria-required="true" size="30" value={localStorage.getItem("name")} name="name" {...register("name", { required: true })} id="author" />
                                  </div>
                                  <div className="comment-form-comment">
                                    <label>Your Review</label>
                                    <textarea required aria-required="true" rows="8" cols="45" name="comment" {...register("comment", { required: true })} id="comment"></textarea>
                                    {/* {errors.comment && "Please enter your comments"} */}
                                  </div>

                                  <div className="form-submit">
                                    <div>{successMsg}</div>
                                    <button type="submit" className="btn btnhover">
                                      Submit
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <Owl category={productDtl.p_category} /> */}
          <div class="section-full related-products content-inner bg-gray-light">
            <div class="container">
              <h2 class="title">Related products</h2>
              <div class="products-carousel">
                <Carousel autoPlay={true} responsive={responsive} arrows={false}>
                  {relatedProd.length > 0 &&
                    relatedProd.map((rel) => (
                      <div className="p-a15">
                        <div class="item-box shop-item">
                          <div class="item-img1">
                            <Link to={{ pathname: `/shop-product-details/${rel.p_id}` }}>
                              <div className="homeimagerecentdivimg" style={rel.p_image ? { backgroundImage: "url(" + rel.p_image + ")" } : { backgroundImage: "url(" + config.defaultimage + ")" }}></div>
                            </Link>
                            <div class="sale bg-white text-primary d-none">
                              <i class="fa fa-inr"></i> {rel.p_price}
                            </div>
                          </div>
                          <div class="item-info text-center">
                            <p class="item-title">
                              <Link to={`/shop-product-details/${rel.p_id}`}>{rel.p_name}</Link>
                            </p>
                            <Link to={`/shop-product-details/${rel.p_id}`} class="btn btn-sm px-3 py-2 btnhover">
                              <div className="py-1">View</div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shopproduct;
