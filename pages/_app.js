import React from "react";
import { Toaster } from "react-hot-toast";
import { Layout } from "../components";
import "../styles/globals.css";
import { StateContext } from "../context/StateContext";
import { AdminContext } from "../context/AdminContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

export default function App({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(
      <>
        <AdminContext>
          <ThemeProvider theme={theme}>
            <Toaster />
            <Component {...pageProps} />
          </ThemeProvider>
        </AdminContext>
      </>
    );
  }

  return (
    <StateContext>
      <ThemeProvider theme={theme}>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </StateContext>
  );
}
