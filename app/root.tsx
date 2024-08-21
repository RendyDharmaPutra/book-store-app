import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import "./tailwind.css";
import { MetaFunction } from "@remix-run/node";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Back from "./components/layout/back_button";

export const meta: MetaFunction = () => {
  return [
    { title: "Book Store App" },
    { name: "description", content: "Aplikasi Penjualan Buku" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const path = useLocation().pathname;
  const hasnum = /\d/;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        {path != "/login" ? (
          <>
            <Header />
            {(path.includes("add") || hasnum.test(path)) && <Back />}
            <main className="flex-grow p-2 flex flex-row bg-page">
              {children}
            </main>
            <Footer />
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

export default function App() {
  return <Outlet />;
}
