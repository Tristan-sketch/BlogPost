import { showTaskBlog } from "@/db/actions";
import { dbGetblog } from  "@/db/actions";
import EditBlogForm from "./edit_comment_form";
import { db } from "@/db";
import { blogSchema } from "@/db/schema"
import { eq } from "drizzle-orm"


type Props = {
  params: {
    //id: number;
    //blogId:  number;
    //text: string;
    //name: string;
    blog: number;
  }
}

export default async function Blogedit({params}:Props) {

  const blog = (await db.select().from(blogSchema).where(eq(blogSchema.id, params.blog))) [0]

  return (
    <main className="flex items-center p-4 flex-col">
      <div>

       <EditBlogForm blog={blog} />

      </div>
    </main>
  );
}
