import { desc, eq, ilike, or } from "drizzle-orm";
import { db } from "..";
import { User } from "../schema";

export const getUsers = async (search: string, page: number) => {
  const data = await db
    .select({
      id: User.id,
      username: User.username,
      name: User.name,
      address: User.address,
      birthDate: User.birth_date,
      year: User.year,
      role: User.admin,
    })
    .from(User)
    .where(or(ilike(User.name, `%${search}%`)))
    .orderBy(desc(User.name))
    .limit(10)
    .offset((page - 1) * 10)
    .execute();

  const result = data.map((user) => ({
    ...user,
    birthDate: String(user.birthDate).slice(0, 10),
    role: user.role ? "Admin" : "Non-admin",
  }));

  return result;
};

export const insertUser = async (data: insertUser) => {
  const result = await db.insert(User).values(data).returning({ id: User.id });

  return result[0].id;
};

export const deleteUser = async (id: number) => {
  const result = await db.delete(User).where(eq(User.id, id));

  return result;
};
