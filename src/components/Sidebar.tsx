

type Conv = {
  _id: string;
  contact_name?: string;
  lastMessage?: string;
  lastTimestamp?: number;
};

export default function Sidebar({
  conversations,
  onSelect,
}: {
  conversations: Conv[];
  onSelect: (chat: Conv) => void; // ✅ Now it passes the whole object
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">WhatsApp Clone</div>
      <div className="conv-list">
        {conversations.map((c) => (
          <div
            key={c._id}
            className="conv-item"
            onClick={() => onSelect(c)} // ✅ Pass the whole object
          >
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${
                c.contact_name || c._id
              }`}
              alt="avatar"
              className="conv-avatar"
            />
            <div className="conv-info">
              <div className="conv-name">{c.contact_name || c._id}</div>
              <div className="conv-last" title={c.lastMessage}>
                {c.lastMessage}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
