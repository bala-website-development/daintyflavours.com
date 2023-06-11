import React, { Component, useEffect, useState } from "react";
import config from "../../config.json";
import { Link, useHistory } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useForm } from "react-hook-form";
const dev = document.domain === "localhost";

const Payment = (props) => {
  const history = useHistory();
  const [orderidSession, setorderidSession] = useState(props.orderid);
  const [paymentResponse, setPaymentResponse] = useState();
  const [notes, setNotes] = useState("");
  useEffect(
    () => {
      console.log("qrcode");
      // qrcodeservice({ amount: props.amount, name: config.paymentname, vpa: config.upicode });
      //qrcodeservice({ name: config.paymentname, vpa: config.upicode, note: "Thanks for Shopping with Dainty Flavour" });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const qrcodeservice = (data) => {
    return fetch(config.qrcodeserviceurl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((svg) => {
        document.getElementById("qrcode").insertAdjacentHTML("afterend", svg);
      })
      .catch((err) => {
        console.log(err);
        // log failure message
        UpdateOrderPayemntStatus(props.orderid, "Failed", "Pending");
        // email service
        sendEmail(props.name, props.email, props.orderid, "Failed", "Pending", props.amount, props.deliverymethod);
        console.log("payement failed");
      });
  };
  ////// paytm
  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  function isObj(val) {
    return typeof val === "object";
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  }

  function buildForm({ action, params }) {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  }

  function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  }

  ////

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      document.body.appendChild(script);
      script.onload = () => {
        resolve(true);
      };
      script.error = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const UpdateOrderPayemntStatus = async (orderid, paymentstatus, orderstatus, upipaymentnotes) => {
    let _data = {
      orderid: orderid,
      paymentstatus: paymentstatus,
      paymentmethod: "UPI Online",
      orderstatus: orderstatus,
      othernotes: upipaymentnotes
    };
console.log("update order", _data);
    await fetch(config.service_url + "updateorderbyuser", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") },
      body: JSON.stringify({ data: _data }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("payment status updated");
          sendEmail(props.name, props.email, props.orderid, "Received", "Completed", props.amount, props.deliverymethod);
          secureLocalStorage.setItem("daintycart", JSON.stringify([]));
          history.push("/success");
        } else if (data?.status === 499) {
          console.log("payment status not updated");
        } else {
          console.log("payment status not updated");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const sendEmail = (name, email, orderid, paymentstatus, orderstatus, grossTotal, deliverymethod) => {
    const body = "<p>Hello ," + "</p>" + "<p>Your Order has been placed Sucessfully. Below is the status: </p>" + "<br/><p>Regards,</p> <p><a href=" + config.website + ">" + config.contact_name + "</a></p>" + "<table  style='border: 1px solid black'>" + "<tr style='border: 1px solid black'><td> <i>Name:</i></td> <td> <i>" + name + "</i></td></tr>" + "<tr style='border: 1px solid black'><td> <i>Email:</i></td> <td> <i>" + email + "</i></td></tr>" + "<tr style='border: 1px solid black'><td> <i>Orderid:</i></td> <td> <i>" + orderid + "</i></td></tr>" + "<tr style='border: 1px solid black'><td><i>Payment Status:</i></td><td> <i>" + paymentstatus + ". Verification in Progress.</i></td></tr>" + "<tr style='border: 1px solid black'><td><i>Order Status:</i></td><td> <i>" + orderstatus + ". We will verify the payment and proceed.</i></td></tr>" + "<tr style='border: 1px solid black'><td><i>Total:</i></td><td> <i>₹." + grossTotal + "</i></td></tr>" + "<tr style='border: 1px solid black'><td><i>Delivery mode:</i></td><td> <i>" + deliverymethod + "</i></td></tr>" + "</table>";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: config.fromemail,
        to: email + "," + config.fromemail,
        subject: config.service_url_prod === config.service_url ? "Order Received - " : "Test - Order Received - " + name,
        text: "",
        html: body,
      }),
    };
    console.log(requestOptions);
    try {
      fetch(config.email_service_url, requestOptions).then((response) => console.log(response.json()));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="btn-block w-auto">
        UPI payment is pending. Please do the payment for the below UPI and confirm below. <p>Once payment is done, we will verify and proceed with the shipping.</p>
      </div>
      <br />
      <div align="center">
        <br />
        Name : {config.paymentname}
        <br />
        Payment UPI : <b>{config.upicode}</b>
        <br />
        <span className="h1">₹. {props.amount}</span>
        <div className=" row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4 qrcodepayment d-none">
            <div id="qrcode"></div>
          </div>
          <div className="col-lg-4"></div>
        </div>
        <div />
        <br />
        Notes/UPI Transaction ID : <input type="text" className="form-control" aria-required="true" placeholder="Please Share your notes / queries along with payment transaction id" size="30" name="upitransactionid" required id="upitransactionid" onChange={(e)=>setNotes(e.target.value)} />
        <br />
        <div>
          <button type="button" className="btn button-lg btnhover btn-block w-auto" onClick={(e) => UpdateOrderPayemntStatus(props.orderid, "Received", "Completed", notes)}>
            Please Pay and Confirm your UPI payment here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
