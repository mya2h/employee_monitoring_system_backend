var path = require('path');
const Category = require("../models/category");
const Member = require("../models/member");
const Device = require("../models/deviceUser");


module.exports.findById = (req, res) => {
  Category.findById(req.params.id)
      .then((category) => {
        if (!category) {
          return res.status(404).send({
            message: "Category not found with id " + req.params.id,
          });
        }
        res.status(200).send(category);
        // console.log(category);
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error retrieving category with id " + req.params.id,
        });
      });
  };
  
  module.exports.findAllGroups = (req, res) => {
    Category.find()
      .sort({ devicename: -1 })
      .then((categorys) => {
        res.status(200).send(categorys);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured",
        });
      });
  };

  module.exports.registerCategory = (req, res) => {
        categoryName = req.body.categoryName;
    if (!categoryName) {
      return res.status(400).send({
        message: "category name is not empty",
      });
    }
    Category.findOne({ categoryName: req.body.categoryName })
    .then((result) => {
      if (result) {
        return res.status(400).json({ success: false, result: "Category name already exist" });
      }

    const category = new Category({
        categoryName: categoryName,
    });

    category
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the new category.",
        });
      });
    })
  };

  module.exports.deleteCategory = (req, res) => {
    Category.findByIdAndRemove(req.params.id)
      .then((category) => {
        if (!category) {
          return res.status(404).send({
            message: "Category not found ",
          });
        }
        res.send({ message: "Category deleted successfully!" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Could not delete category",
        });
      });
  };


  module.exports.updateCategory = (req, res) => {
    if (!req.body.categoryName) {
      res.status(400).send({
        message: "required fields cannot be empty",
      });
    }
    Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((category) => {
        if (!category) {
          return res.status(404).send({
            message: "no category found",
          });
        }
        res.status(200).send(category);
      })
      .catch((err) => {
        return res.status(404).send({
          message: "error while updating the category",
        });
      });
  };

  module.exports.registerMember = (req, res) => {
    categoryId = req.params.id;
    deviceId = req.body.deviceId;
    

if (deviceId.length === 0) {
  return res.status(400).send({
    message: "member info can not be not empty",
  });
}

for (var i = 0; i < deviceId.length; i++) {
  // console.log(deviceId[i]);
  Member.findOne({ deviceId: deviceId[i]})
.then((result) => {
  if (result) {
    return res.status(400).json({ success: false, result:   `Member${deviceId}already exist` });
  }
})
  console.log(deviceId[i]);
    const member = new Member({
      categoryId: categoryId,
      deviceId: deviceId[i],
       
   });
   member
   .save()
   .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     res.status(500).send({
       message: err.message || "Some error occurred while creating the new member.",
     });
   });
  
}
};

  module.exports.findMemberById = (req, res) => {
    Member.findById(req.params.id)
        .then((member) => {
          if (!member) {
            return res.status(404).send({
              message: "Member not found with id " + req.params.id,
            });
          }
          res.status(200).send(member);
          // console.log(category);
        })
        .catch((err) => {
          return res.status(500).send({
            message: "Error retrieving member with id " + req.params.id,
          });
        });
    };

    module.exports.findMemberByCategoryId = (req, res) => {
      category_Id = req.params.categoryId;

      Member.find({categoryId:category_Id})
          .then((members) => {
            console,console.log((members));
            if (!members) {
              return res.status(404).send({
                message: "Member not found with id " + req.params.categoryId,
              });
            }
            // console.log(members.length);
            for(i = 0; i < members.length; i++){
              // for(j = 0; j < members[i].deviceId.length; j++){
              // console.log(members[i].deviceId[j].deviceId);
            //   Device.find({_id:member[i].categoryId})
            //   .then((member) => {
            //     console.log(member);
            // res.status(200).send(members);
            // })
            // .catch((err) => {
            //   return res.status(500).send({
            //     message: "Error retrieving member device name  with id " + req.params.categoryId,
            //   });
            // });
           
          
        }
        res.status(200).send(members);
             
          })
          .catch((err) => {
            return res.status(500).send({
              message: "Error retrieving member with id " + req.params.categoryId,
            });
          });
      };

    module.exports.findMemberAll = (req, res) => {
      Member.find()
        // .sort({ deviceName: -1 })
        .then((members) => {
          res.status(200).send(members);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Error Occured",
          });
        });
    };

  module.exports.deleteMember = (req, res) => {
    Member.findByIdAndRemove(req.params.id)
      .then((member) => {
        if (!member) {
          return res.status(404).send({
            message: "Member not found ",
          });
        }
        res.send({ message: "Member deleted successfully!" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Could not delete member",
        });
      });
  };


  module.exports.updateMember = (req, res) => {
    if (!req.body.deviceName || !req.body.userName) {
      res.status(400).send({
        message: "required fields cannot be empty",
      });
    }
    Member.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((member) => {
        if (!member) {
          return res.status(404).send({
            message: "no member found",
          });
        }
        res.status(200).send(member);
      })
      .catch((err) => {
        return res.status(404).send({
          message: "error while updating the member",
        });
      });
  };