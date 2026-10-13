import EditCommentForm from "./edit_comment_form";
import { showTaskBlog } from "@/db/actions";
import { dbGetcomment } from  "@/db/actions";


type Props = {
  params: {
    id: number;
    comment:  number;
  }
}

export default async function Commentedit({params}:Props) {

  const blogId = params.id;
  const blog = (await showTaskBlog(blogId)) [0];
  const Comment  =  await dbGetcomment(params.comment);


  return (
    <main className="flex items-center p-4 flex-col">
      <div>

       <EditCommentForm blog={blog} blogId={blogId} comment={Comment}/>

      </div>
    </main>
  );
}