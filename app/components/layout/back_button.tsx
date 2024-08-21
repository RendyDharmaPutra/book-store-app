export default function Back() {
  return (
    <div className="px-4 py-2 lg:px-5 xl:px-6 xl:py-3">
      <button
        onClick={() => history.back()}
        className="flex flex-row items-center justify-center btn font-medium text-primary darker-hover"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#00a499"
          className="w-4 h-4 rotate-90"
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
        Kembali
      </button>
    </div>
  );
}
