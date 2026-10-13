import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 p-10 text-gray-700">
      <h1 className="text-4xl font-bold text-violet-600">404 - Page Not Found</h1>
      <Link href="/blog" className="underline hover:text-violet-600">
        Back to the blogs
      </Link>
    </div>
  );
}
