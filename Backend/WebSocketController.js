import { WebSocket } from "ws"

const websocketController = (ws, req) => {
    ws.on('upgrade', (msg) => {
        console.log(`Upgrade: ${msg}`)
    })

    ws.on('connection', (msg) => {
        console.log('connection')
    })

    ws.on('open', (msg) => {
        console.log(`welcome! msg: ${msg}}`)
    })

    ws.on('message', (msg) => {
        console.log(`New message: ${msg}`)
    })

    ws.on('close', (msg) => {
        console.log(`Bye! ${msg}`)
    })
}

export default websocketController