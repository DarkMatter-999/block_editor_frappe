import { Modal, Spinner } from "@wordpress/components";
import { useState, useEffect, useRef } from "@wordpress/element";
import { useFrappeFiles } from "../hooks/useFrappeFiles";
import { FileItem } from "./FileItem";
import { frappeMediaUpload } from "../utils/frappeMediaUpload";

export const MediaLibrary = ({
  onRequestClose,
  onSelect,
  multiple,
  docName,
  allowedTypes,
}: any) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { files, loading, loadingMore, hasMore, loadMore, refresh } =
    useFrappeFiles(debouncedSearch, allowedTypes);

  useEffect(() => {
    if (loading || loadingMore || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "150px" },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading, loadMore]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles?.length) return;

    setIsUploading(true);
    try {
      await frappeMediaUpload({
        files: selectedFiles,
        docName: typeof docName === "string" ? docName : "Home",
        onError: (msg: string) =>
          // @ts-expect-error - frappe object is available globally in the context of this component
          frappe.msgprint({
            title: "Error",
            message: msg,
            indicator: "red",
          }),
        onFileChange: (uploadedItems: FrappeFile[]) => {
          if (uploadedItems.length > 0) {
            if (!multiple) {
              onSelect({
                url: uploadedItems[0].file_url,
                id: uploadedItems[0].name,
                alt: uploadedItems[0].file_name,
              });
              onRequestClose();
            } else {
              refresh();
            }
          }
        },
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const acceptString = allowedTypes?.length
    ? allowedTypes
        .map((t: string) => (t.includes("/") ? t : `${t}/*`))
        .join(",")
    : "image/*,video/*,application/pdf";

  return (
    <Modal
      title="Media Library"
      onRequestClose={onRequestClose}
      className="frappe-media-modal"
      style={{ width: "850px" }}
    >
      <div
        className="media-library-toolbar"
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "15px",
          alignItems: "flex-end",
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <label
            style={{
              display: "block",
              marginBottom: "4px",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            Search Files
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Filter by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", maxWidth: "400px" }}
          />
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          style={{ height: "36px", padding: "0 15px", margin: "auto" }}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
          multiple={multiple}
          accept={acceptString}
        />
      </div>

      <div
        className="media-library-content"
        style={{ minHeight: "400px", position: "relative" }}
      >
        {loading ? (
          <div style={{ padding: "100px 0", textAlign: "center" }}>
            <Spinner />
            <p style={{ marginTop: "10px", color: "#666" }}>
              Fetching files...
            </p>
          </div>
        ) : (
          <>
            <div
              className="frappe-file-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "20px",
              }}
            >
              {files.map((file) => (
                <FileItem
                  key={file.name}
                  file={file}
                  onClick={() => {
                    onSelect({
                      url: file.file_url,
                      id: file.name,
                      alt: file.file_name,
                    });
                    onRequestClose();
                  }}
                />
              ))}
            </div>

            {!files.length && (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 0",
                  color: "#888",
                }}
              >
                No files found matching your criteria.
              </div>
            )}

            {hasMore && (
              <div
                ref={observerTarget}
                style={{
                  height: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Spinner />
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};
