import scss from '../../scss/data-render/dataWrapper.module.scss'
import '@/scss/global.scss'

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';

import type { PropsWithChildren } from "react";

export default function DataWrapper({ children, id }: PropsWithChildren<{ id: string}>) {
  const searchParams = useSearchParams()

  const showFullItemData = (): void => {
    searchParams.set({ id })
  }

  return <div onClick={showFullItemData} className={`${scss.data_wrapper_container} main-content-container`}>{children}</div>
}