import type { ContentParsingErrorInformation } from "./contentParser.type"

class ContentParsingError extends Error {
  constructor(information: ContentParsingErrorInformation) {
    super(information.message)
    this.name = 'Error by content parsing'

    console.log(information)
  }
}

export default ContentParsingError