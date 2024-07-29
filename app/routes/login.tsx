import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import Input from "~/components/form/input";

export default function Home() {
	return (
		<div className="layout self-center flex flex-col items-center gap-4 sm:gap-6 w-full sm:w-fit rounded-2xl bg-white">
			<h1 className="headline">Login</h1>
			<Form method="post" className="flex flex-col gap-2 sm:gap-4 w-full">
				<Input
					data={null}
					defaultValue={""}
					key={"username"}
					label="Username"
					name="username"
					type="text"
				/>
				<Input
					data={null}
					defaultValue={""}
					key={"password"}
					label="Password"
					name="password"
					type="password"
				/>
				<button type="submit" className="mt-4 btn-primary">
					Login
				</button>
			</Form>
		</div>
	);
}

export async function action({ request }: ActionFunctionArgs) {
	const body = await request.formData();

	// console.log(`Username : ${body.get("username")}`);
	// console.log(`Password : ${body.get("password")}`);

	return redirect("/");
}
