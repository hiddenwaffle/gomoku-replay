import {
  SMU_RED,
  SMU_BLUE,
  gameNameDiv,
  gameNameFancyDiv,
  redNameSpan,
  blueNameSpan,
  messageDiv
} from './elements'
import {eventBus} from './event-bus'
import {
  gameName as getGameName,
  isEnd
} from './model'

export function init() {
  eventBus.register('file-opened', reset)
  eventBus.register('game-name-updated', displayGameName)
  eventBus.register('current-move-changed', sliderChanged)
}

function reset() {
  setInnerTexts('', '', '')
}

/**
 * Example log line:
 * 2020-03-07 11:23:10,913 - bob.v.alice - INFO - Winner: 1 in 15 moves time= 0.650 secs
 * Assumptions:
 *  - 'bob' is red/X
 *  - 'alice' is blue/O
 */
function parse(line) {
  const matchResults = line.match(/^(.*) (.*) - (.*)\.v\.(.*) - INFO - Winner: (.*) in (.*) moves time= (.*)$/)
  if (!matchResults || matchResults.length !== 8) {
    return ['', '', '', '']
  }
  // Remember [0] is the whole string again
  //          [1] is just the log date
  //          [2] is just the log time
  const red = matchResults[3]
  const blue = matchResults[4]
  const winner = matchResults[5] // 1, -1, or 0
  const numMoves = matchResults[6]
  const elapsed = matchResults[7]
  let message
  if (winner === '1') {
    message = `${red} wins in ${numMoves} moves over ${elapsed}`
  } else if (winner === '-1') {
    message = `${blue} wins in ${numMoves} moves over ${elapsed}`
  } else {
    message = `TIE - ${numMoves} moves over ${elapsed}`
  }
  return [red, blue, message, winner]
}

function displayGameName() {
  const line = getGameName()
  const [red, blue, message, winner] = parse(line)
  gameNameDiv.style.display = 'none'
  gameNameFancyDiv.style.display = 'block'
  if (winner === '1') {
    messageDiv.style.color = SMU_RED
  } else if (winner === '-1') {
    messageDiv.style.color = SMU_BLUE
  } else {
    messageDiv.style.color = '#333333'
  }
  setInnerTexts(red, blue, message)
}

function setInnerTexts(red, blue, message) {
  redNameSpan.innerText = red
  blueNameSpan.innerText = blue
  messageDiv.innerText = message
}

function sliderChanged() {
  if (isEnd()) {
    messageDiv.style.display = 'block'
  } else {
    messageDiv.style.display = 'none'
  }
}
