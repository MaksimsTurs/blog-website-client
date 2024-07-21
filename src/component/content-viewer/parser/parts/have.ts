import type { LineHave } from "../parseContent.type";

import regexp from "./regexp";

export default {
  bold: (line: string) => {
    regexp.BOLD_REGEXP.lastIndex = 0
    return regexp.BOLD_REGEXP.test(line)
  },
  header: (line: string) => {
    regexp.HEADER_REGEXP.lastIndex = 0
    return regexp.HEADER_REGEXP.test(line)
  },
  img: (line: string) => {
    regexp.IMAGE_REGEXP.lastIndex = 0
    return regexp.IMAGE_REGEXP.test(line)
  },
  link: function(line: string) {
    regexp.LINK_REGEXP.lastIndex = 0
    return regexp.LINK_REGEXP.test(line)
  },
  video: function(line: string) {
    regexp.LINK_REGEXP.lastIndex = 0
    return regexp.VIDEO_REGEXP.test(line)
  }
} as LineHave