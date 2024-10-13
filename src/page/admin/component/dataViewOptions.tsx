import PostView from "./view/post/postView"
import CommentView from "./view/comment/commentView"
import UserView from "./view/user/userView"

import useRequest from "@/custom-hook/use-request/useRequest"
import useSearchParams from "@/custom-hook/use-search-params/useSearchParams"

import type { ContentData } from "../page.type"
import type { Content, User } from "@/global.type"

import { useParams } from "react-router-dom"

import { URL_SEARCH_PARAMS } from "@/conts"

export default function DataViewOptions() {
  const { tab } = useParams()

  const searchParams = useSearchParams()

  const currPage: number = parseInt(searchParams.get(URL_SEARCH_PARAMS['PAGE']) || '0')
  const id: string | null = searchParams.get('id')

  const { data } = useRequest<ContentData<Content | User>>({ deps: [`admin/${tab}/${currPage}`] })

  const findedItem: Content | User | undefined = data?.data.find(item => item._id === id)

  switch(tab) {
    case 'post':
      return <PostView data={findedItem as Content}/>
    case 'comment':
      return <CommentView data={findedItem as Content}/>
    case 'user':
      return <UserView data={findedItem as User}/>
  }
}