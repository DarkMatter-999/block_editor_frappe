import { useState } from "react";
import {
  parse,
  serialize,
  getSaveContent,
  type BlockInstance,
} from "@wordpress/blocks";
import {
  BlockEditorProvider,
  BlockList,
  BlockInspector,
  BlockStyles,
  BlockTools,
  WritingFlow,
  __experimentalListView as ListView,
  __experimentalLibrary as BlockLibrary,
} from "@wordpress/block-editor";
import { SlotFillProvider, Popover } from "@wordpress/components";
import "@wordpress/format-library";
import { createElement, RawHTML, useRef } from "@wordpress/element";

import { initEditor } from "./utils/initEditor";

import {
  IconChevronLeft,
  IconListView,
  IconPlus,
  IconSettings,
} from "./components/Icons";
import { TopbarButton } from "./components/TopbarButton";
import { SidebarHeading } from "./components/SidebarHeading";
import { editorSettings } from "./utils/editorSettings";

import "./BlockEditor.scss";
import "./styles.scss";

import "@wordpress/components/build-style/style.css";
import "@wordpress/block-editor/build-style/style.css";
import "@wordpress/block-editor/build-style/content.css";
import "@wordpress/block-library/build-style/editor.css";

export interface BlockEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  onClose?: () => void;
  onSave?: (rendered: string) => void;
}

// What the left sidebar is showing. null = closed.
type LeftPanel = "inserter" | "overview" | null;

