export interface BlockEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  onClose?: () => void;
}

export function BlockEditor({
  value = "",
  onChange,
  onClose,
}: BlockEditorProps) {
  return <>BlockEditor</>;
}
