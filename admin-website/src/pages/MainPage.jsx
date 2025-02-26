import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "../components/Header/Header.jsx";
import Navbar from "../components/Header/Navbar/Navbar.jsx";
import DashBoardTab from "../components/tabs/DashBoardTab.jsx";
import ProductTab from "../components/tabs/ProductTab.jsx";
import ResearchTab from "../components/tabs/ResearchTab.jsx";
import ServiceTab from "../components/tabs/ServiceTab.jsx";
import { fetchAdmin } from "../Services/admin-api.jsx";

function MainPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loadingState, setLoadingState] = useState(false);

  const fetchData = useCallback(async () => {
    setLoadingState(true);
    try {
      const admin = await fetchAdmin();
      setData(admin);
    } catch (err) {
      if (err) {
        navigate("/login");
      }
    } finally {
      setLoadingState(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loadingState) {
    return (
      <div className="flex items-center justify-center w-screen h-screen text-4xl font-bold text-center bg-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-full border">
      <Header>
        <Navbar data={data} />
      </Header>
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