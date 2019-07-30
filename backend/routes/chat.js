const express = require("express");
const router = express.Router();
const http = require("http").Server(express);
const io = require("socket.io")(http);

router.get("/", function(req, res) {
    res.sendFile(__dirname + "/chat.vue");
});

var count = 1;
io.on("connection", function(socket) {
    console.log("user connected: ", socket.id);
    var name = "user" + count++;
    io.to(socket.id).emit("change name", name);

    socket.on("disconnect", function() {
        console.log("user disconnected: ", socket.id);
    });

    socket.on("send message", function(name, text) {
        var msg = name + " : " + text;
        console.log(msg);
        io.emit("receive message", msg);
    });
});

console.log("chat server on!");

module.exports = router;
