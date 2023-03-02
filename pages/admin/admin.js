import React from "react";
import Dashboard from "../../components/admin/Dashboard";
import { client } from "../../lib/client";

const Admin = ({ orders }) => {
  return (
    <>
      <Dashboard orders={orders} />
    </>
  );
};

export const getStaticProps = async () => {
  const ordersQuery = '*[_type == "order"]';
  const orders = await client.fetch(ordersQuery);

  return { props: { orders } };
};

export default Admin;
