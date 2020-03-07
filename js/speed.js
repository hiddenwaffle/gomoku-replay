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
  }
}

function handleBlur(event) {
  const entered = speedDiv.innerText
  const asNumber = parseFloat(entered)
  if (asNumber > 0) {
    setPlaybackSpeed(asNumber)
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

// export function init() {
//   resetDelay(DEFAULT_DELAY)
//   speedDiv.addEventListener('click', handleClick)
// }

// function handleClick() {
//   const currentRatio = DEFAULT_DELAY / getDelay()
//   const result = prompt('Enter your preferred playback speed\n' +
//                         '0.5 = half speed\n' +
//                         '1 = normal\n' +
//                         '2 = twice as fast\n' +
//                         'etc...',
//                         currentRatio.toString())
//   const enteredValue = parseFloat(result)
//   let delay
//   if (enteredValue && enteredValue > 0) {
//     delay = DEFAULT_DELAY / enteredValue
//   } else {
//     delay = currentRatio
//   }
//   resetDelay(delay)
// }

// function resetDelay(value) {
//   setDelay(value)
//   updateDisplay(value)
//   eventBus.fire('speed-changed')
// }

// function updateDisplay(delay) {
//   const ratio = DEFAULT_DELAY / delay
//   let ratioStr
//   if (ratio >= 1) {
//     ratioStr = Math.round(ratio).toString()
//   } else {
//     ratioStr = ratio.toFixed(2)
//   }
//   speedDiv.innerText = `${ratioStr}x`
// }
