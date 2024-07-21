import type { ServerResponseError } from "@/global.type";

export type ModalErrorProps = { error?: ServerResponseError, removeError?: () => void }