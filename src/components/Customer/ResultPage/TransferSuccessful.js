import React from "react";
import "./css/TransferSuccessful.css";
import image from "../images/greenPlane.png";

export function TransferSuccessfulPage() {
  return (
    <main className="content">
    <div id= "TransferSuccessful">
    <img id= "img" src= {image} />
     <h1 id = "text">Transfer Successful!</h1>
     <p id = "message">If unauthorised, call 1800 1234 5678.</p>
    </div>
    </main>
    
  );
} 
