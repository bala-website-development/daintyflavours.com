import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import config from "../../config.json";
const ScrollToTop = (props) => {
  const [stick, setStick] = useState(false);
  const onClickHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    var position = window.pageYOffset;

    const scrollHandler = () => {
      let scrollPos = window.pageYOffset;
      if (scrollPos < 200) {
        setStick(true);
      } else if (scrollPos < position) {
        setStick(true);
      } else {
        setStick(true);
      }
      position = scrollPos;
    };

    window.addEventListener("scroll", function () {
      scrollHandler();
    });
    return () => {
      window.removeEventListener("scroll", function () {
        scrollHandler();
      });
    };
  }, [stick]);

  return (
    <a type="button" target="_blank" href={config.whatsappurl} className={`scroll-top ${stick ? "show" : ""}`} onClick={onClickHandler} {...props}>
      <i className="arrow-top fal fa fa-whatsapp"></i>
      <i className="arrow-bottom fal fa fa-whatsapp"></i>
    </a>
  );
};

export default ScrollToTop;
