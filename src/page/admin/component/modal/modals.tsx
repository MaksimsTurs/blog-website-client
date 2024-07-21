import { Fragment } from "react/jsx-runtime";

import PostModal from "./postModal";
import CommentModal from "./commentModal";
import UserModal from "./userModal";

import { useParams } from "react-router-dom";

export default function Modals() {
  const { tab } = useParams()

  const tabs: string[] = ['post', 'comment', 'user']

  const toPreview: string = !tabs.includes(tab || '') ? 'post' : tab!

  return(
    <Fragment>
      {toPreview === 'post' ? <PostModal/> :
       toPreview === 'comment' ? <CommentModal/> :
       toPreview === 'user' ? <UserModal/> : null}
    </Fragment>
  )
}