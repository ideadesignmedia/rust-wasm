const fs = require('fs')
const {exec} = require('child_process')
if (fs.existsSync('./pkg')) fs.rmdirSync('./pkg', {recursive: true})
exec('wasm-pack build', (err, stdout, stderr) => {
    if (err) return console.log(err)
    if (stderr) console.log(stderr)
    if (stdout) console.log(stdout)
    if (!fs.existsSync('./test/src')) fs.mkdirSync('./test/src', {recursive: true})
    if (fs.existsSync('./pkg')) {
        if (fs.existsSync('./test/src/wasm')) fs.rmdirSync('./test/src/wasm', {recursive: true})
        fs.renameSync('./pkg', './test/src/wasm')
    }
})