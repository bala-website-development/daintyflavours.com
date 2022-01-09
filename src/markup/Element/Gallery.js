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
    getGalleryDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const photos = [
    {
      src: galleryimage.imageurl,
      width: 1,
      height: 1,
    },

    {
      src: "https://firebasestorage.googleapis.com/v0/b/daintyflavours-api.appspot.com/o/DAINTYFLAVOURS%2Fbanner%2Fbanner1.jpg?alt=media&token=5d911c9a-ede0-43cb-a1a3-f7360c81abfb",
      width: 1,
      height: 1,
    },

    {
      src: "https://firebasestorage.googleapis.com/v0/b/daintyflavours-api.appspot.com/o/DAINTYFLAVOURS%2Fbanner%2Fbanner1.jpg?alt=media&token=5d911c9a-ede0-43cb-a1a3-f7360c81abfb",
      width: 1,
      height: 1,
    },

    {
      src: "https://firebasestorage.googleapis.com/v0/b/daintyflavours-api.appspot.com/o/DAINTYFLAVOURS%2Fsiteimages%2Faboutpic.jpg?alt=media&token=902c1db9-ae2d-4280-8c61-aac3205a4ff8",
      width: 1,
      height: 1,
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/daintyflavours-api.appspot.com/o/DAINTYFLAVOURS%2Fsiteimages%2Faboutpic.jpg?alt=media&token=902c1db9-ae2d-4280-8c61-aac3205a4ff8",
      width: 1,
      height: 1,
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/daintyflavours-api.appspot.com/o/DAINTYFLAVOURS%2Fsiteimages%2Faboutpic.jpg?alt=media&token=902c1db9-ae2d-4280-8c61-aac3205a4ff8",
      width: 1,
      height: 1,
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/daintyflavours-api.appspot.com/o/DAINTYFLAVOURS%2Fsiteimages%2Faboutpic.jpg?alt=media&token=902c1db9-ae2d-4280-8c61-aac3205a4ff8",
      width: 1,
      height: 1,
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/daintyflavours-api.appspot.com/o/DAINTYFLAVOURS%2Fbanner%2Fbanner1.jpg?alt=media&token=5d911c9a-ede0-43cb-a1a3-f7360c81abfb",
      width: 4,
      height: 3,
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/daintyflavours-api.appspot.com/o/DAINTYFLAVOURS%2Fsiteimages%2Faboutpic.jpg?alt=media&token=902c1db9-ae2d-4280-8c61-aac3205a4ff8",
      width: 1,
      height: 1,
    },
  ];

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
          <Gallery photos={photos} onClick={openLightbox} />;
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  currentIndex={currentImage}
                  views={photos.map((x) => ({
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
