import {
  moveSelector,
  playButton,
  pauseButton
} from './elements'
import {eventBus} from './event-bus'
import {
  delay as getDelay,
  moveCount,
  setCurrentMove
} from './model'

let advancer = null
let userDragging = false

export function init() {
  eventBus.register('file-read', resetAndPlay)
  eventBus.register('key-left', keyLeft)
  eventBus.register('key-right', keyRight)
  eventBus.register('key-pause', keyPause)
  eventBus.register('speed-changed', speedChanged)
  playButton.addEventListener('click', play)
  pauseButton.addEventListener('click', pause)
  moveSelector.addEventListener('change', () => {
    userDragging = false
  })
  moveSelector.addEventListener('input', (event) => {
    userDragging = true
    updateCurrentMove(event.target.value)
  })
  moveSelector.addEventListener('keydown', (event) => {
    // In case the user hits left/right while the focus is
    // on the selector itself -- do not double increment.
    if (event.code === 'ArrowLeft' ||
        event.code === 'ArrowRight') {
      event.preventDefault()
    }
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

/**
 * Also does decrements.
 */
function increment(delta) {
  if (userDragging) return // Try not to interfere with user
  moveSelector.value = parseInt(moveSelector.value) + delta
  if (parseInt(moveSelector.value) >= parseInt(moveSelector.max)) {
    clearInterval(advancer)
    advancer = null
    showPlayButton(true)
  }
  updateCurrentMove(moveSelector.value)
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
  advancer = setInterval(() => { increment(1) }, getDelay())
  showPlayButton(false)
}

/**
 * It is ok for this function to be called multiple times in a row.
 */
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
  if (!moveSelector.disabled) {
    increment(-1)
  }
}

function keyRight() {
  if (!moveSelector.disabled) {
    increment(1)
  }
}

function keyPause() {
  if (!moveSelector.disabled) {
    if (advancer) {
      pause()
    } else {
      play()
    }
  }
}

function speedChanged() {
  if (advancer && !moveSelector.disabled) {
    pause()
    play()
  }
}
