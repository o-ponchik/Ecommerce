import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

const dateTransform = (date) => {
  const transformedDate = new Date(date);

  return transformedDate.toLocaleString();
};

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders({ orders }) {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{dateTransform(order.createdAt)}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>
                {order.customer.address.city}, {order.customer.address.country}
              </TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell align="right">{`$${order.totalPrice}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
