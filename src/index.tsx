import '@/scss/root.scss'
import '@/scss/global.scss'

import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import { Fragment } from "react"

import store from "./store/store"

import Header from "./component/header/header"
import ScrollTo from "./component/scroll-to-top/scrollTo"
import SideMenu from "./component/side-menu/sideMenu"
import RequestProvider from "./custom-hook/use-request/requestProvider"
import AuthProvider from "./custom-hook/use-auth/authProvider"
import HomeLoader from "./page/home/page"

import useWebsiteSetting from "./custom-hook/use-website-setting/useWebsiteSetting"
import useAuth from "./custom-hook/use-auth/useAuth"

import getRoutePathElement from "./getRoutePathElement"

const App = () => {
  const website = useWebsiteSetting()
  const auth = useAuth()

  document.getElementById('root')!.style.fontFamily = website.setting.font

  return(
    <Fragment>
      <Header/>
      <div className="flex-row-normal-normal-medium" style={{ padding: '0rem 1.5rem 0rem 1rem', flexGrow: '1', backgroundColor: 'white' }}>
        <SideMenu/>
        <main>
          {auth.isAuthPending ? <HomeLoader/> :
            <Routes>{auth.permissions?.routing.INDEX.map(route => <Route key={route.path} path={route.path} element={getRoutePathElement(route.loaderID)}/>)}</Routes>
          }
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