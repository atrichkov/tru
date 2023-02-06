require('dotenv').config()
const fs = require('fs')
const express = require('express')
const app = express()
const port = process.env.PORT;

app.set('view engine', 'ejs')
// app.use(express.static('public'))
app.use(express.json())
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/save', async (req, res) => {  
    const data = req.body.params.url.replace(/^data:image\/\w+;base64,/, "")
    const buf = Buffer.from(data, "base64")
    const fileName = 'img_' + Math.floor(new Date()/1000) + '.jpg'

    fs.writeFile("public/uploads/" + fileName, buf, (err) => {
        if (err) {
            console.error(err)
            res.send(err)
        } else {
            res.send("Image is stored successfully.")
        }
    })
})

app.listen(port, () => {
    console.info(`Example app listening on port ${port}`)
})