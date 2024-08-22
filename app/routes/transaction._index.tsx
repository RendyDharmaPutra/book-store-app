import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Await, defer, redirect, useLoaderData } from "@remix-run/react";
import { QueryResult } from "pg";
import { Suspense } from "react";
import {
  deleteDetail,
  deleteTransaction,
  getTransaction,
} from "utils/db/queries/transaction";
import Loading from "~/components/boundary/loading";
import ActionBar from "~/components/container/action_bar";
import Pagination from "~/components/container/pagination";
import Table from "~/components/container/table";

export async function loader({ request }: LoaderFunctionArgs) {
  const url: URL = new URL(request.url);
  const search: string = url.searchParams.get("search") || "";
  const page: number = Number(url.searchParams.get("page") || "1");

  const transactions = getTransaction(search, page);

  return defer({
    transactions,
  });
}

export default function Transaction() {
  const { transactions } = useLoaderData<typeof loader>();
  const heads = ["Waktu", "Total Harga", "Kasir"];

  const values = ["time", "amount", "user"];

  return (
    <div className="page">
      <h1 className="title">Daftar Transaksi</h1>
      <ActionBar route="Transaksi" addRoute="addTransaction" />
      <section className="flex flex-col w-full items-center sm:items-start">
        <Suspense fallback={<Loading />}>
          <Await resolve={transactions}>
            {(transaction) => (
              <Table heads={heads} values={values} datas={transaction} />
            )}
          </Await>
        </Suspense>
      </section>
      <Pagination />
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const body: FormData = await request.formData();
  const id: number = Number(body.get("idBook"));

  let result: QueryResult<never>;
  const resultDetail = await deleteDetail(id);
  if (resultDetail) {
    result = await deleteTransaction(id);
  }

  if (result!) return redirect("/transaction");
}
