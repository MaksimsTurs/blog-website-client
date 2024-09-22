import type { ContentRegexp } from "../contentParser.type";

export default {
  //Text ; URL
  LINK_REGEXP: /\[(.*?);(.*?)\]/g,
  //Alt ; Context ; Src
  IMAGE_REGEXP: /\<(.*?);(.*?);?(.*?)\>/g,
  //Name ; Text
  QUOTE_BRACKETS_REGEXP: /\(?(.*?)\)?\"{2}([^""]+?)\"{2}/gm,
  BOLD_REGEXP: /#(.*?)#/g,
  HEADER_REGEXP_1: /#{2}(.*?)#{2}/,
  HEADER_REGEXP_2: /#{3}(.*?)#{3}/,
  VIDEO_REGEXP: /\(\[(.+)\]\)/g,
  DEFAULT_REGEXP: /\[(.*?)\]/g,
  SQUARE_BRACKETS_REGEXP: /^\[(.*)\]$/g,
  PAIR_BRACKETS_REGEXP: /\((.*?)\)/g,
  TAG_BRACKET_REGEXP: /<.*>(.*)<.*>/,
  //Secure regexp
  HTML_TAG_REGEXP: /(\<.*\>([\s\S]*?)\<\/.*\>)|(\<.*\>)/g,
  UNSAFE_HTML_HANDLERS: /\"{1,}\s{0,}on.*/,
  PROTOCOL_REGEXP: /^((blob:?.+http?|https)|http|https):\/{2}/g
} as ContentRegexp