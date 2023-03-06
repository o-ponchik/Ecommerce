import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function Orders() {
  const boldStyleHead = {
    fontWeight: "700",
    color: "#004d40",
    fontSize: "18px",
  };
  const orderStatusStyle = {
    fontWeight: "700",
    color: "green",
    fontSize: "18px",
  };
  const styleHeaders = {
    fontWeight: "700",
    color: "black",
    fontSize: "16px",
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="left" style={boldStyleHead}>
              Order № 123
            </TableCell>
            <TableCell align="left" colSpan={2}>
              10/03/23 17:43
            </TableCell>
            <TableCell align="center" style={orderStatusStyle}>
              Pending
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
            <TableCell>Mariia</TableCell>
            <TableCell align="left">0934567890</TableCell>
            <TableCell align="left">mariia@gmail.com</TableCell>
            <TableCell align="center">
              98 Maple rd, Toronto, ON, Canada, 3R4T5Y
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

          <TableRow>
            <TableCell colSpan={2}>Candles Set 3</TableCell>
            <TableCell align="center">2</TableCell>
            <TableCell align="center">30$</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Candles Set 3</TableCell>
            <TableCell align="center">2</TableCell>
            <TableCell align="center">30$</TableCell>
          </TableRow>

          <TableRow>
            <TableCell style={styleHeaders}>Detaiils:</TableCell>
            <TableCell colSpan={3}>
              I want two yellow and one blue candles
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell style={styleHeaders} colSpan={3}>
              Total
            </TableCell>
            <TableCell style={styleHeaders} align="center">
              60$
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="center" style={styleHeaders}>
              Is Paid:
            </TableCell>
            <TableCell align="center">Yes 12/03/23</TableCell>
            <TableCell align="center" style={styleHeaders}>
              Is Delivered:
            </TableCell>
            <TableCell align="center">No</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
