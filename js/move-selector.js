import {
  moveSelector,
  playButton,
  pauseButton
} from './elements'
import {eventBus} from './event-bus'
import {
  moveCount,
  setCurrentMove
} from './model'

const DELAY = 333 // ms

let advancer = null
let userDragging = false

export function init() {
  eventBus.register('file-read', resetAndPlay)
  eventBus.register('key-left', keyLeft)
  eventBus.register('key-right', keyRight)
  playButton.addEventListener('click', play)
  pauseButton.addEventListener('click', pause)
  moveSelector.addEventListener('change', () => {
    userDragging = false
  })
  moveSelector.addEventListener('input', (event) => {
    userDragging = true
    updateCurrentMove(event.target.value)
  })
}

function resetAndPlay(event) {
  const max = moveCount() - 1 // input range is inclusive
  moveSelector.max = max
  moveSelector.disabled = false
  moveSelector.value = 0
  updateCurrentMove(0)
  play() // advancer will be reset in this function
}

function updateCurrentMove(value) {
  setCurrentMove(value)
  eventBus.fire('current-move-changed')
}

function play() {
  if (advancer) {
    clearInterval(advancer)
    advancer = null
  }
  // Reset if at the end
  if (moveSelector.value === moveSelector.max) {
    moveSelector.value = 0
    updateCurrentMove(moveSelector.value)
  }
  advancer = setInterval(() => {
    if (userDragging) return // Try not to interfere with user
    moveSelector.value = parseInt(moveSelector.value) + 1
    if (parseInt(moveSelector.value) >= parseInt(moveSelector.max)) {
      clearInterval(advancer)
      advancer = null
      showPlayButton(true)
    }
    updateCurrentMove(moveSelector.value)
  }, DELAY)
  showPlayButton(false)
}

function pause() {
  if (advancer) {
    clearInterval(advancer)
    advancer = null
  }
  showPlayButton(true)
}

/**
 * Toggle between play and pause
 */
function showPlayButton(visible) {
  playButton.style.display = visible ? 'inline' : 'none'
  pauseButton.style.display = visible ? 'none' : 'inline'
}

function keyLeft() {
}

function keyRight() {
}
