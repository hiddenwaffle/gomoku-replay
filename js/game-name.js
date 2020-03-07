import {
  gameNameDiv,
  gameNameFancyDiv,
  redNameSpan,
  blueNameSpan,
  messageDiv
} from './elements'
import {eventBus} from './event-bus'
import {gameName as getGameName} from './model'

export function init() {
  eventBus.register('game-name-updated', displayGameName)
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
    return [false]
  }
  // Remember [0] is the whole string again
  // const date = matchResults[1]
  // const time = matchResults[2]
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
  return [true, red, blue, message]
}

function displayGameName() {
  const line = getGameName()
  const [success, red, blue, message] = parse(line)
  if (success) {
    gameNameDiv.style.display = 'none'
    gameNameFancyDiv.style.display = 'block'
    messageDiv.style.display = 'block'
    redNameSpan.innerText = red
    blueNameSpan.innerText = blue
    messageDiv.innerText = message
  } else {
    gameNameDiv.style.display = 'block'
    gameNameFancyDiv.style.display = 'none'
    messageDiv.style.display = 'none'
    gameNameDiv.innerText = line
  }
}
