import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";

const dateTransform = (date) => {
  const transformedDate = new Date(date);

  return transformedDate.toLocaleString();
};

export default function Orders({ order, num }) {
  const { name, phone, email, details } = order.customer;
  const { street, city, country, state, zipCode } = order.customer.address;
  const [open, setOpen] = React.useState(false);

  order.status = order.status[0].toUpperCase() + order.status.slice(1);

  let colorStatusOrder;
  let orderStatusText;

  if (order.status === "Pending") {
    colorStatusOrder = "#e1f5fe";
    orderStatusText = "#01579b";
  } else if (order.status === "InProgress") {
    colorStatusOrder = "#fff8e1";
    orderStatusText = "#f57f17";
  } else if (order.status === "Completed") {
    colorStatusOrder = "#e8f5e9";
    orderStatusText = "#2e7d32";
  } else {
    colorStatusOrder = "#ffebee";
    orderStatusText = "#b71c1c";
  }

  const boldStyleHead = {
    fontWeight: "700",
    color: "#212121",
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
    backgroundColor: "#f5f5f5",
  };

  return (
    <TableContainer component={Paper} style={{ marginBottom: "1rem" }}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table" size="small">
        <TableHead style={{ backgroundColor: colorStatusOrder }}>
          <TableRow sx={{ "& > *": { borderBottom: "none" } }}>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell align="left" style={boldStyleHead}>
              Order № {num}
            </TableCell>
            <TableCell align="center">
              {dateTransform(order.createdAt)}
            </TableCell>
            <TableCell align="right" style={orderStatusStyle} width="30%">
              {order.status}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <TableRow>
                    <TableCell style={styleHeaders} align="left" width="25%">
                      Name
                    </TableCell>
                    <TableCell style={styleHeaders} align="left" width="25%">
                      Phone
                    </TableCell>
                    <TableCell style={styleHeaders} align="left" width="25%">
                      Email
                    </TableCell>
                    <TableCell style={styleHeaders} width="25%">
                      Address
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>{name}</TableCell>
                    <TableCell align="left">{phone}</TableCell>
                    <TableCell align="left">{email}</TableCell>
                    <TableCell>
                      {street}, {city},{state ? state : ""},{country}, {zipCode}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell style={styleHeaders} align="left" colSpan={2}>
                      Products
                    </TableCell>
                    <TableCell style={styleHeaders} align="left">
                      Qty
                    </TableCell>
                    <TableCell style={styleHeaders}>Price x 1</TableCell>
                  </TableRow>

                  {order.orderItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell colSpan={2}>{item.name}</TableCell>
                      <TableCell align="left">{item.quantity}</TableCell>
                      <TableCell>{item.price} $</TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell style={styleHeaders}>Details:</TableCell>
                    <TableCell colSpan={3}>{details ? details : "-"}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell style={styleHeaders} colSpan={3}>
                      Total Price:
                    </TableCell>
                    <TableCell style={styleHeaders}>
                      {order.totalPrice} $
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell style={styleHeaders}>Is Paid:</TableCell>
                    <TableCell>
                      {order.isPaid
                        ? `Yes - ${dateTransform(order.paidAt)}`
                        : "No"}
                    </TableCell>
                    <TableCell style={styleHeaders}>Is Delivered:</TableCell>
                    <TableCell>
                      {order.isDelivered
                        ? `Yes - ${dateTransform(order.deliveredAt)}`
                        : "No"}
                    </TableCell>
                  </TableRow>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
