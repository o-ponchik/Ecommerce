import React from "react";
import Orders from "../../../components/adminPage/Orders";

import DashboardPanel from "../../../components/adminPage/DashboardPanel";

import { client } from "../../../lib/client";

const OrdersPanel = ({ orders }) => {
  console.log("Orders from orders: ", orders);
  return (
    <DashboardPanel orders={orders}>
      {orders.map((order, index) => (
        <Orders order={order} key={order._id} num={index + 1} />
      ))}
    </DashboardPanel>
  );
};

export const getStaticProps = async () => {
  const ordersQuery = '*[_type == "order"]';
  const orders = await client.fetch(ordersQuery);

  return { props: { orders } };
};

export default OrdersPanel;

OrdersPanel.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
