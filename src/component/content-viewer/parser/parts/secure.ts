import type { ContentSecure } from "../contentParser.type";

import regexp from "./regexp";

export default {
  URL: function(url) {
    regexp.HTTPS_PROTOCOL_REGEXP.lastIndex = 0
    return regexp.HTTPS_PROTOCOL_REGEXP.test(url)
  },
  DOM: function(line) {
    regexp.SCRIPT_TAG_REGEXP.lastIndex = 0
    regexp.HTML_TAG_WITH_HANDLERS_REGEXP.lastIndex = 0
    return !regexp.SCRIPT_TAG_REGEXP.test(line) && !regexp.HTML_TAG_WITH_HANDLERS_REGEXP.test(line)
  }
} as ContentSecure