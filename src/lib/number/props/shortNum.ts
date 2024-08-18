export default function shortNum(num: number): string {
  if(num / 1E4 > 1) return (num / 1E4).toFixed(2) + 'K' 
  else return num.toString()
}