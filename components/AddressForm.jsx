import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useStateContext } from "../context/StateContext";
import { FormattedMessage } from "react-intl";

export default function AddressForm() {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    email,
    setEmail,
    address,
    setAddress,
    city,
    setCity,
    state,
    setState,
    postalCode,
    setPostalCode,
    country,
    setCountry,
    formInputsValidity,
  } = useStateContext();

  const firstNameLabel = <FormattedMessage id="firstName" />;
  const lastNameLabel = <FormattedMessage id="lastName" />;
  const phoneLabel = <FormattedMessage id="phone" />;
  const emailLabel = <FormattedMessage id="email" />;
  const addressLabel = <FormattedMessage id="address" />;
  const cityLabel = <FormattedMessage id="city" />;
  const stateLabel = <FormattedMessage id="state" />;
  const zipCodeLabel = <FormattedMessage id="zipCode" />;
  const countryLabel = <FormattedMessage id="country" />;

  return (
    <React.Fragment>
      <Typography variant="h6" color="secondary" gutterBottom>
        <FormattedMessage id="step2.text" />
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label={firstNameLabel}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={firstName}
            error={!formInputsValidity.inputFirstName}
            helperText={
              !formInputsValidity.inputFirstName && (
                <FormattedMessage id="firstName.warning" />
              )
            }
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label={lastNameLabel}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={lastName}
            error={!formInputsValidity.inputLastName}
            helperText={
              !formInputsValidity.inputLastName && (
                <FormattedMessage id="firstName.warning" />
              )
            }
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label={phoneLabel}
            fullWidth
            autoComplete="phone number"
            variant="standard"
            value={phone}
            error={!formInputsValidity.inputPhone}
            helperText={
              !formInputsValidity.inputPhone && (
                <FormattedMessage id="phone.warning" />
              )
            }
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label={emailLabel}
            fullWidth
            autoComplete="email"
            variant="standard"
            value={email}
            error={!formInputsValidity.inputEmail}
            helperText={
              !formInputsValidity.inputEmail && (
                <FormattedMessage id="email.warning" />
              )
            }
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label={addressLabel}
            fullWidth
            autoComplete="shipping address-line"
            variant="standard"
            value={address}
            error={!formInputsValidity.inputAddress}
            helperText={
              !formInputsValidity.inputAddress && (
                <FormattedMessage id="address.warning" />
              )
            }
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label={cityLabel}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={city}
            error={!formInputsValidity.inputCity}
            helperText={
              !formInputsValidity.inputCity && (
                <FormattedMessage id="city.warning" />
              )
            }
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label={stateLabel}
            fullWidth
            variant="standard"
            value={!state ? "" : state}
            onChange={(e) => setState(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label={zipCodeLabel}
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={postalCode}
            error={!formInputsValidity.inputPostalCode}
            helperText={
              !formInputsValidity.inputPostalCode && (
                <FormattedMessage id="zipCode.warning" />
              )
            }
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label={countryLabel}
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={country}
            error={!formInputsValidity.inputCountry}
            helperText={
              !formInputsValidity.inputCountry && (
                <FormattedMessage id="country.warning" />
              )
            }
            onChange={(e) => setCountry(e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
