import type { TextTagInputProps } from "./textTagInput.type";
import type { SyntheticEvent } from "react";

import { useState, Fragment, forwardRef, useImperativeHandle } from "react";

import TextInput from "../text-input/textInput";
import TagPreview from "@/component/tag-preview/tagPreview";

import tag from "./tag";

import Array from "@/lib/array/array";

export default forwardRef(function({ placeholder, value }: TextTagInputProps, ref) {
  const [tags, setTags] = useState<string[]>(value || [])

  const removeTag = (tag: string): void => {
    setTags(prev => Array.removeDuplicates(prev, [tag]))
  }

  const insertNewTag = (event: SyntheticEvent<HTMLInputElement>): void => {
    setTags(tag.createTagArray(event.currentTarget.value))
  }

  useImperativeHandle(ref, () => ({
    clear: () => setTags([]),
    value: tags.filter(Boolean)
  }), [tags])
  
  return(
    <Fragment>
      <TextInput name="tags" onInput={insertNewTag} placeholder={placeholder} value={tag.removeTagKeys(tags).join(', ')}/>
      <TagPreview removeTag={removeTag} tags={tags}/>
    </Fragment>
  )
})