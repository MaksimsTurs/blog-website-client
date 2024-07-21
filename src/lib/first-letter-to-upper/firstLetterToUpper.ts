export default function firstLetterToUpperCase(words: string | string[]): string | string[] {
  if(Array.isArray(words)) return words.map(word => `${word[0].toUpperCase()}${word.slice(1, -1)}`)
  return `${words[0].toUpperCase()}${words.slice(1, words.length)}`
}