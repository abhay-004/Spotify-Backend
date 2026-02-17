import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



//route
app.get("/",(req,res)=>{
    res.send("Server is running")
})

export default app