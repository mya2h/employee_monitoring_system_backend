var path = require('path');
const Category = require("../models/category");


module.exports.findById = (req, res) => {
    Category.findById(req.params.id)
      .then((category) => {
        if (!category) {
          return res.status(404).send({
            message: "category not found with id " + req.params.id,
          });
        }
        res.status(200).send(category);
        console.log(category);
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error retrieving category with id " + req.params.id,
        });
      });
  };
  


  module.exports.findAll = (req, res) => {
    Category.find()
    //   .sort({ devicename: -1 })
      .then((categorys) => {
        res.status(200).send(categorys);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured",
        });
      });
  };

  module.exports.register = (req, res) => {
        categoryName = req.body.categoryName;
    if (!categoryName) {
      return res.status(400).send({
        message: "category name is not empty",
      });
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
  };

  // module.exports.update = (req , res)=>{
  //   category.findById(req.params.id)
  //   .then(category)

  // }

  module.exports.delete = (req, res) => {
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


  module.exports.update = (req, res) => {
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