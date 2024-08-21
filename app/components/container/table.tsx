import { Link } from "@remix-run/react";
import ModalButton from "../modal/modal_button";
import NotFound from "../boundary/not_found";
import { memo } from "react";
import useTable from "utils/hooks/table_hook";

type TableProps = {
  heads: string[];
  values: string[];
  datas: book[] | transactionTable[] | userTable[];
};

type THeadProps = {
  name: string;
};

type TBodyProps = {
  headline: string;
  type: string;
  heads: string[];
  data: book | transactionTable | userTable;
};

type TColProps = {
  content: string | number;
};

const THead = memo((props: THeadProps) => {
  return (
    <th className="p-4 border-b border-gray-200 ">
      <p className="block text-sm antialiased font-medium leading-none text-gray-500">
        {props.name}
      </p>
    </th>
  );
});

function TBody(props: TBodyProps) {
  const modalInfo =
    "title" in props.data
      ? props.data.title
      : "name" in props.data
      ? props.data.name
      : props.data.time;

  return (
    <tr>
      {props.heads.map((head, index) => (
        <TCol
          key={index}
          content={props.data[head as keyof typeof props.data]}
        />
      ))}
      <td className="p-4 flex flex-col md:flex-row gap-2 border-b border-gray-50">
        <Link
          prefetch="viewport"
          to={`${props.data.id}`}
          className="tbutton text-primary"
        >
          Detail
        </Link>
        <ModalButton
          key={props.data.id}
          headline={props.headline}
          type={props.type}
          id={props.data.id}
          title={modalInfo}
        />
      </td>
    </tr>
  );
}

function TCol(props: TColProps) {
  return (
    <td className="p-4 border-b border-gray-50">
      <p className="block text-sm antialiased font-normal leading-normal text-gray-800">
        {props.content}
      </p>
    </td>
  );
}

const Table = memo(
  (props: TableProps) => {
    const { headline, type } = useTable();

    return (
      <div className="flex flex-col w-[95%] sm:w-full h-[36rem] sm:h-[32rem] overflow-auto rounded-lg text-gray-800 border border-gray-200">
        {props.datas.length == 0 ? (
          <NotFound headline={headline} />
        ) : (
          <table className="text-left table-auto md:table-fixed">
            <thead className="">
              <tr>
                {props.heads.map((head, index) => (
                  <THead key={index} name={head} />
                ))}
                <THead name="Aksi" />
              </tr>
            </thead>
            <tbody>
              {props.datas.map((data, index) => (
                <TBody
                  key={index}
                  headline={headline}
                  type={type}
                  heads={props.values}
                  data={data}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.datas === nextProps.datas
);

export default Table;
