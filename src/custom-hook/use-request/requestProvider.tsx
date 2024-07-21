import { createContext, useState, type PropsWithChildren } from "react";

import type { TRequestContext, CacheStorage } from "./useRequest.type";

export const RequestContext = createContext<TRequestContext | undefined>(undefined)

export default function RequestProvider({ children }: PropsWithChildren) {
  const [cache, change] = useState<CacheStorage>()

  return <RequestContext.Provider value={{ cache, change }}>{children}</RequestContext.Provider>
}