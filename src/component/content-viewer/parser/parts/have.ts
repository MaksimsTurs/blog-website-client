import type { LineHave } from "../contentParser.type";

import regexp from "./regexp";

export default {
  bold: function(line) {
    regexp.BOLD_REGEXP.lastIndex = 0
    return regexp.BOLD_REGEXP.test(line)
  },
  header1: function(line) {
    regexp.HEADER_REGEXP_1.lastIndex = 0
    return regexp.HEADER_REGEXP_1.test(line)
  },
  header2: function(line) {
    regexp.HEADER_REGEXP_2.lastIndex = 0
    return regexp.HEADER_REGEXP_2.test(line)
  },
  img: function(line) {
    regexp.IMAGE_REGEXP.lastIndex = 0
    return regexp.IMAGE_REGEXP.test(line)
  },
  link: function(line) {
    regexp.LINK_REGEXP.lastIndex = 0
    return regexp.LINK_REGEXP.test(line)
  },
  video: function(line) {
    regexp.LINK_REGEXP.lastIndex = 0
    return regexp.VIDEO_REGEXP.test(line)
  },
  intendention: function(line) {
    return line[0] === '-'
  },
  list: function(line) {
    return line[0] === '+'
  },
  quote: function(line) {
    regexp.QUOTE_BRACKETS_REGEXP.lastIndex = 0
    return regexp.QUOTE_BRACKETS_REGEXP.test(line)
  }
} as LineHave