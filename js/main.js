import { canvas } from './elements'
import { config } from './config'
import { draw } from './draw'

function resizeHandler() {
  canvas.width = canvas.height = Math.floor(window.innerHeight * 0.75)
  draw()
}
window.addEventListener('resize', resizeHandler)

resizeHandler()
