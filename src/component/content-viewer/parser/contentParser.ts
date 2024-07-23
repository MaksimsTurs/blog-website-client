import type { ContentParser } from "./contentParser.type";

import regexp from "./parts/regexp";
import kind from "./parts/kind";
import is from "./parts/is";
import have from "./parts/have";
import parseAs from "./parts/parseAs";
import tools from "./parts/tools";

const ContentParser: ContentParser = {
  regexp,
  kind,
  is,
  have,
  parseAs,
  tools
}

export default ContentParser