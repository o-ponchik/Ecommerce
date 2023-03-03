import React from "react";
import Dashboard from "../../components/adminPage/Dashboard";
import { AdminContext } from "../../context/AdminContext";
import { client } from "../../lib/client";

const Admin = ({ orders }) => {
  return (
    <>
      <AdminContext>
        <Dashboard orders={orders} />
      </AdminContext>
    </>
  );
};

export const getStaticProps = async () => {
  const ordersQuery = '*[_type == "order"]';
  const orders = await client.fetch(ordersQuery);

  return { props: { orders } };
};

export default Admin;
