var memdb = require('memdb')
var hyperdrive = require('hyperdrive')
var statusLogger = require('status-logger')
var countImport = require('.')

var output = ['Starting Count & Import']
var log = statusLogger(output)
var drive = hyperdrive(memdb())
var archive = drive.createArchive()

var status = countImport(archive, process.cwd(), function (err) {
  if (err) throw err
  output.push('\nIMPORT FINISHED')
  output.push('\nBye Bye')
  log.print()
  process.exit(0)
})

printProgress()
setInterval(printProgress, 500)

status.on('count finished', function (stats) {
  output.push('\nCOUNT FINISHED')
  output.push(`Files in directory: ${stats.files}`)
  output.push(`Bytes in directory: ${stats.bytes}`)
})

status.on('file imported', function (file) {
  // File imported to hyperdrive
  // path = file.path, mode = file.mode (created/updated)
})
status.on('file skipped', function (file) {
  // File import skipped
})

function printProgress () {
  if (!status.countStats.files) return
  var progress = Math.round(status.fileCount * 100 / status.countStats.files)
  output[0] = `Import progress: ${progress}%`
  log.print()
}
