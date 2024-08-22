import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Await,
  defer,
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { Suspense, useState } from "react";
import { getAccount } from "utils/db/queries/authenticate";
import { getUser, updateUser } from "utils/db/queries/users";
import { BookSchema, UserSchema } from "utils/validation";
import ErrorCard from "~/components/boundary/error_card";
import Loading from "~/components/boundary/loading";
import Divider from "~/components/container/divider";
import Input from "~/components/form/input";
import Select from "~/components/form/select";
import TextBox from "~/components/form/text_box";

export async function loader({ request }: LoaderFunctionArgs) {
  const account = getAccount(request);

  return defer({
    account,
  });
}

export default function Profile() {
  const { account } = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();

  const { state } = useNavigation();
  const pending = state === "submitting";

  const [roles, setRoles] = useState([
    { id: 1, name: "Admin" },
    { id: 0, name: "Non-Admin" },
  ]);

  return (
    <Form method="post" className="page">
      <h1 className="title">Profil Pengguna</h1>
      <div className="px-4 row-section justify-between gap-6">
        <Suspense fallback={<Loading />}>
          <Await resolve={account}>
            {(account: unknown) => {
              setRoles((prevItems) =>
                prevItems.filter(
                  (item) => String(item.id) === (account as account).admin
                )
              );
              return (
                <>
                  <input
                    type="hidden"
                    name="id"
                    value={(account as account).id}
                  />
                  <section className="form-section">
                    <TextBox
                      defaultValue={(account as account).username}
                      name="username"
                      label="Username"
                      type="text"
                      error={errors?.username || null}
                    />
                    <TextBox
                      defaultValue={(account as account).password}
                      name="password"
                      label="Password"
                      type="text"
                      error={errors?.password || null}
                    />
                    <TextBox
                      defaultValue={(account as account).name}
                      name="name"
                      label="Nama Lengkap"
                      type="text"
                      error={errors?.name || null}
                    />
                    <TextBox
                      defaultValue={(account as account).address}
                      name="address"
                      label="Alamat"
                      type="text"
                      error={errors?.address || null}
                    />
                    <TextBox
                      defaultValue={(account as account).year}
                      name="year"
                      label="Tahun Bergabung"
                      type="number"
                      error={errors?.year || null}
                    />
                  </section>
                  <Divider />
                  <section className="form-section md:w-fit">
                    <TextBox
                      defaultValue={(account as account).birth_date}
                      name="birth_date"
                      label="Tanggal Lahir"
                      type="date"
                      error={errors?.birth_date || null}
                    />
                    <Select
                      defaultValue={(account as account).admin}
                      name="role"
                      label="Role"
                      datas={roles}
                      error={errors?.admin || null}
                    />
                  </section>
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
      <button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        className={`mt-auto md:mt-0 self-end w-full md:w-fit ${
          pending ? "bg-gray-200 text-gray-800 btn" : "btn-primary"
        } h-[2.5rem] `}
      >
        {pending ? <Loading /> : "Simpan"}
      </button>
    </Form>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();

  const user = {
    username: String(body.get("username")),
    password: String(body.get("password")),
    name: String(body.get("name")),
    address: String(body.get("address")),
    birth_date: String(body.get("birth_date")),
    year: Number(body.get("year")),
    admin: Boolean(Number(body.get("role"))),
  };

  const validate = UserSchema.safeParse(user);

  if (!validate.success) {
    return json(validate.error.flatten().fieldErrors, { status: 400 });
  }

  console.log(validate.data.admin);

  const result = await updateUser(Number(body.get("id")), validate.data);

  if (result) return redirect("/");
}

export function ErrorBoundary() {
  return <ErrorCard name="Profile Pengguna" route="/" />;
}
