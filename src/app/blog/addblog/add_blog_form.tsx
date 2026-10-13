
// "use client"
// import { useForm, SubmitHandler } from "react-hook-form"
// import { useRouter } from "next/navigation";
// import { dbInsertblog } from "@/db/actions";
// import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
// import { useUser } from "@clerk/nextjs";
// import Link from "next/link";
// import { Plus } from "lucide-react";
// import { Dumbbell } from "lucide-react";
// import { BookMarked } from "lucide-react";
// import { Beef } from "lucide-react";
// import { Users } from "lucide-react";
// import { Ellipsis } from "lucide-react";
// import { useState } from "react";

// type Props = {

// }



// export default function AddBlogForm({}: Props) {

//   const form  = useForm();
//   const router = useRouter();
//   const {user} = useUser();

  

//   const handleMyForm=async (data: any) =>{
     
//       const userId = user?.id
      
//       if(!userId)return
//       const clerkName = user?.username
//       const name  = data.name
//       const text = data.text
//       const theme = data.theme
//       await dbInsertblog(name, theme, text, userId, clerkName)
//       router.push("/blog")   
//       router.refresh()
// }

//     const mapThemeToIcon = (theme: string | null) => {
//     switch (theme) {
//       case 'Dumbbell':
//         return <Dumbbell/>;
//       case 'BookMarked':
//         return <BookMarked/>;
//       case 'Beef':
//         return <Beef/>;
//       case 'Users':
//         return <Users/>;
//       case 'Ellipsis':
//         return <Ellipsis/>;
//       default:
//         return <Ellipsis/>;
//     }
//   };

//   const App = () => {
//     const [selectedTheme, setSelectedTheme] = useState(`Dumbell`)
//     const handleChange = (event: any) => {
//       setSelectedTheme(event.target.value);
//     }
//   }


//   return (
//     <main className="flex items-center p-4 flex-col">
//       <div className="border border-gray-400 p-4 m-4 text-gray-700 rounded-md shadow-md">

//         <form onSubmit={form.handleSubmit(handleMyForm)}>
//           <label className="font-bold" htmlFor="html">Name</label>
//           <br />
//           <input placeholder="Name of the Blog" className="border-gray-400 p-1 border rounded-md" {...form.register("name")}/>
//           <br />
//           <label className="font-bold" htmlFor="html">Thema </label>
//           <br />

          
//           <select className="border-gray-400 p-1 border rounded-md w-full" {...form.register("theme")}>

//             <option value="Dumbbell">Sport & Fitness</option>
//             <option value="BookMarked">Learning</option>
//             <option value="Beef">Food </option>
//             <option value="Users">Friends & Family </option>
//             <option value="Ellipsis">Other</option>

//           </select> 

//           <div className="float-right m-2 hover:text-white hover:bg-violet-600 rounded-md p-2 text-gray-400">
//             {mapThemeToIcon(Value von Option)}
//           </div>

//           <br />
//           <label className="font-bold" htmlFor="html">Text</label>
//           <br />
//           <textarea placeholder="Description..." className="border-gray-400 p-1 border rounded-md flex h-32 resize-none"{...form.register("text")}/>
//           <br />
//           <button className="m-2 hover:bg-white bg-violet-600 hover:border-violet-600 text-white rounded-md border hover:text-violet-600 p-2 w-40">
//             Create Blog
//           </button>
//         </form>
        
//       </div>
//     </main>
//   );
// }

"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { dbInsertblog } from "@/db/actions";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Plus, Dumbbell, BookMarked, Beef, Users, Ellipsis } from "lucide-react";
import { useState } from "react";

type Props = {};

export default function AddBlogForm({}: Props) {
  const form = useForm();
  const router = useRouter();
  const { user } = useUser();
  const [selectedTheme, setSelectedTheme] = useState('Dumbbell');

  const handleMyForm: SubmitHandler<any> = async (data) => {
    const userId = user?.id;

    if (!userId) return;
    const clerkName = user?.username;
    const name = data.name;
    const text = data.text;
    const theme = data.theme;
    await dbInsertblog(name, theme, text, userId, clerkName);
    router.push("/blog");
    router.refresh();
  };

  const mapThemeToIcon = (theme: string | null) => {
    switch (theme) {
      case 'Dumbbell':
        return <Dumbbell />;
      case 'BookMarked':
        return <BookMarked />;
      case 'Beef':
        return <Beef />;
      case 'Users':
        return <Users />;
      case 'Ellipsis':
        return <Ellipsis />;
      default:
        return <Ellipsis />;
    }
  };

  const handleChange = (event: any) => {
    setSelectedTheme(event.target.value);
  };

  return (
    <main className="flex items-center p-4 flex-col">
      <div className="border border-gray-400 p-4 m-4 text-gray-700 rounded-md shadow-md">
        <form onSubmit={form.handleSubmit(handleMyForm)}>
          <label className="font-bold" htmlFor="name">Name</label>
          <br />
          <input
            placeholder="Name of the Blog"
            className="border-gray-400 p-1 border rounded-md w-grow"
            {...form.register("name")}
          />
          <br />
          <label className="font-bold" htmlFor="theme">Thema</label>
          <br />
          <div>
            <select
              className="border-gray-400 p-2 border rounded-md w-grow"
              {...form.register("theme")}
              value={selectedTheme}
              onChange={handleChange}
            >
              <option value="Dumbbell">Sport & Fitness</option>
              <option value="BookMarked">Learning</option>
              <option value="Beef">Food</option>
              <option value="Users">Friends & Family</option>
              <option value="Ellipsis">Other</option>
            </select>

            <div className="float-right rounded-md p-2 text-gray-700">
              {mapThemeToIcon(selectedTheme)}
            </div>            
          </div>

          
          <label className="font-bold" htmlFor="text">Text</label>
          <br />
          <textarea
            placeholder="Description..."
            className="border-gray-400 p-1 border rounded-md flex h-32 resize-none"
            {...form.register("text")}
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
