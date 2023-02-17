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
import Link from "@mui/material/Link";
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
    inputsValidation,
    setFormInputsValidity,
  } = useStateContext();

  const handleNext = (e) => {
    // if (
    //   !firstName ||
    //   !lastName ||
    //   !phone ||
    //   !email ||
    //   !address ||
    //   !city ||
    //   !postalCode ||
    //   !country
    // ) {
    //   toast.error("Please fill in all the required fields");
    //   return;
    // }
    let formIsValid = false;
    const isEmpty = (value) => value.trim() === "" || value.trim().length < 2;

    if (activeStep === 0) {
      const firstNameIsValid = !isEmpty(firstName);
      const lastNameIsValid = !isEmpty(lastName);
      const cityIsValid = !isEmpty(city);
      const countryIsValid = !isEmpty(country);

      setFormInputsValidity({
        inputFirstName: firstNameIsValid,
        inputLastName: lastNameIsValid,
        inputPhone: true,
        inputEmail: true,
        inputAddress: true,
        inputCity: cityIsValid,
        inputPostalCode: true,
        inputCountry: countryIsValid,
      });

      console.log(firstNameIsValid, lastNameIsValid);

      // inputsValidation(formInputsValidity);

      formIsValid =
        firstNameIsValid && lastNameIsValid && cityIsValid && countryIsValid;
    }

    if (!formIsValid) {
      console.log("invalid form");

      return;
    }

    console.log("valid form");

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  React.useEffect(() => {
    if (activeStep === 2) {
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
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      ></AppBar>
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
