import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { FormattedMessage } from "react-intl";
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
    language,
  } = useStateContext();

  const addresses = [
    `${address},
    ${city},
    ${state},
    ${postalCode},
    ${country}`,
  ];

  const totalText = <FormattedMessage id="total.text" />;
  const messageLabel = <FormattedMessage id="message.optional" />;
  const quantityText = language === "en" ? "Quantity" : "Кількість";

  return (
    <Box sx={{ padding: { xs: 0, md: "0px 20px" } }}>
      <Typography variant="h6" color="secondary" gutterBottom>
        <FormattedMessage id="h2-a.orderReview" />
      </Typography>
      <List disablePadding>
        {cartItems.map((product) => {
          return (
            <ListItem key={product._id} sx={{ py: 1, px: 0 }}>
              <ListItemText
                primary={product.name[language]}
                secondary={`${quantityText}: ${product.quantity}`}
              />
              <Typography variant="body2">${product.price}</Typography>
            </ListItem>
          );
        })}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={totalText} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ₴{totalPrice}
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
            <FormattedMessage id="h2-b.orderReview" />
          </Typography>
          <Typography gutterBottom>
            <span className="highlight-text">
              <FormattedMessage id="firstName" />:{" "}
            </span>
            {firstName} {lastName}
          </Typography>
          <Typography gutterBottom>
            <span className="highlight-text">
              {" "}
              <FormattedMessage id="phone" />:
            </span>{" "}
            {phone}
          </Typography>
          <Typography gutterBottom>
            <span className="highlight-text">
              {" "}
              <FormattedMessage id="email" />:
            </span>{" "}
            {email}
          </Typography>
          <Typography gutterBottom>
            <span className="highlight-text">
              {" "}
              <FormattedMessage id="step2.text" />:
            </span>{" "}
            {addresses.join(", ")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="details"
            name="details"
            label={messageLabel}
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
    </Box>
  );
}
