// Each move state is itself an array of rows that look like:
//  ['XXX',
//   '..O',
//   'XOX']
// Moves are in order from first at [0] to last at [length-1].

const model = {
  // These assignments should match clear()
  gameName: null,
  currentMoveIndex: null,
  moves: [],
  boardSize: 19,
  delay: 333
}

export function clear() {
  // These assignments should match the initialization.
  model.currentMoveIndex = null,
  model.moves = []
}

export function addMove(move) {
  model.moves.push(move)
}

export function currentMove() {
  return model.moves[model.currentMoveIndex]
}

export function setCurrentMove(index) {
  model.currentMoveIndex = index
}

export function moveCount() {
  return model.moves.length
}

export function gameName() {
  return model.gameName
}

export function setGameName(value) {
  model.gameName = value
}

export function isEnd() {
  return model.currentMoveIndex >= model.moves.length - 1
}

export function recalculateBoardSize() {
  let boardSize = 19
  if (model.moves.length > 0) {
    boardSize = model.moves[0].length
  }
  model.boardSize = boardSize
}

export function delay() {
  return model.delay
}

export function setDelay(value) {
  model.delay = value
}

export function boardSize() {
  return model.boardSize
}
