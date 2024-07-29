export default function NotFound(): JSX.Element {
	return (
		<section className="w-full layout justify-center items-center">
			<div className="w-full sm:w-[24rem] layout justify-center items-center gap-4 rounded-2xl bg-gray-200">
				<div className="flex flex-col justify-center items-center gap-2">
					<h1 className="headline">Pencarian tidak ditemukan</h1>
					<p className="text-center text-gray-700">
						Buku atau Penulis yang anda cari tidak terdaftar
					</p>
				</div>
			</div>
		</section>
	);
}
