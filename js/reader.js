import {eventBus} from './event-bus'
import {clear, add} from './model'

/**
 * Testing Delete Me
 */
export function read(x) {
  const lines = [
    '2020-03-05 17:11:30,513 - rollo.v.rollo - INFO - Game Board Size: 19',
    '2020-03-05 18:19:42,844 - rollo.v.rollo - DEBUG - X...........X....O.|.XOXX..X..XO..OOX..|.O.XO.XOXXO....XOX.|.OXXXOOOXOO..OOXXX.|OOOOXXOOOOXOXXXXOX.|.O.X.O.XXOOXOXOOOOX|.X..O..O.XXOOOXXXXO|...X....XXOOOXXO...|........OXXXOXOO...|.........XXOXOXO.O.|........XOOOXXXXO..|.......OXO.XX.OOOX.|........X..X..X.X..|........O.OXO..X...|..........XOO.O....|..........X.O......|............OX.....|...................|...................|',
    '2020-03-05 18:20:04,997 - rollo.v.rollo - DEBUG - X...........X....O.|.XOXX..X..XO..OOX..|.O.XO.XOXXO....XOX.|.OXXXOOOXOO..OOXXX.|OOOOXXOOOOXOXXXXOX.|.O.X.O.XXOOXOXOOOOX|.X..O..O.XXOOOXXXXO|...X....XXOOOXXO...|........OXXXOXOO...|.........XXOXOXO.O.|........XOOOXXXXO..|.......OXO.XX.OOOX.|........X..XO.X.X..|........O.OXO..X...|..........XOO.O....|..........X.O......|............OX.....|...................|...................|',
    '2020-03-05 18:20:05,003 - rollo.v.rollo - INFO - Winner: -1 in 146 moves time= 4114.485 secs'
  ]
  clear()
  for (let line of lines) {
    const matchResults = line.match(/ - DEBUG - ([X.O|]+)$/)
    if (matchResults && matchResults.length == 2) {
      add(matchResults[1].split('|')) // Use [1] because [0] is the full string.
    } else if (line.includes('INFO - Game Board Size')) {
      // Ignore
    } else if (line.includes('INFO - Winner')) {
      console.log('TODO: Handle this:', line)
    } else {
      console.error(`Unknown line: ${line}`)
    }
  }
  eventBus.fire('file-read')
}

/**
 * There are three types of log lines output by the
 * play_one_on_one_v3.py file:
 *   1) The board size. This is ignored.
 *   2) A board state. This is parsed for display.
 *   3) Winner. This is parsed for display.
 */
// function parse(text) {
//   const lines = text.split(/\r?\n/)
// }

// /**
//  * Replace the model with the file contents.
//  */
// export function read(file) {
//   const reader = new FileReader()
//   reader.addEventListener('loadend', (event) => {
//     if (event.target.readyState === FileReader.DONE) {
//       replace(parse(event.target.result))
//     }
//   })
//   reader.readAsText(file)
// }
