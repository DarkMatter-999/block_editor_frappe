export const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      background: "transparent",
      border: "none",
      cursor: "pointer",
      color: "var(--text-muted)",
      padding: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "4px",
      marginLeft: "auto",
    }}
    onMouseOver={(e) =>
      (e.currentTarget.style.background = "var(--control-bg)")
    }
    onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </button>
);
