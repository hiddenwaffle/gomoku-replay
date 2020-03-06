// Each move state is itself an array of rows that look like:
//  ['XXX',
//   '..O',
//   'XOX']
// Moves are in order from first at [0] to last at [length-1].

export const model = {
  // These assignments should match clear()
  currentMoveIndex: null,
  moves: []
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
