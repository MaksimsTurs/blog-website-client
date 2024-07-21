import fetcher from "@/lib/fetcher/fetcher";

export default async function uploadAsset(formData: FormData): Promise<{ assetURL: string }> {
  try {
    return await fetcher.post<{ assetURL: string }>('/api/upload', formData)
  } catch(error) {
    throw new Error('Error by uploading img!')
  } 
}