
# hyperdrive-count-import

Count number of files and size of directory while importing to hyperdrive using [hyperdrive-import-files](https://github.com/juliangruber/hyperdrive-import-files)

This can be used to show importing progress of a directory.

## Usage

See `example.js` for a full example.

```js
var countImport = require('hyperdrive-count-import')
// hyperdrive stuff

var archive = drive.createArchive()
var status = countImport(archive, process.cwd(), function (err) {
  if (err) throw err
  console.log('IMPORT FINISHED')
  process.exit(0)
})

setInterval(function () {
  var progress = Math.round(status.fileCount * 100 / status.countStats.files)
  console.log(`Import progress: ${progress}%`)
}, 500)

status.on('count finished', function (stats) {
  console.log('COUNT FINISHED')
})
```

## API

### var status = countImport(archive, dir, [opts], [cb])

`status` is the `hyperdrive-import-files` instance, with all the same events available. `opts` and `cb` are passed to the importer.

**Note: Importing starts at the same time as counting. So you'll have `status.on('file added')` events while counting events are going.**

In addition to the `hyperdrive-import-file` events, there are two counting events:

#### status.on('file counted')

Emitted for each file count.

#### status.on('count finished', countStats)

Where `countStats` is: 

```js
countStats = {
  files: 190, // total files in dir
  bytes: 102 // total bytes in dir
}
```

#### status.countStats

Directory file and byte counts. Updated while counting happens.

## License

MIT
