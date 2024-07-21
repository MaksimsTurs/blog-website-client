import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { ContentDraft, CreatorState } from './creator.type'

import localStorage from '@/lib/local-storage/localStorage'

const initState: CreatorState = {
  contentDraft: localStorage.get('content-draft', '[]')  
}

const creatorSlice = createSlice({
  name: 'creator',
  initialState: initState,
  reducers: {
    editOrinsertContentDraft: (state, { payload }: PayloadAction<ContentDraft>) => {
      if(state.contentDraft.length === 0) return localStorage.set('content-draft', state.contentDraft = [payload])

      const currentDraft = state.contentDraft.find((content, index) => content._id === payload._id ? { _id: content._id, index } : undefined)

      if(currentDraft) {
        localStorage.set('content-draft', state.contentDraft = state.contentDraft.map(content => content._id === payload._id ? payload : content))
      } else {
        localStorage.set('content-draft', state.contentDraft = [...state.contentDraft, payload])
      }
    },
    removeContentDraft: (state, { payload }: PayloadAction<string>) => {
      if(state.contentDraft.length === 0) return
      localStorage.set('content-draft', state.contentDraft = state.contentDraft.filter(draft => draft._id !== payload))
    }
  }
})

export const { editOrinsertContentDraft, removeContentDraft } = creatorSlice.actions
export default creatorSlice.reducer