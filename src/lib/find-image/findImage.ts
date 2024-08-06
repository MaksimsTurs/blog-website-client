import getExtension from "../get-extension/getExtention";

export default function findImage(url: string[]) {
  const imageExtention: string[] = ['webp']

  for(let index: number = 0; index < url.length; index++) {
    if(imageExtention.includes(getExtension(url[index]))) return url[index]
  }  

  return ''
}