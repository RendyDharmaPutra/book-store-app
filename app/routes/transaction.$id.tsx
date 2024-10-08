import { LoaderFunctionArgs } from "@remix-run/node";
import { Await, defer, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import {
  getBooks,
  getDetailTransaction,
  getTransactionDetail,
} from "utils/db/queries/transaction";
import ErrorCard from "~/components/boundary/error_card";
import Loading from "~/components/boundary/loading";
import BookDisplay from "~/components/container/book_display";
import Amount from "~/components/form/amount";

export async function loader({ params }: LoaderFunctionArgs) {
  const books = getBooks();
  const transaction = getTransactionDetail(Number(params.id));
  const detail_transaction = getDetailTransaction(Number(params.id));

  return defer({
    books,
    transaction,
    detail_transaction,
  });
}

export default function AddBook() {
  const { books, transaction, detail_transaction } =
    useLoaderData<typeof loader>();

  return (
    <div className="page">
      <h1 className="title">Detail Transaksi</h1>
      <div className=" row-section gap-8 md:justify-between w-full h-[38rem] ">
        <Suspense fallback={<Loading />}>
          <Await resolve={transaction}>
            {(transaction) => (
              <section className="md:px-4 flex flex-col md:justify-normal items-start gap-8 md:gap-10 md:w-1/2 ">
                <h1 className="font-medium text-lg md:text-xl text-gray-800">
                  {transaction.time}
                </h1>
                <input type="hidden" name="user" value={transaction.user_id} />
                <div className="flex flex-row justify-start md:justify-center items-start  md:items-center gap-3  ">
                  <h2 className="font-medium text-gray-800 text-base md:text-lg">
                    Kasir :{" "}
                  </h2>
                  <h3 className="text-gray-600 text-base md:text-lg">
                    {transaction.user_name}
                  </h3>
                </div>
                <Amount amount={transaction.amount} />
              </section>
            )}
          </Await>
        </Suspense>
        <section className="flex flex-col items-center justify-between w-full md:w-[50rem] h-full ">
          <Suspense fallback={<Loading />}>
            <Await resolve={detail_transaction}>
              {(detail_transaction) => (
                <Await resolve={books}>
                  {(books) => (
                    <>
                      <BookDisplay
                        height="max-h-[26rem] "
                        books={books}
                        cart={detail_transaction}
                        deleteItem={null}
                      />
                    </>
                  )}
                </Await>
              )}
            </Await>
          </Suspense>
        </section>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <ErrorCard name="Transaksi" route="/transaction" />;
}
