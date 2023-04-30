import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";

export default function Deposits({ orders }) {
  console.log("Statisctics", { orders });

  const filteredOrders = (orders, status) => {
    return orders.filter((order) => order.status === status).length;
  };

  const totalAmountOfAllOrders = orders.length;
  const completedOrders = filteredOrders(orders, "Completed");
  const pendingOrders = filteredOrders(orders, "Pending");
  const inProgressOrders = filteredOrders(orders, "InProgress");
  const canceledOrders = filteredOrders(orders, "Cancelled");

  const totalIncome = orders
    .filter((order) => order.status === "Completed")
    .map((order) => order.totalPrice)
    .reduce((acum, curr) => acum + curr);

  return (
    <React.Fragment>
      <Title>Statistics</Title>
      <Typography color="text.primary" component="p">
        Total amount of orders: {totalAmountOfAllOrders}
      </Typography>
      <Typography color="success.main" component="p">
        Completed: {completedOrders}
      </Typography>
      <Typography color="info.main" component="p">
        Pending: {pendingOrders}
      </Typography>
      <Typography color="warning.main" component="p">
        In Progress: {inProgressOrders}
      </Typography>
      <Typography color="error.main" component="p">
        Canceled: {canceledOrders}
      </Typography>
      <Typography color="text.primary" sx={{ flex: 1 }}>
        Total income of completed orders: $
        {completedOrders > 0 ? totalIncome : 0}
      </Typography>
    </React.Fragment>
  );
}
