export function TopbarButton({
  active,
  onClick,
  title,
  children,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "30px",
        height: "30px",
        padding: 0,
        border: "1px solid var(--border-color)",
        borderRadius: "var(--border-radius)",
        background: active ? "var(--control-bg)" : "transparent",
        color: active ? "var(--text-color)" : "var(--text-muted)",
        cursor: "pointer",
        transition: "background 0.1s, color 0.1s",
        flexShrink: 0,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "var(--control-bg)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = active
          ? "var(--control-bg)"
          : "transparent";
      }}
    >
      {children}
    </button>
  );
}
