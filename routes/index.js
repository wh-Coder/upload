var express = require('express')
// var router = express.Router()
var app = express()

var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()

var fs = require('fs')

app.use(express.static('public'));

app.all('/', function (req, res) {
    res.sendFile('../public/index.html')
})

app.post('/upload', multipartMiddleware, function (req, res) {
    console.log(req.body)
    console.log(req.files)

    // 删除临时文件
    fs.unlink(req.files.myfile.path)

    res.send('upload success!')
})

app.post('/upload2', multipartMiddleware, function (req, res) {
    console.log(req.body)
    console.log(req.files)

    var fpath = req.files.myfile.path
    console.log(fpath)
    // var fname = fpath.substr(fpath.lastIndexof('/') + 1)
    fs.unlink(req.files.myfile.path)

    setTimeout(function(){
        var ret = ["<script>",
            "window.parent.uploadFinished('成功')",
            "</script>"
        ]
        res.send(ret.join(""))
    },300)
})

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});