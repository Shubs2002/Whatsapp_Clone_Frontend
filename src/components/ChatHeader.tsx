

export default function ChatHeader({
  name,
  waId,
}: {
  name: string;
  waId: string;
}) {
  return (
    <div className="chat-header">
      <img
        src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
        alt="avatar"
        className="chat-header-avatar"
      />
      <div className="chat-header-info">
        <div className="chat-header-name">{name}</div>
        <div className="chat-header-number">{waId}</div>
      </div>
    </div>
  );
}
