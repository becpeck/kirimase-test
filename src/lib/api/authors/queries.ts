import { db } from "@/lib/db/index";
import { type AuthorId, authorIdSchema } from "@/lib/db/schema/authors";

export const getAuthors = async () => {
  const a = await db.author.findMany({});
  return { authors: a };
};

export const getAuthorById = async (id: AuthorId) => {
  const { id: authorId } = authorIdSchema.parse({ id });
  const a = await db.author.findFirst({
    where: { id: authorId}});
  return { author: a };
};

export const getAuthorByIdWithBooks = async (id: AuthorId) => {
  const { id: authorId } = authorIdSchema.parse({ id });
  const a = await db.author.findFirst({
    where: { id: authorId},
    include: { books: { include: {author: true } } }
  });
  if (a === null) return { author: null };
  const { books, ...author } = a;

  return { author, books:books };
};

