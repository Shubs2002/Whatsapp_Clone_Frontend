import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { fetchConversations } from "../services/api";
import { initSocket } from "../services/socket";

export default function ChatPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<{ wa_id: string; name: string } | null>(null);

  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE || "http://localhost:4000";
    initSocket(base);
    load();
    const iv = setInterval(load, 5000);
    return () => clearInterval(iv);
  }, []);

  const load = async () => {
    const r = await fetchConversations();
    setConversations(r.data);
   if (!activeChat && r.data.length) {
  setActiveChat({
    wa_id: r.data[0]._id,
    name: r.data[0].contact_name || r.data[0]._id,
  });
}

  };

  return (
    <div className="app-grid">
      <Sidebar
  conversations={conversations}
  onSelect={(chat) =>
    setActiveChat({
      wa_id: chat._id,
      name: chat.contact_name || chat._id, 
    })
  }
/>

      <ChatWindow wa_id={activeChat?.wa_id || null} name={activeChat?.name || ""} />
    </div>
  );
}
