import React, { useReducer, createContext, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import env from './env'
import './index.css'
import * as source from './wasm/wasm.js'
const { api } = env

const getModule = (link = api + '/static/wasm/wasm.js') => {
    return new Promise((res, rej) => {
        res(source)
    })
}
const request = (path, method = 'GET', data, headers) => {
    return new Promise((res, rej) => {
        const options = { method }
        if (data) {
            options.body = JSON.stringify(data);
            options.headers = {}
            option.headers['Content-Type'] = 'application/json'
        }
        if (headers) {
            if (!options.headers) options.headers = {}
            options.headers = { ...options.headers, ...headers }
        }
        fetch(`${api}${path}`, options).then(result => result.json()).then(result => {
            if (!result || result.error) return rej(result?.message || JSON.stringify(result))
            res(result)
        }).catch(e => rej(e))
    })
}
const initialState = {

}
const changeState = (state, change) => {
    if (typeof change === 'function') return change(state)
    if (typeof change === 'string') {
        switch (change) {
            default: return state
        }
    }
    if (typeof change === 'object') {
        return { ...state, ...change }
    }
    return state
}
export const AppContext = createContext();
function App() {
    const [state, setState] = useReducer(changeState, initialState)
    const [wasm, setWasm] = useState(null)
    useEffect(() => {
        getModule().then(wasm => setWasm(wasm)).catch(e => console.log(e))
    }, [])
    useEffect(() => {
        if (wasm) {
            console.log(wasm)
            wasm.greet()
        }
    }, [wasm])
    return (<AppContext.Provider value={{ state, setState }}>
        <div className="app">
            <h1>API: {api}</h1>
        </div>
    </AppContext.Provider>)
}



const rootDiv = document.createElement('div')
rootDiv.id = 'root'
document.querySelector('body').appendChild(rootDiv)
createRoot(document.getElementById('root')).render(<App />)