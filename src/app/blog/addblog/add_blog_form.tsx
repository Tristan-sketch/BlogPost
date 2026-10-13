"use client";

import { useState } from "react";
import { createBlog } from "@/app/actions/blog";
import { THEMES, ThemeIcon } from "@/lib/themes";

export default function AddBlogForm() {
  const [selectedTheme, setSelectedTheme] = useState<string>(THEMES[0].value);

  return (
    <main className="flex items-center p-4 flex-col">
      <div className="border border-gray-400 p-4 m-4 text-gray-700 rounded-md shadow-md">
        <form action={createBlog}>
          <label className="font-bold" htmlFor="name">Name</label>
          <br />
          <input
            id="name"
            name="name"
            required
            maxLength={200}
            placeholder="Name of the Blog"
            className="border-gray-400 p-1 border rounded-md w-grow"
          />
          <br />
          <label className="font-bold" htmlFor="theme">Thema</label>
          <br />
          <div>
            <select
              id="theme"
              name="theme"
              className="border-gray-400 p-2 border rounded-md w-grow"
              value={selectedTheme}
              onChange={(event) => setSelectedTheme(event.target.value)}
            >
              {THEMES.map((theme) => (
                <option key={theme.value} value={theme.value}>{theme.label}</option>
              ))}
            </select>

            <div className="float-right rounded-md p-2 text-gray-700">
              <ThemeIcon theme={selectedTheme} />
            </div>
          </div>

          <label className="font-bold" htmlFor="text">Text</label>
          <br />
          <textarea
            id="text"
            name="text"
            required
            maxLength={10000}
            placeholder="Description..."
            className="border-gray-400 p-1 border rounded-md flex h-32 resize-none"
          />
          <br />
          <button className="m-2 hover:bg-white bg-violet-600 hover:border-violet-600 text-white rounded-md border hover:text-violet-600 p-2 w-40">
            Create Blog
          </button>
        </form>
      </div>
    </main>
  );
}
