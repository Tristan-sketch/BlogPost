import { notFound } from "next/navigation";
import { getBlog } from "@/db/queries";
import AddCommentForm from "./add_comment_form";

type Props = {
  params: {
    id: string;
  };
};

export default function AddComment({ params }: Props) {
  const blog = getBlog(Number(params.id));
  if (!blog) notFound();

  return (
    <main className="flex items-center flex-col">
      <p className="text-violet-600 text-2xl font-bold">Comment on &quot;{blog.name}&quot;</p>
      <div className="w-full max-w-xl">
        <AddCommentForm blogId={blog.id} redirectToBlog />
      </div>
    </main>
  );
}
