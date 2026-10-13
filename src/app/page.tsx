import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default function Home() {
  const user = getCurrentUser();

  if (!user) {
    return (
      <div>
        <h1 className="text-5xl p-2 m-2 text-center font-bold text-violet-600">
          Create an Account
        </h1>
        <div className="flex justify-center items-center p-6 bg-white">
          <div className="bg-white rounded-full p-4 shadow-2xl">
            <Image
              className="rounded-full border-4 border-white"
              src="/Homepage1.jpg"
              alt="Mein Bild"
              width={250}
              height={250}
            />
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Link className="border text-white bg-violet-600 hover:bg-white hover:text-violet-600 hover:border-violet-600 rounded-md py-2 px-4" href="/register">
            Sign up
          </Link>
          <Link className="border border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white rounded-md py-2 px-4" href="/login">
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center p-4 w-full">
      <section className="w-full max-w-4xl my-6 text-center">
        <h1 className="text-violet-600 text-4xl font-bold mb-4">My first Blog Post Webapp</h1>
        <p className="text-gray-600 text-xl">
          Discover interesting blogs on various topics. Create your own blog and share your thoughts with the world.
        </p>
      </section>

      <section className="w-full max-w-4xl my-6">
        <h2 className="text-violet-600 text-3xl font-semibold mb-4 text-center">Functions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-md p-4 text-center">
            <h3 className="text-xl text-violet-600 font-bold">Create</h3>
            <p className="text-gray-600">Tell what you want in your own blog</p>
          </div>
          <div className="bg-white shadow-md rounded-md p-4 text-center">
            <h3 className="text-xl text-violet-600 font-bold">Explore</h3>
            <p className="text-gray-600">Find out by exploring other blogs</p>
          </div>
        </div>
      </section>
    </main>
  );
}
