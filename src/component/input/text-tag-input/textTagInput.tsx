import type { TextTagInputProps } from "../input.type";

import { useState, Fragment, SyntheticEvent } from "react";

import TextInput from "../textInput/textInput";
import TagPreview from "@/component/tag-preview/tagPreview";

import tag from "./tag";
import removeDuplicate from "@/lib/remove-duplicate/removeDuplicate";

export default function TextTagInput({ getTags, placeholder, value }: TextTagInputProps) {
  const [tags, setTags] = useState<string[]>(value || [])

  const removeTag = (tag: string): void => {
    setTags(prev => {
      const newTagState: string[] = removeDuplicate(prev, tag)
      getTags(newTagState)
      return newTagState
    })
  }

  const insertNewTag = (event: SyntheticEvent<HTMLInputElement>): void => {
    const newTagState: string[] = tag.createTagArray(event.currentTarget.value)
    setTags(newTagState)
    getTags(tag.removeTagKeys(newTagState))
  }
  
  return(
    <Fragment>
      <TextInput name="tags" onInput={insertNewTag} placeholder={placeholder} value={tag.removeTagKeys(tags).join(', ')}/>
      <TagPreview removeTag={removeTag} tags={tags}/>
    </Fragment>
  )
}