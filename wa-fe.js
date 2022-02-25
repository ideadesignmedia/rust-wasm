window.getModule = (link ='/static/wasm/wasm.js') => { 
    return new Promise((res, rej) => {
        if (!link) return rej('Mising Link To WASM')
        fetch(link).then(r => WebAssembly.instantiateStreaming(r)).then(r => res(r.instance)).catch(e => rej(e))
    })
}