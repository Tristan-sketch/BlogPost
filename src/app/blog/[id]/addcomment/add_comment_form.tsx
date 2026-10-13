"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { addComment } from "@/app/actions/blog";

type Props = {
  blogId: number;
  redirectToBlog?: boolean;
};

export default function AddCommentForm({ blogId, redirectToBlog = false }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await addComment(blogId, formData);
    formRef.current?.reset();
    if (redirectToBlog) router.push(`/blog/${blogId}`);
  };

  return (
    <div className="flex-row m-3 border border-gray-400 bg-white text-gray-700 rounded-md w-full flex-grow justify-between">
      <form ref={formRef} action={handleSubmit} className="flex w-full">
        <input
          name="text"
          required
          maxLength={2000}
          placeholder="Text..."
          className="flex-grow border-gray-400 border rounded-md p-1 m-2"
        />
        <button className="m-2 hover:border-violet-600 rounded-md border hover:text-violet-600 text-white hover:bg-white bg-violet-600 p-2">
          Create Comment
        </button>
      </form>
    </div>
  );
}
