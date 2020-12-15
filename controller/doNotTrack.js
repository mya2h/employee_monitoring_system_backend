const DoNotTrack = require("../models/doNotTrack")

const addUserToDoNotTrack = (req,res)=>{
    const newUser = new DoNotTrack({
        deviceId:req.body.deviceId
    })
    DoNotTrack.findOne({deviceId:req.body.deviceId})
        .then((result)=>{
            if(result){
                return res.status(400).json({ success: false,errors:[{msg:"device_user already exist"}] });
            }
            newUser.save()
              .then(result=>{
                return res.status(200).json({
                    succes: true,
                    result: result,
                    message: "deviceuser successfuly added",
                  });
              })
              .catch((err) => {
                return res.status(400).json({ succes: false, errors:[{msg:"unable to add deviceUser"}]  });
              });
        })
}
const getNotTrackedUser = (req,res)=>{
    DoNotTrack.find({})
    .then((result)=>{
        res.status(200).json(result)
    })
}
module.exports={
    addUserToDoNotTrack,
    getNotTrackedUser
}