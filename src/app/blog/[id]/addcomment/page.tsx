
import { showTaskBlog } from "@/db/actions";
import AddCommentForm from "./add_comment_form";


type Props = {
  params: {
    id: number;
  }
}



export default async function Commment({params}: Props) {
 const blogId = params.id;
 const blog  = (await showTaskBlog(blogId)) [0];

  return (
    <main className="flex items-center flex-col ">
      <div>

       <AddCommentForm blog={blog}/>

      </div>
    </main>
  );
}

