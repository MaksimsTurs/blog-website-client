export default {
  createTagArray: function(str: string) {
    return str.split(/,/).map(tag => tag.length === 0 ? tag : `${tag}-${Math.round(Math.random() * 9999)}`)
  },
  removeTagKeys: function(tags: string[]) {
    return tags.map(tag => tag.trim().replace(/\-\d*/g, ''))
  }
}