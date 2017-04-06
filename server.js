var express = require("express")
var bodyParser = require('body-parser')
var dgram = require('dgram')

var app = express()
app.use(bodyParser.json())

var cecip = process.env.CUSTOMCONNSTR_cecip
var cecport = process.env.CUSTOMCONNSTR_cecport

app.post('/alexa', function (req, res, next) {
    console.log(req.body)

    socket = dgram.createSocket('udp4')
    socket.send("", cecport, cecip, function (err) {
        socket.close()
    })

    res.status(200).json({
        version: "1.0",
        response: {
            outputSpeech: {
                type: "PlainText",
                text: "beep beep"
            },
            shouldEndSession: true
        }
    })
})

app.listen(process.env.port || 3434, function () {
    console.log('Server listening on port', process.env.port || 3434)
})
