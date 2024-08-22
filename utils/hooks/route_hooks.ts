import { useLocation } from "@remix-run/react";
import { useState } from "react";

const useRoute = () => {
  const pathname = useLocation().pathname;

  const [routes, setRoutes] = useState([
    { route: "/", page: "Buku" },
    { route: "/transaction", page: "Transaksi" },
    { route: "/users", page: "Karyawan" },
  ]);

  const path = pathname.split("/");

  return { path, routes, setRoutes };
};

export default useRoute;
