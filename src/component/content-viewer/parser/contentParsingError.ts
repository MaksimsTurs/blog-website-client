import type { ContentParsingErrorInformation } from "./contentParser.type"

class ContentParsingError extends Error {
  constructor(information: ContentParsingErrorInformation) {
    super(information.message)
    this.name = 'Error by content parsing'
    console.info(information)
  }
}

export default ContentParsingError