import { db } from "@/lib/db/index";
import { 
  AuthorId, 
  NewAuthorParams,
  UpdateAuthorParams, 
  updateAuthorSchema,
  insertAuthorSchema, 
  authorIdSchema 
} from "@/lib/db/schema/authors";

export const createAuthor = async (author: NewAuthorParams) => {
  const newAuthor = insertAuthorSchema.parse(author);
  try {
    const a = await db.author.create({ data: newAuthor });
    return { author: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAuthor = async (id: AuthorId, author: UpdateAuthorParams) => {
  const { id: authorId } = authorIdSchema.parse({ id });
  const newAuthor = updateAuthorSchema.parse(author);
  try {
    const a = await db.author.update({ where: { id: authorId }, data: newAuthor})
    return { author: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAuthor = async (id: AuthorId) => {
  const { id: authorId } = authorIdSchema.parse({ id });
  try {
    const a = await db.author.delete({ where: { id: authorId }})
    return { author: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

