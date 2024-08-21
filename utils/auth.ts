import { createCookie } from "@remix-run/node";

export let authCookie = createCookie("auth", {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  secrets: [process.env.SECRET_KEY!],
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24,
});
