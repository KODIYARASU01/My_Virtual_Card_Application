import ProductModel from "../Models/Products.model.js";
import currentPlan from "../Models/Plan.model.js";
import productUpload from "../Multer/product.js";
import fs from "fs";
import multer from "multer";
//Post basic detail data to database:

export const PostProductData =  (req, res) => {
  productUpload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "File size too large. Maximum limit is 2MB." });
      }
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (err) {
      res.status(400).json({ message: err });
    } else {
      if (!req.file) {
        return res.status(400).json({ message: "No file choosen!" });
      }

      let checkCurrentPlan = await currentPlan.find({
        user: req.user.userName,
      });

      if (!checkCurrentPlan) {
        return res
          .status(400)
          .json({ message: "Plan not be there!", error: err });
      }
      if (checkCurrentPlan.length <= 0) {
        return res
          .status(400)
          .json({ message: "Choose your Plan first!", error: err });
      } else {
        //Plan 2 and 3
        if (
          checkCurrentPlan[0].PlanPrice === 10 ||
          checkCurrentPlan[0].PlanPrice === 365 ||
          checkCurrentPlan[0].PlanPrice === 799 ||
          checkCurrentPlan[0].PlanPrice === 1499
        ) {
          //check images
          let checkProductLength = await ProductModel.find({
            user: req.user.userName,
          });


          if (!checkProductLength) {
            return res
              .status(400)
              .json({ message: "Image will not be there!", error: err });
          } else {
            if (checkCurrentPlan[0].PlanPrice === 1499) {
              //Basic Image File limit checked:
              if (checkProductLength.length < 10) {
                // Create a new image instance and save to MongoDB
                const newProduct = new ProductModel({
                  user: req.user.userName,
                  ProductName: req.body.ProductName,
                  ProductDescription: req.body.ProductDescription,

                  ProductURL: req.body.ProductURL,
                  ProductPrice: req.body.ProductPrice,
                  ProductImage: {
                    data: fs.readFileSync("uploads/" + req.file.filename),
                    contentType: req.file.mimetype,
                  },
                });

               await newProduct
                  .save()
                  .then(() => {
                    res.status(200).json({
                      message: "Image uploaded!",
                      data: newProduct,
                    });
                  })
                  .catch((err) => {
                     res.status(400).json({
                      message: "Failed to save image to database!",
                    
                    });
                  });
              } else {
                res.status(400).json({
                  message:
                    "Max Product Upload limit crossed..Only accept 10 Product Details! ",
            
                });
              }
            }
            if (checkCurrentPlan[0].PlanPrice === 799
            ) {
              //Basic Image File limit checked:
              if (checkProductLength.length < 5) {
                // Create a new image instance and save to MongoDB
                const newProduct = new ProductModel({
                  user: req.user.userName,
                  ProductName: req.body.ProductName,
                  ProductDescription: req.body.ProductDescription,

                  ProductURL: req.body.ProductURL,
                  ProductPrice: req.body.ProductPrice,
                  ProductImage: {
                    data: fs.readFileSync("uploads/" + req.file.filename),
                    contentType: req.file.mimetype,
                  },
                });

                await newProduct
                  .save()
                  .then(() => {
                    res.status(200).json({
                      message: "Product uploaded!",
                      data: newProduct,
                    });
                  })
                  .catch((err) => {
                    console.log(err.message)
                    res.status(400).json({
                      message: "Failed to save product to database!",
                 
                    });
                  });
              } else {
                res.status(400).json({
                  message:
                    "Max Product Upload limit crossed..Only accept 5 Product Details! ",
                 
                });
              }
            }
            if (checkCurrentPlan[0].PlanPrice === 10) {
              //Basic Image File limit checked:
              if (checkProductLength.length < 0) {
                res.status(400).json({
                  message: "Product Access denied for Demo Plan!",
                  data: newProduct,
                });
              } else {
                res.status(400).json({
                  message: "Product Access denied for Demo Plan!",
             
                });
              }
            }
            if (checkCurrentPlan[0].PlanPrice === 365) {
              //Basic Image File limit checked:
              if (checkProductLength.length < 0) {
                res.status(200).json({
                  message: "Product Access denied for Demo Plan!",
                  data: newProduct,
                });
              } else {
                res.status(400).json({
                  message: "Product Access denied for Basic Plan!",
                
                });
              }
            }
          }
        } else {
          res.status(400).json({ message: "Plan not match!", error: err });
        }
      }
    }
  });
};

//Read or get all user basicDetail data  from database:

export const GetProductData = async (req, res) => {
  try {
    let datas = await ProductModel.find({});
    if (!datas) {
      res.status(400).json({ message: "Data not found!" });
    } else {
      res.status(201).json({
        message: "Data Fetched!",
        length: datas.length,
        data: datas,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//   // //Read or get Specific User all Data  :
export const readSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await ProductModel.find({ user: req.user.userName });

    if (!getSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res.status(201).json({
        message: " Data Fetched!",
        length: getSpecificData.length,
        data: getSpecificData,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// //Read or get Specific User all Data  :
export const getSpecificIdData = async (req, res) => {
  try {
    let { id } = req.params;
    let getSpecificData = await ProductModel.findById(id);

    if (!getSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res.status(201).json({ message: "Data Fetched!", data: getSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Update Specific document user data:

export const updateSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updateSpecificData = await ProductModel.findByIdAndUpdate(id, data);

    if (!updateSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Data Updated!", data: updateSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteSpecificUserAllData = async (req, res) => {
  try {
    let deleteSpecificData = await ProductModel.deleteMany({
      user: req.user.userName,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res.status(201).json({
        message: "Data Deleted!",
        length: deleteSpecificData.length,
        data: deleteSpecificData,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Spcific user  Document in Basic Detail:

export const deleteSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await ProductModel.findByIdAndDelete(id);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Data Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// export const PostProductData = async (req, res) => {
//   try {
//     if (
//       !req.body.ProductName ||
//       !req.body.ProductDescription ||
//       !req.body.ProductImage ||
//       !req.body.ProductPrice
//     ) {
//       return res.status(401).json({ message: "All * fields Mandatory " });
//     } else {
//       let data = {
//         user: req.user.userName,
//         ProductName: req.body.ProductName,
//         ProductDescription: req.body.ProductDescription,
//         ProductImage: req.body.ProductImage,
//         ProductURL: req.body.ProductURL,
//         ProductPrice:req.body.ProductPrice
//       };

//       const result = await ProductModel.create(data);

//       return res.status(201).json({ message: "Data saved!", data: result });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
