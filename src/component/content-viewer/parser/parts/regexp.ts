import type { ContentRegexp } from "../contentParser.type";

export default {
  //Text ; URL
  LINK_REGEXP: /\[(.*?);(.*?)\]/g,
  //Alt ; Context ; Src
  IMAGE_REGEXP: /\((.*?);(.*?);?(.*?)\)/g,
  //Name ; Text
  QUOTE_BRACKETS_REGEXP: /\(?(.*?)\)?\"{2}([^""]+?)\"{2}/gm,
  BOLD_REGEXP: /#{1}(.*?)#{1}/g,
  HEADER_REGEXP_1: /#{2}(.*?)#{2}/,
  HEADER_REGEXP_2: /#{3}(.*?)#{3}/,
  VIDEO_REGEXP: /\(\[(.+)\]\)/g,
  DEFAULT_REGEXP: /\[(.*?)\]/g,
  SECURE_PROTOCOL_REGEXP: /((blob:?.+https?)|https):\/{1,2}/g,
  SQUARE_BRACKETS_REGEXP: /^\[(.*)\]$/g,
  PAIR_BRACKETS_REGEXP: /\((.*?)\)/g,
  TAG_BRACKET_REGEXP: /<.*>(.*)<.*>/
} as ContentRegexp