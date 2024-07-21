export default function createFormDataFromJSON(json: any): FormData {
  const formData = new FormData()

  for(let [key, value] of Object.entries(json)) formData.append(key, value as string)

  return formData
}