"use client"

import { Trash2 } from "lucide-react"
import { dbDeleteblog } from '@/db/actions';
import { useRouter } from "next/navigation";




export default function Deleteblog({blogId}:{blogId:number}) {

  const router = useRouter();

  const handleDeleteBlog = async ()=>{
    await dbDeleteblog(blogId);
    router.refresh()
  }
  
  return (
    <button onClick={handleDeleteBlog} className="float-right">
      <Trash2/>
    </button>
  )
}