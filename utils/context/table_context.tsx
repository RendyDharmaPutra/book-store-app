import { createContext, useContext, useMemo } from "react";
import useTable from "utils/hooks/table_hook";

export interface TableInfoType {
  headline: string;
  type: string;
}

const TableInfoContext = createContext<TableInfoType | undefined>(undefined);

export const TableInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { headline, type } = useTable();

  const contextValue = useMemo(() => {
    console.log("Context Value");
    return { headline, type };
  }, [headline, type]);

  return (
    <TableInfoContext.Provider value={contextValue}>
      {children}
    </TableInfoContext.Provider>
  );
};

export const useTableInfo = () => {
  const context = useContext(TableInfoContext);
  // console.log(`Context`);
  if (context === undefined) {
    throw new Error("useTableInfo must be used within a TableInfoProvider");
  }
  return context;
};
