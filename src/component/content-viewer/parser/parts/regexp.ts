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
  HTTPS_PROTOCOL_REGEXP: /((blob:?.+http?|https)|http|https):\/{2}/g,
  HTML_TAG_WITH_HANDLERS_REGEXP: /<.*? on.* .*?>/gm,
  SCRIPT_TAG_REGEXP: /<script.*?>([\s\S]*?)<\/script>/gm
} as ContentRegexp