import { Link, useLocation } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Header(): JSX.Element {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="p-layout flex flex-col md:flex-row justify-between gap-4 md:gap-0 w-full">
      <div className="flex flex-row gap-4 ">
        <section
          className="p-1 group flex md:hidden flex-col items-center justify-center cursor-pointer rounded-full hover:bg-gray-100 duration-200"
          onClick={() => setShow(!show)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.499 8.248h15m-15 7.501h15"
            />
          </svg>
        </section>
        <NavTitle />
      </div>
      <NavContent show={show} />
    </div>
  );
}

function NavTitle() {
  return (
    <section className="flex flex-row gap-2">
      <svg
        className="w-8 h-8"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path
          d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
          fill="#00a499"
        ></path>
      </svg>
      <h1 className="font-bold text-xl lg:text-2xl text-primary">Book Store</h1>
    </section>
  );
}

function NavContent({ show }: { show: boolean }) {
  const path = useLocation().pathname;

  const routes = [
    { route: "/", page: "Buku" },
    { route: "/store", page: "Penyimpanan" },
    { route: "/transaction", page: "Transaksi" },
  ];

  return (
    <div
      className={`${
        show ? "flex" : "hidden"
      } flex-col md:flex md:flex-row md:justify-between gap-4 md:gap-0 md:w-[32rem]`}
    >
      <section className="flex flex-col md:flex-row gap-2 w-full">
        {routes.map((element) => (
          <NavItem
            key={element.page}
            route={element.route}
            page={element.page}
            path={path}
          />
        ))}
      </section>
      <Profile path={path} />
    </div>
  );
}

function Profile({ path }: { path: string }) {
  const [show, setShow] = useState<boolean>();

  return (
    <>
      <section
        onClick={() => setShow(!show)}
        className={`relative nav-item md:px-2 md:py-1 justify-between border border-gray-200 ${
          path === "/user" && "bg-gray-100"
        } cursor-pointer`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="nav-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="nav-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </section>
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            initial={{
              transitionDuration: "0.5",
              opacity: 0,
              //   translateY: "-50vh",
              scaleY: 0,
            }}
            animate={{
              transitionDuration: "0.5",
              opacity: 1,
              //   translateY: "0vh",
              scaleY: 1,
            }}
            exit={{
              transitionDuration: "0.5",
              opacity: 0,
              //   translateY: "-50vh",
              scaleY: 0,
            }}
            style={{ originY: 0 }}
            className="absolute top-52 right-4 md:top-16 md:right-5"
          >
            <ProfileMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProfileMenu() {
  return (
    <section
      className={`p-1 flex flex-col w-[10rem] rounded-xl bg-white border bordder-gray-200`}
    >
      <Link
        replace
        prefetch="viewport"
        to={"/profile"}
        className="p-2 flex flex-row items-center justify-start gap-1 md:gap-2 w-full rounded-lg hover:bg-gray-100 duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="nav-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>

        <h2 className="nav-text">User</h2>
      </Link>
      <button className="p-2 flex flex-row items-center justify-start gap-1 md:gap-2 w-full rounded-lg hover:bg-red-100 duration-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="nav-icon text-danger"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
          />
        </svg>

        <h2 className="nav-text text-danger">Logout</h2>
      </button>
    </section>
  );
}

function NavItem({
  route,
  page,
  path,
}: {
  route: string;
  page: string;
  path: string;
}) {
  let pattern: string;

  switch (route) {
    case "/":
      pattern =
        "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25";

      break;

    case "/store":
      pattern =
        "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z";

      break;

    case "/transaction":
      pattern =
        "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z";

      break;

    default:
      pattern =
        "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25";

      break;
  }

  return (
    <Link
      replace
      prefetch="viewport"
      to={route}
      className={`nav-item ${path === route && "bg-gray-100"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="nav-icon"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={pattern} />
      </svg>

      <h1 className={`nav-text`}>{page}</h1>
    </Link>
  );
}
