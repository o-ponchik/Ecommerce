import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, dir }) => {
  return (
    <div className="layout ">
      <Head>
        <title>RosyFox | HomyCandles</title>
        <meta
          name="description"
          content="Свічки ручної роботи від RosyFox для створення домашнього затишку."
          key="desc"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon_logo/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon_logo/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon_logo/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon_logo/site.webmanifest" />
      </Head>
      <header>
        <Navbar></Navbar>
      </header>
      <main dir={dir} className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
