export default function getAssetExtension(fileName: string): string {
  const splited: string[] = fileName.split(/\./)
  return splited[splited.length - 1]
}