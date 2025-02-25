import React from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "../components/NavBar/NavBar";
import DashBoardTab from "../components/tabs/DashBoardTab.jsx";
import ProductTab from "../components/tabs/ProductTab.jsx";
import ResearchTab from "../components/tabs/ResearchTab.jsx";
import ServiceTab from "../components/tabs/ServiceTab.jsx";

function MainPage() {
  return (
    <div className="w-full h-full border">
      <NavBar />
      <Routes>
        <Route index element={<DashBoardTab />} />
        <Route path="/services" element={<ServiceTab />} />
        <Route path="/products" element={<ProductTab />} />
        <Route path="/research" element={<ResearchTab />} />
      </Routes>
    </div>
  );
}

export default MainPage;
