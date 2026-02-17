const crypto=require('crypto');

function makeHash(text){
   return crypto.createHash('sha256').update(text).digest('hex')
}

module.exports={makeHash}
