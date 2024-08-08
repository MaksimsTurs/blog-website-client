import type { User } from "@/global.type"

export type LoaderProps = { containersCount?: number }

export type StatisticPreviewProps = { statisticToPreview: string }

export type GetPostStatistic = { pagesCount: number, items: ({ count: number } & User)[] }