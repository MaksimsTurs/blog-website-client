import imagemin from 'unplugin-imagemin/vite'

export default () => {
  return imagemin({
    mode: 'sharp',
    beforeBundle: true,
    compress: { webp: { quality: 40 } },
    conversion: [
      { from: 'png', to: 'webp' },
      { from: 'jpg', to: 'webp' },
      { from: 'jpeg', to: 'webp' },
    ]
  })
}