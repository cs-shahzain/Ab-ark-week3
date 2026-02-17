const express=require('express')
const fileReadStream=require('../controler/fileReadStream')
const router=express.Router()

router.get('/stream',fileReadStream.readFile)

module.exports=router;

