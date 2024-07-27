import type { ContentParserErrorInformation } from "./contentParser.type"

class ContentParseError extends Error {
  constructor(information: ContentParserErrorInformation) {
    super(information.message)
    this.name = 'Error by parsing content'

    console.log(information)
  }
}

export default ContentParseError