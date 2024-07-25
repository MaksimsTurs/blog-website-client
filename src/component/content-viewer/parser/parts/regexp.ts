import type { ContentRegexp } from "../contentParser.type";

export default {
  LINK_REGEXP: /\[(.*?);(.*?)\]/g,
  IMAGE_REGEXP: /\((.*?);(.*?)\)/g,
  HEADER_REGEXP_1: /##(.*?)##/,
  HEADER_REGEXP_2: /###(.*?)###/,
  BOLD_REGEXP: /#(.*?)#/g,
  VIDEO_REGEXP: /\(\[(.+)\]\)/g,
  DEFAULT_REGEXP: /\[(.*?)\]/g,
  SECURE_PROTOCOL_REGEXP: /((blob:?.+https?)|https):\/{1,2}/g,
  SQUARE_BRACKETS_REGEXP: /^\[(.*)\]$/g,
  PAIR_BRACKETS_REGEXP: /\((.*?)\)/g,
  TAG_BRACKET_REGEXP: /<.*>(.*)<.*>/
} as ContentRegexp