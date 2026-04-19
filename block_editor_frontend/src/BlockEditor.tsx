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
import { CloseButton } from "./components/CloseButton";
import { editorSettings } from "./utils/editorSettings";

import "./BlockEditor.scss";
import "./styles.scss";

import "@wordpress/components/build-style/style.css";
import "@wordpress/block-editor/build-style/style.css";
import "@wordpress/block-editor/build-style/content.css";
import "@wordpress/block-library/build-style/editor.css";

export interface BlockEditorProps {
  value?: string;
  title?: string;
  route?: string;
  published?: number;
  meta_title?: string;
  meta_description?: string;
  onChange?: (content: string) => void;
  onClose?: () => void;
  onSave?: (
    title: string,
    rendered: string,
    route: string,
    published: number,
    meta_title: string,
    meta_description: string,
  ) => void;
}

// What the left sidebar is showing. null = closed.
type LeftPanel = "inserter" | "overview" | null;

type RightPanel = "page" | "block";

export function BlockEditor({
  value = "",
  title = "",
  route = "",
  published = 0,
  meta_title = "",
  meta_description = "",
  onChange,
  onClose,
  onSave,
}: BlockEditorProps) {
  const [blocks, setBlocks] = useState<BlockInstance[]>(() => {
    initEditor();
    return parse(value) || [];
  });

  const [initialSettings, setInitialSettings] = useState({
    title,
    route,
    published,
    meta_title,
    meta_description,
  });

  const [leftPanel, setLeftPanel] = useState<LeftPanel>("overview");
  const [rightPanel, setRightPanel] = useState<RightPanel>("page");
  const [showRight, setShowRight] = useState(true);

  const lastSavedRef = useRef(serialize(parse(value || "")));
  const [isDirty, setIsDirty] = useState(false);
  const [curTitle, setTitle] = useState(initialSettings.title);
  const [curRoute, setRoute] = useState(initialSettings.route);
  const [curPublished, setPublished] = useState(initialSettings.published);
  const [curMetaTitle, setMetaTitle] = useState(initialSettings.meta_title);
  const [curMetaDescription, setMetaDescription] = useState(
    initialSettings.meta_description,
  );

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

  const handleSave = () => {
    const renderedHTML = getRenderedHTML(blocks);
    setIsDirty(false);
    onSave?.(
      curTitle,
      renderedHTML,
      curRoute,
      curPublished,
      curMetaTitle,
      curMetaDescription,
    );

    setInitialSettings({
      title: curTitle,
      published: curPublished,
      route: curRoute,
      meta_title: curMetaTitle,
      meta_description: curMetaDescription,
    });
  };

  const handleTitle = (e) => {
    setIsDirty(e.target.value !== initialSettings.title);
    setTitle(e.target.value);
  };

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
          <input
            className="form-control"
            style={{ textAlign: "center" }}
            value={curTitle}
            onChange={(e) => handleTitle(e)}
          />
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
            onClick={handleSave}
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingRight: "10px",
                      borderStyle: "none",
                      borderBottom: "1px solid var(--border-color)",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <SidebarHeading label={"Document overview"} />
                    </div>
                    <CloseButton onClick={() => setLeftPanel(null)} />
                  </div>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 10px",
                    height: "50px",
                    minHeight: "36px",
                    flexShrink: 0,
                    borderStyle: "none",
                    borderBottom: "1px solid var(--border-color)",
                  }}
                >
                  {["page", "block"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setRightPanel(tab as RightPanel)}
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom:
                          rightPanel === tab
                            ? "2px solid var(--text-color)"
                            : "none",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color:
                          rightPanel === tab
                            ? "var(--text-color)"
                            : "var(--text-muted)",
                        padding: "0 10px",
                        marginRight: "10px",
                        height: "100%",
                        transition: "all 0.1s ease",
                      }}
                    >
                      {tab === "page" ? "Page" : "Block"}
                    </button>
                  ))}
                  <CloseButton onClick={() => setShowRight(false)} />
                </div>

                {/* Tab Content */}
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    overflowX: "hidden",
                    minHeight: 0,
                  }}
                >
                  {rightPanel === "block" ? (
                    <BlockInspector />
                  ) : (
                    <div
                      style={{
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      {/* Page Title */}
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: "11px",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            marginBottom: "8px",
                            color: "var(--text-muted)",
                          }}
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={curTitle}
                          onChange={handleTitle}
                          style={{ width: "100%" }}
                        />
                      </div>

                      <hr
                        style={{
                          border: "none",
                          borderTop: "1px solid var(--border-color)",
                          margin: "0",
                        }}
                      />

                      {/* Published Status */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <label
                          style={{ fontSize: "13px", cursor: "pointer" }}
                          htmlFor="page-published"
                        >
                          Published
                        </label>
                        <input
                          type="checkbox"
                          id="page-published"
                          style={{ width: "16px", height: "16px" }}
                          value={curPublished}
                          checked={curPublished === 1}
                          onChange={(e) => {
                            setPublished(e.target.checked ? 1 : 0);
                            setIsDirty(
                              (e.target.checked ? 1 : 0) !==
                                initialSettings.published,
                            );
                          }}
                        />
                      </div>

                      {/* URL Slug */}
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: "11px",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            marginBottom: "8px",
                            color: "var(--text-muted)",
                          }}
                        >
                          Route (Slug)
                        </label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "13px",
                            color: "var(--text-muted)",
                          }}
                        >
                          <span>/</span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="page-slug"
                            style={{ flex: 1 }}
                            value={curRoute}
                            onChange={(e) => {
                              setRoute(e.target.value);
                              setIsDirty(
                                e.target.value !== initialSettings.route,
                              );
                            }}
                          />
                        </div>
                      </div>

                      {/* SEO Meta Title */}
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: "11px",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            marginBottom: "8px",
                            color: "var(--text-muted)",
                          }}
                        >
                          Meta Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="SEO Title..."
                          style={{ width: "100%" }}
                          value={curMetaTitle}
                          onChange={(e) => {
                            setMetaTitle(e.target.value);
                            setIsDirty(
                              e.target.value !== initialSettings.meta_title,
                            );
                          }}
                        />
                      </div>

                      {/* SEO Meta Description */}
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: "11px",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            marginBottom: "8px",
                            color: "var(--text-muted)",
                          }}
                        >
                          Meta Description
                        </label>
                        <textarea
                          className="form-control"
                          rows={4}
                          placeholder="SEO Description..."
                          style={{
                            width: "100%",
                            resize: "none",
                            fontSize: "13px",
                          }}
                          value={curMetaDescription}
                          onChange={(e) => {
                            setMetaDescription(e.target.value);
                            setIsDirty(
                              e.target.value !==
                                initialSettings.meta_description,
                            );
                          }}
                        />
                      </div>
                    </div>
                  )}
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
