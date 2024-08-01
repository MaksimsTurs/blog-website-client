import TextInput from '@/component/input/textInput/textInput'

import type { SortInputProps } from '../page.type'

export default function SortInput({ changeSortData, sortData, sortDataName }: SortInputProps) {
  return(
    <TextInput 
      name={sortDataName} 
      placeholder={`Find by ${sortDataName}...`} 
      value={sortData[sortDataName]} 
      onInput={(event) => changeSortData(sortDataName, event.currentTarget.value)}/>
    )
}