import { config } from './config'
import {
  canvas,
  ctx
} from './elements'

const SMU_RED = '#cc0035'
const SMU_BLUE = '#354ca1'

/**
 * Scale to the height. Could scale to the width
 * as well but it doesn't need to be that fancy.
 */
function getCellSize() {
  return Math.floor(canvas.height / config.boardSize) - 1
}

export function draw() {
  const cellSize = getCellSize()
  ctx.strokeStyle = 'lightgray'
  for (let row = 0; row < config.boardSize; row++) {
    for (let col = 0; col < config.boardSize; col++) {
      ctx.strokeRect(col * cellSize + 0.5,
                     row * cellSize + 0.5,
                     cellSize,
                     cellSize)
    }
  }
}

//       const value = board[row][col]
//       if (value !== 0) {
//         ctx.fillStyle = value == 1 ? SMU_RED : SMU_BLUE // else is -1
//         ctx.beginPath()
//         ctx.ellipse(col * CELL_WIDTH + (CELL_WIDTH / 2),
//                     row * CELL_HEIGHT + (CELL_HEIGHT / 2),
//                     CELL_WIDTH / 2 - 2,
//                     CELL_HEIGHT / 2 - 2,
//                     Math.PI / 4, 0, 2 * Math.PI)
//         ctx.fill()
//         ctx.strokeStyle = 'black'
//         ctx.ellipse(col * CELL_WIDTH + (CELL_WIDTH / 2),
//                     row * CELL_HEIGHT + (CELL_HEIGHT / 2),
//                     CELL_WIDTH / 2 - 2,
//                     CELL_HEIGHT / 2 - 2,
//                     Math.PI / 4, 0, 2 * Math.PI)
//         ctx.stroke()
