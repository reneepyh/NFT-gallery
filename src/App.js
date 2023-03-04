import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Page404 from "./pages/Page404";
import PFP from "./pages/PFP";
import Art from "./pages/Art";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import "./styles/all.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="pfp" element={<PFP />} />
          <Route path="art" element={<Art />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
