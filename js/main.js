import {init as controlsInit} from './controls'
import {init as drawInit} from './draw'
import {
  canvas,
  fileUpload,
  moveSelector
} from './elements'
import {eventBus} from './event-bus'
import {init as readerInit, read} from './reader'

// Specific initialization order:
controlsInit()
drawInit()

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

/**
 * Allow user to upload a log file.
 */
function handleFileSelect(event) {
  read(event.target.files[0])
}
fileUpload.addEventListener('change', handleFileSelect, false);

// Testing Delete Me
read()
