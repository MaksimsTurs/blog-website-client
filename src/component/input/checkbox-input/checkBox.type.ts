import type { FieldValues } from "react-hook-form";
import type { InputAttributes } from "../input.type";
import type { SyntheticEvent } from "react";

export type CheckBoxInputProps<T extends FieldValues> = { 
  label: string 
  onInput?: (event: SyntheticEvent<HTMLInputElement>) => any
} & Omit<InputAttributes<T>, 'disabled' | 'placeholder'>