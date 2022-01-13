import React from "react";
import InstagramFeed from "react-ig-feed";
import "react-ig-feed/dist/index.css";
import config from "../../config.json";
const Instagram = () => {
  return (
    <div>
      <InstagramFeed token={config.instagram_access_token} counter={config.instagram_feedcount} />
    </div>
  );
};

export default Instagram;
