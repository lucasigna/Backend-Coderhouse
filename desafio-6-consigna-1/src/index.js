const server = require('./server.js')
const app = new server(8080)

app.listen(8080)
app.start()