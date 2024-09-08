import type { TextEditorUpload } from "../textEditor.type";

import fetcher from "@/lib/fetcher/fetcher";
import Thing from "@/lib/object/object";

export default {
  validate: function(toValidate, isVideo) {
    if(!isVideo && toValidate.alt?.length === 0) return 'Alt is undefined!'

    if(!toValidate.uploadType) return 'You need to select upload option first!'

    if((toValidate.uploadType === 'From url' || toValidate.uploadType === 'Existet file from server') && (!toValidate.url || toValidate.url?.length === 0)) return 'URL is undefined!'

    if(toValidate.uploadType === 'From file system' && !toValidate.alt && !isVideo) return 'You need to select file from file system first, or alt attribute is undefined!'
  },
  upload: async function(file) {
    return await fetcher.post('/api/upload', Thing.createFormDataFromJSON({ file }))
  }
} as TextEditorUpload