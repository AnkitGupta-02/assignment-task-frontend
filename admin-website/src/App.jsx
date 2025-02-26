import React from "react";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right"/>
      <Router />
    </BrowserRouter>
  );
}

export default App;
