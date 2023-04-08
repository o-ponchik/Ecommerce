import React, { useEffect } from "react";

import { AdminContext } from "../../context/AdminContext";

import DashboardPanel from "../../components/adminPage/DashboardPanel";
import Dashboard from "../../components/adminPage/Dashboard";
import { client } from "../../lib/client";

const Admin = ({ orders }) => {
  return (
    <>
      <AdminContext>
        <DashboardPanel orders={orders}>
          <Dashboard orders={orders} />
        </DashboardPanel>
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

Admin.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
