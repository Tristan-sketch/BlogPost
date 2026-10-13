import { Trash2 } from "lucide-react";
import { deleteComment } from "@/app/actions/blog";

export default function DeleteComment({ commentId }: { commentId: number }) {
  return (
    <form action={deleteComment.bind(null, commentId)} className="float-right">
      <button title="Delete comment">
        <Trash2 />
      </button>
    </form>
  );
}
