import type { FieldValues } from "react-hook-form";
import type { InputAttributes } from "../input.type";

export type TextAreaProps<T extends FieldValues> = Pick<InputAttributes<T>, 'placeholder' | 'defaultValue'>