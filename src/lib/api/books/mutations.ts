import { db } from "@/lib/db/index";
import { 
  BookId, 
  NewBookParams,
  UpdateBookParams, 
  updateBookSchema,
  insertBookSchema, 
  bookIdSchema 
} from "@/lib/db/schema/books";

export const createBook = async (book: NewBookParams) => {
  const newBook = insertBookSchema.parse(book);
  try {
    const b = await db.book.create({ data: newBook });
    return { book: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBook = async (id: BookId, book: UpdateBookParams) => {
  const { id: bookId } = bookIdSchema.parse({ id });
  const newBook = updateBookSchema.parse(book);
  try {
    const b = await db.book.update({ where: { id: bookId }, data: newBook})
    return { book: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBook = async (id: BookId) => {
  const { id: bookId } = bookIdSchema.parse({ id });
  try {
    const b = await db.book.delete({ where: { id: bookId }})
    return { book: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

