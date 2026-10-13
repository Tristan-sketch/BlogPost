"use client"

import { db } from "@/db"
import { blogSchema } from "@/db/schema"

export default function FilteredBlogs() {

  const theme = db.select().from(blogSchema)

}

// type BlogViewType = 
//     {
//     blogs: Blog[];
// };

// function BlogView({
//     blogs
// }: BlogViewType) {
//     return ( blogs.map((blog) => {  
//         return (
//             <div>
//                 <h1>{blog.title}</h1>
//                 <p>{blog.content}</p>
//             </div>

//         );
// }

// export default BlogView;



// function TetsServerComp() {
//   const blogs = await dbGetBlogs();

//   return <BlogView blogs={blogs} />;
// }

// export default TetsServerComp;