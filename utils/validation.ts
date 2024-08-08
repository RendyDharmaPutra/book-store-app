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

export const TransactionSchema = z.object({
  time: z.string().transform((dateString, ctx) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Format Waktu tidak sesuai",
      });
      return z.NEVER;
    }
    return date;
  }),
  amount: z
    .number()
    .nonnegative("Total Harga tidak boleh Negatif")
    .min(1, "Belum ada barang yang dipilih")
    .max(2147483647, "Total Harga terlalu besar"),
  user_id: z.number().min(1, "User tidak boleh kosong"),
});

export type Transaction = z.infer<typeof TransactionSchema>;
