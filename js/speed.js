import {speedDiv} from './elements'
import {eventBus} from './event-bus'
import {
  delay as getDelay,
  setDelay
} from './model'

const DEFAULT_DELAY = 333

export function init() {
  resetDelay(DEFAULT_DELAY)
  speedDiv.addEventListener('click', handleClick)
}

function handleClick() {
  const result = prompt('Enter your preferred ms/frame delay\n' +
                        '333 is the default:',
                        getDelay().toString())
  const enteredValue = parseFloat(result)
  let delay
  if (enteredValue > 0) {
    delay = enteredValue
  } else {
    delay = DEFAULT_DELAY
  }
  resetDelay(delay)
}

function resetDelay(value) {
  setDelay(value)
  updateDisplay(value)
  eventBus.fire('speed-changed')
}

function updateDisplay(delay) {
  const ratio = DEFAULT_DELAY / delay
  let ratioStr
  if (ratio >= 1) {
    ratioStr = Math.round(ratio).toString()
  } else {
    ratioStr = ratio.toFixed(2)
  }
  speedDiv.innerText = `${ratioStr}x`
}
