export default function createRedirectURL(template: string, response: any) {
  const key = template.replace(/.+?(\{.+\})/, '$1').replace(/\{(.+)\}/, '$1').trim()
  const objectProp = Array.isArray(response) ? response[0][key] : response[key]
  
  return template.replace(/.\{.+\}/, objectProp)
}