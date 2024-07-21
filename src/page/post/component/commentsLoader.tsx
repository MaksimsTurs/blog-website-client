import { Fragment } from "react/jsx-runtime";

import PostContainerLoader from "@/component/loader/post-container-loader/postContainerLoader";

export default function CommentsLoader() {
  return(
    <Fragment>
      <PostContainerLoader/>
      <PostContainerLoader/>
    </Fragment>
  )
}