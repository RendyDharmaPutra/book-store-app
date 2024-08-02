import { z } from "zod";

export const BookSchema = z.object({
	title: z.string().min(1, "Judul tidak boleh kosong"),
	writer: z.string().min(1, "Penulis tidak boleh kosong"),
	year: z.number().min(4, "Tahun terbit harus 4 angka"),
	price: z.number().min(4, "Harga minimal 4 angka"),
	category_id: z.number().min(1, "Kategori tidak boleh kosong"),
	publisher_id: z.number().min(1, "Penerbit tidak boleh kosong"),
});

export type Book = z.infer<typeof BookSchema>;
