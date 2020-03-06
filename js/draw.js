import {config} from './config'
import {
  canvas,
  ctx
} from './elements'
import {eventBus} from './event-bus'
import {model} from './model'

const SMU_RED = '#cc0035'
const SMU_BLUE = '#354ca1'

export function init() {
  eventBus.register('window-resized', draw)
  eventBus.register('file-read', draw)
}

/**
 * Scale to the canvas height. Could scale to the width
 * as well but it doesn't need to be that fancy.
 */
function getCellSize() {
  return Math.floor(canvas.height / config.boardSize) - 1
}

function drawCell(row, col, value, cellSize) {
  if (value !== '.') {
    ctx.fillStyle = value == 'X' ? SMU_RED : SMU_BLUE // else is O
    ctx.beginPath()
    ctx.ellipse(col * cellSize + (cellSize / 2),
                row * cellSize + (cellSize / 2),
                cellSize / 2 - 2,
                cellSize / 2 - 2,
                Math.PI / 4, 0, 2 * Math.PI)
    ctx.fill()
    ctx.strokeStyle = 'black'
    ctx.ellipse(col * cellSize + (cellSize / 2),
                row * cellSize + (cellSize / 2),
                cellSize / 2 - 2,
                cellSize / 2 - 2,
                Math.PI / 4, 0, 2 * Math.PI)
    ctx.stroke()
  }
}

export function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
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
  for (let move of model.moves) {
    for (let [row, symbols] of move.entries()) {
      for (let col = 0; col < symbols.length; col++) {
        const value = symbols[col]
        drawCell(row, col, value, cellSize)
      }
    }
  }
}
