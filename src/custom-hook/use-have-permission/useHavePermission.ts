import { AuthContext } from "@/custom-hook/useAuth/authProvider";
import { useContext } from "react";

import type { UserRoles } from "@/global.type";

export default function useHavePermission() {
  const auth = useContext(AuthContext)

  let checkArray: number[] = []

  return {
    isHaveRole: function(mustHaveRoles: UserRoles[]) {
      if(mustHaveRoles.includes(auth?.userState.user?.role || 'User')) return this
      checkArray.push(1)
      return this
    },
    isIDEqual: function(id?: string) {
      if(auth?.userState.user?._id === id) return this
      checkArray.push(1)
      return this
    },
    isHaveRoleAndIsIDEqual: function(mustHaveRoles: UserRoles[], id?: string) {
      if(auth?.userState.user?._id === id && mustHaveRoles.includes(auth?.userState.user?.role || 'User')) return this
      checkArray.push(1)
      return this
    },
    isHaveRoleOrIsIDEqual: function(mustHaveRoles: UserRoles[], id?: string) {
      if(auth?.userState.user?._id === id || mustHaveRoles.includes(auth?.userState.user?.role || 'User')) return this
      checkArray.push(1)
      return this
    },
    result: function() {
      const havePermission = checkArray.length <= 0
      checkArray = []
      return havePermission
    }
  }
}