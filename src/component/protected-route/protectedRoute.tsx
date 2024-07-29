import type { ProtectedRouteProps } from "./protectedRoute.type";
import type { PropsWithChildren } from "react";

import { Fragment } from "react";

import usePermitor from "@/custom-hook/use-permitor/useHavePermission";

export default function ProtectedRoute({ exeptetRoles, children }: PropsWithChildren<ProtectedRouteProps>) {
  const res = usePermitor().role(exeptetRoles).permited()
  return <Fragment>{res ? children : null}</Fragment>
}