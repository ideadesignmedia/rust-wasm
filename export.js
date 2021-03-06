const fs = require('fs')
const {exec} = require('child_process')
if (fs.existsSync('./pkg')) fs.rmdirSync('./pkg', {recursive: true})
exec('wasm-pack build', (err, stdout, stderr) => {
    if (err) return console.log(err)
    if (stderr) console.log(stderr)
    if (stdout) console.log(stdout)
    if (!fs.existsSync('../static')) fs.mkdirSync('../static')
    if (fs.existsSync('./pkg')) {
        if (fs.existsSync('../static/wasm')) fs.rmdirSync('../static/wasm', {recursive: true})
        fs.renameSync('./pkg', '../static/wasm')
    }
})