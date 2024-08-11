export default function createFormDataFromJSON(json: any): FormData {
  const formData = new FormData()

  for(let [key, value] of Object.entries(json)) {
    if(value instanceof FileList) {
      formData.append(key, value[0])
    } else {
      formData.append(key, value as string)
    }
  }

  return formData
}