import { editorSettings } from "../utils/editorSettings";

type FeatureMap = Record<string, any>;

export function generateThemeCss(): string {
  const features = (editorSettings.__experimentalFeatures ||
    editorSettings) as FeatureMap;

  const rootVariables: string[] = [];
  const utilityClasses: string[] = [];

  // Colors & Backgrounds
  const colorSettings = features?.color || {};
  const palettes = colorSettings?.palette || {};

  const allPalettes = [
    ...(palettes?.default || []),
    ...(palettes?.theme || []),
  ];

  const colorMap = new Map<string, string>();
  for (const { slug, color } of allPalettes) {
    if (slug && color) colorMap.set(slug, color);
  }

  for (const [slug, color] of colorMap) {
    rootVariables.push(`--wp--preset--color--${slug}: ${color};`);

    utilityClasses.push(`
.has-${slug}-color { color: var(--wp--preset--color--${slug}) !important; }
.has-${slug}-background-color { background-color: var(--wp--preset--color--${slug}) !important; }
.has-${slug}-border-color { border-color: var(--wp--preset--color--${slug}) !important; }`);
  }

  // Gradients
  const gradientsSettings = colorSettings?.gradients || {};
  const allGradients = [
    ...(gradientsSettings?.default || []),
    ...(gradientsSettings?.theme || []),
  ];

  const gradientMap = new Map<string, string>();
  for (const { slug, gradient } of allGradients) {
    if (slug && gradient) gradientMap.set(slug, gradient);
  }

  for (const [slug, gradient] of gradientMap) {
    rootVariables.push(`--wp--preset--gradient--${slug}: ${gradient};`);
    utilityClasses.push(`
.has-${slug}-gradient-background { background: var(--wp--preset--gradient--${slug}) !important; }`);
  }

  // Font Sizes
  const typographySettings = features?.typography || {};
  const fontSizesSettings = typographySettings?.fontSizes || {};
  const allFontSizes = [
    ...(fontSizesSettings?.default || []),
    ...(fontSizesSettings?.theme || []),
  ];

  const fontSizeMap = new Map<string, string>();
  for (const { slug, size } of allFontSizes) {
    if (slug && size) fontSizeMap.set(slug, size);
  }

  for (const [slug, size] of fontSizeMap) {
    rootVariables.push(`--wp--preset--font-size--${slug}: ${size};`);
    utilityClasses.push(`
.has-${slug}-font-size { font-size: var(--wp--preset--font-size--${slug}) !important; }`);
  }

  // Spacing
  const spacingSettings = features?.spacing || {};
  const spacingSizes = spacingSettings?.spacingSizes || {};
  const allSpacing = [
    ...(spacingSizes?.default || []),
    ...(spacingSizes?.theme || []),
  ];

  const spacingMap = new Map<string, string>();
  for (const { slug, size } of allSpacing) {
    if (slug && size) spacingMap.set(slug, size);
  }

  for (const [slug, size] of spacingMap) {
    rootVariables.push(`--wp--preset--spacing--${slug}: ${size};`);
  }

  // 5. Shadows
  const shadowSettings = features?.shadow || {};
  const shadowPresets = shadowSettings?.presets || {};
  const allShadows = [
    ...(shadowPresets?.default || []),
    ...(shadowPresets?.theme || []),
  ];

  const shadowMap = new Map<string, string>();
  for (const { slug, shadow } of allShadows) {
    if (slug && shadow) shadowMap.set(slug, shadow);
  }

  for (const [slug, shadow] of shadowMap) {
    rootVariables.push(`--wp--preset--shadow--${slug}: ${shadow};`);
  }

  // Layout Properties
  const layout = features?.layout || editorSettings?.layout || {};
  if (layout?.contentSize) {
    rootVariables.push(
      `--wp--style--global--content-size: ${layout.contentSize};`,
    );
  }
  if (layout?.wideSize) {
    rootVariables.push(`--wp--style--global--wide-size: ${layout.wideSize};`);
  }

  // Base Block Core Styles
  utilityClasses.push(`
/* WP Core Alignments */
.aligncenter { text-align: center; margin-left: auto; margin-right: auto; }
.alignwide { max-width: var(--wp--style--global--wide-size); margin-left: auto; margin-right: auto; }
.alignfull { max-width: none; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); width: 100vw; }

/* WP Core Helpers */
.has-text-color { color: var(--wp--preset--color--text, inherit); }
.has-background { padding: 1.25em 2.375em; }
  `);

  return `
/* --- Auto-generated WP Block Editor Variables --- */
:root {
  ${rootVariables.join("\n  ")}
}

/* --- Auto-generated WP Block Editor Utility Classes --- */
${utilityClasses.join("\n")}
`;
}
