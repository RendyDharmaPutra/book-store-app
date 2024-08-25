import { ActionFunctionArgs } from "@remix-run/node";
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import { UserSchema } from "utils/validation";
import TextBox from "~/components/form/text_box";
import Select from "~/components/form/select";
import { insertUser } from "utils/db/queries/users";
import Divider from "~/components/container/divider";
import Loading from "~/components/boundary/loading";

export default function AddBook() {
  const errors = useActionData<typeof action>();

  const { state } = useNavigation();
  const pending = state === "submitting";

  const roles = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Non-Admin" },
  ];

  return (
    <Form method="post" className="page">
      <h1 className="title">Tambah Karyawan</h1>
      <div className="px-4 row-section justify-between gap-6">
        <section className="form-section ">
          <TextBox
            defaultValue=""
            name="username"
            label="Username"
            type="text"
            error={errors?.username || null}
          />
          <TextBox
            defaultValue=""
            name="password"
            label="Password"
            type="password"
            error={errors?.password || null}
          />
          <TextBox
            defaultValue=""
            name="name"
            label="Nama Lengkap"
            type="text"
            error={errors?.name || null}
          />
          <TextBox
            defaultValue=""
            name="address"
            label="Alamat"
            type="text"
            error={errors?.address || null}
          />

          <TextBox
            defaultValue=""
            name="year"
            label="Tahun Bergabung"
            type="number"
            error={errors?.year || null}
          />
        </section>
        <Divider />
        <section className="form-section ">
          <TextBox
            defaultValue=""
            name="birth_date"
            label="Tanggal Lahir"
            type="date"
            error={errors?.birth_date || null}
          />
          <Select
            defaultValue=""
            name="role"
            label="Role"
            datas={roles}
            error={errors?.admin || null}
          />
        </section>
      </div>
      <button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        className={`self-end mt-auto md:mt-0 w-full md:w-fit ${
          pending ? "btn-disabled" : "btn-primary"
        } h-[2.5rem]`}
      >
        {pending ? <Loading /> : "Simpan"}
      </button>
    </Form>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();

  const role = Number(body.get("role"));

  const user = {
    username: String(body.get("username")),
    password: String(body.get("password")),
    name: String(body.get("name")),
    address: String(body.get("address")),
    birth_date: String(body.get("birth_date")),
    year: Number(body.get("year")),
    admin: role === 1 ? true : false,
  };

  const validate = UserSchema.safeParse(user);

  if (!validate.success) {
    return json(validate.error.flatten().fieldErrors, { status: 400 });
  }

  const result = await insertUser(validate.data);

  if (result) return redirect("/users?status=add");
}
