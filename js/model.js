// Each move state is itself an array of rows that look like:
// ['XXX',
//  '..O',
//  'XOX']
// Moves are in order from first at [0] to last at [length-1].

export const model = {
  moves: []
}

export function clear() {
  model.moves = []
}

export function add(move) {
  model.moves.push(move)
}
