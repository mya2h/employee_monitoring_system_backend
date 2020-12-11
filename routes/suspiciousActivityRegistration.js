const express = require("express");
const router = express.Router();
const SuspiciousActivityRegisteration = require("../models/suspiciousActivityRegisteration");
router.post(
    "/",
    async (req, res) => {
        const {app, title} = req.body;
        let query = {};
        if (app) {
            query.app = app;
        }
        if (title) {
            const pos1 = title.indexOf("//")
            const startPos = pos1 + 2;
            const endPos = title.indexOf("/", startPos)
            const host = title.slice(startPos, endPos)
            const strArray = host.split(".");
            query.title = strArray[1]; 
        }
        console.log(query)
        try {
            let suspiciousActivity = await SuspiciousActivityRegisteration.findOne(query);
            if (suspiciousActivity) {
                res.status(400).json({errors: [{msg:"activity already registered."}]})
            } else {
               suspiciousActivity = new SuspiciousActivityRegisteration(query)
               suspiciousActivity.save();
               res.status(200).json(suspiciousActivity)
            }
        } catch (error) {
            
        }
    }
  );
  router.get("/",(req,res)=>{
    SuspiciousActivityRegisteration.find({}).then((result)=>{
        res.status(200).json(result)
    })
  })
  module.exports = router;