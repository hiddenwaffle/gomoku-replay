import {
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
}
