import React from "react";
import Orders from "../../../components/adminPage/Orders";
import { useRouter } from "next/router";
import DashboardPanel from "../../../components/adminPage/DashboardPanel";
import { client } from "../../../lib/client";
import Head from "next/head";

const OrdersPanel = ({ orders }) => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <>
      <Head>
        <title>Orders|Candles</title>
      </Head>
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
    </>
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
