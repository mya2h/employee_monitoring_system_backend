const express = require("express");
const router = express.Router();
const suspiciousWindowRegisteration = require("../models/suspiciousWindowRegisteration");
const suspicious = require("../controller/suspiciousActivities")
router.post(
    "/",
    async (req, res) => {
        const {app, title} = req.body;
        console.log("the app and the tile are ", app, title)
        let query = {};
        if (app) {
            query.app = app;
        }
        if (title) {
            const pos1 = title.indexOf("//")
            let startPos;
            if (pos1 == -1) {
                startPos = 0;
            } else {
              startPos = pos1 + 2;  
            }
            
            const pos2 = title.indexOf("/", startPos);
            const endPos = pos2 === -1? title.length: pos2;
            const host = title.slice(startPos, endPos);
            const strArray = host.split(".");
            if (strArray[0] == "www") {
                query.title = strArray[1];
            } else {
                query.title = strArray[0]
            }
             
        }
        console.log("query is ", query)
        try {
            let suspiciousActivity = await suspiciousWindowRegisteration.findOne(query);
            console.log(suspiciousActivity);
            if (suspiciousActivity) {
                res.status(400).json({errors: [{msg:"activity already registered."}]})
            } else {
               suspiciousActivity = new suspiciousWindowRegisteration(query)
               suspiciousActivity.save();
               res.status(200).json(suspiciousActivity)
            }
        } catch (error) {
            
        }
    }
  );

//getting suspicious activities you registered.
router.get(
    "/",
    async (req, res) => {
        try {
            let suspiciousActivities = await suspiciousWindowRegisteration.find();
            console.log(suspiciousActivities);
            if (!suspiciousActivities) {
                res.status(400).json({errors: [{msg:"you didn't enter any suspicious activities yet."}]})
            } else {
               res.status(200).json(suspiciousActivities)
            }
        } catch (error) {
            
        }
    }
  );
  router.post("/file",suspicious.registerSuspiciousFiles)
  router.get("/file",suspicious.getSuspiciousFiles)
  router.get("/file/:id",suspicious.getSuspiciousFileById)
  module.exports = router;