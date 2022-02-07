import bodyParser from 'body-parser'
import express from 'express'
import expressWs from 'express-ws'
import router from './Routes.js'
import websocketController from './WebSocketController.js'

const app = expressWs(express()).app
var jsonParser = bodyParser.json()

console.log(process.env)

app.ws('/room/:id', websocketController)

// use router
app.use('/api', jsonParser, router)

// Not Found
app.use((req, res, next) => {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// Error handler
app.use(function (err, req, res, next) {
    // show error only if dev mode enabled
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

app.listen(process.env.PORT || 8080)