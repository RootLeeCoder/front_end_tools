const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.post('/', (req, res) => {
    console.log('收到请求体', req.body)
    res.status(201).send()
})

app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`)
})