import {init as controlsInit} from './move-selector'
import {init as drawInit} from './draw'
import {
  canvas,
  moveSelector
} from './elements'
import {eventBus} from './event-bus'
import {init as fileSelectorInit} from './file-selector'
import {init as gameNameInit} from './game-name'

// Specific initialization order:
controlsInit()
drawInit()
fileSelectorInit()
gameNameInit()

/**
 * Ensure that the canvas is scaled to the height of the window.
 */
function resizeHandler() {
  canvas.width = canvas.height = Math.floor(window.innerHeight * 0.70)
  moveSelector.style.width = `${canvas.width}px`
  eventBus.fire('window-resized')
}
window.addEventListener('resize', resizeHandler, false)
resizeHandler()

/**
 * Handle keyboard events at the top-level.
 */
window.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowLeft') {
    eventBus.fire('key-left')
  } else if (event.code === 'ArrowRight') {
    eventBus.fire('key-right')
  }
})
