import { ActionFunctionArgs } from "@remix-run/node";
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import { authCookie } from "utils/auth";
import { login } from "utils/db/queries/authenticate";
import { UserLogSchema } from "utils/validation";
import Loading from "~/components/boundary/loading";
import TextBox from "~/components/form/text_box";

export default function Login() {
  const errors = useActionData<typeof action>();

  const { state } = useNavigation();
  const pending = state === "submitting";

  return (
    <div className="layout self-center flex flex-col items-center gap-4 sm:gap-6 w-full sm:w-fit rounded-2xl bg-white">
      <h1 className="headline">Login</h1>
      <Form method="post" className="flex flex-col gap-2 sm:gap-4 w-full">
        <TextBox
          defaultValue={""}
          key={"username"}
          label="Username"
          name="username"
          type="text"
          error={errors?.username || null}
        />
        <TextBox
          defaultValue={""}
          key={"password"}
          label="Password"
          name="password"
          type="password"
          error={errors?.password || null}
        />
        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className={`mt-4 ${
            pending ? "bg-gray-200 text-gray-800 btn" : "btn-primary"
          }`}
        >
          {pending ? <Loading /> : "Login"}
        </button>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();

  const userLog = {
    username: String(body.get("username")),
    password: String(body.get("password")),
  };

  const validate = UserLogSchema.safeParse(userLog);

  if (!validate.success) {
    return json(validate.error.flatten().fieldErrors, { status: 400 });
  }

  const user = await login(validate.data);

  if (user)
    return redirect("/", {
      headers: {
        "Set-Cookie": await authCookie.serialize(user.id),
      },
    });

  return null;
}
