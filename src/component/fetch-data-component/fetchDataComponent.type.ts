import type { ServerResponseError } from "@/global.type"
import type { EmptyProps } from "../empty/empty.type"

export type FetchDataComponentProps = {
  isFetching?: boolean
  isPending?: boolean
  emptyLabel?: string
  data?: any
  error?: ServerResponseError
  loaderComponent?: JSX.Element
  useLocalErrorComponent?: boolean
  emptyOptions?: EmptyProps['option']
  dataComponent: () => JSX.Element
}