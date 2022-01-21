const server = require("./server.js");
const app = new server(3000);
const express = require('express');

app.listen(3000);
app.start();