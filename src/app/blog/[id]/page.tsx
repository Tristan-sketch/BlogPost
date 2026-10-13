

import { showTaskBlog, showTaskComment } from "@/db/actions";
import Link from "next/link";
import Deletecomment from "./delete_comment";
import { Dumbbell, PencilLine, Plus, BookMarked, Beef, Users, Ellipsis } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import AddCommentForm from "./addcomment/add_comment_form";

type Props = {
  params: {
    id: number;
  };
};

const mapThemeToIcon = (theme: string | null) => {
  switch (theme) {
    case 'Dumbbell':
      return <Dumbbell />;
    case 'BookMarked':
      return <BookMarked />;
    case 'Beef':
      return <Beef />;
    case 'Users':
      return <Users />;
    case 'Ellipsis':
      return <Ellipsis />;
    default:
      return <Ellipsis />;
  }
};

export default async function singleBlog({ params }: Props) {
  const blogId = params.id;
  const blog = (await showTaskBlog(blogId))[0];
  const comments = await showTaskComment(blogId);
  const user = await currentUser();
  const userId = user?.id;
  const username = blog.clerkName;

  // Formatierung des Release-Datums für den Blog
  const releaseDateBlog = new Date(blog.Release);
  const formattedDateBlog = releaseDateBlog.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="flex p-6 justify-center w-full">
      <div className="flex w-3/4">
        <div className="flex-col m-4 border-gray-400 rounded-md border w-1/2 text-gray-700 h-96">
          <div className="w-full flex">
            <p className="text-3xl underline p-1 m-1 floar-left overflow-y-auto overflow-x-hidden h-20">
              {blog.name}
            </p>
            <p className="text-3xl p-2 m-2 float-right text-gray-400">
              {mapThemeToIcon(blog.theme)}
            </p>
          </div>

          <p className="text-2xl p-1 m-1 text-justify overflow-y-auto overflow-x-hidden h-48">
            {blog.text}
          </p>
          <p className="m-1 p-1 ">
            von {username} am {formattedDateBlog} veröffentlicht 
          </p>
        </div>

        <div className="w-1/2 py-6">
          <div className="flex flex-col w-full text-violet-600">
            <div className="flex justify-between items-center">
              <p className="text-3xl p-2 font-bold">Comments</p>
              {user !== null && (
                <Link
                  href={`/blog/${blog.id}/addcomment`}
                  className="border-gray-300 hover:border-violet-600 rounded-full border p-2 text-center hover:bg-white hover:text-violet-600 bg-violet-600 text-white"
                >
                  <Plus />
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center flex-col w-full overflow-y-auto h-80 overflow-x-hidden border border-gray-400 p-3 py-3 rounded-md">
            <AddCommentForm blog={blog}/>

            {comments.map(comment => {
              const releaseDateComment = new Date(comment.Release);
              const formattedDateComment = releaseDateComment.toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <div className="w-full border-gray-400 rounded-md border  text-gray-700 hover:bg-violet-100 m-2" key={comment.id}>
                  <div className="w-full flex-grow flex justify-between">
                    <div className="float-left text-2xl m-1 p-2">
                      {comment.name}
                    </div>

                    {comment.clerkId === userId && (
                      <div>
                        <div className="float-right m-2 p-2 hover:bg-red-400 hover:text-white rounded-md text-gray-400">
                          <Deletecomment id={comment.id} />
                        </div>

                        <Link href={`/blog/${blog.id}/${comment.id}`} className="float-right m-2 p-2 hover:bg-violet-600 text-gray-400 hover:text-white rounded-md">
                          <PencilLine />
                        </Link>
                      </div>
                    )}
                  </div>
                  <p className="m-1 p-1 clear-left flex flex-grow w-full">
                    von {comment.clerkName} am {formattedDateComment} veröffentlicht
                  </p>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
