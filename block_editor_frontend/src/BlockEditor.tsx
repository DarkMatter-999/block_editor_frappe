import { useState } from "react";
import { parse, serialize, type BlockInstance } from "@wordpress/blocks";
import {
  BlockEditorProvider,
  BlockList,
  WritingFlow,
} from "@wordpress/block-editor";
import { SlotFillProvider } from "@wordpress/components";
import { initEditor } from "./utils/initEditor";

// Import essential CSS
import "@wordpress/components/build-style/style.css";
import "@wordpress/block-editor/build-style/style.css";
import "@wordpress/block-library/build-style/style.css";
import "@wordpress/block-library/build-style/editor.css";
import "@wordpress/block-library/build-style/theme.css";
import "@wordpress/format-library/build-style/style.css";

export interface BlockEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  onClose?: () => void;
}

export function BlockEditor({ value = "", onChange }: BlockEditorProps) {
  const [blocks, setBlocks] = useState<BlockInstance[]>(() => {
    initEditor();
    return parse(value) || [];
  });

  const handleInput = (newBlocks: BlockInstance[]) => {
    setBlocks(newBlocks);
    if (onChange) {
      onChange(serialize(newBlocks));
    }
  };

  return (
    <div
      className="block-editor-wrapper"
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#fff",
      }}
    >
      <SlotFillProvider>
        <BlockEditorProvider
          value={blocks}
          onInput={handleInput}
          onChange={handleInput}
          settings={
            {
              hasFixedToolbar: false,
              layout: {
                contentSize: "800px",
                wideSize: "1200px",
              },
              colors: [
                { name: "Blue", slug: "blue", color: "#0089ff" },
                { name: "Dark", slug: "dark", color: "#333" },
              ],
            } as Record<string, unknown>
          }
        >
          <div
            className="block-editor-content"
            style={{ flex: 1, position: "relative" }}
          >
            <WritingFlow>
              <BlockList />
            </WritingFlow>
          </div>
        </BlockEditorProvider>
      </SlotFillProvider>
    </div>
  );
}
