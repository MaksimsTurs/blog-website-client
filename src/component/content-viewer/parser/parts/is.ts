import type { ContentIs } from "../contentParser.type";

import regexp from "./regexp";

export default {
  secureLink: function(url: string) {
    regexp.SECURE_PROTOCOL_REGEXP.lastIndex = 0
    return regexp.SECURE_PROTOCOL_REGEXP.test(url)
  },
  imageTag: function(line: string) {
    return /<img/.test(line)
  }
} as ContentIs