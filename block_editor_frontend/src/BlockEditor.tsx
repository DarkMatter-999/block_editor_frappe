import { useState } from "react";
import { parse, serialize, type BlockInstance } from "@wordpress/blocks";
import {
  BlockEditorProvider,
  BlockList,
  Inserter,
  WritingFlow,
  BlockTools,
  __experimentalListView as ListView,
  BlockInspector,
} from "@wordpress/block-editor";
import { SlotFillProvider, Popover } from "@wordpress/components";
import "@wordpress/format-library";
import { initEditor } from "./utils/initEditor";

import "./BlockEditor.scss";

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

export function BlockEditor({
  value = "",
  onChange,
  onClose,
}: BlockEditorProps) {
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
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        background: "#fff",
      }}
    >
      <div
        style={{
          height: "60px",
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#fff",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            color: "#1f2937",
            padding: "8px 12px",
            borderRadius: "4px",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#f3f4f6")}
          onMouseOut={(e) => (e.currentTarget.style.background = "none")}
        >
          Back to Desk
        </button>
        <div style={{ fontWeight: "600", color: "#1f2937" }}>Block Editor</div>

        <div style={{ width: "120px" }}></div>
      </div>
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
          <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            {/* Left Sidebar: Document Overview / Block Tree */}
            <div
              className="block-editor-editor-sidebar-left"
              style={{
                width: "280px",
                flexShrink: 0,
                borderRight: "1px solid #d1d8dd",
                background: "#f8f9fa",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <h3
                  style={{
                    fontSize: "13px",
                    textTransform: "uppercase",
                    color: "#646970",
                    margin: 0,
                    padding: "0 16px",
                  }}
                >
                  Document Overview
                </h3>
                <Inserter />
              </div>
              <div style={{ flex: 1, overflowY: "auto" }}>
                <ListView />
              </div>
            </div>

            {/* Central Editing Canvas */}
            <BlockTools
              className="block-editor-editor-content"
              style={{ flex: 1, position: "relative", overflowY: "auto" }}
            >
              <WritingFlow
                className="editor-styles-wrapper"
                style={{
                  padding: "40px",
                  minHeight: "100%",
                  maxWidth: "1000px",
                  margin: "0 auto",
                }}
              >
                <BlockList />
              </WritingFlow>
            </BlockTools>

            {/* Right Sidebar: Block Inspector */}
            <div
              style={{
                width: "280px",
                flexShrink: 0,
                borderLeft: "1px solid #d1d8dd",
                background: "#f8f9fa",
                padding: "16px",
                overflowY: "auto",
              }}
            >
              <BlockInspector />
            </div>
          </div>
          <Popover.Slot />
        </BlockEditorProvider>
      </SlotFillProvider>
    </div>
  );
}
