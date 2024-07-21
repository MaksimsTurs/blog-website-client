import type { ContentParser } from "./parseContent.type";

import regexp from "./parts/regexp";
import kind from "./parts/kind";
import is from "./parts/is";
import have from "./parts/have";
import parseAs from "./parts/parseAs";

const ContentParser: ContentParser = {
  regexp,
  kind,
  is,
  have,
  parseAs
}

export default ContentParser