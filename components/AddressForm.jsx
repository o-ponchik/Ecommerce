import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useStateContext } from "../context/StateContext";

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

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={firstName}
            error={!formInputsValidity.inputFirstName}
            helperText={
              !formInputsValidity.inputFirstName &&
              "Name shouldn't be empty and contain at least 2 charachters"
            }
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={lastName}
            error={!formInputsValidity.inputLastName}
            helperText={
              !formInputsValidity.inputLastName &&
              "Name shouldn't be empty and contain at least 2 charachters"
            }
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone number"
            fullWidth
            autoComplete="phone number"
            variant="standard"
            value={phone}
            error={!formInputsValidity.inputPhone}
            helperText={
              !formInputsValidity.inputPhone &&
              "Invalid phone number! Example: +31636363634"
            }
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={email}
            error={!formInputsValidity.inputEmail}
            helperText={
              !formInputsValidity.inputEmail &&
              "Invalid email. Example: 123@gmail.com"
            }
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address line"
            fullWidth
            autoComplete="shipping address-line"
            variant="standard"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={city}
            error={!formInputsValidity.inputCity}
            helperText={
              !formInputsValidity.inputCity && "City shouldn't be empty"
            }
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
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
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={postalCode}
            error={!formInputsValidity.inputPostalCode}
            helperText={
              !formInputsValidity.inputPostalCode &&
              "Invalid postal code! Example: 01010"
            }
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={country}
            error={!formInputsValidity.inputCountry}
            helperText={
              !formInputsValidity.inputCountry && "Country shouldn't be empty"
            }
            onChange={(e) => setCountry(e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
