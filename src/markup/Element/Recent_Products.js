import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import bgimg2 from "./../../images/blog/grid/pic1.jpg";
import work_pic1 from "./../../images/our-work/pic1.jpg";
import work_pic2 from "./../../images/our-work/pic1.jpg";
import work_pic3 from "./../../images/our-work/pic1.jpg";
import config from "../../config.json";
const Recent_Products = (props) => {
  const [posts, setPosts] = useState([]);
  const [galleryimage, setGalleryImage] = useState([]);
  const [networkError, setNetworkError] = useState("");
  const getPostDetails = async () => {
    console.log("recentpost", posts);
    await fetch(config.service_url + "getrecentposts")
      .then((response) => response.json())
      .then((data) => {
        let active = data
          .filter((filter) => filter.isactive === 1 && filter.published === 1 && filter.posttypevalue === "Blog")
          .map((data) => {
            return data;
          });
        setPosts(active);
        console.log("recentpost", posts);
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
    getPostDetails();
    getGalleryDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row ">
      <div className="col-lg-3 col-md-6 col-sm-6 ">
        <div className="port-box1 text-white my-2">
          <div className="dlab-media">
            <img src={work_pic1} alt="" />
          </div>
          <div className="dlab-info">
            <h4 className="title ">
              <Link className="text-light" to={{ pathname: `/shop-product-details/${"product.p_id"}` }}>
                <div>
                  <i class="fa fa-inr"> {"   "} </i>
                  {"   "} {20}
                </div>
                <div>Name</div>
              </Link>
            </h4>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="port-box1 text-white">
          <div className="dlab-media">
            <img src={work_pic1} alt="" />
          </div>

          <div className="dlab-info">
            <h4 className="title ">
              <Link className="text-light" to={{ pathname: `/shop-product-details/${"product.p_id"}` }}>
                <i class="fa fa-inr"> {"   "} </i>
                {"   "} {20}
                <div>Name</div>
              </Link>
            </h4>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="port-box1 text-white">
          <div className="dlab-media">
            <img src={work_pic2} alt="" />
          </div>
          <div className="dlab-info">
            <h2 className="title">lemon cake</h2>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="port-box1 text-white">
          <div className="dlab-media">
            <img src={work_pic3} alt="" />
          </div>
          <div className="dlab-info">
            <h2 className="title">wedding cake</h2>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="port-box1 text-white m-md-b0 m-sm-b0">
          <div className="dlab-media">
            <img src={work_pic2} alt="" />
          </div>
          <div className="dlab-info">
            <h2 className="title">fruit cake</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recent_Products;
