export const frappeMediaUpload = async ({
  files,
  onError,
  onFileChange,
  docName,
}: any) => {
  const fileArray = Array.from(files || []);
  if (fileArray.length === 0) return;

  // @ts-expect-error - Assuming frappe is globally available
  const frappe = window.frappe;

  const uploadPromises = fileArray.map(async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("doctype", "Web Page");
    formData.append("docname", docName || "");
    formData.append("is_private", "0");

    try {
      const response = await fetch("/api/method/upload_file", {
        method: "POST",
        headers: {
          "X-Frappe-CSRF-Token": frappe.csrf_token,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.message) {
        // Map Frappe's response to Gutenberg's expected schema
        return {
          url: result.message.file_url,
          id: result.message.name,
          alt: result.message.file_name,
          caption: result.message.file_name,
        };
      } else {
        throw new Error(result._server_messages || "Upload failed");
      }
    } catch (err: any) {
      onError(err.message || "Upload failed");
      throw err;
    }
  });

  try {
    const results = await Promise.all(uploadPromises);
    onFileChange(results);
    return results;
  } catch (err) {
    return Promise.reject(err);
  }
};
