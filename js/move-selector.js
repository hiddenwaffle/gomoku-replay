import {moveSelector} from './elements'
import {eventBus} from './event-bus'
import {moveCount, setCurrentMove} from './model'

export function init() {
  eventBus.register('file-read', resetMoveSelector)
}

function resetMoveSelector(event) {
  const max = moveCount() - 1 // input range is inclusive
  moveSelector.max = max
  moveSelector.disabled = false
  moveSelector.value = 0
  updateCurrentMove(0)
}

function updateCurrentMove(value) {
  setCurrentMove(value)
  eventBus.fire('current-move-changed')
}

moveSelector.addEventListener('input', (event) => {
  updateCurrentMove(event.target.value)
})
