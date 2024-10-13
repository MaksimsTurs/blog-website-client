import TextInput from '@/component/input/textInput/textInput'

import type { FilterInputProps } from '../page.type'

export default function SortInput({ changeFilterData, filterData, filterDataName }: FilterInputProps) {
  return(
    <TextInput 
      name={filterDataName} 
      placeholder={`Find by ${filterDataName}...`} 
      value={filterData[filterDataName] as string} 
      onInput={(event) => changeFilterData(filterDataName, event.currentTarget.value)}/>
    )
}