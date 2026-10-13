import { notFound } from "next/navigation";
import { updateComment } from "@/app/actions/blog";
import { getComment } from "@/db/queries";
import { requireUser } from "@/lib/auth";

type Props = {
  params: {
    id: string;
    comment: string;
  };
};

export default function EditComment({ params }: Props) {
  const user = requireUser();
  const comment = getComment(Number(params.comment));
  if (!comment || comment.blogId !== Number(params.id) || comment.authorId !== user.id) notFound();

  return (
    <main className="flex items-center p-4 flex-col">
      <div className="border border-gray-400 text-gray-700 p-4 m-4 rounded-md">
        <form action={updateComment.bind(null, comment.id)}>
          <label className="font-bold" htmlFor="text">Enter your Text</label>
          <br />
          <input
            id="text"
            name="text"
            required
            maxLength={2000}
            defaultValue={comment.text}
            className="p-1 border-gray-400 border rounded-md"
          />
          <br />
          <button className="m-2 hover:border-violet-600 bg-violet-600 hover:text-violet-600 text-white hover:bg-white rounded-md border p-2 w-40">
            Update Comment
          </button>
        </form>
      </div>
    </main>
  );
}
