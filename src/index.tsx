import "@/scss/root.scss"
import '@/scss/global.scss'

import type { WebsiteSetting } from "./store/website-setting/setting.type"

import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider, useSelector } from "react-redux"
import { Fragment, lazy, Suspense } from "react"

import store, { RootState } from "./store/store"

import Header from "./component/header/header"
import ScrollTo from "./component/scroll-to-top/scrollTo"
import SideMenu from "./component/side-menu/sideMenu"
import RequestProvider from "./custom-hook/_use-request/requestProvider"
import AuthProvider from "./custom-hook/useAuth/authProvider"

const Home = lazy(() => import('./page/home/page'))
const Post = lazy(() => import('./page/post/page'))
const WriteNewPost = lazy(() => import('./page/write-new/page'))
const Search = lazy(() => import('./page/search/page'))
const User = lazy(() => import('./page/user/page'))
const Admin = lazy(() => import('./page/admin/page'))
const Setting = lazy(() => import('./page/website-settings/page'))
const Galery = lazy(() => import('./page/galery/page'))

import WriteNewPostLoader from './page/write-new/loader'
import PostLoader from "./page/post/loader"
import HomeLoader from "./page/home/loader"
import SearchLoader from "./page/search/loader"
import UserLoader from './page/user/loader'
import AdminLoader from './page/admin/loader'
import SettingLoader from './page/website-settings/loader'
import GaleryLoader from './page/galery/loader'

import Error from "./component/error/error"
import ProtectedRoute from "./component/protected-route/protectedRoute"

const App = () => {
  const websiteSetting = useSelector<RootState, WebsiteSetting>(state => state.websiteSetting)

  document.getElementById('root')!.style.fontFamily = websiteSetting.font

  return(
    <Fragment>
      <Header />
      <div className="flex-row-normal-normal-medium" style={{ padding: '0rem 1.5rem 0rem 1rem', flexGrow: '1', backgroundColor: 'white' }}>
        <SideMenu />
        <main>
          <Routes>
            <Route path="/" element={<Suspense fallback={<HomeLoader/>}><Home /></Suspense>} />
            <Route path="/post/:id" element={<Suspense fallback={<PostLoader/>}><Post/></Suspense>} />
            <Route path="/search" element={<Suspense fallback={<SearchLoader/>}><Search/></Suspense>}/>
            <Route path="/user/:id" element={<Suspense fallback={<UserLoader/>}><User/></Suspense>}/>
            <Route path="/setting" element={<Suspense fallback={<SettingLoader/>}><Setting/></Suspense>}></Route>
            <Route path="/galery" element={<Suspense fallback={<GaleryLoader/>}><Galery/></Suspense>}></Route>
            <Route path="*" element={<Error code={404} message="Page not found!" underText="Site there you search is not implemented or not exist!"/>}/>
            <Route path="/write-post" element={
              <Suspense fallback={<WriteNewPostLoader/>}>
                <ProtectedRoute exeptetRoles={['Admin', 'Creator']} loaderComponent={<WriteNewPostLoader/>}>
                  <WriteNewPost />
                </ProtectedRoute>
              </Suspense>
            }/>
            <Route path="/admin/:tab" element={
              <Suspense fallback={<AdminLoader/>}>
                <ProtectedRoute exeptetRoles={['Admin']} loaderComponent={<AdminLoader/>}>
                  <Admin/>
                </ProtectedRoute>
              </Suspense>
            }/>
          </Routes>
        </main>
      </div>
      <ScrollTo/>
    </Fragment>
  )
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AuthProvider>
      <RequestProvider>
        <Provider store={store}>
          <App/>
        </Provider>
      </RequestProvider>
    </AuthProvider>
  </BrowserRouter>
)