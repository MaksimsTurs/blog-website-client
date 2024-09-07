export type WebsiteSetting = {
  isDarkMode: boolean
  postFont: Fonts | 'inherit'
  postFontSize: string | 'inherit'
  font: Fonts
}

export type Fonts =     
  'Fira Code, monospace'    | 
  'Fira Sans, sans-serif'   |
  'Roboto Slab, serif'      | 
  'Sofia Sans, sans-serif'  |
  'Public Sans, sans-serif' |
  'Inter, sans-serif'