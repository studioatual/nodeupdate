const express = require('express')

const app = express()

app.get('/', (req, res) => {
    return res.send('ok')
})

app.listen(3333, () => console.log('Server is started http://localhost:3333'))