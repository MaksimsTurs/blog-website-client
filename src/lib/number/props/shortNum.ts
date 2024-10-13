export default function shortNum(num: number): string {
  const max = {
    '999': 999,
    '999_999': 999999,
    '999_999_999': 999999999
  }

  if(max['999'] >= num)         return num.toString()
  if(max['999_999'] >= num)     return (num / 1E3).toString() + 'K'
  if(max['999_999_999'] >= num) return (num / 1E6).toString() + 'KK'
  else return num.toString()
}