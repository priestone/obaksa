import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import Router from "./Router";
import { GlobalStyled } from "./GlobalStyled";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <GlobalStyled></GlobalStyled>
      <Router></Router>
      {/* <App /> */}
    </HelmetProvider>
  </React.StrictMode>
);
