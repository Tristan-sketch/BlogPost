
"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import { dbEditblog, dbInsertblog } from "@/db/actions";
import { Blog, blogSchema } from "@/db/schema";





export default function EditBlogForm({ blog}:{blog:Blog}) {

  const form  = useForm();
  const router = useRouter();


  const handleMyForm=async (data: any) =>{
      const name  = data.name
      const text = data.text
      const editetblog = await dbEditblog(name, text, blog.id)

      router.push("/blog")   
      router.refresh()
}


  return (
    <main className="flex items-center p-4 flex-col">
      <div className="border border-gray-400 p-4 m-4 text-gray-700 rounded-md shadow-md">

        <form onSubmit={form.handleSubmit(handleMyForm)}>
          <label className="font-bold" htmlFor="html">Name</label>
          <br />
          <input defaultValue={`${blog.name}`} placeholder={`${blog.name}`} className="p-1 border-gray-400 border rounded-md" {...form.register("name")}/>
          <br />
          <label className="font-bold" htmlFor="html">Text</label>
          <br />
          <textarea defaultValue={`${blog.text}`} placeholder={`${blog.text}`} className="p-1 border-gray-400 border rounded-md flex h-32 resize-none"{...form.register("text")}/>
          <br />
          <button className="m-2 hover:border-violet-600 hover:text-violet-600 rounded-md border hover:bg-white bg-violet-600 text-white p-2 w-40">
            Update Blog
          </button>
        </form>
        
      </div>
    </main>
  );
}

