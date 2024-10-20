import { CircleHelp, Home, Images, LibraryBig, Search, Settings, Shield, SquarePen } from 'lucide-react'

export default function getIconByPath(path: string, className: string) {
  switch(path) {
    case '/write-post':
      return <SquarePen className={className}/>
    case '/admin/post':
      return <Shield className={className}/>
    case '/':
      return <Home className={className}/>
    case '/search':
      return <Search className={className}/>
    case '/setting':
      return <Settings className={className}/>
    case '/galery':
      return <Images className={className}/>
    case '/database':
      return <LibraryBig className={className}/>
    case '/about':
      return <CircleHelp className={className}/>
  }
}