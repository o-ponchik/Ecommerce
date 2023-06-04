import * as React from "react";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
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
import OrderSummary from "../../components/OrderSummary";
import { toast } from "react-hot-toast";
import errors from "../../context/Constants";
import useForm from "../../hooks/use-form";
import { generateOrderNumber } from "../../utils/generateOrderNumer";
import Link from "next/link";
import { useStateContext } from "../../context/StateContext";
import { FormattedMessage } from "react-intl";

const step1 = <FormattedMessage id="step1.text" />;
const step2 = <FormattedMessage id="step2.text" />;
const step3 = <FormattedMessage id="step3.text" />;

const steps = [step1, step2, step3];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <OrderSummary />;
    case 1:
      return <AddressForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#933157",
    },
    secondary: {
      main: "#324d67",
    },
  },
});

function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorCreateOrder, setIsErrorCreateOrder] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const { ERROR_INVALID_NAME, ERROR_INVALID_PHONE, ERROR_INVALID_EMAIL } =
    errors;

  const {
    setShowIconCart,
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
    orderNumber,
    setOrderNumber,
  } = useStateContext();

  React.useEffect(() => setShowIconCart(false), []);

  const orderNum = () => {
    const generatedNum = generateOrderNumber();
    setOrderNumber(generatedNum);
    return generatedNum;
  };

  const {
    isEmpty,
    validLenght,
    emailValidation,
    phoneValidation,
    postalCodeValidation,
  } = useForm();

  const handleNext = (e) => {
    let formIsValid = false;

    if (activeStep === 1) {
      const firstNameIsValid = !isEmpty(firstName) && validLenght(firstName, 2);
      const lastNameIsValid = !isEmpty(lastName) && validLenght(lastName, 2);
      const cityIsValid = !isEmpty(city) && validLenght(city, 2);
      const countryIsValid = !isEmpty(country) && validLenght(country, 2);
      const emailIsVaild = !isEmpty(email) && emailValidation(email);
      const phoneIsValid = !isEmpty(phone) && phoneValidation(phone);
      const postalCodeIsValid = !isEmpty(postalCode);
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
    if (activeStep === 3) {
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
          return {
            ...item,
            _key: `order-${item._id}`,
            _type: "orderItem",
            slug: undefined,
          };
        }),
        orderNumber: orderNum(),
        status: "Pending",
        totalPrice: totalPrice,
      };

      const loadingMsg = <FormattedMessage id="toast.loading" />;
      const errorMsg = <FormattedMessage id="toast.error" />;
      const successMsg = <FormattedMessage id="toast.success.checkout" />;

      const callSendDataFunction = sendData(orderPayload);
      toast.promise(callSendDataFunction, {
        loading: loadingMsg,
        error: errorMsg,
        success: successMsg,
      });
    }
  }, [activeStep]);

  const sendData = async (data) => {
    try {
      setIsLoading(true);
      await axios
        .post("/api/v1/order/create", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {});

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

      if (error) {
        setErrorMessage(error.message);
      }

      setIsLoading(false);
      setIsErrorCreateOrder(true);
    }
  };

  let orderResult = (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        <FormattedMessage id="h1.order.result" />
      </Typography>
      <Typography variant="6" gutterBottom color="primary">
        <FormattedMessage id="orderNum.order.result" />: {orderNumber}
      </Typography>
      <Typography variant="subtitle1">
        <FormattedMessage id="message.order.result" />
      </Typography>
    </React.Fragment>
  );

  if (isLoading && !isErrorCreateOrder) {
    orderResult = (
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          <FormattedMessage id="creating.order.text" />
        </Typography>
      </React.Fragment>
    );
  }

  if (!isLoading && isErrorCreateOrder) {
    orderResult = (
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          <FormattedMessage id="error.creating.order.text" />
          {""}
          <p style={{ color: "red" }}>{errorMessage}</p>
        </Typography>
      </React.Fragment>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mb: 4, px: 1 }}>
        <Paper
          variant="outlined"
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 1, md: 3 },
          }}
        >
          <Typography
            component="h1"
            color="secondary"
            variant="h4"
            align="center"
          >
            <FormattedMessage id="h1.checkout.page.text" />
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>{orderResult}</React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {activeStep === 0 && (
                  <Link href={`/`}>
                    <Button
                      sx={{ mt: 3, ml: 1 }}
                      color="primary"
                      variant="outlined"
                    >
                      <FormattedMessage id="returnToShop.checkout.page.button" />
                    </Button>
                  </Link>
                )}
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    <FormattedMessage id="back.checkout.page.button" />
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? (
                    <FormattedMessage id="placeOrder.checkout.page.button" />
                  ) : (
                    <FormattedMessage id="next.checkout.page.button" />
                  )}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        {activeStep === steps.length && !isLoading && !isErrorCreateOrder && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Link href={`/`}>
              <Button variant="outlined" href="/">
                <FormattedMessage id="backToHomepage.checkout.page.button" />
              </Button>
            </Link>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default Checkout;
