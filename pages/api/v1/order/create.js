// import nc from "next-connect";
import axios from "axios";
import errors from "../../../../context/Constants";
import useForm from "../../../../hooks/use-form";

const createOrder = async (req, res) => {
  const projectId = "as16wqx5";
  const dataset = "production";
  const tokenWithWriteAccess = process.env.NEXT_PUBLIC_SANITY_TOKEN;
  const {
    isEmpty,
    validLenght,
    emailValidation: isEmailValid,
    phoneValidation: isPhoneValid,
  } = useForm();

  const { ERROR_INVALID_NAME, ERROR_INVALID_PHONE, ERROR_INVALID_EMAIL } =
    errors;

  const customer = req.body.customer;

  if (!validLenght(customer.name, 2)) {
    res
      .status(400)
      .json({ error: "Name is not valid", subcode: ERROR_INVALID_NAME });
  }

  if (isEmpty(customer.phone) || !isPhoneValid(customer.phone)) {
    res
      .status(400)
      .json({ error: "Phone is not valid", subcode: ERROR_INVALID_PHONE });
  }

  if (isEmpty(customer.email) || !isEmailValid(customer.email)) {
    res
      .status(400)
      .json({ error: "Email is not valid", subcode: ERROR_INVALID_EMAIL });
  }

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

  res.status(201).send(data);
};

export default createOrder;
