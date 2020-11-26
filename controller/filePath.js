const Device = require("../models/device")
const Files = require("../models/files")
const uploadFilePath = async (req,res) => {
    console.log(req.body)
//    const fileInfo= {
//         device:req.body.device_id,
//         path: req.body.fileUrl,
//    }
//    Files.findOne({path:fileInfo.path})
//     .then((result)=>{
//         if(result){

//         }
        
//     })
}
module.exports={
    uploadFilePath
}




module.exports = {
    uploadFilePath
}
 
