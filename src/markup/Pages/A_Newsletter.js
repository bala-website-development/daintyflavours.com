import React, { useState, useEffect, useRef } from "react";
import config from "../../config.json";
import { Link, useHistory } from "react-router-dom";
import uuid from "react-uuid";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import firebase from "../../firebase";
import JoditEditor from "jodit-react";
import Moment from "moment";
const A_Newsletter = (props) => {
  const [gallery, setGallery] = useState([]);
  const [networkError, setNetworkError] = useState("");
  const [gallery_image, setGallery_image] = useState("");
  const history = useHistory();
  const [smShow, setSmShow] = useState(false);
  const [showp, setShowp] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleVisible = () => {
    setSmShow(true);
    setTimeout(() => {
      setSmShow(false);
    }, 1000);
  };

  useEffect(() => {
    // getGalleryDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addSubscriptionForNewsLetter = (data, e) => {
    setSuccessMsg("Please wait");
    setSmShow(true);
    e.preventDefault();
    let _data = {};
    _data.email = data.subscribe_email;
    _data.createddate = new Date();
    console.log("newsletter", _data);
    fetch(config.service_url + "newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data: _data }) })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          e.target.reset();
          setSuccessMsg(data.message);
          setSmShow(false);
          handleVisible();
          //etGalleryDetails();
        } else {
          setSuccessMsg(data.message);
          setSmShow(false);
          handleVisible();
        }
      })
      .catch((error) => {
        setSuccessMsg("Something went wrong, Please try again later!!");
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: {}, mode: "blur" });
  const onSubmit = (data, e) => {
    addSubscriptionForNewsLetter(data, e);
  };

  return (
    <div>
      <Modal size="sm" show={smShow} onHide={() => setSmShow(false)}>
        <Modal.Header closeButton>{successMsg}</Modal.Header>
      </Modal>
      <div id="review_form_wrapper">
        <form id="newslettersubscription" onSubmit={handleSubmit(onSubmit)}>
          <div className=" d-flex ">
            <div class="input-group mb-3 justify-content-center w-100">
              <input type="email" className="newsletter px-3 border-primary" placeholder="Enter your email" required name="subscribe_email" {...register("subscribe_email")} />
              <div class="input-group-append">
                <button class="btn btnhover" type="submit">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default A_Newsletter;
