export function SidebarHeading({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        height: "50px",
        minHeight: "36px",
        flexShrink: 0,
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <span
        style={{
          fontSize: "12px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--text-neutral)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
