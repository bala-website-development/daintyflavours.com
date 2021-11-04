import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./../Layout/Header";
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
      history.push("/shop-login");
    } else {
      let data = {
        userid: localStorage.getItem("uuid"),
        createddate: new Date(),
        isactive: "1",
        p_id: productDtl.p_id,
        p_quantity: 1,
        updateddate: new Date(),
        p_price: productDtl.p_price,
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
          console.log("category", data.p_category);
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
        <Modal.Header closeButton>{successMsg}</Modal.Header>
      </Modal>
      <Header />
      <div className="page-content bg-white">
        <div className="dlab-bnr-inr overlay-black-middle" style={{ backgroundImage: "url(" + img1 + ")" }}>
          <div className="container">
            <div className="dlab-bnr-inr-entry">
              <h1 className="text-white">Product Details</h1>

              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to={"./"}>
                      <i className="fa fa-home"></i>
                    </Link>
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
                    <div className="dlab-box">
                      <div className="dlab-thum-bx">
                        <img src={productDtl.p_image} alt="sukhaa" />
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
                                    <img src={url.url} className="galarythumbnailimage" alt="sukhaa" />
                                  </div>
                                </li>
                              </>
                            ))}
                        </ul>
                      </SRLWrapper>
                    </SimpleReactLightbox>
                  </div>
                </div>
                <div className="col-lg-6 m-b30">
                  <Form className="cart sticky-top" onSubmit={addItemsToCart}>
                    <div className="dlab-post-title">
                      <h4 className="post-title">{productDtl.p_name}</h4>
                      <p className="m-b10 d-none">{productDtl.p_description}</p>
                      <div className="dlab-divider bg-gray tb15">
                        <i className="icon-dot c-square"></i>
                      </div>
                    </div>
                    <div className="relative">
                      <h3 className="m-tb10">
                        <i class="fa fa-inr"></i> {productDtl.p_price}
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
                      <span>Category / Subcategory :- </span>
                      <Link to={{ pathname: "/shop", category: productDtl.p_category }}>{productDtl.p_category}</Link>{" "}
                    </div>
                    <div className="dlab-divider bg-gray tb15">
                      <i className="icon-dot c-square"></i>
                    </div>

                    <button disabled={loading} className="btn btnhover" type="submit">
                      <i className="ti-shopping-cart"></i>Add To Cart
                    </button>
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
                          <div class="item-img">
                            <img src={rel.p_image} alt="" />
                            <div class="price bg-white">
                              <i class="fa fa-inr"></i> {rel.p_price}
                            </div>
                          </div>
                          <div class="item-info text-center">
                            <h4 class="item-title">
                              <Link to={`/shop-product-details/${rel.p_id}`}>{rel.p_name}</Link>
                            </h4>
                            <Link to={`/shop-product-details/${rel.p_id}`} class="btn btnhover">
                              View
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
