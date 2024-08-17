import { Link } from "@remix-run/react";
import ModalButton from "../modal/modal_button";
import NotFound from "../boundary/not_found";
import { memo } from "react";

const THead = memo(({ name }: { name: string }): JSX.Element => {
  return (
    <th className="p-4 border-b border-gray-200">
      <p className="block text-sm antialiased font-semibold leading-none text-gray-600">
        {name}
      </p>
    </th>
  );
});

function TBody({
  heads,
  data,
}: {
  heads: string[];
  data: book | transactionTable | userTable;
}): JSX.Element {
  let modalInfo: string;
  let headline: string;

  if ("title" in data) {
    modalInfo = data.title;
    headline = "Buku";
  } else if ("name" in data) {
    modalInfo = data.name;
    headline = "Karyawan";
  } else {
    modalInfo = data.time;
    headline = "Transaksi";
  }

  return (
    <tr>
      {heads.map((head, index) => (
        <TCol key={index} content={data[head as keyof typeof data]} />
      ))}
      <td className="p-4 flex flex-col md:flex-row gap-2 border-b border-gray-50">
        <Link
          prefetch="viewport"
          to={`${data.id}`}
          className="tbutton text-primary"
        >
          Detail
        </Link>
        <ModalButton
          key={data.id}
          headline={headline}
          id={data.id}
          title={modalInfo}
        />
      </td>
    </tr>
  );
}

function TCol({ content }: { content: string | number }): JSX.Element {
  return (
    <td className="p-4 border-b border-gray-50">
      <p className="block text-sm antialiased font-normal leading-normal text-gray-800">
        {content}
      </p>
    </td>
  );
}

const Table = memo(
  ({
    heads,
    values,
    datas,
  }: {
    heads: string[];
    values: string[];
    datas: book[] | transactionTable[] | userTable[];
  }): JSX.Element => {
    let headline: string;
    if ("Judul" in heads) {
      headline = "Buku";
    } else if ("Kasir" in heads) {
      headline = "Transaksi";
    } else {
      headline = "Karyawan";
    }
    return (
      <div className="flex flex-col w-[95%] sm:w-full h-[36rem] sm:h-[32rem] overflow-auto rounded-lg text-gray-800 bg-zinc-50">
        {datas.length == 0 ? (
          <NotFound headline={headline} />
        ) : (
          <table className="text-left table-auto md:table-fixed">
            <thead className="bg-zinc-100">
              <tr>
                {heads.map((head, index) => (
                  <THead key={index} name={head} />
                ))}
                <THead name="Aksi" />
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <TBody key={index} heads={values} data={data} />
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
