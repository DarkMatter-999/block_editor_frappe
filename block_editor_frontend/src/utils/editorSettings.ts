export const editorSettings = {
  hasFixedToolbar: false,
  __unstableIsPreviewMode: false,
  supportsLayout: true,
  alignWide: true,
  align: true,

  layout: { type: "constrained", contentSize: "800px", wideSize: "1200px" },
  contentSize: "800px",
  wideSize: "1200px",

  // TwentyTwentyFive theme.json (https://github.com/WordPress/wordpress-develop/blob/trunk/src/wp-content/themes/twentytwentyfive/theme.json)
  __experimentalFeatures: {
    appearanceTools: false,
    useRootPaddingAwareAlignments: true,
    border: {
      color: true,
      radius: true,
      style: true,
      width: true,
    },
    color: {
      background: true,
      button: true,
      caption: true,
      custom: true,
      customDuotone: true,
      customGradient: true,
      defaultDuotone: true,
      defaultGradients: true,
      defaultPalette: true,
      duotone: {
        default: [
          {
            name: "Dark grayscale",
            colors: ["#000000", "#7f7f7f"],
            slug: "dark-grayscale",
          },
          {
            name: "Grayscale",
            colors: ["#000000", "#ffffff"],
            slug: "grayscale",
          },
          {
            name: "Purple and yellow",
            colors: ["#8c00b7", "#fcff41"],
            slug: "purple-yellow",
          },
          {
            name: "Blue and red",
            colors: ["#000097", "#ff4747"],
            slug: "blue-red",
          },
          {
            name: "Midnight",
            colors: ["#000000", "#00a5ff"],
            slug: "midnight",
          },
          {
            name: "Magenta and yellow",
            colors: ["#c7005a", "#fff278"],
            slug: "magenta-yellow",
          },
          {
            name: "Purple and green",
            colors: ["#a60072", "#67ff66"],
            slug: "purple-green",
          },
          {
            name: "Blue and orange",
            colors: ["#1900d8", "#ffa96b"],
            slug: "blue-orange",
          },
        ],
      },
      gradients: {
        default: [
          {
            name: "Vivid cyan blue to vivid purple",
            gradient:
              "linear-gradient(135deg,rgb(6,147,227) 0%,rgb(155,81,224) 100%)",
            slug: "vivid-cyan-blue-to-vivid-purple",
          },
          {
            name: "Light green cyan to vivid green cyan",
            gradient:
              "linear-gradient(135deg,rgb(122,220,180) 0%,rgb(0,208,130) 100%)",
            slug: "light-green-cyan-to-vivid-green-cyan",
          },
          {
            name: "Luminous vivid amber to luminous vivid orange",
            gradient:
              "linear-gradient(135deg,rgb(252,185,0) 0%,rgb(255,105,0) 100%)",
            slug: "luminous-vivid-amber-to-luminous-vivid-orange",
          },
          {
            name: "Luminous vivid orange to vivid red",
            gradient:
              "linear-gradient(135deg,rgb(255,105,0) 0%,rgb(207,46,46) 100%)",
            slug: "luminous-vivid-orange-to-vivid-red",
          },
          {
            name: "Very light gray to cyan bluish gray",
            gradient:
              "linear-gradient(135deg,rgb(238,238,238) 0%,rgb(169,184,195) 100%)",
            slug: "very-light-gray-to-cyan-bluish-gray",
          },
          {
            name: "Cool to warm spectrum",
            gradient:
              "linear-gradient(135deg,rgb(74,234,220) 0%,rgb(151,120,209) 20%,rgb(207,42,186) 40%,rgb(238,44,130) 60%,rgb(251,105,98) 80%,rgb(254,248,76) 100%)",
            slug: "cool-to-warm-spectrum",
          },
          {
            name: "Blush light purple",
            gradient:
              "linear-gradient(135deg,rgb(255,206,236) 0%,rgb(152,150,240) 100%)",
            slug: "blush-light-purple",
          },
          {
            name: "Blush bordeaux",
            gradient:
              "linear-gradient(135deg,rgb(254,205,165) 0%,rgb(254,45,45) 50%,rgb(107,0,62) 100%)",
            slug: "blush-bordeaux",
          },
          {
            name: "Luminous dusk",
            gradient:
              "linear-gradient(135deg,rgb(255,203,112) 0%,rgb(199,81,192) 50%,rgb(65,88,208) 100%)",
            slug: "luminous-dusk",
          },
          {
            name: "Pale ocean",
            gradient:
              "linear-gradient(135deg,rgb(255,245,203) 0%,rgb(182,227,212) 50%,rgb(51,167,181) 100%)",
            slug: "pale-ocean",
          },
          {
            name: "Electric grass",
            gradient:
              "linear-gradient(135deg,rgb(202,248,128) 0%,rgb(113,206,126) 100%)",
            slug: "electric-grass",
          },
          {
            name: "Midnight",
            gradient:
              "linear-gradient(135deg,rgb(2,3,129) 0%,rgb(40,116,252) 100%)",
            slug: "midnight",
          },
        ],
      },
      heading: true,
      link: true,
      palette: {
        default: [
          { name: "Black", slug: "black", color: "#000000" },
          {
            name: "Cyan bluish gray",
            slug: "cyan-bluish-gray",
            color: "#abb8c3",
          },
          { name: "White", slug: "white", color: "#ffffff" },
          { name: "Pale pink", slug: "pale-pink", color: "#f78da7" },
          { name: "Vivid red", slug: "vivid-red", color: "#cf2e2e" },
          {
            name: "Luminous vivid orange",
            slug: "luminous-vivid-orange",
            color: "#ff6900",
          },
          {
            name: "Luminous vivid amber",
            slug: "luminous-vivid-amber",
            color: "#fcb900",
          },
          {
            name: "Light green cyan",
            slug: "light-green-cyan",
            color: "#7bdcb5",
          },
          {
            name: "Vivid green cyan",
            slug: "vivid-green-cyan",
            color: "#00d084",
          },
          { name: "Pale cyan blue", slug: "pale-cyan-blue", color: "#8ed1fc" },
          {
            name: "Vivid cyan blue",
            slug: "vivid-cyan-blue",
            color: "#0693e3",
          },
          { name: "Vivid purple", slug: "vivid-purple", color: "#9b51e0" },
        ],
        theme: [
          { color: "#FFFFFF", name: "Base", slug: "base" },
          { color: "#111111", name: "Contrast", slug: "contrast" },
          { color: "#FFEE58", name: "Accent 1", slug: "accent-1" },
          { color: "#F6CFF4", name: "Accent 2", slug: "accent-2" },
          { color: "#503AA8", name: "Accent 3", slug: "accent-3" },
          { color: "#686868", name: "Accent 4", slug: "accent-4" },
          { color: "#FBFAF3", name: "Accent 5", slug: "accent-5" },
          {
            color: "color-mix(in srgb, currentColor 20%, transparent)",
            name: "Accent 6",
            slug: "accent-6",
          },
        ],
      },
      text: true,
    },
    dimensions: {
      defaultAspectRatios: true,
      aspectRatios: {
        default: [
          { name: "Square - 1:1", slug: "square", ratio: "1" },
          { name: "Standard - 4:3", slug: "4-3", ratio: "4/3" },
          { name: "Portrait - 3:4", slug: "3-4", ratio: "3/4" },
          { name: "Classic - 3:2", slug: "3-2", ratio: "3/2" },
          { name: "Classic Portrait - 2:3", slug: "2-3", ratio: "2/3" },
          { name: "Wide - 16:9", slug: "16-9", ratio: "16/9" },
          { name: "Tall - 9:16", slug: "9-16", ratio: "9/16" },
        ],
      },
      aspectRatio: true,
      height: true,
      minHeight: true,
      width: true,
    },
    shadow: {
      defaultPresets: true,
      presets: {
        default: [
          {
            name: "Natural",
            slug: "natural",
            shadow: "6px 6px 9px rgba(0, 0, 0, 0.2)",
          },
          {
            name: "Deep",
            slug: "deep",
            shadow: "12px 12px 50px rgba(0, 0, 0, 0.4)",
          },
          {
            name: "Sharp",
            slug: "sharp",
            shadow: "6px 6px 0px rgba(0, 0, 0, 0.2)",
          },
          {
            name: "Outlined",
            slug: "outlined",
            shadow: "6px 6px 0px -3px rgb(255, 255, 255), 6px 6px rgb(0, 0, 0)",
          },
          { name: "Crisp", slug: "crisp", shadow: "6px 6px 0px rgb(0, 0, 0)" },
        ],
      },
    },
    spacing: {
      blockGap: true,
      margin: true,
      padding: true,
      customSpacingSize: true,
      defaultSpacingSizes: false,
      units: ["%", "px", "em", "rem", "vh", "vw"],
      spacingScale: {
        default: {
          operator: "*",
          increment: 1.5,
          steps: 7,
          mediumStep: 1.5,
          unit: "rem",
        },
      },
      spacingSizes: {
        default: [
          { name: "2X-Small", slug: "20", size: "0.44rem" },
          { name: "X-Small", slug: "30", size: "0.67rem" },
          { name: "Small", slug: "40", size: "1rem" },
          { name: "Medium", slug: "50", size: "1.5rem" },
          { name: "Large", slug: "60", size: "2.25rem" },
          { name: "X-Large", slug: "70", size: "3.38rem" },
          { name: "2X-Large", slug: "80", size: "5.06rem" },
        ],
        theme: [
          { name: "Tiny", size: "10px", slug: "20" },
          { name: "X-Small", size: "20px", slug: "30" },
          { name: "Small", size: "30px", slug: "40" },
          { name: "Regular", size: "clamp(30px, 5vw, 50px)", slug: "50" },
          { name: "Large", size: "clamp(30px, 7vw, 70px)", slug: "60" },
          { name: "X-Large", size: "clamp(50px, 7vw, 90px)", slug: "70" },
          { name: "XX-Large", size: "clamp(70px, 10vw, 140px)", slug: "80" },
        ],
      },
    },
    typography: {
      customFontSize: true,
      defaultFontSizes: false,
      dropCap: true,
      fontSizes: {
        default: [
          { name: "Small", slug: "small", size: "13px" },
          { name: "Medium", slug: "medium", size: "20px" },
          { name: "Large", slug: "large", size: "36px" },
          { name: "Extra Large", slug: "x-large", size: "42px" },
        ],
        theme: [
          { fluid: false, name: "Small", size: "0.875rem", slug: "small" },
          {
            fluid: { max: "1.125rem", min: "1rem" },
            name: "Medium",
            size: "1rem",
            slug: "medium",
          },
          {
            fluid: { max: "1.375rem", min: "1.125rem" },
            name: "Large",
            size: "1.38rem",
            slug: "large",
          },
          {
            fluid: { max: "2rem", min: "1.75rem" },
            name: "Extra Large",
            size: "1.75rem",
            slug: "x-large",
          },
          {
            fluid: { max: "3rem", min: "2.15rem" },
            name: "Extra Extra Large",
            size: "2.15rem",
            slug: "xx-large",
          },
        ],
      },
      fontStyle: true,
      fontWeight: true,
      letterSpacing: true,
      lineHeight: true,
      textAlign: true,
      textColumns: true,
      textDecoration: true,
      textIndent: "subsequent",
      textTransform: true,
      writingMode: true,
      fluid: true,
    },
    blocks: {
      "core/button": {
        border: { radius: true },
        dimensions: {
          dimensionSizes: {
            default: [
              { name: "25%", slug: "25", size: "25%" },
              { name: "50%", slug: "50", size: "50%" },
              { name: "75%", slug: "75", size: "75%" },
              { name: "100%", slug: "100", size: "100%" },
            ],
          },
        },
      },
      "core/image": {
        lightbox: { allowEditing: true },
      },
      "core/icon": {
        dimensions: { width: true },
      },
      "core/pullquote": {
        border: {
          color: true,
          radius: true,
          style: true,
          width: true,
        },
      },
    },
    layout: {
      contentSize: "645px",
      wideSize: "1340px",
    },
    background: {
      backgroundImage: true,
      backgroundSize: true,
    },
    position: {
      fixed: true,
      sticky: true,
    },
  },
} as Record<string, unknown>;
