import { logout } from "utils/db/queries/authenticate";

export async function action() {
  return logout();
}
