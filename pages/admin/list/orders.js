import React, { useState } from "react";
import Orders from "../../../components/adminPage/Orders";
import DashboardPanel from "../../../components/adminPage/DashboardPanel";
import { Pagination } from "@mui/material";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { client } from "../../../lib/client";
import Head from "next/head";

const OrdersPanel = ({ orders }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const filteredOrders = orders
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <Head>
        <title>Orders|Candles</title>
      </Head>
      <DashboardPanel orders={orders}>
        <Box>
          {filteredOrders.map((order, index) => (
            <Orders
              order={order}
              key={order._id}
              num={(page - 1) * itemsPerPage + index + 1}
              onOrderUpdate={refreshData}
            />
          ))}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "white",
              padding: "10px",
            }}
          >
            <Pagination
              size="small"
              color="primary"
              count={Math.ceil(orders.length / itemsPerPage)}
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </Box>
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
