import type { PaginationOptions } from "../useRequest.type";

export default function createPaginationPaths<T>(response: any[], paginationOptions: PaginationOptions) {
  const { dataPerPage } = paginationOptions
  
  const pagesCount = Math.ceil(response.length / dataPerPage)

  let start: number = 0, end: number = dataPerPage
  let paginationData: T[][] = []

  for(let index: number = 0; index < pagesCount; index++) {
    paginationData = [...paginationData, response.slice(start, end)]
    start += dataPerPage
    end += dataPerPage
  }

  return paginationData
}