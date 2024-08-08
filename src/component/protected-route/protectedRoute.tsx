import type { ProtectedRouteProps } from "./protectedRoute.type";
import type { PropsWithChildren } from "react";

import { Fragment } from "react";

import useAuth from "@/custom-hook/useAuth/useAuth";
import usePermitor from "@/custom-hook/use-permitor/useHavePermission";

import Error from "../error/error";

export default function ProtectedRoute({ exeptetRoles, children, loaderComponent }: PropsWithChildren<ProtectedRouteProps>) {
  const auth = useAuth()
  const res = usePermitor().role(exeptetRoles).permited()

  return <Fragment>{auth.isAuthPending ? loaderComponent : res ? children : <Error code={403} message="You have no permission to view this page!"/>}</Fragment>
}