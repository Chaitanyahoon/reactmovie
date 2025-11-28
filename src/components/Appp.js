import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import { Outlet } from "react-router";
export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
