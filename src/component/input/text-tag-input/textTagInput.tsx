import type { TextTagInputProps } from "../input.type";

import { useState, Fragment, SyntheticEvent } from "react";

import TextInput from "../textInput/textInput";
import TagPreview from "@/component/tag-preview/tagPreview";

export default function TextTagInput({ getTags, placeholder, value }: TextTagInputProps) {
  const [tags, setTags] = useState<string[]>(value || [])

  const removeTag = (_tag: string): void => {
    setTags(prev => {
      const newTagState: string[] = prev.filter((_, index) => index !== prev.indexOf(_tag))
      getTags(newTagState)
      return newTagState
    })
  }

  const insertNewTag = (event: SyntheticEvent<HTMLInputElement>) => {
    const newTagState: string[] = event.currentTarget.value.split(/\,/)
    setTags(newTagState)
    getTags(newTagState)
  }
  
  return(
    <Fragment>
      <TextInput name="tags" onInput={insertNewTag} placeholder={placeholder} defaultValue={tags.join(',')}/>
      <TagPreview removeTag={removeTag} tags={tags}/>
    </Fragment>
  )
}