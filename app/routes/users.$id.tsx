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
import { Suspense } from "react";
import { getUser, updateUser } from "utils/db/queries/users";
import { BookSchema, UserSchema } from "utils/validation";
import ErrorCard from "~/components/boundary/error_card";
import Loading from "~/components/boundary/loading";
import Divider from "~/components/container/divider";
import Select from "~/components/form/select";
import TextBox from "~/components/form/text_box";

export async function loader({ params }: LoaderFunctionArgs) {
  const user = getUser(Number(params.id));

  return defer({
    user,
  });
}

export default function EditUser() {
  const { user } = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();

  const { state } = useNavigation();
  const pending = state === "submitting";

  const roles = [
    { id: 1, name: "Admin" },
    { id: 0, name: "Non-Admin" },
  ];

  return (
    <Form method="post" className="page">
      <h1 className="title">Edit Karyawan</h1>
      <div className="px-4 row-section justify-between gap-6">
        <Suspense fallback={<Loading />}>
          <Await resolve={user}>
            {(user) => {
              return (
                <>
                  <input type="hidden" name="id" value={user.id} />
                  <section className="form-section">
                    <TextBox
                      defaultValue={user.username}
                      name="username"
                      label="Username"
                      type="text"
                      error={errors?.username || null}
                    />
                    <TextBox
                      defaultValue={user.password}
                      name="password"
                      label="Password"
                      type="text"
                      error={errors?.password || null}
                    />
                    <TextBox
                      defaultValue={user.name}
                      name="name"
                      label="Nama Lengkap"
                      type="text"
                      error={errors?.name || null}
                    />
                    <TextBox
                      defaultValue={user.address}
                      name="address"
                      label="Alamat"
                      type="text"
                      error={errors?.address || null}
                    />
                    <TextBox
                      defaultValue={user.year}
                      name="year"
                      label="Tahun Bergabung"
                      type="number"
                      error={errors?.year || null}
                    />
                  </section>
                  <Divider />
                  <section className="form-section md:w-fit">
                    <TextBox
                      defaultValue={user.birth_date}
                      name="birth_date"
                      label="Tanggal Lahir"
                      type="date"
                      error={errors?.birth_date || null}
                    />
                    <Select
                      defaultValue={user.admin}
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

  const result = await updateUser(Number(body.get("id")), validate.data);

  if (result) return redirect("/users");
}

export function ErrorBoundary() {
  return <ErrorCard name="Karyawan" route="/users" />;
}
