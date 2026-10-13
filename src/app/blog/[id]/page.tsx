import Link from "next/link";
import { notFound } from "next/navigation";
import { PencilLine, Plus } from "lucide-react";
import { getBlog, getComments } from "@/db/queries";
import { requireUser } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import { ThemeIcon } from "@/lib/themes";
import AddCommentForm from "./addcomment/add_comment_form";
import DeleteComment from "./delete_comment";

type Props = {
  params: {
    id: string;
  };
};

export default function SingleBlog({ params }: Props) {
  const user = requireUser();
  const blog = getBlog(Number(params.id));
  if (!blog) notFound();
  const comments = getComments(blog.id);

  return (
    <main className="flex p-6 justify-center w-full">
      <div className="flex w-3/4">
        <div className="flex-col m-4 border-gray-400 rounded-md border w-1/2 text-gray-700 h-96">
          <div className="w-full flex">
            <p className="text-3xl underline p-1 m-1 float-left overflow-y-auto overflow-x-hidden h-20 flex-grow">
              {blog.name}
            </p>
            <p className="text-3xl p-2 m-2 float-right text-gray-400">
              <ThemeIcon theme={blog.theme} />
            </p>
          </div>

          <p className="text-2xl p-1 m-1 text-justify overflow-y-auto overflow-x-hidden h-48 whitespace-pre-wrap">
            {blog.text}
          </p>
          <p className="m-1 p-1">
            von {blog.authorName} am {formatDate(blog.createdAt)} veröffentlicht
          </p>
        </div>

        <div className="w-1/2 py-6">
          <div className="flex flex-col w-full text-violet-600">
            <div className="flex justify-between items-center">
              <p className="text-3xl p-2 font-bold">Comments</p>
              <Link
                href={`/blog/${blog.id}/addcomment`}
                className="border-gray-300 hover:border-violet-600 rounded-full border p-2 text-center hover:bg-white hover:text-violet-600 bg-violet-600 text-white"
              >
                <Plus />
              </Link>
            </div>
          </div>

          <div className="flex items-center flex-col w-full overflow-y-auto h-80 overflow-x-hidden border border-gray-400 p-3 py-3 rounded-md">
            <AddCommentForm blogId={blog.id} />

            {comments.map((comment) => (
              <div className="w-full border-gray-400 rounded-md border text-gray-700 hover:bg-violet-100 m-2" key={comment.id}>
                <div className="w-full flex-grow flex justify-between">
                  <div className="float-left text-2xl m-1 p-2">
                    {comment.text}
                  </div>

                  {comment.authorId === user.id && (
                    <div>
                      <div className="float-right m-2 p-2 hover:bg-red-400 hover:text-white rounded-md text-gray-400">
                        <DeleteComment commentId={comment.id} />
                      </div>

                      <Link href={`/blog/${blog.id}/${comment.id}`} className="float-right m-2 p-2 hover:bg-violet-600 text-gray-400 hover:text-white rounded-md">
                        <PencilLine />
                      </Link>
                    </div>
                  )}
                </div>
                <p className="m-1 p-1 clear-left flex flex-grow w-full">
                  von {comment.authorName} am {formatDate(comment.createdAt)} veröffentlicht
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
