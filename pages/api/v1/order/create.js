// import nc from "next-connect";
import axios from "axios";
import { client } from "../../../../lib/client";

// const handler = nc();

// handler.post(async (req, res) => {
//   const projectId = client.projectId;
//   const dataset = client.dataset;
//   const tokenWithWriteAccess = process.env.NEXT_PUBLIC_SANITY_TOKEN;
//   const { data } = await axios.post(
//     `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
//     {
//       mutations: [
//         {
//           create: {
//             _type: "order",
//             ...req.body,
//           },
//         },
//       ],
//     },
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${tokenWithWriteAccess}`,
//       },
//     }
//   );

//   res.status(201).send(data.results[0].id);
// });

// export default handler;

const createOrder = async (req, res) => {
  console.log("endpoint");
  console.log("Json parsing req.body: ", req.body);

  let parsedData;
  try {
    parsedData = req.body;
  } catch (error) {
    console.log("Parse Json req.body error: ", error);
    res.status(499).send("Parse Json error");
    return;
  }
  console.log("Parsed data successfull: ", parsedData);

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
