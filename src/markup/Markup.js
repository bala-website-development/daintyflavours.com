import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Index1 from "./Pages/Index1";
//import Index2 from './Pages/Index2';

import About from "./Pages/About";
import TermsandCondition from "./Pages/TermsandCondition";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import OurJourney from "./Pages/OurJourney";
import Ourservices from "./Pages/Ourservices";
import Construction from "./Pages/Construction";
import Faq from "./Pages/Faq";
import Booking from "./Pages/Booking";
import Error from "./Pages/Error";
import Success from "./Pages/Success";
import Calendar from "./Pages/Calendar";
import Team from "./Pages/Team";
import Payment from "./Pages/Payment";
import PasswordChanged from "./Pages/PasswordChanged";
import MainCategory from "./Pages/MainCategory";
import Gallery from "./Pages/Gallery";

import Shop from "./Pages/Shop";
import Shopsidebar from "./Pages/Shopsidebar";
import Shopproduct from "./Pages/Shopproduct";
//import Admin from "./Pages/Admin";
import Shopcart from "./Pages/Shopcart";
import Shopwishlist from "./Pages/Shopwishlist";
import Shopchekout from "./Pages/Shopchekout";
import Shoplogin from "./Pages/Shoplogin";
import Shopregister from "./Pages/Shopregister";
import Myprofile from "./Pages/Myprofile";
import Orderhistory from "./Pages/Orderhistory";

import Contact from "./Pages/Contact";
import config from "../../src/config.json";

class Markup extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <Switch>
          {/* <Route path="/" exact component={Index1} /> */}
          {config.siteconstruction ? <Route path="/" exact component={Construction} /> : <Route path="/" exact component={Index1} />}
          <Route path="/home" exact component={Index1} />
          <Route path="/myprofile" exact component={Myprofile} />
          <Route path="/orderhistory" exact component={Orderhistory} />
          <Route path="/about" exact component={About} />
          <Route path="/termsandcondition" exact component={TermsandCondition} />
          <Route path="/privacypolicy" exact component={PrivacyPolicy} />

          <Route path="/our-journey" exact component={OurJourney} />
          <Route path="/our-services" exact component={Ourservices} />
          <Route path="/payment" exact component={Payment} />
          <Route path="/faq" exact component={Faq} />
          <Route path="/booking" exact component={Booking} />
          <Route path="/error-404" exact component={Error} />
          <Route path="/success" exact component={Success} />
          <Route path="/calendar" exact component={Calendar} />
          <Route path="/team" exact component={Team} />
          <Route path="/password-success" exact component={PasswordChanged} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/shop-product-details/:id" exact component={Shopproduct} />
          <Route path="/shop-cart" exact component={Shopcart} />
          <Route path="/shop-checkout" exact component={Shopchekout} />
          <Route path="/shop-login" exact component={Shoplogin} />
          <Route path="/shop-register" exact component={Shopregister} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/maincategories" exact component={MainCategory} />
          <Route path="/gallery" exact component={Gallery} />

          <Route path="/shop-wishlist" exact component={Shopwishlist} />
          <Route path="/construction" exact component={Construction} />

          <Route path="*" component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Markup;
