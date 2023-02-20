import * as React from "react";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "../../components/AddressForm";
import Review from "../../components/Review";
import { toast } from "react-hot-toast";

import { useStateContext } from "../../context/StateContext";

const steps = ["Shipping address", "Review your order"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorCreateOrder, setIsErrorCreateOrder] = React.useState(false);

  const {
    cartItems,
    totalPrice,
    firstName,
    lastName,
    phone,
    email,
    address,
    city,
    state,
    postalCode,
    country,
    details,
    setFormInputsValidity,
    clearCart,
  } = useStateContext();

  const handleNext = (e) => {
    let formIsValid = false;
    const isEmpty = (value) => value.trim() === "";
    const validLenght = (value, num) => value.trim().length >= num;

    const emailValidation = (value) =>
      value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    const phoneValidation = (value) => {
      const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      return re.test(value);
    };

    const postalCodeValidation = (value) => {
      const re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
      return re.test(value);
    };

    if (activeStep === 0) {
      const firstNameIsValid = !isEmpty(firstName) && validLenght(firstName, 2);
      const lastNameIsValid = !isEmpty(lastName) && validLenght(lastName, 2);
      const cityIsValid = !isEmpty(city) && validLenght(city, 2);
      const countryIsValid = !isEmpty(country) && validLenght(country, 2);
      const emailIsVaild = !isEmpty(email) && emailValidation(email);
      const phoneIsValid = !isEmpty(phone) && phoneValidation(phone);
      const postalCodeIsValid =
        !isEmpty(postalCode) && postalCodeValidation(postalCode);
      const addressIsValid = !isEmpty(address) && validLenght(lastName, 5);

      setFormInputsValidity({
        inputFirstName: firstNameIsValid,
        inputLastName: lastNameIsValid,
        inputPhone: phoneIsValid,
        inputEmail: emailIsVaild,
        inputAddress: addressIsValid,
        inputCity: cityIsValid,
        inputPostalCode: postalCodeIsValid,
        inputCountry: countryIsValid,
      });

      formIsValid =
        firstNameIsValid &&
        lastNameIsValid &&
        emailIsVaild &&
        phoneIsValid &&
        postalCode &&
        addressIsValid &&
        cityIsValid &&
        countryIsValid;

      if (!formIsValid) {
        return;
      }
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  React.useEffect(() => {
    if (activeStep === 2) {
      console.log("step 2");
      const orderPayload = {
        customer: {
          name: `${firstName} ${lastName}`,
          email: email,
          phone: phone,
          details: details,
          address: {
            street: address,
            city: city,
            state: state,
            zipCode: postalCode,
            country: country,
          },
        },
        orderItems: cartItems.map((item) => {
          const key = new Date().getTime();
          return {
            ...item,
            _key: `order-${key}`,
            _type: "orderItem",
            slug: undefined,
          };
        }),
        status: "Pending",
        totalPrice: totalPrice,
      };

      const callSendDataFunction = sendData(orderPayload);
      toast.promise(callSendDataFunction, {
        loading: "Process",
        error: "Error occurs with sending data",
        success: "Success!",
      });
    }
  }, [activeStep]);

  const sendData = async (data) => {
    try {
      setIsLoading(true);
      await axios
        .post("../api/v1/order/create", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log(response);
        });

      setIsLoading(false);
      clearCart();
    } catch (error) {
      console.error(error);

      setIsErrorCreateOrder(true);
    }
  };

  let orderResult =
    !isLoading && !isErrorCreateOrder ? (
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          Thank you for your order!
        </Typography>
        <Typography variant="subtitle1">
          We will contact you soon to discuss the payment method and shipping of
          your order.
        </Typography>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          Creating an order...
        </Typography>
      </React.Fragment>
    );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            orderResult
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default Checkout;
