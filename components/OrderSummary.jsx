import * as React from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { Button } from "@mui/material";
import { useStateContext } from "../context/StateContext";
import { FormattedMessage } from "react-intl";

export default function OrderSummary(props) {
  const { cartItems, totalPrice, toggleCartItemQuantity, onRemove, language } =
    useStateContext();

  return (
    <React.Fragment>
      <Typography variant="h6" color="secondary" gutterBottom>
        <FormattedMessage id="h2.orderSummury" />
      </Typography>

      <TableContainer component={Paper} sx={{ overflow: "hidden" }}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableBody>
            {cartItems.map((product, index) => (
              <TableRow
                key={product.name[language]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="product">
                  <Typography variant="subtitle1" gutterBottom>
                    {product.name[language]}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    <FormattedMessage id="quantity.slug.text" />:{" "}
                    {product.quantity}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ width: "fit-content" }}>
                    <p className="quantity-desc checkout">
                      <span
                        className="minus"
                        onClick={() =>
                          toggleCartItemQuantity(product._id, "dec")
                        }
                      >
                        <AiOutlineMinus />
                      </span>

                      <span className="num">{product.quantity}</span>
                      <span
                        className="plus"
                        onClick={() =>
                          toggleCartItemQuantity(product._id, "inc")
                        }
                      >
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="left">₴{product.price}</TableCell>
                <TableCell>
                  <Button
                    className="remove-item"
                    type="button"
                    onClick={() => onRemove(product)}
                  >
                    <TiDeleteOutline />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  <FormattedMessage id="total.text" />:
                </Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  ₴{totalPrice}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
