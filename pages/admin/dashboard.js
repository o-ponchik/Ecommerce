import React, { useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import DashboardPanel from "../../components/adminPage/DashboardPanel";
import Dashboard from "../../components/adminPage/Dashboard";
import { client } from "../../lib/client";
import { useAdminContext } from "../../context/AdminContext";
import { useRouter } from "next/router";

const Admin = ({ orders }) => {
  const router = useRouter();
  const { isUpdated, setIsUpdated } = useAdminContext();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  if (isUpdated) {
    refreshData();
    setIsUpdated(false);
  }

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

export const getServerSideProps = async () => {
  const ordersQuery = '*[_type == "order"]';
  const orders = await client.fetch(ordersQuery);

  return { props: { orders } };
};

export default Admin;

Admin.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
