import check from "@/component/content-viewer/parser/contentParser"

export default function areaValidation(currState: { alt?: string, url?: string, asset?: File }) {
  let errors: { [key: string]: string } = {}

  if(!currState.alt) errors = {...errors, alt: 'Alt is required filed!' }
  if(!check.is.secureURL(currState.url || '') && !currState.url && !currState.asset) errors = {...errors, url: 'URL is not valid!' }
  if((currState.url || '')?.length > 0 && currState.asset) errors = {...errors, url: 'Url or Data url is defined!'  }

  return errors
}