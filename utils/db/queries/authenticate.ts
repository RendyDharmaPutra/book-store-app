import { and, like } from "drizzle-orm";
import { db } from "..";
import { User } from "../schema";
import { authCookie } from "utils/auth";
import { redirect } from "@remix-run/react";
import { getUser } from "./users";

export const login = async (userLog: userLogType) => {
  const data = await db
    .select({
      id: User.id,
    })
    .from(User)
    .where(
      and(
        like(User.username, userLog.username),
        like(User.password, userLog.password)
      )
    );

  return data[0];
};

export const getAuth = async (request: Request) => {
  const cookie = request.headers.get("Cookie");

  const auth = await authCookie.parse(cookie);

  if (auth === null) {
    return false;
  }

  return auth;
};

export const getAccount = async (request: Request) => {
  const auth = await getAuth(request);

  if (auth === false) {
    return false;
  }

  const user = await getUser(auth);

  return user;
};

export const logout = async () => {
  return redirect("/login", {
    headers: {
      "Set-Cookie": await authCookie.serialize("", {
        maxAge: 0,
      }),
    },
  });
};
