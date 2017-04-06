var express = require("express")
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())

app.post('/alexa', function (req, res, next) {
    console.log(req.body)
    res.status(200).json(req.body)
})

app.listen(process.env.port || 3434, function () {
    console.log('Server listening on port', process.env.port || 3434)
})
