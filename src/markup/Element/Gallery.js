import React, { Component, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import bgimg2 from "./../../images/blog/grid/pic1.jpg";
import config from "../../config.json";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
const GalleryView = (props) => {
  const [galleryimage, setGalleryImage] = useState([]);
  const [networkError, setNetworkError] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  const getGalleryDetails = async () => {
    let _newJson = [];

    await fetch(config.service_url + "getgallery")
      .then((response) => response.json())
      .then((data1) => {
        let length = data1.length;
        let active1 = data1
          .filter((filter1) => filter1.viewingallery === 1)
          .map((data1, index) => {
            if (index <= props?.count || length) {
              let _newObj = {};
              _newObj.src = data1.imageurl;
              _newObj.width = 1;
              _newObj.height = 1;
              _newJson.push(_newObj);
            }
            return _newJson;
          });
        setGalleryImage(_newJson);
        console.log("galleryimages", _newJson);
      })
      .catch((err) => {
        setNetworkError("Something went wrong, Please try again later!!");
        // console.log(networkError);
      });
  };
  useEffect(() => {
    getGalleryDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="col-lg-12 sticky-top">
      <aside className="container py-3">
        <div className={props?.fromhome ? "d-none" : "widget widget_gallery gallery-grid-4"}>
          <h5 className="widget-title style-1">Our Gallery</h5>
          <div className="z-indexmore d-none">
            <SimpleReactLightbox className="z-indexmore d-none">
              <SRLWrapper>
                <ul id="lightgallery" className="lightgallery">
                  {galleryimage.map((item, index) => (
                    <li>
                      <div className="dlab-post-thum dlab-img-effect">
                        <a href={item.imageurl} className="check-km">
                          <img src={item.imageurl} className="galarythumbnailimage" alt={item.title} />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </SRLWrapper>
            </SimpleReactLightbox>
          </div>
          <Gallery photos={galleryimage} onClick={openLightbox} />;
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  currentIndex={currentImage}
                  views={galleryimage.map((x) => ({
                    ...x,
                    srcset: x.srcSet,
                    caption: x.title,
                  }))}
                />
              </Modal>
            ) : null}
          </ModalGateway>
        </div>
      </aside>
    </div>
  );
};

export default GalleryView;
