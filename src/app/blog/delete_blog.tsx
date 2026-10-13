import { Trash2 } from "lucide-react";
import { deleteBlog } from "../actions/blog";

export default function DeleteBlog({ blogId }: { blogId: number }) {
  return (
    <form action={deleteBlog.bind(null, blogId)} className="float-right">
      <button title="Delete blog">
        <Trash2 />
      </button>
    </form>
  );
}
