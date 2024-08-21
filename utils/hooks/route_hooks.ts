import { useLocation } from "@remix-run/react";

const useRoute = () => {
  const pathname = useLocation().pathname;

  const path = pathname.split("/");

  const routes = [
    { route: "/", page: "Buku" },
    { route: "/transaction", page: "Transaksi" },
    { route: "/users", page: "Karyawan" },
  ];

  return { path, routes };
};

export default useRoute;
