import React from "react";
import "./css/PaymentSuccessful.css";
import image from "../images/greentick.png";

export function PaymentSuccessfulPage() {
  return (
    <main className="content">
      <div id="paymentUnSuccessful">
        <img id="img" src={image} alt={image}/>
        <h1 id="text">Payment Successful!</h1>
        <p id="message">If unauthorised, call 1800 1234 5678.</p>
      </div>
    </main>
  );
}
