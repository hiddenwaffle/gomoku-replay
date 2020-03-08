import {speedDiv} from './elements'
import {eventBus} from './event-bus'
import {
  delay as getDelay,
  setDelay
} from './model'

const DEFAULT_DELAY = 333

export function init() {
  speedDiv.addEventListener('keydown', handleKeyDown)
  speedDiv.addEventListener('blur', handleBlur)
  setPlaybackSpeed(1)
}

/**
 * Content editable code based on:
 * http://html5doctor.com/the-contenteditable-attribute/
 * http://jsbin.com/owavu3/1/edit?html,js,output
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
 */
function handleKeyDown(event) {
  if (event.code === 'Escape') {
    document.execCommand('undo')
    speedDiv.blur()
  } else if (event.code === 'Enter' ||
             event.code === 'NumpadEnter') {
    speedDiv.blur()
    event.stopPropagation() // Do not interfere with window controls TODO: Check true
    event.preventDefault()
  } else if (event.code == 'Space') {
    event.stopPropagation()
  }
}

function handleBlur(event) {
  const entered = speedDiv.innerText
  const asNumber = parseFloat(entered)
  if (asNumber > 0) {
    setPlaybackSpeed(asNumber)
  } else {
    document.execCommand('undo')
  }
}

function setPlaybackSpeed(playbackSpeed) {
  if (playbackSpeed < 1) {
    speedDiv.innerText = `${playbackSpeed.toFixed(2)}x`
  } else {
    speedDiv.innerText = `${playbackSpeed}x`
  }
  setDelay(DEFAULT_DELAY / playbackSpeed)
  eventBus.fire('speed-changed')
}
