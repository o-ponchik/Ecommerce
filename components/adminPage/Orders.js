import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const dateTransform = (date) => {
  const transformedDate = new Date(date);

  return transformedDate.toLocaleString();
};

export default function Orders({ order, num }) {
  console.log(order);

  const { name, phone, email, details } = order.customer;
  const { street, city, country, state, zipCode } = order.customer.address;

  let colorStatusOrder;
  let orderStatusText;

  if (order.status === "Pending") {
    colorStatusOrder = "#e1f5fe";
    orderStatusText = "#01579b";
  } else if (order.status === "inProgress") {
    colorStatusOrder = "#fff8e1";
    orderStatusText = "#f57f17";
  } else if (order.status === "completed") {
    colorStatusOrder = "#e8f5e9";
    orderStatusText = "#2e7d32";
  } else {
    colorStatusOrder = "#ffebee";
    orderStatusText = "#b71c1c";
  }

  const boldStyleHead = {
    fontWeight: "700",
    color: "#004d40",
    fontSize: "18px",
  };
  const orderStatusStyle = {
    fontWeight: "700",
    color: orderStatusText,
    fontSize: "18px",
  };
  const styleHeaders = {
    fontWeight: "700",
    color: "black",
    fontSize: "16px",
  };

  return (
    <TableContainer component={Paper} style={{ marginBottom: "2rem" }}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead style={{ backgroundColor: colorStatusOrder }}>
          <TableRow>
            <TableCell align="left" style={boldStyleHead}>
              Order № {num}
            </TableCell>
            <TableCell align="left" colSpan={2}>
              {dateTransform(order.createdAt)}
            </TableCell>
            <TableCell align="center" style={orderStatusStyle}>
              {order.status}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell style={styleHeaders} align="left">
              Name
            </TableCell>
            <TableCell style={styleHeaders} align="left">
              Email
            </TableCell>
            <TableCell style={styleHeaders} align="left">
              Phone
            </TableCell>
            <TableCell style={styleHeaders} align="center">
              Address
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell align="left">{phone}</TableCell>
            <TableCell align="left">{email}</TableCell>
            <TableCell align="center">
              {street}, {city},{state ? state : ""},{country}, {zipCode}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell style={styleHeaders} align="left" colSpan={2}>
              Products
            </TableCell>
            <TableCell style={styleHeaders} align="center">
              Qty
            </TableCell>
            <TableCell style={styleHeaders} align="center">
              Price x 1
            </TableCell>
          </TableRow>

          {order.orderItems.map((item) => (
            <TableRow key={item._id}>
              <TableCell colSpan={2}>{item.name}</TableCell>
              <TableCell align="center">{item.quantity}</TableCell>
              <TableCell align="center">{item.price} $</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell style={styleHeaders}>Detaiils:</TableCell>
            <TableCell colSpan={3}>{details ? details : "-"}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell style={styleHeaders} colSpan={3}>
              Total
            </TableCell>
            <TableCell style={styleHeaders} align="center">
              {order.totalPrice} $
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="center" style={styleHeaders}>
              Is Paid:
            </TableCell>
            <TableCell align="center">
              {order.isPaid ? `Yes - ${dateTransform(order.paidAt)}` : "No"}
            </TableCell>
            <TableCell align="center" style={styleHeaders}>
              Is Delivered:
            </TableCell>
            <TableCell align="center">
              {order.isDelivered
                ? `Yes - ${dateTransform(order.deliveredAt)}`
                : "No"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
