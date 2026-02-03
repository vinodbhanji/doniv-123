import express from 'express';
import {ENV} from  './lib/env.js'

const app = express();

app.get('/', (req, res)=>{
    res.status(200).json({msg:'Success from API__'})
})

app.listen(ENV.PORT, ()=>{
    console.log("Running on the POST NO: 5000")
})