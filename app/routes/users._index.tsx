import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Await, defer, redirect, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { deleteUser, getUsers } from "utils/db/queries/users";
import useToast from "utils/hooks/toast_hooks";
import Loading from "~/components/boundary/loading";
import ActionBar from "~/components/container/action_bar";
import Pagination from "~/components/container/pagination";
import Table from "~/components/container/table";
import AccountModal from "~/components/modal/toast";

export async function loader({ request }: LoaderFunctionArgs) {
  const url: URL = new URL(request.url);
  const search: string = url.searchParams.get("search") || "";
  const page: number = Number(url.searchParams.get("page") || "1");

  const users = getUsers(search, page);

  return defer(
    {
      users,
    },
    {
      headers: {
        "Cache-control": "no-store",
      },
    }
  );
}

export default function Users() {
  // TODO : FIX ERROR SAAT HAPUS DATA USER
  const { users } = useLoaderData<typeof loader>();

  const { show, setShow, type } = useToast();

  const heads = [
    "Username",
    "Nama",
    "Alamat",
    "Tanggal Lahir",
    "Tahun Bergabung",
    "Role",
  ];

  const values = ["username", "name", "address", "birthDate", "year", "role"];

  return (
    <div className="page">
      <h1 className="title">Daftar Karyawan</h1>
      <ActionBar route="Karyawan" addRoute="addUser" />
      <section className="flex flex-col w-full items-center sm:items-start">
        <Suspense fallback={<Loading />}>
          <Await resolve={users}>
            {(users) => <Table heads={heads} values={values} datas={users} />}
          </Await>
        </Suspense>
      </section>
      <Pagination />
      <AccountModal
        type={type}
        status="primary"
        isOpen={show}
        setShow={setShow}
      />
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const body: FormData = await request.formData();
  const idBook: number = Number(body.get("idBook"));

  const result = await deleteUser(idBook);

  if (result) return redirect("/users?status=delete");
}
