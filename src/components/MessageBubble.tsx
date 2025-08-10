import React from "react";

export default function MessageBubble({ m, me }: { m: any, me?: boolean }) {
  return (
    <div className={`message ${me ? "me" : "them"}`}>
      <div className="bubble">
        <div className="text">{m.text}</div>
        <div className="meta">
          <small>{new Date(m.timestamp * 1000).toLocaleString()}</small>
          <small className="status">{m.status}</small>
        </div>
      </div>
    </div>
  )
}
