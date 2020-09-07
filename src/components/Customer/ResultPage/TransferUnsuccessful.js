import React from "react";
import "./css/TransferUnsuccessful.css";
import image from "../images/redcross.png";

export function TransferUnSuccessfulPage() {
  return (
    <main className="content">
   <div id= "TransferUnSuccessful">
    <img id= "img" src= {image} />
     <h1 id = "text">Transfer Unsuccessful!</h1>
     <p id = "message">If unauthorised, call 1800 1234 5678.</p>
    </div>
    </main>
    
  );
} 
