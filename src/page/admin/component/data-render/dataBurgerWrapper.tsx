import scss from '../../scss/data-render/dataBurgerWrapper.module.scss'

import { useState, cloneElement, useRef, useEffect,  } from "react";

import type { PropsWithChildren, ReactElement } from 'react'

export default function DataBurgerWrapper({ propKey, children }: PropsWithChildren<{ propKey: string }>) {
  const [isExpandend, setIsExpanded] = useState<boolean>(false)

  const childRef = useRef<HTMLDivElement>(null)
  const childHeight = useRef<number>(0)

  const childClone = cloneElement(children as ReactElement, { ref: childRef })

  const expandSection = (): void => {
    setIsExpanded(prev => !prev)
  }

  useEffect(() => {
    if(childRef.current) childHeight.current = childRef.current.getBoundingClientRect().height + 7
  }, [])

  return(
    <div className={scss.burger_data_wrapper_container}>
      <p onClick={expandSection} className={scss.burger_data_wrapper_key}>{propKey}</p>
      <div style={{ height: isExpandend ? childHeight.current : 0, overflow: 'auto', maxHeight: '15rem', transition: 'all 0.2s ease' }}>{childClone}</div>
    </div>
  )
}