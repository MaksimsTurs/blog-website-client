import { CircleHelp, Home, Images, LibraryBig, Search, Settings, Shield, SquarePen } from 'lucide-react'

export default function getIconByPath(id: number, className: string) {
  switch(id) {
    case 1:
      return <Home className={className}/>
    case 2:
      return <Search className={className}/>
    case 3:
      return <Settings className={className}/>
    case 4:
      return <Images className={className}/>
    case 5:
      return <LibraryBig className={className}/>
    case 6:
      return <CircleHelp className={className}/>
    case 7:  
      return <SquarePen className={className}/>
    case 8:
      return <Shield className={className}/>
  }
}