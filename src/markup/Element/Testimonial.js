import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import bgimg2 from "./../../images/blog/grid/pic1.jpg";
import work_pic1 from "./../../images/our-work/pic1.jpg";
import work_pic2 from "./../../images/our-work/pic1.jpg";
import work_pic3 from "./../../images/our-work/pic1.jpg";
import config from "../../config.json";
import Carousel from "react-multi-carousel";
const Testimonial = (props) => {
  const [products, setProducts] = useState([]);
  const [networkError, setNetworkError] = useState("");
  const getTestimonial = async () => {
    console.log("recentpost", products);
    await fetch(config.service_url + "gettestimonial")
      .then((response) => response.json())
      .then((data1) => {
        if (data1.status === 200) {
          let active1 = data1.data
            .filter((filter1, index) => filter1.isactive === "1" || filter1.isactive === 1)
            .map((d) => {
              return d;
            });
          setProducts(active1);
          console.log("gettestimonial", active1);
        }
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        console.log("gettestimonial", err);
      });
  };

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
  useEffect(() => {
    getTestimonial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <div>
        <div class="section-full related-products bg-gray-light">
          <div class="container">
            <h2 class="title">Testimonial</h2>
            <div class="products-carousel">
              <Carousel autoPlay={true} responsive={responsive} arrows={true}>
                {products.length > 0 &&
                  products.map((course) => (
                    <div className="p-a15">
                      <div class="item-img">
                        <img src={course.t_image} alt="rover" />
                      </div>
                      <div class="card-body dangerous bg-white">
                        <h5>{course.t_title}</h5>
                        <p className="font-italic">{course.t_description}</p>
                        <p className="mb-2">
                          <div dangerouslySetInnerHTML={{ __html: course.t_content }} />
                        </p>
                      </div>
                    </div>
                  ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
