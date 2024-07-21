export default function isValidRedirectURL(url: string) {
  return url.search('{page}') > 0
}