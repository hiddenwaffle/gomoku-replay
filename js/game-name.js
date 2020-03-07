import {gameNameSpan} from './elements'
import {eventBus} from './event-bus'
import {gameName} from './model'

export function init() {
  eventBus.register('game-name-updated', displayGameName)
}

function displayGameName() {
  gameNameSpan.innerText = gameName()
}
