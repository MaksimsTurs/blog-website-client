export default function generateDefaultAvatar(name: string) {
  const CANVAS_SIZE = 220
  const hexColors = [
    '#166bfd', '#0e49ad', '#3266bf', '#0c3d91', '#0040e3', '#265be0', '#1f45a3', '#0235b3', '#2268c9', '#1b529e',
    '#F48023', '#bf641b', '#9e5f2c', '#b57948', '#b86725', '#fa8c32', '#ff7300', '#c74d06', '#ed6e24', '#bf6836'
  ]

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d') as CanvasRenderingContext2D

  canvas.width = CANVAS_SIZE
  canvas.height = CANVAS_SIZE

  context.fillStyle = hexColors[Math.floor(Math.random() * hexColors.length - 1)]
  context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

  context.font = '100px Arial'
  context.fillStyle = 'white'
  context.textBaseline = 'middle'
  context.fillText(name[0], CANVAS_SIZE / 3.1, CANVAS_SIZE / 2)

  return canvas.toDataURL('image/webp', 50).replace('data:image/webp;base64,', '')
}
