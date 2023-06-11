import React, { Component, useEffect, useState } from "react";
import config from "../../config.json";
import { Link, useHistory } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
const dev = document.domain === "localhost";

const Payment = (props) => {
  const history = useHistory();
  const [orderidSession, setorderidSession] = useState(props.orderid);
  const [paymentResponse, setPaymentResponse] = useState([]);
  useEffect(() => {
    if (orderidSession !== 0) {
      makepayment();
    } else {
      console.log("out of Paytm ");
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPaytm = (data) => {
    let methodname = "payment_paytm";
    return fetch(config.service_url + methodname, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
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

  const makepayment = () => {
    getPaytm({ amount: props.amount, email: "vbalakumar.cse@gmail.com" }).then((res) => {
      var information = {
        action: "https://securegw-stage.paytm.in/order/process",
        params: res,
      };
      post(information);
    });
  };

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
  const UpdateOrderPayemntStatus = async (orderid, paymentstatus, orderstatus) => {
    let _data = {
      orderid: orderid,
      paymentstatus: paymentstatus,
      paymentmethod: "Online",
      orderstatus: orderstatus,
    };

    await fetch(config.service_url + "updateorderbyuser", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: localStorage.getItem("accessToken") },
      body: JSON.stringify({ data: _data }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("payment status updated");
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
    const body = "<p>Hello ," + "</p>" + "<p>Your Order has been placed Sucessfully. Below is the status: </p>" + "<br/><p>Regards,</p> <p><a href=" + config.website + ">" + config.contact_name + "</a></p>" + "<table  style='border: 1px solid black'>" + "<tr style='border: 1px solid black'><td> <i>Name:</i></td> <td> <i>" + name + "</i></td></tr>" + "<tr style='border: 1px solid black'><td> <i>Email:</i></td> <td> <i>" + email + "</i></td></tr>" + "<tr style='border: 1px solid black'><td> <i>Orderid:</i></td> <td> <i>" + orderid + "</i></td></tr>" + "<tr style='border: 1px solid black'><td><i>Payment Status:</i></td><td> <i>" + paymentstatus + "</i></td></tr>" + "<tr style='border: 1px solid black'><td><i>Order Status:</i></td><td> <i>" + orderstatus + "</i></td></tr>" + "<tr style='border: 1px solid black'><td><i>Total:</i></td><td> <i>₹." + grossTotal + "</i></td></tr>" + "<tr style='border: 1px solid black'><td><i>Delivery mode:</i></td><td> <i>" + deliverymethod + "</i></td></tr>" + "</table>";
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
      <button className="btn button-lg btnhover btn-block w-auto" type="button">
        Paytm payment is {paymentResponse?.data?.status ? paymentResponse?.data?.status : "pending. Please Wait. Do not Refresh"}
      </button>
    </div>
  );
};

export default Payment;
