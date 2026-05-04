import { useEffect, useState, useCallback, useMemo } from "@wordpress/element";

const PAGE_LEN = 20;

export function useFrappeFiles(query: string, allowedTypes?: string[]) {
  const [state, setState] = useState<FileState>({
    items: [],
    loading: false,
    loadingMore: false,
    hasMore: true,
  });

  const serverSideExtensions = useMemo(() => {
    if (!allowedTypes || allowedTypes.length === 0) return null;

    const extensions: string[] = [];
    const mimeMap: Record<string, string[]> = {
      image: ["jpg", "jpeg", "png", "gif", "svg", "webp"],
      video: ["mp4", "webm", "ogg", "mov"],
      application: ["pdf", "zip", "docx"],
    };

    allowedTypes.forEach((type) => {
      if (type.includes("/")) {
        extensions.push(type.split("/")[1]);
      } else if (mimeMap[type]) {
        extensions.push(...mimeMap[type]);
      }
    });
    return extensions;
  }, [allowedTypes]);

  const fetchFiles = useCallback(
    (isInitial = true) => {
      setState((prev) => {
        if (prev.loading || prev.loadingMore || (!isInitial && !prev.hasMore)) {
          return prev;
        }

        const filters: any[] = [
          ["is_folder", "=", 0],
          ["is_private", "=", 0],
        ];

        if (query) {
          filters.push(["file_name", "like", `%${query}%`]);
        }

        const extensionOrFilters =
          serverSideExtensions?.map((ext) => [
            "file_name",
            "like",
            `%.${ext}`,
          ]) || [];

        // @ts-expect-error - global frappe
        frappe.call({
          method: "frappe.client.get_list",
          args: {
            doctype: "File",
            fields: ["name", "file_name", "file_url", "file_type"],
            filters: filters,
            or_filters: extensionOrFilters,
            order_by: "creation desc",
            limit_start: isInitial ? 0 : prev.items.length,
            limit_page_length: PAGE_LEN,
          },
          callback: (r: any) => {
            const newFiles = r.message || [];

            setState((finalState) => {
              const existingItems = isInitial ? [] : finalState.items;
              const combined = [...existingItems, ...newFiles];

              const uniqueItems = Array.from(
                new Map(combined.map((item) => [item.name, item])).values(),
              );

              return {
                items: uniqueItems,
                hasMore: newFiles.length === PAGE_LEN,
                loading: false,
                loadingMore: false,
              };
            });
          },
          error: () => {
            setState((prev) => ({
              ...prev,
              loading: false,
              loadingMore: false,
            }));
          },
        });

        return {
          ...prev,
          [isInitial ? "loading" : "loadingMore"]: true,
        };
      });
    },
    [query, serverSideExtensions],
  );

  useEffect(() => {
    fetchFiles(true);
  }, [fetchFiles]);

  return {
    files: state.items,
    loading: state.loading,
    loadingMore: state.loadingMore,
    hasMore: state.hasMore,
    loadMore: useCallback(() => fetchFiles(false), [fetchFiles]),
    refresh: () => fetchFiles(true),
  };
}
