const server = require("./server.js");
const app = new server(8080);
const express = require('express');

app.listen(8080);
app.start();