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
import { Suspense, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { getAccount } from "utils/db/queries/authenticate";
import { updateUser } from "utils/db/queries/users";
import { ProfileSchema, UserSchema } from "utils/validation";
import ErrorCard from "~/components/boundary/error_card";
import Loading from "~/components/boundary/loading";
import Divider from "~/components/container/divider";
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

  const [edited, setEdited] = useState(false);

  const edit = useCallback(() => {
    setEdited(true);
  }, []);

  return (
    <Form method="post" className="page">
      <h1 className="title">Profil Pengguna</h1>
      <div className="px-4 row-section justify-between gap-6">
        <Suspense fallback={<Loading />}>
          <Await resolve={account}>
            {(account: unknown) => {
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
                      edit={edit}
                    />
                    <TextBox
                      defaultValue={(account as account).password}
                      name="password"
                      label="Password"
                      type="text"
                      error={errors?.password || null}
                      edit={edit}
                    />
                    <TextBox
                      defaultValue={(account as account).name}
                      name="name"
                      label="Nama Lengkap"
                      type="text"
                      error={errors?.name || null}
                      edit={edit}
                    />
                    <TextBox
                      defaultValue={(account as account).address}
                      name="address"
                      label="Alamat"
                      type="text"
                      error={errors?.address || null}
                      edit={edit}
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
                      edit={edit}
                    />
                    <TextBox
                      defaultValue={(account as account).year}
                      name="year"
                      label="Tahun Bergabung"
                      type="number"
                      error={errors?.year || null}
                      edit={edit}
                    />
                  </section>
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
      {edited && (
        <motion.button
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className={`mt-auto md:mt-0 self-end w-full md:w-fit ${
            pending ? "btn-disabled" : "btn-primary"
          } h-[2.5rem] `}
        >
          {pending ? <Loading /> : "Simpan"}
        </motion.button>
      )}
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
  };

  const validate = ProfileSchema.safeParse(user);

  if (!validate.success) {
    return json(validate.error.flatten().fieldErrors, { status: 400 });
  }

  const result = await updateUser(Number(body.get("id")), validate.data);

  if (result) return redirect("/");
}

export function ErrorBoundary() {
  return <ErrorCard name="Profile Pengguna" route="/" />;
}
