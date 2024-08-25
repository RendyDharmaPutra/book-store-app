import { useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";

const useToast = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [show, setShow] = useState(false);

  const [type, setType] = useState("");

  useEffect(() => {
    const status = searchParams.get("status");
    if (status) {
      switch (status) {
        case "add":
          setType("Menambah");
          break;

        case "edit":
          setType("Mengubah");

          break;

        case "delete":
          setType("Menghapus");

        default:
          break;
      }

      setShow(true);

      let params = new URLSearchParams(searchParams);

      params.delete("status");
      setSearchParams(params);
    }
  }, [searchParams]);

  return { show, setShow, type };
};

export default useToast;
