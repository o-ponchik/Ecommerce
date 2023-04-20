import React from "react";
import Orders from "../../../components/adminPage/Orders";
import { useRouter } from "next/router";

import DashboardPanel from "../../../components/adminPage/DashboardPanel";

import { client } from "../../../lib/client";

const OrdersPanel = ({ orders }) => {
  const router = useRouter();

  const refreshData = () => {
    console.log("refreshing data");
    router.replace(router.asPath);
  };

  return (
    <DashboardPanel orders={orders}>
      {orders.map((order, index) => (
        <Orders
          order={order}
          key={order._id}
          num={index + 1}
          onOrderUpdate={refreshData}
        />
      ))}
    </DashboardPanel>
  );
};

export const getServerSideProps = async () => {
  const ordersQuery = '*[_type == "order"]';
  const orders = await client.fetch(ordersQuery);

  return { props: { orders } };
};

export default OrdersPanel;

OrdersPanel.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
