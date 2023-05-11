import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { useStateContext } from "../context/StateContext";

export default function Review(props) {
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
    setDetails,
  } = useStateContext();

  const addresses = [
    `${address},
    ${city},
    ${state},
    ${postalCode},
    ${country}`,
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" color="secondary" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((product) => {
          return (
            <ListItem key={product._id} sx={{ py: 1, px: 0 }}>
              <ListItemText
                primary={product.name}
                secondary={`Quantity: ${product.quantity}`}
              />
              <Typography variant="body2">${product.price}</Typography>
            </ListItem>
          );
        })}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            color="secondary"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Customer information
          </Typography>
          <Typography gutterBottom>
            <span className="highlight-text">Name:</span> {firstName} {lastName}
          </Typography>
          <Typography gutterBottom>
            <span className="highlight-text">Phone:</span> {phone}
          </Typography>
          <Typography gutterBottom>
            <span className="highlight-text">Email:</span> {email}
          </Typography>
          <Typography gutterBottom>
            <span className="highlight-text">Shipping address:</span>{" "}
            {addresses.join(", ")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="details"
            name="details"
            label="Your message (optional)..."
            fullWidth
            autoComplete="details"
            variant="outlined"
            multiline
            rows={4}
            onChange={(e) => {
              if (e.target.value.trim() === "") return;
              setDetails(e.target.value);
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
