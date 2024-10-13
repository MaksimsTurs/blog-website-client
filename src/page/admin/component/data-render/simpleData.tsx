import scss from '../../scss/data-render/simpleData.module.scss'
import '@/scss/global.scss'

import type { SimpleDataProps } from '../../page.type'

import { Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function SimpleData({ propKey, propValue, useLink, useCopyBoard }: SimpleDataProps) {
  const [isCopyied, setIsCopied] = useState<boolean | undefined>(undefined)

  const copyBoard = async (): Promise<void> => {
    await navigator.clipboard.writeText(propValue)
    setIsCopied(true)
  }

  useEffect(() => {
    if(isCopyied) setTimeout(() => setIsCopied(false), 200)
  }, [isCopyied])

  return(
    <section className={`${scss.data_simple_container} flex-row-center-space-between-medium`}>
      <p className={scss.data_simple_key}>{propKey}</p>
      <div className='flex-row-center-center-medium'>
        {useLink ? <Link className={scss.data_simple_value} to={propValue}>{propValue}</Link> : <p className={scss.data_simple_value}>{propValue}</p>}
        {useCopyBoard ? <Copy className={isCopyied ? scss.data_simple_copyied : ''} onClick={copyBoard} size={15}/> : null}
      </div>
    </section>
  )
}