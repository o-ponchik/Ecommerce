import React from "react";
import DashboardPanel from "../../../components/adminPage/DashboardPanel";
import { client } from "../../../lib/client";

const CustomersPanel = ({ orders }) => {
  return (
    <DashboardPanel orders={orders}>
      <div>Customers Panel</div>
    </DashboardPanel>
  );
};

export const getStaticProps = async () => {
  const ordersQuery = '*[_type == "order"]';
  const orders = await client.fetch(ordersQuery);

  return { props: { orders } };
};

export default CustomersPanel;

CustomersPanel.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
