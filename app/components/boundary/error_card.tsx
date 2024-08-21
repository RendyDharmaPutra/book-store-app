import { Link } from "@remix-run/react";

export default function ErrorCard({ name }: { name: string }) {
  return (
    <div className="flex flex-col center w-full bg-transparent">
      <div className="p-layout flex flex-col center gap-4 w-[22rem] md:w-[32rem] rounded-lg bg-white">
        <section className="flex flex-col gap-1 md:gap-2 text-center w-[20rem] md:w-[26rem]">
          <h1 className="font-semibold text-xl md:text-2xl text-gray-800">
            {name} tidak ditemukan
          </h1>
          <p className="text-wrap text-base md:text-lg text-gray-600">
            {name} yang dicari tidak ditemukan, silahkan pilih buku yang
            terdaftar
          </p>
        </section>
        <Link
          to={"/"}
          className="text-center font-medium text-base md:text-lg text-primary darker-hover"
        >
          Kembali ke halaman awal
        </Link>
      </div>
    </div>
  );
}
