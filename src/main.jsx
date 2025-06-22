import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ViewItems from "./Pages/viewItems.jsx";
import AddItems from "./Pages/addItems.jsx";
import App from "./App.jsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/viewItems" element={<ViewItems />} />
        <Route path="/addItems" element={<AddItems />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
