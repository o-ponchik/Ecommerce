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
import dynamic from "next/dynamic";

import { client } from "../../lib/client";

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
  } = useStateContext();

  const handleNext = async (e) => {
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

    if (activeStep === 1) {
      console.log(cartItems);

      const orderPayload = {
        customer: {
          name: `${firstName} ${lastName}`,
          email: email,
          phone: phone,
          details: "Additional customer information",
          address: {
            street: address,
            city: city,
            state: state,
            zipCode: postalCode,
            country: country,
          },
        },
        // product: [
        //   cartItems.map((item) => {
        //     return { _ref: `product-${item._id}` };
        //   }),
        // ],
        product: cartItems.map((x) => ({
          ...x,
        })),
        status: "pending",
        totalPrice: totalPrice,
      };

      console.log("Payload: ", orderPayload);
      console.log(JSON.stringify(orderPayload));

      try {
        await axios
          .post("../api/v1/order/create", orderPayload, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(function (response) {
            console.log(response);
          });
      } catch (error) {
        console.error(error);
      }
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

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
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order!
              </Typography>
              <Typography variant="subtitle1">
                We will contact you soon to discuss the payment method and
                shipping of your order.
              </Typography>
            </React.Fragment>
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
