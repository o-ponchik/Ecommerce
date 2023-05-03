import * as React from "react";
import toast from "react-hot-toast";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAdminContext } from "../../context/AdminContext";

const dateTransform = (date) => {
  const transformedDate = new Date(date);

  return transformedDate.toLocaleString();
};

export default function Orders({ order, num, onOrderUpdate }) {
  const { name, phone, email, details } = order.customer;
  const { street, city, country, state, zipCode } = order.customer.address;
  const [open, setOpen] = React.useState(false);
  order.status = order.status[0].toUpperCase() + order.status.slice(1);
  const [orderStatus, setOrderStatus] = React.useState(order.status);
  const { setIsUpdated } = useAdminContext();

  console.log({ order });

  let colorStatusOrder;
  let orderStatusText;

  if (orderStatus === "Pending") {
    colorStatusOrder = "#e1f5fe";
    orderStatusText = "#01579b";
  } else if (orderStatus === "InProgress") {
    colorStatusOrder = "#fff8e1";
    orderStatusText = "#f57f17";
  } else if (orderStatus === "Completed") {
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

  const handleChangeOrderData = async (e, property) => {
    const resPromise = new Promise(async (resolve, reject) => {
      try {
        const value =
          property === "deliveredAt" || property === "paidAt"
            ? e
            : e.target.value;

        const response = fetch("/api/v1/order/update-order", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: order._id,
            property,
            value: value,
          }),
        });

        const updatedOrder = await response;

        resolve(updatedOrder);

        if (property === "status") {
          setOrderStatus(e.target.value);
        }

        onOrderUpdate();
        setIsUpdated(true);
      } catch (error) {
        console.error("Error updating order data", error);
        reject(error);
      }
    });

    toast.promise(resPromise, {
      loading: "Loading...",
      success: "Has changed",
      error: "Error occurred during updating data",
    });
  };

  return (
    <TableContainer component={Paper} style={{ marginBottom: "1rem" }}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table" size="small">
        <TableHead style={{ backgroundColor: colorStatusOrder }}>
          <TableRow
            onClick={(event) => {
              if (event.target.tagName.toLowerCase() !== "select") {
                setOpen(!open);
              }
            }}
          >
            <TableCell align="left" style={boldStyleHead}>
              {order.orderNumber
                ? `Order: ${order.orderNumber}`
                : `Order: ${num}`}
            </TableCell>
            <TableCell align="center">
              {dateTransform(order.createdAt)}
            </TableCell>
            <TableCell>
              <FormControl
                fullWidth
                onChange={(e) => {
                  handleChangeOrderData(e, "status");
                }}
              >
                <NativeSelect defaultValue={orderStatus}>
                  <option style={orderStatusStyle} value="Pending">
                    Pending
                  </option>
                  <option style={orderStatusStyle} value="InProgress">
                    InProgress
                  </option>
                  <option style={orderStatusStyle} value="Completed">
                    Completed
                  </option>
                  <option value="Cancelled">Cancelled</option>
                </NativeSelect>
              </FormControl>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ overflowX: "overlay" }}>
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
                    <TableCell style={styleHeaders} align="left" width="25%">
                      Created At
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>{name}</TableCell>
                    <TableCell align="left">{phone}</TableCell>
                    <TableCell align="left">{email}</TableCell>
                    <TableCell align="left">
                      {dateTransform(order.createdAt)}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell style={styleHeaders} width="25%">
                      Street
                    </TableCell>
                    <TableCell style={styleHeaders} width="25%">
                      City, State
                    </TableCell>
                    <TableCell style={styleHeaders} width="25%">
                      Country
                    </TableCell>
                    <TableCell style={styleHeaders} width="25%">
                      Zip Code
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>{street}</TableCell>
                    <TableCell>
                      {city} {state ? `, ${state}` : ""}
                    </TableCell>
                    <TableCell>{country}</TableCell>
                    <TableCell>{zipCode}</TableCell>
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
                    <TableCell style={styleHeaders}>Is Paid:</TableCell>

                    <TableCell>
                      <FormControl fullWidth>
                        <NativeSelect
                          defaultValue={order.isPaid === true ? true : false}
                          style={{ padding: "0.2rem" }}
                          onChange={(e) => {
                            handleChangeOrderData(e, "isPaid");
                          }}
                        >
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </NativeSelect>
                      </FormControl>
                    </TableCell>

                    <TableCell style={styleHeaders}>Paid Date:</TableCell>

                    <TableCell>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="en-gb"
                      >
                        <DatePicker
                          onChange={(e) => {
                            const isoDateString = e.toISOString();
                            handleChangeOrderData(isoDateString, "paidAt");
                          }}
                          defaultValue={order.paidAt ? dayjs(order.paidAt) : ""}
                        />
                      </LocalizationProvider>
                    </TableCell>
                    {/* <TableCell>
                      {order.paidAt ? dateTransform(order.paidAt) : ""}
                    </TableCell> */}
                  </TableRow>

                  <TableRow>
                    <TableCell style={styleHeaders}>Is Delivered:</TableCell>

                    <TableCell>
                      <FormControl fullWidth>
                        <NativeSelect
                          defaultValue={
                            order.isDelivered === true ? true : false
                          }
                          style={{ padding: "0.2rem" }}
                          onChange={(e) => {
                            handleChangeOrderData(e, "isDelivered");
                          }}
                        >
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </NativeSelect>
                      </FormControl>
                    </TableCell>

                    <TableCell style={styleHeaders}>Delivered Date:</TableCell>

                    <TableCell>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="en-gb"
                      >
                        <DatePicker
                          onChange={(e) => {
                            const isoDateString = e.toISOString();
                            handleChangeOrderData(isoDateString, "deliveredAt");
                          }}
                          defaultValue={
                            order.deliveredAt ? dayjs(order.deliveredAt) : ""
                          }
                        />
                      </LocalizationProvider>
                    </TableCell>
                    {/* <TableCell>
                      {order.deliveredAt
                        ? dateTransform(order.deliveredAt)
                        : ""}
                    </TableCell> */}
                  </TableRow>

                  <TableRow>
                    <TableCell style={styleHeaders} colSpan={3}>
                      Total Price:
                    </TableCell>
                    <TableCell style={styleHeaders}>
                      {order.totalPrice} $
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
