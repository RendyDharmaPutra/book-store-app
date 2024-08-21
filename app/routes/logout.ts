import { redirect } from "@remix-run/react";
import { authCookie } from "utils/auth";
import { logout } from "utils/db/queries/authenticate";

export async function action() {
  return logout();
}
