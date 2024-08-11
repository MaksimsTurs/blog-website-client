import type { ProtectedRouteProps } from "./protectedRoute.type";
import type { PropsWithChildren } from "react";

import { Fragment } from "react";

import useAuth from "@/custom-hook/use-auth/useAuth";
import usePermitor from "@/custom-hook/use-permitor/useHavePermission";

import PageError from "../errors/page-error/pageError";

export default function ProtectedRoute({ exeptetRoles, children, loaderComponent }: PropsWithChildren<ProtectedRouteProps>) {
  const auth = useAuth()
  const res = usePermitor().role(exeptetRoles).permited()

  return <Fragment>{auth.isAuthPending ? loaderComponent : res ? children : <PageError error={{ code: 403, message: 'You have no permission to view this page!' }}/>}</Fragment>
}