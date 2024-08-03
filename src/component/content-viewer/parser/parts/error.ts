import { ContentParserError } from "../contentParser.type";

import ContentParseError from "../contentParsingError";

export default {
  throw: function(information) {
    throw new ContentParseError(information)
  }
} as ContentParserError