export function BlockEditor({
  value = "",
  onChange,
  onClose,
  onSave,
}: BlockEditorProps) {
  const [blocks, setBlocks] = useState<BlockInstance[]>(() => {
    initEditor();
    return parse(value) || [];
  });

  const [leftPanel, setLeftPanel] = useState<LeftPanel>("overview");
  const [showRight, setShowRight] = useState(true);

  const lastSavedRef = useRef(serialize(parse(value || "")));
  const [isDirty, setIsDirty] = useState(false);

  /**
   * Maps Gutenberg block attributes to frontend CSS classes.
   * handles Layout (Flex/Stack), Spacing, and custom styles.
   */
  const getBlockContextualClasses = (
    blockName: string,
    attributes: any,
  ): string => {
    const classes: string[] = [];

    if (blockName === "core/group" && attributes.layout) {
      const { type = "constrained", orientation = "horizontal" } =
        attributes.layout;

      if (type === "flex") {
        classes.push("is-layout-flex");
        classes.push(
          orientation === "vertical"
            ? "wp-block-group-is-layout-stack"
            : "wp-block-group-is-layout-row",
        );
      } else if (type === "constrained") {
        classes.push(
          "is-layout-constrained wp-block-group-is-layout-constrained",
        );
      } else if (type === "default" || type === "flow") {
        classes.push("is-layout-flow wp-block-group-is-layout-flow");
      }
    }

    if (attributes.align) {
      classes.push(`align${attributes.align}`);
    }

    if (attributes.className) {
      classes.push(attributes.className);
    }

    return classes.join(" ").trim();
  };

  const getRenderedHTML = (blocks: BlockInstance[]): string => {
    const renderBlocks = (blocks: BlockInstance[]): string => {
      return blocks
        .map((block) => {
          const attributes = {
            ...block.attributes,
            className: getBlockContextualClasses(block.name, block.attributes),
          };

          const innerHtmlString =
            block.innerBlocks.length > 0 ? renderBlocks(block.innerBlocks) : "";

          return getSaveContent(
            block.name,
            attributes,
            createElement(RawHTML, { children: innerHtmlString }) as any,
          );
        })
        .join("");
    };

    return renderBlocks(blocks);
  };

  const handleInput = (newBlocks: BlockInstance[]) => {
    setBlocks(newBlocks);

    const serializedContent = serialize(newBlocks);

    setIsDirty(serializedContent !== lastSavedRef.current);

    onChange?.(serializedContent);
  };

  const toggleLeft = (panel: LeftPanel) =>
    setLeftPanel((prev) => (prev === panel ? null : panel));

  return (
    <div
      className="block-editor-wrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        background: "var(--bg-color)",
        fontFamily: "var(--font-stack)",
        color: "var(--text-color)",
        fontSize: "var(--text-md)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "var(--navbar-height, 48px)",
          minHeight: "var(--navbar-height, 48px)",
          flexShrink: 0,
          borderBottom: "1px solid var(--border-color)",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          padding: "0 10px",
          gap: "6px",
          borderStyle: "none",
          background: "var(--navbar-bg, var(--bg-color))",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            justifySelf: "start",
            minWidth: 0,
          }}
        >
          {/* Back to Desk */}
          <button
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: "transparent",
              border: "1px solid var(--border-color)",
              cursor: "pointer",
              fontSize: "var(--text-sm)",
              fontFamily: "var(--font-stack)",
              color: "var(--text-muted)",
              padding: "0 10px",
              borderRadius: "var(--border-radius)",
              height: "28px",
              whiteSpace: "nowrap",
              transition: "background 0.1s, border-color 0.1s",
              flexShrink: 0,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "var(--control-bg)";
              e.currentTarget.style.borderColor = "var(--dark-border-color)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "var(--border-color)";
            }}
          >
            <IconChevronLeft />
            Back to Desk
          </button>

          <div
            style={{
              width: "1px",
              height: "18px",
              background: "var(--border-color)",
              margin: "0 2px",
              borderStyle: "none",
              flexShrink: 0,
            }}
          />

          {/* Inserter toggle */}
          <TopbarButton
            active={leftPanel === "inserter"}
            onClick={() => toggleLeft("inserter")}
            title=""
          >
            <IconPlus />
          </TopbarButton>

          {/* Document overview toggle */}
          <TopbarButton
            active={leftPanel === "overview"}
            onClick={() => toggleLeft("overview")}
            title="Document overview"
          >
            <IconListView />
          </TopbarButton>
        </div>

        {/* Centre title */}
        <div style={{ justifySelf: "center", whiteSpace: "nowrap" }}>
          <span
            style={{
              fontSize: "var(--text-md)",
              fontWeight: 600,
              color: "var(--heading-color, var(--text-color))",
            }}
          >
            Block Editor
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            justifySelf: "end",
          }}
        >
          {/* Block settings toggle */}
          <TopbarButton
            active={showRight}
            onClick={() => setShowRight((v) => !v)}
            title="Block settings"
          >
            <IconSettings />
          </TopbarButton>

          {/* Save Button */}
          <button
            onClick={() => {
              const renderedHTML = getRenderedHTML(blocks);
              setIsDirty(false);
              onSave?.(renderedHTML);
            }}
            disabled={!isDirty}
            className="btn btn-primary btn-sm primary-action"
          >
            Save
          </button>
        </div>
      </div>

      <SlotFillProvider>
        <BlockEditorProvider
          value={blocks}
          onInput={handleInput}
          onChange={handleInput}
          settings={editorSettings}
          stripExperimentalSettings={false}
        >
          <BlockStyles scope=".editor-styles-wrapper" />
          <div
            style={{
              display: "flex",
              flex: 1,
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            {/* Left sidebar */}
            {leftPanel !== null && (
              <div
                style={{
                  width: "350px",
                  minWidth: "350px",
                  flexShrink: 0,
                  borderRight: "1px solid var(--border-color)",
                  background: "var(--fg-color)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  borderStyle: "none",
                  minHeight: 0,
                }}
              >
                {leftPanel === "overview" && (
                  <SidebarHeading label={"Document overview"} />
                )}

                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    overflowX: "hidden",
                    minHeight: 0,
                  }}
                >
                  <div
                    style={{
                      display: leftPanel === "inserter" ? "block" : "none",
                      height: "100%",
                    }}
                  >
                    <BlockLibrary
                      showMostUsedBlocks
                      onClose={() => setLeftPanel(null)}
                    />
                  </div>

                  <div
                    style={{
                      display: leftPanel === "overview" ? "block" : "none",
                      padding: "4px 0",
                    }}
                  >
                    <ListView />
                  </div>
                </div>
              </div>
            )}

            {/* Canvas */}
            <BlockTools
              className="block-editor-content"
              style={{
                flex: 1,
                minWidth: 0,
                position: "relative",
                overflowY: "auto",
                overflowX: "hidden",
                background: "var(--bg-light-gray, var(--control-bg))",
              }}
            >
              <WritingFlow
                className="editor-styles-wrapper"
                style={{
                  padding: "40px",
                  width: "calc(100% - 2 * 6px)",
                  margin: "6px",
                  background: "var(--bg-color)",
                  fontFamily: "var(--font-stack)",
                  fontSize: "var(--text-md)",
                  lineHeight: 1.7,
                  color: "var(--text-color)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--border-radius-lg, var(--border-radius))",
                }}
              >
                <BlockList />
              </WritingFlow>
            </BlockTools>

            {/* Right sidebar */}
            {showRight && (
              <div
                style={{
                  width: "280px",
                  minWidth: "280px",
                  flexShrink: 0,
                  borderLeft: "1px solid var(--border-color)",
                  background: "var(--fg-color)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  minHeight: 0,
                  borderStyle: "none",
                }}
              >
                <SidebarHeading label="Block" />
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    overflowX: "hidden",
                    minHeight: 0,
                  }}
                >
                  <BlockInspector />
                </div>
              </div>
            )}
          </div>

          <Popover.Slot />
        </BlockEditorProvider>
      </SlotFillProvider>
    </div>
  );
}
