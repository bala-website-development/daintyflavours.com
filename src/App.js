import React, { useEffect } from "react";
import "./css/plugins.css";
import "./css/style.css";
import "./css/mystyle.css";
import "./css/templete.css";
import "./css/skin/skin-1.css";
import firebase from "./firebase";
import Markup from "./markup/Markup";
import * as mdb from "mdb-ui-kit"; // lib

function App() {
  return (
    <div className="App">
      <Markup />
    </div>
  );
}

export default App;
