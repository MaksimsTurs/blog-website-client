import { TextEditorShortCut } from "../textEditor.type";

import countDuplicate from "@/lib/count-duplicate/countDuplicate";

export default {
  lineEnd: 0,
  lineStart: 0,
  currentHistory: 0,
  shortCutPressedKeys: [],
  history: [],
  pushIntoHistory: function(content) {
    const isFull: boolean = this.history.length === 10
 
    if(isFull) {
      this.history = [...this.history.slice(1, 10), content]
      return
    } 

    this.currentHistory = this.history.push(content)
  },
  KeyL: function(event, textAreaRef) {
    event.preventDefault()

    const textArea = textAreaRef.current!
    const isMultiple: boolean = countDuplicate(this.shortCutPressedKeys, 'KeyL') > 1

    this.lineStart = textArea.selectionStart
    this.lineEnd = textArea.value.indexOf('\n', isMultiple ? textArea.selectionEnd : textArea.selectionStart)


    //Check if all of left site is selected
    for(let index: number = this.lineStart; index >= 0; index--) {
      if(textArea.value[index] === '\n' || index === 0) {
        this.lineStart = index
        break
      }
    }

    //Handle multiple lines
    if(isMultiple && textArea.selectionEnd !== textArea.value.length) {
      for(let index: number = this.lineEnd + 1; index <= textArea.value.length; index++) {
        if(textArea.value[index] === '\n' || index === textArea.value.length) {
          this.lineEnd = index
          break
        }
      }
    }

    textAreaRef.current!.selectionStart = this.lineStart
    textAreaRef.current!.selectionEnd = this.lineEnd
  },
  KeyZ: function(event) {
    event.preventDefault()
    if(this.currentHistory === 0) return this.history[0]
    --this.currentHistory
    return this.history[this.currentHistory]
  },
  KeyY: function(event) {
    event.preventDefault()
    if(this.currentHistory === 10) return this.history[10]
    ++this.currentHistory
    return this.history[this.currentHistory]
  }
} as TextEditorShortCut