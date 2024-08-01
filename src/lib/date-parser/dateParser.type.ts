export type DateParse = {
  differenceObject?: Difference<number>
  differenceObjectString?: Difference<string>
  getDifference: (date?: string) => DateParse & { differenceObject?: Difference<number> }
  getDifferenceString: (differenceTemplates: GetDifferenceStringParams) => DateParse & { differenceObjectString: Difference<string> }
  getSortDate: (template: GetSortDateParams) => string
}

export type GetDifferenceStringParams = Partial<Difference<string>>

export type GetSortDateParams = Partial<Difference<string>>

export type Difference<T> = {
  second: T
  minute: T
  hour: T
  day: T
  month: T
  year: T
}