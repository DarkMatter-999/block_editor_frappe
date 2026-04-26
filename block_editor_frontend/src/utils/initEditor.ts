import { registerCoreBlocks } from "@wordpress/block-library";

// Core
import * as paragraph from "@wordpress/block-library/build-module/paragraph";
import * as heading from "@wordpress/block-library/build-module/heading";

// List
import * as list from "@wordpress/block-library/build-module/list";
import * as listItem from "@wordpress/block-library/build-module/list-item";

// Text/code
import * as code from "@wordpress/block-library/build-module/code";
import * as preformatted from "@wordpress/block-library/build-module/preformatted";
import * as verse from "@wordpress/block-library/build-module/verse";

// Structured
import * as details from "@wordpress/block-library/build-module/details";
import * as quote from "@wordpress/block-library/build-module/quote";
import * as pullquote from "@wordpress/block-library/build-module/pullquote";

// Media
import * as image from "@wordpress/block-library/build-module/image";
import * as audio from "@wordpress/block-library/build-module/audio";
import * as video from "@wordpress/block-library/build-module/video";
import * as cover from "@wordpress/block-library/build-module/cover";
import * as mediaText from "@wordpress/block-library/build-module/media-text";

// Layout
import * as group from "@wordpress/block-library/build-module/group";
import * as columns from "@wordpress/block-library/build-module/columns";
import * as column from "@wordpress/block-library/build-module/column";
import * as spacer from "@wordpress/block-library/build-module/spacer";
import * as separator from "@wordpress/block-library/build-module/separator";

// Tables
import * as table from "@wordpress/block-library/build-module/table";

// Buttons
import * as buttons from "@wordpress/block-library/build-module/buttons";
import * as button from "@wordpress/block-library/build-module/button";

// Optional / experimental
import * as math from "@wordpress/block-library/build-module/math";

let initialized = false;

export function initEditor() {
  if (initialized) return;
  initialized = true;

  registerCoreBlocks([
    paragraph,
    heading,
    list,
    listItem,
    code,
    preformatted,
    verse,
    details,
    quote,
    pullquote,
    image,
    audio,
    video,
    cover,
    mediaText,
    group,
    columns,
    column,
    spacer,
    separator,
    table,
    buttons,
    button,
    math,
  ]);
}
