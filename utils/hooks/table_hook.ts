import { useLocation } from "@remix-run/react";
import { useMemo } from "react";

type RouteMapType = typeof routeMap;
type RouteKey = keyof RouteMapType;

const routeMap = {
  "/": { headline: "Buku", type: "berjudul" },
  "/transaction": { headline: "Transaksi", type: "pada waktu" },
  "/users": { headline: "Karyawan", type: "bernama" },
  "/profile": { headline: "Profile", type: "bernama" },
} as const;

const useTable = () => {
  const location = useLocation();
  const path = location.pathname as RouteKey;

  return useMemo(() => {
    return routeMap[path] || { headline: "Default", type: "Default" };
  }, [path]);
};

export default useTable;
