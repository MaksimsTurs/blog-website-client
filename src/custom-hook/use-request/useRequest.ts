import type { MutateParams, UseRequestParam } from "./useRequest.type";

import { RequestContext } from "./requestProvider";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import isResponseArry from "./validation/isResponseArray";
import isValidRedirectURL from "./validation/isValidRedirectURL";
import isUndefined from "./validation/isUndefined";

import scrollToBottom from "./tool/scrollToBottom";
import createPaginationPaths from "./tool/createPaginationPaths";
import createRedirectURL from "./tool/createRedirectURL";

export default function useRequest<T>(reqParams: UseRequestParam<T>) {
  const context = useContext(RequestContext)
  
  const redirect = useNavigate()

  const isFirstRender = useRef<boolean>(true)
  const isPending = isUndefined(context?.cache?.[reqParams.key]?.isPending) ? true : context?.cache?.[reqParams.key]?.isPending

  const localData = useRef<T | undefined>()

  function updatePaginationPaths(response: any) {    
    let currPaginationData: any[] = context?.cache?.[reqParams.key]._paginateData || []

    if(!reqParams.paginationOptions?.updateType || reqParams.paginationOptions.updateType === 'PUSH_RESPONSE_OBJECT') {
      const latestPageData = currPaginationData?.[currPaginationData.length - 1] || []

      //Create new page
      if(latestPageData.length === reqParams.paginationOptions?.dataPerPage) currPaginationData = [...currPaginationData, [response]]
      //Insert new data into the last page
      else currPaginationData = [...currPaginationData.slice(0, currPaginationData.length - 1), [...latestPageData, response]]
  
      context?.mutateCache?.(prev => ({
        ...prev, 
        [reqParams.key]: { _paginateData: currPaginationData, data: currPaginationData[reqParams.paginationOptions!.currPage], pagesCount: currPaginationData.length, isPending: false } 
      }))
    } else if(reqParams.paginationOptions.updateType === 'REPLACE_PAGE_DATA') {
      currPaginationData[reqParams.paginationOptions.currPage] = response
      console.log(currPaginationData)
      context?.mutateCache?.(prev => ({
        ...prev, 
        [reqParams.key]: { _paginateData: currPaginationData, data: response, pagesCount: currPaginationData.length, isPending: false } 
      }))
    }

    if(reqParams.paginationOptions?.redirectURLOnPageIsFull && isValidRedirectURL(reqParams.paginationOptions.redirectURLOnPageIsFull)) {
      redirect(reqParams.paginationOptions.redirectURLOnPageIsFull.replace(/(\{page\})/, String(currPaginationData.length - 1)))
    }

    if(reqParams.slideOnRequestEnd) scrollToBottom(isPending, isFirstRender, reqParams.slideOnRequestEnd)
  }

  function paginate(response: any) {
    if(response?._paginateData) {
      context?.mutateCache?.(prev => ({
        ...prev, 
        [reqParams.key]: {...response, data: response._paginateData[reqParams.paginationOptions!.currPage], pagesCount: response._paginateData.length, isPending: false }
      }))
    } else {
      const paths = createPaginationPaths(response as [], reqParams.paginationOptions!)
      context?.mutateCache?.(prev => ({
        ...prev, 
        [reqParams.key]: { _paginateData: paths, data: paths[reqParams.paginationOptions!.currPage], pagesCount: paths.length, isPending: false }
      })) 
    }
    if(reqParams.slideOnRequestEnd) scrollToBottom(isPending, isFirstRender, reqParams.slideOnRequestEnd)
  }

  async function mutate<C>(mutateParams: MutateParams<C, T>) {
    try {
      const response = await mutateParams.func(context?.cache?.[reqParams.key]?.data as C) as T

      if(reqParams.paginationOptions) updatePaginationPaths(response)
      else context?.mutateCache?.(prev => ({...prev, [reqParams.key]: { data: response, isPending: false }}))

      if(reqParams.slideOnRequestEnd) scrollToBottom(isPending, isFirstRender, reqParams.slideOnRequestEnd)
      if(mutateParams.redirect) redirect(createRedirectURL(mutateParams.redirect, response))
    } catch(error) {
      console.log(error)
    }
  }

  async function request() {
    try {
      let response: any = context?.cache?.[reqParams.key]
      
      if(!isFirstRender.current) context?.mutateCache?.(prev => ({...prev, [reqParams.key]: { isPending: true, error: undefined }}))
      
      if(!response?.data && reqParams.func) response = await reqParams.func()
        
      const isCached = Object.hasOwn(response || {}, 'data')
      //Pagination action
      if(isResponseArry(response?.data || response) && reqParams.paginationOptions) return paginate(response as any[])
          
      //Default action
      if(!reqParams.paginationOptions && reqParams.func) {
        localData.current = response
        context?.mutateCache?.(prev => ({...prev, [reqParams.key]: { data: reqParams.noCache ? undefined : isCached ? response.data : response, isPending: false }}))
      }
    } catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    request()
  }, [reqParams.key, reqParams.paginationOptions?.currPage])
  
  useEffect(() => {
    //Scroll to the bottom of the page
    scrollToBottom(isPending, isFirstRender, reqParams.slideOnRequestEnd)
    if(!isPending) isFirstRender.current = false
  }, [isPending])

  return {
    ...context?.cache?.[reqParams.key],
    isPending: typeof context?.cache?.[reqParams.key]?.isPending === 'undefined' ? true : context?.cache?.[reqParams.key].isPending,
    data: reqParams.noCache ? localData.current : context?.cache?.[reqParams.key]?.data as T,
    mutate, 
    request 
  }
}