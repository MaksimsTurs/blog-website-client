import TextInput from '@/component/input/text-input/textInput'

import type { FilterInputProps } from '../page.type'

export default function SortInput({ changeFilterData, filterData, filterDataName }: FilterInputProps) {
  return(
    <TextInput 
      name={filterDataName} 
      type='text'
      placeholder={`Suchen nach ${filterDataName}...`} 
      value={filterData[filterDataName] as string} 
      onInput={(event) => changeFilterData(filterDataName, event.currentTarget.value)}/>
    )
}