import type { ContentSecure } from "../contentParser.type";

import error from "./error";
import regexp from "./regexp";

export default {
  containsHTMLTag: function(content, information) {
    regexp.HTML_TAG_REGEXP.lastIndex = 0

    if(regexp.HTML_TAG_REGEXP.test(content) && !regexp.IMAGE_REGEXP.test(content)) error.throw(information)
  },
  URL: function(url, information) {
    regexp.UNSAFE_HTML_HANDLERS.lastIndex = 0
    regexp.PROTOCOL_REGEXP.lastIndex = 0

    if(regexp.UNSAFE_HTML_HANDLERS.test(url) || !regexp.PROTOCOL_REGEXP.test(url)) error.throw(information)
  },
} as ContentSecure