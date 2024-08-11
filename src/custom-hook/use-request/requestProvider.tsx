import { createContext, useState } from "react";

import type { PropsWithChildren } from "react";
import type { RequestState, TRequestContext } from "./useRequest.type";
import type { KeyValueObject } from "@/global.type";

export const RequestContext = createContext<TRequestContext | undefined>(undefined)

export default function RequestProvider({ children }: PropsWithChildren) {
  const [cache, change] = useState<KeyValueObject<RequestState<any>> | undefined>()

  return <RequestContext.Provider value={{ change, cache }}>{children}</RequestContext.Provider>
}