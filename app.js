require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT;

app.set('view engine', 'ejs')
// app.use(express.static('public'))
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(port, () => {
    console.info(`Example app listening on port ${port}`)
})