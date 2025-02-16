"use client";

import "tailwindcss"
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div>
        <input className="p-[10px]"
          value={roomId} 
          onChange={(e) => setRoomId(e.target.value)} 
          type="text" 
          placeholder="Room id"
        />

        <button className="p-[10px]" onClick={() => router.push(`/room/${roomId}`)}
        >
          Join room
        </button>
      </div>
    </div>
  );
}