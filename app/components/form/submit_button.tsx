import { Link, useNavigation } from "@remix-run/react";

export default function SubmitButton() {
  const { state } = useNavigation();
  const pending = state === "submitting";

  return (
    <div className="mt-auto md:mt-0 self-end row-section gap-2 w-full md:w-fit h-[2.5rem]">
      <Link
        to={"/"}
        className="w-full btn text-black hover:text-white border border-secondary hover:border-primary hover:bg-primary duration-200"
      >
        Kembali
      </Link>
      <button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        className={`w-full ${
          pending ? "bg-gray-200 text-gray-800 btn" : "btn-primary"
        } h-full`}
      >
        {pending ? "Menyimpan..." : "Simpan"}
      </button>
    </div>
  );
}
