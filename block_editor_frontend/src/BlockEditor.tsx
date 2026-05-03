import {
  parse,
  serialize,
  getSaveContent,
  type BlockInstance,
} from "@wordpress/blocks";
import {
  BlockEditorProvider,
  BlockList,
  // @ts-expect-error - not yet in types
  BlockStyles,
  // @ts-expect-error - not yet in types
  BlockTools,
  WritingFlow,
} from "@wordpress/block-editor";
import { SlotFillProvider, Popover } from "@wordpress/components";
import "@wordpress/format-library";
import {
  createElement,
  RawHTML,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "@wordpress/element";

import { initEditor } from "./utils/initEditor";

import {
  IconChevronLeft,
  IconListView,
  IconPlus,
  IconSettings,
} from "./components/Icons";
import { TopbarButton } from "./components/TopbarButton";
import { editorSettings } from "./utils/editorSettings";
import { EditorSidebar } from "./components/EditorSidebar";
import { DocumentSidebar } from "./components/DocumentSidebar";
import { frappeMediaUpload } from "./utils/frappeMediaUpload";

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
  docName?: string;
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
  docName,
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
  const [settings, setSettings] = useState(initialSettings);

  const settingsForProvider = useMemo(() => {
    return {
      ...editorSettings,
      mediaUpload: (args: any) => {
        const files = args.files || args.filesList;
        if (files && files.length > 0) {
          return frappeMediaUpload({
            ...args,
            files,
            docName,
          });
        }
      },
    };
  }, [docName]);

  /**
   * Maps Gutenberg block attributes to frontend CSS classes.
   * handles Layout (Flex/Stack), Spacing, and custom styles.
   */
  const getBlockContextualClasses = (
    blockName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            createElement(RawHTML, { children: innerHtmlString }) as any,
          );
        })
        .join("");
    };

    return renderBlocks(blocks);
  };

  const handleInput = useCallback(
    (newBlocks: BlockInstance[]) => {
      setBlocks(newBlocks);
      const serializedContent = serialize(newBlocks);
      setIsDirty(serializedContent !== lastSavedRef.current);
      onChange?.(serializedContent);
    },
    [onChange],
  );

  const toggleLeft = (panel: LeftPanel) =>
    setLeftPanel((prev) => (prev === panel ? null : panel));

  const handleSave = () => {
    const renderedHTML = getRenderedHTML(blocks);
    setIsDirty(false);
    setShowRight(true);
    setRightPanel("page");
    onSave?.(
      settings.title,
      renderedHTML,
      settings.route,
      settings.published,
      settings.meta_title,
      settings.meta_description,
    );

    setInitialSettings(settings);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(e.target.value !== initialSettings.title);
    setSettings((s) => ({ ...s, title: e.target.value }));
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
            value={settings.title}
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
          settings={settingsForProvider}
          // @ts-expect-error - not yet in types
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
            <DocumentSidebar
              leftPanel={leftPanel}
              setLeftPanel={setLeftPanel}
            />

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
                // @ts-expect-error - not yet in types
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
              <EditorSidebar
                rightPanel={rightPanel}
                setRightPanel={setRightPanel}
                showRight={showRight}
                setShowRight={setShowRight}
                settings={settings}
                setSettings={setSettings}
                handleTitle={handleTitle}
                isDirty={isDirty}
                setIsDirty={setIsDirty}
                initialSettings={initialSettings}
              />
            )}
          </div>

          <Popover.Slot />
        </BlockEditorProvider>
      </SlotFillProvider>
    </div>
  );
}
