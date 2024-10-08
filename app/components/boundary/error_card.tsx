import { Link } from "@remix-run/react";

type ErrorCardProps = {
  name: string;
  route: string;
};

export default function ErrorCard(props: ErrorCardProps) {
  return (
    <div className="flex flex-col center w-full bg-transparent">
      <div className="p-layout flex flex-col center gap-4 w-[22rem] md:w-[32rem] rounded-lg bg-white">
        <section className="flex flex-col gap-1 md:gap-2 text-center w-[20rem] md:w-[26rem]">
          <h1 className="font-semibold text-xl md:text-2xl text-gray-800">
            {props.name} tidak ditemukan
          </h1>
          <p className="text-wrap text-base md:text-lg text-gray-600">
            {props.name} yang dicari tidak ditemukan, silahkan pilih buku yang
            terdaftar
          </p>
        </section>
        <Link
          to={props.route}
          className="text-center font-medium text-base md:text-lg text-primary darker-hover"
        >
          Kembali ke halaman awal
        </Link>
      </div>
    </div>
  );
}
