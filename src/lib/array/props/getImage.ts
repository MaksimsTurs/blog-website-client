import CharacterArray from "@/lib/string/string"

export default function getImage(urls: string[]): string {
  const imageExtention: string[] = ['webp', 'jpeg', 'jpg', 'png']

  for(let index: number = 0; index < urls.length; index++) {
    if(imageExtention.includes(CharacterArray.getAssetExtension(urls[index]))) return urls[index]
  }  

  return ''
}