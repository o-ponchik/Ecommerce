import React from "react";
import LogIn from "../components/LogIn";

const Login = () => {
  return <LogIn />;
};

export default Login;

Login.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
