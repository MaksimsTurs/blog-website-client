import { createContext, useState } from "react";

import type { PropsWithChildren } from "react";
import type { RequestState, TRequestContext } from "./_useRequest.type";

export const RequestContext = createContext<TRequestContext | undefined>(undefined)

export default function RequestProvider({ children }: PropsWithChildren) {
  const [cache, change] = useState<{ [key: string]: RequestState }>()

  return <RequestContext.Provider value={{ change, cache }}>{children}</RequestContext.Provider>
}