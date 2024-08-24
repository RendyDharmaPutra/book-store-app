export default function NotFound({ headline }: { headline: string }) {
  return (
    <section className="w-full layout justify-center items-center">
      <div className="w-full sm:w-[24rem] layout justify-center items-center gap-4 rounded-lg border border-gray-200 bg-white">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="title text-center">Pencarian tidak ditemukan</h1>
          <p className="text-center text-gray-700">
            {headline} yang anda cari tidak terdaftar
          </p>
        </div>
      </div>
    </section>
  );
}
