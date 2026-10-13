"use client"

import { Trash2 } from "lucide-react"
import { dbDeletecomment } from '@/db/actions';
import { useRouter } from "next/navigation";




export default function Deletecomment({id}:{id:number}) {
  const router  = useRouter();

  const handleDeleteComment = async ()=>{
        await dbDeletecomment(id);
        router.refresh()
  }


  return (
    <button onClick={handleDeleteComment} className="float-right">
      <Trash2/>
    </button>
  )
}