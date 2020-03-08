import {
  canvas,
  fileUpload,
} from './elements'
import {read} from './reader'

export function init() {
  fileUpload.addEventListener('change', handleFileSelect, false)
}

/**
 * Allow user to upload a log file.
 */
function handleFileSelect(event) {
  read(event.target.files[0])
  // Workaround for if the user re-uploads the same file name.
  // https://stackoverflow.com/a/34529205
  fileUpload.value = ''
  // Prevent spacebar from re-opening the file dialog.
  // Hack: https://stackoverflow.com/a/29237391
  const tmp = document.createElement('input')
  document.body.appendChild(tmp)
  tmp.focus()
  document.body.removeChild(tmp)
}
