const fs    =require('fs')
const {filePath}=require('../model/fileModel')

function readFile(req,res){
const readStream=fs.createReadStream(filePath,'utf-8')

readStream.on('error',(err)=>{
    console.log("Error while reading file"+err)
    res.status(500).send("Error while reading file")
})


  readStream.pipe(res);
}

module.exports={readFile}

