import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Index1 from "./Pages/Index1";
//import Index2 from './Pages/Index2';

import About from "./Pages/About";
import TermsandCondition from "./Pages/TermsandCondition";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import OurJourney from "./Pages/OurJourney";
import Ourservices from "./Pages/Ourservices";
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

import Ourmenustyle1 from "./Pages/Ourmenustyle1";
import Ourmenustyle2 from "./Pages/Ourmenustyle2";
import Ourmenustyle3 from "./Pages/Ourmenustyle3";
import Ourmenustyle4 from "./Pages/Ourmenustyle4";

import Bloggrid2 from "./Pages/Bloggrid2";
import Bloggridrightsidebar from "./Pages/Bloggridrightsidebar";
import Bloggridleftsidebar from "./Pages/Bloggridleftsidebar";
import Bloggride3 from "./Pages/Bloggride3";

import Bloghalfimg from "./Pages/Bloghalfimg";
import Halfimgsidebar from "./Pages/Halfimgsidebar";
import Halfimgleftsidebar from "./Pages/Halfimgleftsidebar";

import Bloglargeimg from "./Pages/Bloglargeimg";
import Bloglargeimgsidebar from "./Pages/Bloglargeimgsidebar";
import Bloglargeimgleftsidebar from "./Pages/Bloglargeimgleftsidebar";

import Blogsingle from "./Pages/Blogsingle";
import Blogsinglesidebar from "./Pages/Blogsinglesidebar";
import Blogsingleleftsidebar from "./Pages/Blogsingleleftsidebar";

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
import Contact2 from "./Pages/Contact2";

class Markup extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <Switch>
          <Route path="/" exact component={Index1} />
          {/* <Route path="/index-2" exact component={Index2} /> */}
          {/* <Route path="/admin" exact component={Admin} /> */}
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
          <Route path="/our-menu-1" exact component={Ourmenustyle1} />
          <Route path="/our-menu-2" exact component={Ourmenustyle2} />
          <Route path="/our-menu-3" exact component={Ourmenustyle3} />
          <Route path="/our-menu-4" exact component={Ourmenustyle4} />
          <Route path="/blog-grid-2" exact component={Bloggrid2} />
          <Route path="/blog-grid-2-sidebar" exact component={Bloggridrightsidebar} />
          <Route path="/blog-grid-2-sidebar-left" exact component={Bloggridleftsidebar} />
          <Route path="/blog-grid-3" exact component={Bloggride3} />
          <Route path="/blog-half-img" exact component={Bloghalfimg} />
          <Route path="/blog-half-img-sidebar" exact component={Halfimgsidebar} />
          <Route path="/blog-half-img-left-sidebar" exact component={Halfimgleftsidebar} />
          <Route path="/blog-large-img" exact component={Bloglargeimg} />
          <Route path="/blog-large-img-sidebar" exact component={Bloglargeimgsidebar} />
          <Route path="/blog-large-img-left-sidebar" exact component={Bloglargeimgleftsidebar} />
          <Route path="/blog-single" exact component={Blogsingle} />
          <Route path="/blog-single-sidebar/:id" exact component={Blogsinglesidebar} />
          <Route path="/blog-single-left-sidebar" exact component={Blogsingleleftsidebar} />
          <Route path="/shop-wishlist" exact component={Shopwishlist} />
          <Route path="/contact-2" exact component={Contact2} />
          <Route path="*" component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Markup;
