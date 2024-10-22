export default function createFormDataFromJSON(json: any): FormData {
  const formData = new FormData()

  for(let [key, value] of Object.entries(json)) {
    if(typeof value === 'undefined') {
      continue
    } else if(value instanceof FileList) {
      formData.append(key, value[0])
    } else if(Array.isArray(value)) {
      for(let index: number = 0; index < value.length; index++) formData.append(index.toString(), value[index] as string)
    } else {
      formData.append(key, value as string)
    }
  }

  return formData
}