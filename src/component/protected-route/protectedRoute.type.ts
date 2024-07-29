import type { UserRoles } from "@/global.type"

export type ProtectedRouteProps = {
  exeptetRoles: UserRoles[]
}