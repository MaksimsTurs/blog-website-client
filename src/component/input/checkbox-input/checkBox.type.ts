import type { InputAttributes } from "../input.type";

export type CheckBoxInputProps = { label: string } & Pick<InputAttributes, 'name' | 'register' | 'errors' | 'onInput'>