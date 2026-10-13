"use client"

import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { dbEditcomment, dbGetcomment } from "@/db/actions";
import { showTaskBlog, showTaskComment } from "@/db/actions";
import { commentSchema } from "@/db/schema";

type Props = {
  blog: any;
  blogId: number;
  comment: typeof commentSchema.$inferSelect;

}


export default function EditCommentForm({blog, blogId, comment}:Props) {

  const form =  useForm();
  const router = useRouter();



  const handleMyForm = async (data: any) => {
    const name = data.name
    await dbEditcomment(name, blog.id, comment.id)

    router.push(`/blog/${blog.id}`)
    router.refresh()
  }
  
  return (
     <main className="flex items-center p-4 flex-col">
      <div className="border border-gray-400 text-gray-700 p-4 m-4 rounded-md">

        <form onSubmit={form.handleSubmit(handleMyForm)}>
          <label className="font-bold" htmlFor="html">Enter your Text</label>
          <br />
          <input defaultValue={`${comment.name}`} placeholder={`${comment.name}`} className="p-1 border-gray-400 border rounded-md" {...form.register("name")}/>
          <br />
          <button className="m-2 hover:border-violet-600 bg-violet-600 hover:text-violet-600 text-white hover:bg-white rounded-md border p-2 w-40">
            Update Comment
          </button>
        </form>
        
      </div>
    </main>
  );

}