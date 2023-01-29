export default function createOrder(req, res) {
  if (req.method === "POST") {
    const reqPeyload = req?.body;

    console.log("Request Palyload:", reqPeyload);

    return res.json({ msg: "Hello world I am a response from POST request" });
  }

  return res.status(500).json({
    msg: "This is a GET request",
  });

  //   res.json(reqPeyload);
}
