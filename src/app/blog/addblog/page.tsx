import { useForm, SubmitHandler } from "react-hook-form"
import Link from "next/link";
import { blogSchema } from '@/db/schema';
import { showTaskBlog } from "@/db/actions";
import AddBlogForm from "./add_blog_form";



type Props = {
  params: {
    id: number;
  }
}



export default async function Blog({params}: Props) {
 const blogId = params.id;

  return (
    <main className="flex items-center p-4 flex-col">
      <div>

       <AddBlogForm />

      </div>
    </main>
  );
}

