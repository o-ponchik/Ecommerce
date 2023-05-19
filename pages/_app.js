import React from "react";
import { Toaster } from "react-hot-toast";
import { Layout } from "../components";
import "../styles/globals.css";
import { StateContext } from "../context/StateContext";
import { AdminContext } from "../context/AdminContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import en from "../i18n/en.json";
import uk from "../i18n/uk.json";

const messages = { en, uk };

const theme = createTheme();

function getDirection(locale) {
  return "ltr";
}

export default function App({ Component, pageProps }) {
  const { locale } = useRouter();

  if (Component.getLayout) {
    return Component.getLayout(
      <>
        <AdminContext>
          <ThemeProvider theme={theme}>
            <Toaster />
            <Component {...pageProps} dir={getDirection(locale)} />
          </ThemeProvider>
        </AdminContext>
      </>
    );
  }

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <StateContext>
        <ThemeProvider theme={theme}>
          <Layout>
            <Toaster />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </StateContext>
    </IntlProvider>
  );
}
