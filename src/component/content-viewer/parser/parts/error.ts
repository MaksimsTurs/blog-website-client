import { ContentParserError } from "../contentParser.type";

import ContentParseError from "../contentParseError";

export default {
  throw: function(information) {
    throw new ContentParseError(information)
  }
} as ContentParserError