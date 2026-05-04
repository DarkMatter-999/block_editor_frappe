interface FrappeFile {
  name: string;
  file_name: string;
  file_url: string;
  file_type: string;
}

interface FileState {
  items: FrappeFile[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
}
