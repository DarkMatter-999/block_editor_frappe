export const editorSettings = {
  hasFixedToolbar: false,
  __unstableIsPreviewMode: false,
  supportsLayout: true,
  alignWide: true,
  align: true,

  layout: { type: "constrained", contentSize: "800px", wideSize: "1200px" },

  colors: [
    { name: "Frappe Blue", slug: "frappe-blue", color: "#2490ef" },
    { name: "Gray 700", slug: "gray-700", color: "#3e444c" },
    { name: "Gray 200", slug: "gray-200", color: "#e2e4e7" },
  ],

  __experimentalFeatures: {
    typography: {
      fontSize: true,
      lineHeight: true,
      fontStyle: true,
      fontWeight: true,
      textTransform: true,
      textDecoration: true,
      letterSpacing: true,
    },
    color: {
      custom: true,
      text: true,
      background: true,
      link: true,
      customGradient: true,
    },
    spacing: {
      margin: true,
      padding: true,
      blockGap: true,
    },
    blocks: {
      "core/paragraph": {
        typography: { fontSize: true, lineHeight: true },
        color: { text: true, background: true, link: true },
      },
      "core/heading": {
        typography: { fontSize: true, lineHeight: true },
        color: { text: true, background: true },
      },
      "core/image": {
        color: { text: true, background: true },
      },
    },
  },
} as Record<string, unknown>;
