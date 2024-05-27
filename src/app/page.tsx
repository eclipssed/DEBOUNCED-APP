"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Home() {
  const [query, setquery] = useState("");
  const [users, setUsers] = useState([]);
 
  const api2 = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    let usersTimer = setTimeout(async () => {
      const result: any = await fetch(api2);
      const data = await result.json();
      // console.log(data)
      if (query.length > 0) {
        const filteredUsers = data.filter((user: any) => {
          return user.name.toLowerCase().includes(query.toLowerCase());
        });
        // console.log(filteredUsers);
        setUsers(filteredUsers);
      } else {
        setUsers(data);
      }
    }, 1000);

    return () => clearTimeout(usersTimer);
  }, [query]);

  return (
    <main className="bg-gradient-to-b flex flex-col items-center from-blue-100 to-pink-100 text-black min-h-screen">
      <div className="flex-col gap-4 items-center justify-center min-w-lg mt-20">
        <h2 className="text-center mb-4 text-xl font-medium">Search for users</h2>
        <input
          className="min-w-lg"
          type="text"
          onChange={(e) => setquery(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 mt-10 ">
        {users.length > 0 ? (
          users.map((user: any) => (
            <div
              key={user.id}
              className="border-2 border-red-500 rounded-lg mt-2"
            >
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          ))
        ) : (
          <div className="border-2 border-red-500 rounded-lg mt-2">
            No User found.
          </div>
        )}
      </div>
    </main>
  );
}
