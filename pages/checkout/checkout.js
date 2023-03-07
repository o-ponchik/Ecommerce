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
import errors from "../../context/Constants";
import useForm from "../../hooks/use-form";

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
  const [errorMessage, setErrorMessage] = React.useState(false);
  const { ERROR_INVALID_NAME, ERROR_INVALID_PHONE, ERROR_INVALID_EMAIL } =
    errors;

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
    resetForm,
  } = useStateContext();

  const {
    isEmpty,
    validLenght,
    emailValidation,
    phoneValidation,
    postalCodeValidation,
  } = useForm();

  const handleNext = (e) => {
    let formIsValid = false;

    if (activeStep === 0) {
      const firstNameIsValid = !isEmpty(firstName) && validLenght(firstName, 2);
      const lastNameIsValid = !isEmpty(lastName) && validLenght(lastName, 2);
      const cityIsValid = !isEmpty(city) && validLenght(city, 2);
      const countryIsValid = !isEmpty(country) && validLenght(country, 2);
      const emailIsVaild = !isEmpty(email) && emailValidation(email);
      const phoneIsValid = !isEmpty(phone) && phoneValidation(phone);
      const postalCodeIsValid =
        !isEmpty(postalCode) && postalCodeValidation(postalCode);
      const addressIsValid = !isEmpty(address) && validLenght(address, 5);

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
        postalCodeIsValid &&
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
          console.log("item: ", item);
          return {
            ...item,
            _key: `order-${item._id}`,
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
      resetForm();
    } catch (error) {
      console.error("error: ", error);

      const subcode = error.response.data.subcode;

      if (subcode === ERROR_INVALID_NAME) {
        console.error("error subcode: ", subcode, "Name invalid");
        setErrorMessage("Name is invalid");
      }
      if (subcode === ERROR_INVALID_PHONE) {
        console.error("error subcode: ", subcode, "Phone invalid");
        setErrorMessage("Phone number is invalid");
      }
      if (subcode === ERROR_INVALID_EMAIL) {
        console.error("error subcode: ", subcode, "Email invalid");
        setErrorMessage("Email is invalid");
      }

      setIsLoading(false);
      setIsErrorCreateOrder(true);
    }
  };

  let orderResult = (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Thank you for your order!
      </Typography>
      <Typography variant="subtitle1">
        We will contact you soon to discuss the payment method and shipping of
        your order.
      </Typography>
    </React.Fragment>
  );

  if (isLoading && !isErrorCreateOrder) {
    orderResult = (
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          Creating an order...
        </Typography>
      </React.Fragment>
    );
  }

  if (!isLoading && isErrorCreateOrder) {
    orderResult = (
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          Oops something went wrong...{""}
          <p style={{ color: "red" }}>{errorMessage}</p>
        </Typography>
      </React.Fragment>
    );
  }

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
