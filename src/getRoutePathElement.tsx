import { Suspense, lazy } from "react";

const Home =         lazy(() => import('./page/home/page')),
      Post =         lazy(() => import('./page/post/page')),
      WriteNewPost = lazy(() => import('./page/write-new/page')),
      Search =       lazy(() => import('./page/search/page')),
      User =         lazy(() => import('./page/user/page')),
      Admin =        lazy(() => import('./page/admin/page')),
      Setting =      lazy(() => import('./page/website-settings/page')),
      Galery =       lazy(() => import('./page/galery/page')),
      Database =     lazy(() => import('./page/database/page')),
      About =        lazy(() => import('./page/about/page'))

import WriteNewPostLoader from './page/write-new/loader'
import PostLoader from "./page/post/loader"
import HomeLoader from "./page/home/loader"
import SearchLoader from "./page/search/loader"
import UserLoader from './page/user/loader'
import AdminLoader from './page/admin/loader'
import SettingLoader from './page/website-settings/loader'
import GaleryLoader from './page/galery/loader'

import PageError from "./component/errors/page-error/pageError"

export default function getRoutePathElement(loaderID: number) {
  switch(loaderID) {
    case 1:
      return <Suspense fallback={<HomeLoader/>}><Home/></Suspense>
    case 2:
      return <Suspense fallback={<PostLoader/>}><Post/></Suspense>
    case 3:
      return <Suspense fallback={<SearchLoader/>}><Search/></Suspense>
    case 4:
      return <Suspense fallback={<UserLoader/>}><User/></Suspense>
    case 5:
      return <Suspense fallback={<SettingLoader/>}><Setting/></Suspense>
    case 6:
      return <Suspense fallback={<GaleryLoader/>}><Galery/></Suspense>
    case 7:
      return <Suspense fallback={<GaleryLoader/>}><Database/></Suspense>
    case 8:
      return <Suspense fallback={<GaleryLoader/>}><About/></Suspense>
    case 9:
      return <PageError error={{ code: 404, message: 'Page not found!' }} description="Site there you search is not implemented or not exist!"/>
    case 10:
      return <Suspense fallback={<WriteNewPostLoader/>}><WriteNewPost/></Suspense>
    case 11:
      return <Suspense fallback={<AdminLoader/>}><Admin/></Suspense>
  }
}