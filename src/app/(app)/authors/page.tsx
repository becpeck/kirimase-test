import AuthorList from "@/components/authors/AuthorList";
import NewAuthorModal from "@/components/authors/AuthorModal";
import { api } from "@/lib/trpc/api";

export default async function Authors() {
  const { authors } = await api.authors.getAuthors.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Authors</h1>
        <NewAuthorModal />
      </div>
      <AuthorList authors={authors} />
    </main>
  );
}
