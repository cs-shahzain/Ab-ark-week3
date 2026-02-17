const express =require('express')
const app = express()
const fileRoute =require('./route/fileRoute')
const {makeHash}=require('./utils/hashUtils')

console.log("Hashed Password => "+makeHash('zain'))
app.use("/api/files", fileRoute);


app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})