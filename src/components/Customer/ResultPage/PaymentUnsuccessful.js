import React from "react";
import "./css/PaymentUnsuccessful.css";
import image from "../images/redcross.png";

export function PaymentUnSuccessfulPage() {
  return (
    <main className="content">
      <div id="paymentUnSuccessful">
        <img id="img" src={image} alt={image}/>
        <h1 id="text">Payment Unsuccessful!</h1>
        <p id="message">If unauthorised, call 1800 1234 5678.</p>
      </div>
    </main>
  );
}
