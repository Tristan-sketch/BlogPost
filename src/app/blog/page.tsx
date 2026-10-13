
import { showTaskBlog } from "@/db/actions"
import { blogSchema } from "@/db/schema";
import Link from "next/link";
import { db } from "@/db/index";
import Deleteblog from './delete_blog';
import { PencilLine, UserIcon } from "lucide-react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Dumbbell } from "lucide-react";
import { BookMarked } from "lucide-react";
import { Beef } from "lucide-react";
import { Users } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { userInfo } from 'os';



type Props = {
  params: {
    id: number;
  }
}

export const dynamic = 'force-dynamic';

export default async function allBlogs({params}: Props) {

  const user = await currentUser();
  

  const userId = user?.id

  const blogs = await db.select().from(blogSchema)
  

  const mapThemeToIcon = (theme: string | null) => {
    switch (theme) {
      case 'Dumbbell':
        return <Dumbbell/>;
      case 'BookMarked':
        return <BookMarked/>;
      case 'Beef':
        return <Beef/>;
      case 'Users':
        return <Users/>;
      case 'Ellipsis':
        return <Ellipsis/>;
      default:
        return <Ellipsis/>;
    }
  };



  if(userId === null) {
    return (
      <div className="flex justify-center items-center h-screen">

        Just Sign In

      </div>
    )
  } else {

    return (
      <main className="flex items-center p-2 flex-col w-full">
        
        <div className="flex w-3/4"> 

          <p className='text-violet-600 text-3xl w-1/2 font-bold'>Blogs</p>
          {user !== null && <Link className=" w-1/2 text-2xl border-gray-400 rounded-md border text-center hover:border-violet-600 hover:bg-white bg-violet-600 hover:text-violet-600 text-white" href="/blog/addblog">
            Create Blog
          </Link>}

        </div>


        <div className="flex items-center flex-col m-4  h-96 overflow-y-auto w-3/4 overflow-x-hidden border border-gray-400 p-3 py-8 rounded-md">
          
          {blogs.map( blog => {
              const releaseDateBlog = new Date(blog.Release);
              const formattedDateBlog = releaseDateBlog.toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

            return (
            <div className='text-gray-700 m-3 border-gray-400 rounded-md border w-full  hover:bg-violet-100' key={blog.id}>
              <div className="w-full justify-between flex">
                <p className="float-right m-2 text-white bg-violet-400 rounded-md p-2">
                  {blog.clerkName}
                </p>   

                <Link href={`/blog/${blog.id}`} key={blog.id} className="m-3 float-left flex-grow text-2xl">
                  {blog.name}  
  
                </Link>

                  <div className="float-right m-2 hover:text-white hover:bg-violet-600 rounded-md p-2 text-gray-400">
                    {mapThemeToIcon(blog.theme)}
                  </div>                
                {blog.clerkId === userId && <div>
            

                  <Link href={`/blog/editblog/${blog.id}`} className="float-right m-2 hover:text-white hover:bg-violet-600 text-gray-400 rounded-md p-2">
                      <PencilLine/>
                  </Link>
                  <div className="float-right m-2 hover:bg-red-400 hover:text-white rounded-md text-gray-400 p-2">
                    <Deleteblog blogId={blog.id}/>
                  </div>           
                      
                </div>}
              </div>
              <p className="m-1 p-1 w-full flex-grow flex">
                <Link href={`/blog/${blog.id}`} key={blog.id} className="flex-grow w-full">
                  am {formattedDateBlog} veröffentlicht
                </Link>
              </p>


            </div>)}
            )}
          
        </div>
      </main>
    )
  }
}
 