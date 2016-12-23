var match = require('anymatch')
var walker = require('folder-walker')
var hyperImport = require('hyperdrive-import-files')
var each = require('stream-each')

module.exports = countImport

function countImport (archive, dir, opts, cb) {

  if (typeof opts === 'function') return countImport(archive, dir, {}, cb)
  if (!opts) opts = {}
  var importer
  var countStats = {
    files: 0,
    bytes: 0
  }

  each(walker(dir), countFiles, function (err) {
    if (err) cb(err)
    importer.emit('count finished', countStats)
  })

  importer = hyperImport(archive, dir, opts, cb)

  importer.countStats = countStats // TODO: make importer vs count stats clearer

  return importer

  function countFiles (data, next) {
    if (opts.ignore && match(opts.ignore, data.filepath)) return next()
    if (data.type === 'file') {
      countStats.files += 1
      countStats.bytes += data.stat.size
      importer.emit('file counted')
    }
    next()
  }
}
