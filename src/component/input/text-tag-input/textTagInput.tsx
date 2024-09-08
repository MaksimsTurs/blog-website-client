import type { TextTagInputProps } from "../input.type";
import type { SyntheticEvent } from "react";

import { useState, Fragment, forwardRef, useImperativeHandle } from "react";

import TextInput from "../textInput/textInput";
import TagPreview from "@/component/tag-preview/tagPreview";

import tag from "./tag";

import Array from "@/lib/array/array";

export default forwardRef(function({ placeholder, value }: TextTagInputProps, ref) {
  const [tags, setTags] = useState<string[]>(value || [])

  const removeTag = (tag: string): void => {
    setTags(prev => {
      const newTagState: string[] = Array.removeDuplicates(prev, [tag])
      return newTagState
    })
  }

  const insertNewTag = (event: SyntheticEvent<HTMLInputElement>): void => {
    const newTagState: string[] = tag.createTagArray(event.currentTarget.value)
    setTags(newTagState)
  }

  useImperativeHandle(ref, () => ({
    clear: () => setTags([]),
    value: tags.filter(tag => tag)
  }), [tags])
  
  return(
    <Fragment>
      <TextInput name="tags" onInput={insertNewTag} placeholder={placeholder} value={tag.removeTagKeys(tags).join(', ')}/>
      <TagPreview removeTag={removeTag} tags={tags}/>
    </Fragment>
  )
})