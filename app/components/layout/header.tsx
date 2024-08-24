import { Form, Link, useNavigation } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useRoute from "utils/hooks/route_hooks";
import Loading from "../boundary/loading";

export default function Header({ isAdmin }: { isAdmin: boolean }): JSX.Element {
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
      <NavContent isAdmin={isAdmin} show={show} />
    </div>
  );
}

function NavTitle() {
  return (
    <section className="flex flex-row gap-2">
      <svg
        className="w-8 h-8"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"
          fill="#00a499"
        ></path>
      </svg>
      <h1 className="font-bold text-xl lg:text-2xl text-primary">Book Store</h1>
    </section>
  );
}

function NavContent({ isAdmin, show }: { isAdmin: boolean; show: boolean }) {
  const { path, routes, setRoutes } = useRoute();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      handleResize();

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      setRoutes((prevItems) =>
        prevItems.filter((prevItem) => prevItem.route !== "/users")
      );
    }
  }, []);

  return (
    <>
      {isMobile ? (
        <AnimatePresence mode="popLayout">
          {show && (
            <motion.div
              initial={{
                opacity: 0,
                scaleY: 0,
              }}
              animate={{
                opacity: 1,
                scaleY: 1,
              }}
              exit={{
                opacity: 0,
                scaleY: 0,
              }}
              style={{ originY: 0 }}
              className="flex flex-col gap-4"
            >
              <section className="flex flex-col gap-2 w-full ">
                {routes.map((element) => (
                  <NavItem
                    key={element.page}
                    route={element.route}
                    page={element.page}
                    path={path[1]}
                  />
                ))}
              </section>
              <Profile path={path[1]} />
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <div className="flex flex-row justify-between gap-12 w-fit ">
          <section className="flex flex-row gap-2 w-full ">
            {routes.map((element) => (
              <NavItem
                key={element.page}
                route={element.route}
                page={element.page}
                path={path[1]}
              />
            ))}
          </section>
          <Profile path={path[1]} />
        </div>
      )}
    </>
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
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,
              scaleY: 0,
            }}
            animate={{
              opacity: 1,
              scaleY: 1,
            }}
            exit={{
              opacity: 0,
              scaleY: 0,
            }}
            style={{ originY: 0 }}
            className="absolute top-60 right-4 md:top-[68px] md:right-5"
          >
            <ProfileMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProfileMenu() {
  const { state } = useNavigation();
  const pending = state === "submitting";

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
      <Form method="post" action={"/logout"} className="">
        <button
          type="submit"
          className="p-2 flex flex-row items-center justify-start gap-1 lg:gap-2 w-full rounded-lg hover:bg-red-100 duration-200"
        >
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

          <h2 className="nav-text text-danger">
            {pending ? <Loading /> : "Logout"}
          </h2>
        </button>
      </Form>
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

    case "/users":
      pattern =
        "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z";
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
      className={`nav-item ${path === route.slice(1) && "bg-gray-100"}`}
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
