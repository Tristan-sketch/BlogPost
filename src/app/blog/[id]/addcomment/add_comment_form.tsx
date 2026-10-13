"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { dbInsertcomment } from "@/db/actions";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

type Props = {
  blog: any;
}


export default function AddCommentForm({blog}: Props) {

  const form  = useForm();
  const router = useRouter();
  const {user} = useUser();

  const handleMyForm = async (data: any) =>{

      const userId = user?.id
      if(!userId)return
      const clerkId = user?.id
      const clerkName = user?.username 

      const name = data.name
      await dbInsertcomment(name, blog.id, clerkId, clerkName);

      form.reset();

      router.push(`/blog/${blog.id}`)   
      router.refresh()
  }

 
  return (

      <div className="flex-row m-3 border border-gray-400 bg-white text-gray-700 rounded-md w-full flex-grow justify-between">
        <form onSubmit={form.handleSubmit(handleMyForm)} className="flex w-full">
          <input
            placeholder="Text..."
            className="flex-grow border-gray-400 border rounded-md p-1 m-2"
            {...form.register("name")}
          />
          <button className="m-2 hover:border-violet-600 rounded-md border hover:text-violet-600 text-white hover:bg-white bg-violet-600 p-2">
            Create Comment
          </button>
        </form>
      </div>

  );
}