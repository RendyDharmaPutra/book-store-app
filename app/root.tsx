import {
  Await,
  defer,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import "./tailwind.css";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Back from "./components/layout/back_button";
import { getAccount, getAuth } from "utils/db/queries/authenticate";
import { Suspense } from "react";
import Restricted from "./components/boundary/restricted";
import UnknownError from "./components/boundary/unknows_error";

export const meta: MetaFunction = () => {
  return [
    { title: "Book Store App" },
    { name: "description", content: "Aplikasi Penjualan Buku" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const auth = getAccount(request);

  return defer({ auth });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { auth } = useLoaderData<typeof loader>();

  const path = useLocation().pathname;
  const hasnum = /\d/;

  const isAllowed = (admin: boolean) => {
    let allowed = true;

    if (path.includes("users")) {
      admin ? allowed : (allowed = false);
    }

    return allowed;
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen ">
        {path != "/login" ? (
          <>
            <Suspense>
              <Await resolve={auth}>
                {(auth: unknown) => {
                  const admin = (auth as account).admin === "0" ? false : true;
                  return (
                    <>
                      {auth && isAllowed(admin) ? (
                        <>
                          <Header isAdmin={admin} />
                          {(path.includes("add") || hasnum.test(path)) && (
                            <Back />
                          )}
                          <main className="flex-grow p-2 flex flex-row bg-page">
                            {children}
                          </main>
                          <Footer />
                        </>
                      ) : (
                        <div className="flex flex-col center w-full h-screen bg-page">
                          <Restricted
                            redirect={auth === false ? "/login" : "/"}
                          />
                        </div>
                      )}
                    </>
                  );
                }}
              </Await>
            </Suspense>
          </>
        ) : (
          <main className="flex-grow layout flex flex-col justify-center items-center bg-page">
            {children}
          </main>
        )}

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return <UnknownError />;
}

export default function App() {
  return <Outlet />;
}
