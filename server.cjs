const express = require('express')
const app = express()

const client = require("./db/client.cjs");

client.connect()
app.get('/', (req,res)=>{
    res.send("hello Robot project")
})

// Router: /api
app.use('/api', require('./api/index.cjs'));

const PORT = 3000;
app.listen(PORT, ()=> console.log (`listening on port ${PORT}`))