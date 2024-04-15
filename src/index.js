/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Appstate from "./context/Appstate";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <BrowserRouter>
      <React.StrictMode>
         <Appstate>
            <App />
         </Appstate>
      </React.StrictMode>
   </BrowserRouter>
);
