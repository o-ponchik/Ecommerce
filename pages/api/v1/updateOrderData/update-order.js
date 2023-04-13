import { updateOrderStatus } from "../../../../lib/client";

const updateOrderData = async (req, res) => {
  if (req.method === "PUT") {
    const { orderId, property, value } = req.body;
    console.log({ orderId, property, value });
    try {
      if (orderId) {
        const response = await updateOrderStatus(orderId, property, value);
        console.log({ response });
        return res.json(response);
      } else {
        res.status(400);
        res.json({ message: "ID is missing" });
      }
    } catch (error) {
      res.status(500);
      res.json({ message: "Something went wrong", error });
    }
  }
};

export default updateOrderData;
