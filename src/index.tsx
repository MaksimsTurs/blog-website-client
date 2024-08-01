import "@/scss/root.scss"
import '@/scss/global.scss'

import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import { lazy, Suspense } from "react"

import store from "./store/store"

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

import WriteNewPostLoader from './page/write-new/loader'
import PostLoader from "./page/post/loader"
import HomeLoader from "./page/home/loader"
import SearchLoader from "./page/search/loader"
import UserLoader from './page/user/loader'
import AdminLoader from './page/admin/loader'

import Error from "./component/error/error"
import ProtectedRoute from "./component/protected-route/protectedRoute"

createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AuthProvider>
      <RequestProvider>
        <Provider store={store}>
          <Header />
          <div className="flex-row-normal-normal-medium" style={{ padding: '0rem 1.5rem 0rem 1rem', flexGrow: '1' }}>
            <SideMenu />
            <main>
              <Routes>
                <Route path="/" element={<Suspense fallback={<HomeLoader/>}><Home /></Suspense>} />
                <Route path="/post/:id" element={<Suspense fallback={<PostLoader/>}><Post /></Suspense>} />
                <Route path="/search" element={<Suspense fallback={<SearchLoader/>}><Search/></Suspense>}/>
                <Route path="/user/:id" element={<Suspense fallback={<UserLoader/>}><User/></Suspense>}/>
                <Route path="*" element={<Error code={404} message="Page not found!" underText="Site there you search is not implemented or not exist!"/>}/>
                <Route path="/write-post" element={
                  <Suspense fallback={<WriteNewPostLoader/>}>
                    <ProtectedRoute exeptetRoles={['Admin', 'Creator']}>
                      <WriteNewPost />
                    </ProtectedRoute>
                  </Suspense>
                }/>
                <Route path="/admin/:tab" element={
                  <Suspense fallback={<AdminLoader/>}>
                    <ProtectedRoute exeptetRoles={['Admin']}>
                      <Admin/>
                    </ProtectedRoute>
                  </Suspense>
                }/>
              </Routes>
              <ScrollTo/>
            </main>
          </div>
        </Provider>
      </RequestProvider>
    </AuthProvider>
  </BrowserRouter>
)