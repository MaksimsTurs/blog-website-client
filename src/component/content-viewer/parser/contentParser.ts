import type { ContentParser } from "./contentParser.type";

import regexp from "./parts/regexp";
import is from "./parts/is";
import have from "./parts/have";
import parseAs from "./parts/parseAs";
import benchmark from "./parts/benchmark";
import error from "./parts/error";
import kind from "./parts/kind";

const ContentParser: ContentParser = {
  regexp,
  is,
  have,
  kind,
  parseAs,
  benchmark,
  error
}

export default ContentParser