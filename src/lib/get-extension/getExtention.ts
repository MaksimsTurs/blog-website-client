export default function getExtension(url: string): string {
  const splited: string[] = url.split(/\./)
  return splited[splited.length - 1]
}