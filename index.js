const express = require('express')
const app = express()
app.use(express.static(__dirname + '/public'));
const port = 3000

app.get('/', (req, res) => res.sendFile(__dirname+'/index.html'))
app.get('/reviewSubmit', (req, res) => res.sendFile(__dirname+'/reviewSubmit.html'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))