import React, { useEffect, useState, useRef } from "react";
import MessageBubble from "./MessageBubble";
import ChatHeader from "./ChatHeader";
import { fetchMessages, sendMessage } from "../services/api";
import { getSocket } from "../services/socket";

export default function ChatWindow({
  wa_id,
  name,
}: {
  wa_id: string | null;
  name: string;
}) {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wa_id) return;
    fetchMessages(wa_id).then((r) => setMessages(r.data));

    const s = getSocket();
    if (s) {
      s.emit("join", wa_id);
      s.on("message", (m: any) => {
        if (m.wa_id === wa_id) setMessages((prev) => [...prev, m]);
      });
      s.on("status_update", (u: any) => {
        setMessages((prev) =>
          prev.map((p) =>
            p.message_id === u.message_id ? { ...p, status: u.status } : p
          )
        );
      });
    }
    return () => {
      if (s) {
        s.off("message");
        s.off("status_update");
      }
    };
  }, [wa_id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wa_id || !text.trim()) return;
    const res = await sendMessage(wa_id, { text, from: "me" });
    setMessages((prev) => [...prev, res.data]);
    setText("");
  };

  if (!wa_id) return <div className="placeholder">Select a chat to start</div>;

  return (
    <div className="chat-window">
      <ChatHeader name={name} waId={wa_id} /> {/* ✅ Now uses passed name */}

      <div className="messages">
        {messages.map((m, i) => (
          <MessageBubble key={m.message_id || i} m={m} me={m.from === "me"} />
        ))}
        <div ref={scrollRef} />
      </div>

      <form className="composer" onSubmit={submit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
