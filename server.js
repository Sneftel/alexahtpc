var express = require("express")
var bodyParser = require('body-parser')
var dgram = require('dgram')

var app = express()
app.use(bodyParser.json())

var cecip = process.env.CUSTOMCONNSTR_cecip
var cecport = process.env.CUSTOMCONNSTR_cecport

function isValidRequest(json) {
    try {
        return json.session.application.applicationId == process.env.ALEXA_APPLICATION_ID
    }
    catch (err) {
        return false
    }
}

app.post('/theatermode', function (req, res, next) {
    console.log(req.body)

    if (isValidRequest(req.body)) {
        console.log("valid request")
        res.status(200).json({
            version: "1.0",
            response: {
                outputSpeech: {
                    type: "PlainText",
                    text: "activating"
                },
                shouldEndSession: true
            }
        })

        socket = dgram.createSocket('udp4')
        socket.send("TM", cecport, cecip, function (err) {
            if (err) {
                console.log("Error when sending datagram:", err)
                return next(err)
            }
            console.log("Sent datagram.")
            socket.close()
        })
    }
    else {
        console.log("NOT a valid request")
        res.status(401).end()
    }
})

app.listen(process.env.port || 3434, function () {
    console.log('Server listening on port', process.env.port || 3434)
})
