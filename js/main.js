import {init as controlsInit} from './move-selector'
import {init as drawInit} from './draw'
import {
  canvas,
  moveSelector
} from './elements'
import {eventBus} from './event-bus'
import {init as fileSelectorInit} from './file-selector'

// Specific initialization order:
controlsInit()
drawInit()
fileSelectorInit()

/**
 * Ensure that the canvas is scaled to the height of the window.
 */
function resizeHandler() {
  canvas.width = canvas.height = Math.floor(window.innerHeight * 0.75)
  moveSelector.style.width = `${canvas.width}px`
  eventBus.fire('window-resized')
}
window.addEventListener('resize', resizeHandler, false)
resizeHandler()
