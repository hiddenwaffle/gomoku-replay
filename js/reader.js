import {eventBus} from './event-bus'
import {
  clear,
  addMove,
  setGameName,
  recalculateBoardSize
} from './model'

/**
 * Testing Delete Me
 */
export function applyLines(lines) {
  let errors = false
  clear()
  for (let line of lines) {
    const matchResults = line.match(/ - DEBUG - ([X.O|]+)$/)
    if (matchResults && matchResults.length == 2) {
      addMove(matchResults[1].split('|')) // Use [1] because [0] is the full string.
    } else if (line.includes('INFO - Game Board Size')) {
      // Ignore
    } else if (line.includes('INFO - Winner') ||
               line.includes('INFO - TIE GAME')) { // Last minute change for ties
      setGameName(line)
      eventBus.fire('game-name-updated')
    } else if (line.trim() === '') {
      // Ignore
    } else {
      console.error(`Unknown line: ${line}`)
      errors = true
    }
  }
  if (errors) {
    alert('There were errors reading the file. This might cause the game ' +
          'to render incorrectly.')
  }
  recalculateBoardSize() // In case it is not 19x19
  eventBus.fire('file-read')
}

/**
 * There are three types of log lines output by the
 * play_one_on_one_v3.py file:
 *   1) The board size. This is ignored.
 *   2) A board state. This is parsed for display.
 *   3) Winner. This is parsed for display.
 */
function parse(text) {
  const lines = text.split(/\r?\n/)
  applyLines(lines)
}

/**
 * Replace the model with the file contents.
 */
export function read(file) {
  const reader = new FileReader()
  reader.addEventListener('loadend', (event) => {
    eventBus.fire('file-opened')
    if (event.target.readyState === FileReader.DONE) {
      parse(event.target.result)
    }
  })
  reader.readAsText(file)
}
