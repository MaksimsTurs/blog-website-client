import type { ContentIs } from "../parseContent.type";

import regexp from "./regexp";

export default {
  secureLink: function(url: string) {
    return regexp.SECURE_PROTOCOL_REGEXP.test(url)
  }
} as ContentIs