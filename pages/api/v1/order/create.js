// import nc from "next-connect";
import axios from "axios";

const createOrder = async (req, res) => {
  console.log("endpoint");

  const projectId = "as16wqx5";
  const dataset = "production";
  const tokenWithWriteAccess = process.env.NEXT_PUBLIC_SANITY_TOKEN;
  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v2021-10-21/data/mutate/${dataset}`,
    {
      mutations: [
        {
          create: {
            _type: "order",
            createdAt: new Date().toISOString(),
            ...req.body,
          },
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
  );
  console.log("data ", data);

  res.status(201).send(data);
};

export default createOrder;
