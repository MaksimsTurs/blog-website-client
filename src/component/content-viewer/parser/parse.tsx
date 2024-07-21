import{ Fragment, type ReactElement } from "react";
import type { ParseProps } from "../contentViewer.type";

import ContentParser from "./contentParser";
import regexp from "./parts/regexp";

export default function Parse({ line }: ParseProps) {
  if(ContentParser.have.header(line)) {
    const text: RegExpMatchArray | null = line.match(regexp.HEADER_REGEXP)
    const toWrapp: string = text?.[1] || ''

    return <Fragment><h1>{toWrapp}</h1></Fragment>
  }

  if(ContentParser.have.bold(line)) {

  }
  
  if(ContentParser.have.link(line)) {

  }

  if(ContentParser.have.img(line)) {

  }
}