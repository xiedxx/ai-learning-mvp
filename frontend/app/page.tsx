"use client";
import { useState } from "react";
import { getUsers } from "@/lib/api.backend";
import { chat } from "@/lib/api.ai";

// 定义 User 类型
interface User {
  id: number;
  name: string;
  email: string;
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [aiResp, setAiResp] = useState("");

  const handleUsers = async () => {
    try {
      const res: User[] = await getUsers();
      setUsers(res);
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert("Error: " + e.message);
      } else {
        alert("Unknown error");
      }
    }
  };

  const handleChat = async () => {
    try {
      const res: { response: string } = await chat("Hello AI");
      setAiResp(res.response);
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert("Error: " + e.message);
      } else {
        alert("Unknown error");
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">Demo: 三服务联通</h1>

      <div>
        <button
          onClick={handleUsers}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
        >
          获取用户
        </button>
        <ul className="mt-4 space-y-1">
          {users.map((u) => (
            <li key={u.id}>
              {u.name} ({u.email})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button
          onClick={handleChat}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
        >
          发送聊天
        </button>
        {aiResp && <p className="mt-2 text-gray-700">AI: {aiResp}</p>}
      </div>
    </div>
  );
}
