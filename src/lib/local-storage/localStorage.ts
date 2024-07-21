export default {
  get: <T>(key: string, or: string) => {
    return JSON.parse(localStorage.getItem(key) || or) as T
  },
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove: (key: string) => {
    localStorage.removeItem(key)
  }
}