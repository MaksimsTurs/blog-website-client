import type { Database } from "@/global.type"
import type { Dispatch, SetStateAction } from "react"

export type InsertItemFormProps = {
  setIsInsertMode: Dispatch<SetStateAction<boolean>>
}

export type DatabaseItemProps = {
  item: Database
}