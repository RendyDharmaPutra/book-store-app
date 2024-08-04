import { Link } from "@remix-run/react";
import ModalButton from "../modal/modal_button";
import NotFound from "../boundary/not_found";

export default function Table({
  route,
  heads,
  values,
  datas,
}: {
  route: string;
  heads: string[];
  values: string[];
  datas: book[] | transactionTable[];
}): JSX.Element {
  return (
    <div className="flex flex-col w-[95%] sm:w-full h-[36rem] sm:h-[32rem] overflow-auto rounded-lg text-gray-800 bg-zinc-50">
      {datas.length == 0 ? (
        <NotFound />
      ) : (
        <table className="text-left table-auto md:table-fixed">
          <thead className="bg-zinc-100">
            <tr>
              {heads.map((head) => (
                <THead name={head} />
              ))}
              <THead name="Aksi" />
            </tr>
          </thead>
          <tbody>
            {datas.map((data) => (
              <TBody key={data.id} heads={values} data={data} route={route} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function THead({ name }: { name: string }): JSX.Element {
  return (
    <th className="p-4 border-b border-gray-200">
      <p className="block text-sm antialiased font-semibold leading-none text-gray-600">
        {name}
      </p>
    </th>
  );
}

function TBody({
  route,
  heads,
  data,
}: {
  route: string;
  heads: string[];
  data: book | transactionTable;
}): JSX.Element {
  let modalInfo: string;

  if ("title" in data) {
    modalInfo = data.title;
  } else {
    modalInfo = data.time;
  }

  return (
    <tr>
      {heads.map((head) => (
        <TCol content={data[head as keyof typeof data]} />
      ))}
      <td className="p-4 flex flex-col md:flex-row gap-2 border-b border-gray-50">
        <Link
          prefetch="viewport"
          to={`${data.id}`}
          className="tbutton text-primary"
        >
          Detail
        </Link>
        <ModalButton id={data.id} title={modalInfo} />
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
