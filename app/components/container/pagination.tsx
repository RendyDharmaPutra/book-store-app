import { useSearchParams } from "@remix-run/react";

export default function Pagination() {
  let [searchParams, setSearchParams] = useSearchParams();
  const currentPage: number = Number(searchParams.get("page") || "1");

  function setPage(next: boolean): void {
    let params: URLSearchParams = new URLSearchParams(searchParams);

    const Newpage: string = next
      ? String(currentPage + 1)
      : String(currentPage - 1);
    params.set("page", Newpage);

    setSearchParams(params);
  }

  return (
    <section className="flex flex-row justify-between items-center ">
      <h2 className="font-medium text-sm md:text-base text-gray-800 ">
        Halaman {currentPage}
      </h2>
      <div className="flex flex-row gap-1 sm:gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setPage(false)}
          className={`${
            currentPage === 1
              ? "px-2 py-1 text-sm md:text-base text-center outline-none rounded-md border border-gray-100 text-gray-600 bg-zinc-50"
              : "btn-secondary"
          }`}
        >
          Sebelumnya
        </button>
        <button onClick={() => setPage(true)} className="btn-secondary">
          Selanjutnya
        </button>
      </div>
    </section>
  );
}
