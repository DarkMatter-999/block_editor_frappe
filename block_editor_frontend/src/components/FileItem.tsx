import { IconFile } from "./Icons";

export const FileItem = ({ file, onClick }) => {
  const isImage = ["PNG", "JPG", "JPEG", "SVG", "WEBP"].includes(
    file.file_type?.toUpperCase(),
  );

  return (
    <div
      className="frappe-file-card"
      onClick={onClick}
      style={{
        cursor: "pointer",
        border: "1px solid var(--border-color, #d1d8dd)",
        borderRadius: "var(--border-radius, 8px)",
        padding: "8px",
        transition: "all 0.2s ease",
        background: "var(--control-bg, #fff)",
        boxShadow: "var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.04))",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "var(--primary, #111)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--border-color, #d1d8dd)")
      }
    >
      <div
        style={{
          height: "100px",
          marginBottom: "8px",
          background: "#f8f9fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        {isImage ? (
          <img
            src={file.file_url}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{ fontSize: "24px", opacity: 0.3 }}>
            <IconFile />
          </div>
        )}
      </div>
      <div
        style={{
          fontSize: "12px",
          fontWeight: 400,
          color: "var(--text-color, #111)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {file.file_name}
      </div>
    </div>
  );
};
