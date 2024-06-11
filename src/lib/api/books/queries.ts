import { db } from "@/lib/db/index";
import { type BookId, bookIdSchema } from "@/lib/db/schema/books";

export const getBooks = async () => {
  const b = await db.book.findMany({include: { author: true}});
  return { books: b };
};

export const getBookById = async (id: BookId) => {
  const { id: bookId } = bookIdSchema.parse({ id });
  const b = await db.book.findFirst({
    where: { id: bookId},
    include: { author: true }
  });
  return { book: b };
};


