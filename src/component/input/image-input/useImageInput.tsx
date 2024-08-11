import scss from './imageInput.module.scss'

import fetcher from "@/lib/fetcher/fetcher"

import useRequest from "@/custom-hook/use-request/useRequest"
import useSearchParams from "@/custom-hook/use-search-params/useSearchParams"
import useSelect from '../select-input/useSelectItem'

import { URL_SEARCH_PARAMS } from "@/conts"

import ImageInputLoader from "./imageInputLoader"

export default function useImageInput({ defaultValue }: { defaultValue?: string[] }) {
  const searchParams = useSearchParams()

  const SelectInput = useSelect({ defaultValue })

  const currentPage: number = parseInt(searchParams.get(URL_SEARCH_PARAMS["LIST-PAGE"]) || '0')
  
  const { data, prev, isPending } = useRequest<{ images: string[], pagesCount: number }>({ 
    deps: [`images-${currentPage}`],
    prev: [`images-${currentPage === 0 ? currentPage : currentPage - 1}`], 
    request: async () => await fetcher.get(`/get/images/${currentPage}`) 
  })

  const Component =
    <SelectInput.Wrapper className={scss.image_input_container} title='Uploaded images' pagesCount={data?.pagesCount || prev?.pagesCount || 0}>
      {!data && isPending ? 
      <ImageInputLoader/> : 
      data && data.images.map(url => <SelectInput.Item key={url} value={url} children={<img className={scss.image_input_image} src={url}/>}/>)}
    </SelectInput.Wrapper>
  
  return {
    clear: SelectInput.clear,
    selected: SelectInput.selected,
    Component,
  }
}