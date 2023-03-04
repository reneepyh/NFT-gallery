import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { Outlet, NavLink, useLocation } from "react-router-dom";

const Layout = () => {
  let activeStyle = {
    borderBottom: "2px solid rgb(92, 89, 89)",
  };

  const [navBg, setNavBg] = useState("white");
  const location = useLocation();
  useEffect(() => {
    if (window.location.pathname === "/PFP") {
      setNavBg("rgb(141, 180, 178)");
    } else if (window.location.pathname === "/Art") {
      setNavBg("rgb(222, 214, 214)");
    } else {
      setNavBg("white");
    }
  }, [location]);

  return (
    <div>
      <nav style={{ backgroundColor: navBg }}>
        <ul>
          <li>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/PFP"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              PFP
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Art"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Art
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
