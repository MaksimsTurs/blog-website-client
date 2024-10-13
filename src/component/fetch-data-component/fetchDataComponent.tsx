import { Fragment } from "react/jsx-runtime";

import type { FetchDataComponentProps } from "./fetchDataComponent.type";

import PageError from "../errors/page-error/pageError";
import LocalError from "../errors/local-error/localError";
import Empty from "../empty/empty";

export default function FetchDataComponent({ 
  data, 
  loaderComponent, 
  useLocalErrorComponent, 
  error, 
  emptyLabel, 
  isFetching, 
  isPending, 
  emptyOptions,
  dataComponent 
}: FetchDataComponentProps) {
  const isLoading: boolean = isFetching || isPending || false
  const isEmpty: boolean = Array.isArray(data) && data.length === 0

  return(
    <Fragment>
      {error ? useLocalErrorComponent ? <LocalError error={error.message}/> : <PageError error={error}/> :
      (isLoading && !data) ? loaderComponent :
      (isEmpty || !data) && emptyLabel ? <Empty label={emptyLabel} option={{ flexCenterCenter: true, ...emptyOptions }}/> : dataComponent()}
    </Fragment>
  )
}