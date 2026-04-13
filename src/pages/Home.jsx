import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Homephar from "./Homephar";
import Products from "./products";

function Home() {

  return (
    <>
      <Header />

      <Homephar />

      <Products />

      <Footer />
    </>
  );
}

export default Home;