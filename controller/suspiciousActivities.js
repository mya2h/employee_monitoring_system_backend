const config = require('../config/default');
const Suspicious =  require('../models/suspiciousActivities')

const registerSuspiciousFiles = (req,res) => {
    const file = new Suspicious({
        deviceId:req.body.deviceId,
        file:req.body.file
    })
    Suspicious.findOne({file:req.body.file})
        .then((result)=>{
            if(result){
                return res.status(400).json({ success: false,errors:[{msg:"path already exist"}] });
            }
            file.save()
              .then(result=>{
                return res.status(200).json({
                    succes: true,
                    result: result,
                    message: "filepath successfuly registered",
                  });
              })
              .catch((err) => {
                return res.status(400).json({ succes: false, errors:[{msg:"unable to register filepath"}]  });
              });
        })
}

const getSuspiciousFiles = (req,res)=>{
    Suspicious.find({})
        .then((result)=>{
            res.status(200).json(result)
        })
}
const getSuspiciousFileById = (req,res)=>{
    device = req.params.id;
    Suspicious.find({deviceId:req.params.id})
        .then((result)=>{
            res.status(200).json(result)
        })
}
module.exports = {
    registerSuspiciousFiles,
    getSuspiciousFiles,
    getSuspiciousFileById
}