import ServiceModel from "../Models/Services.model.js";
import currentPlan from "../Models/Plan.model.js";
import serviceUpload from "../Multer/service.js";
import fs from "fs";
import multer from "multer";
//Post basic detail data to database:

export const PostServiceData =  (req, res) => {
  serviceUpload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "Image File size too large. Maximum limit is 2MB." });
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
          let checkServiceLength = await ServiceModel.find({
            user: req.user.userName,
          });


          if (!checkServiceLength) {
            return res
              .status(400)
              .json({ message: "Image will not be there!", error: err });
          } else {
            if (checkCurrentPlan[0].PlanPrice === 1499) {
              //Basic Image File limit checked:
              if (checkServiceLength.length < 8) {
                // Create a new image instance and save to MongoDB
                const newService = new ServiceModel({
                  user: req.user.userName,
                  ServiceName: req.body.ServiceName,
                  ServiceDescription: req.body.ServiceDescription,

                  ServiceURL: req.body.ServiceURL,
                  ServiceImage: {
                    data: fs.readFileSync("uploads/" + req.file.filename),
                    contentType: req.file.mimetype,
                  },
                });

               await newService
                  .save()
                  .then(() => {
                    res.status(200).json({
                      message: "Service uploaded!",
                      data: newService,
                    });
                  })
                  .catch((err) => {
                    console.log(err)
                    res.status(400).json({
                      message: "Failed to save Service to database!",
                
                    });
                  });
              } else {
                res.status(400).json({
                  message:
                    "Max Service limit crossed..Enterprice plan Only accept 8  Service Details! ",
              
                });
              }
            }
            if (checkCurrentPlan[0].PlanPrice === 799
            ) {
              //Basic Image File limit checked:
              if (checkServiceLength.length < 6) {
                // Create a new image instance and save to MongoDB
                const newService = new ServiceModel({
                  user: req.user.userName,
                  ServiceName: req.body.ServiceName,
                  ServiceDescription: req.body.ServiceDescription,

                  ServiceURL: req.body.ServiceURL,
                  ServiceImage: {
                    data: fs.readFileSync("uploads/" + req.file.filename),
                    contentType: req.file.mimetype,
                  },
                });

                await newService
                  .save()
                  .then(() => {
                    res.status(200).json({
                      message: "Service uploaded!",
                      data: newService,
                    });
                  })
                  .catch((err) => {
                    console.log(err.message)
                    res.status(400).json({
                      message: "Failed to save Service to database!",
                  
                    });
                  });
              } else {
                res.status(400).json({
                  message:
                  "Max Service limit crossed..Standard plan Only accept 6  Service Details! ",
               
                });
              }
            }
        
            if (checkCurrentPlan[0].PlanPrice === 365) {
              if (checkServiceLength.length < 4) {
                // Create a new image instance and save to MongoDB
                const newService = new ServiceModel({
                  user: req.user.userName,
                  ServiceName: req.body.ServiceName,
                  ServiceDescription: req.body.ServiceDescription,

                  ServiceURL: req.body.ServiceURL,
                  ServiceImage: {
                    data: fs.readFileSync("uploads/" + req.file.filename),
                    contentType: req.file.mimetype,
                  },
                });

                await newService
                  .save()
                  .then(() => {
                    res.status(200).json({
                      message: "Service uploaded!",
                      data: newService,
                    });
                  })
                  .catch((err) => {
                    console.log(err.message)
                    res.status(400).json({
                      message: "Failed to save Service to database!",
                
                    });
                  });
              } else {
                res.status(400).json({
                  message:
                  "Max Service limit crossed..Basic plan Only accept 4  Service Details! ",
             
                });
              }
            }
            if (checkCurrentPlan[0].PlanPrice === 10) {
              //Basic Image File limit checked:
              if (checkServiceLength.length < 0) {
                res.status(400).json({
                  message: "Service Access denied for Demo Plan!",
                  data: newService,
                });
              } else {
                res.status(400).json({
                  message: "Service Access denied for Demo Plan!",
               
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

export const GetServiceData = async (req, res) => {
  try {
    let datas = await ServiceData.find({});
    if (!datas) {
      res.status(400).json({ message: "Data not found!" });
    } else {
      res.status(201).json({
        message: "Data Fetched!",
length:datas.length,
        data: datas,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//   // //Read or get Specific User all Data  :
  export const getSpecificUserAllData = async (req, res) => {
    try {
      let getSpecificData = await ServiceData.find({ user: req.user.userName });

      if (!getSpecificData) {
        res.status(400).json({ message: "Data Not Found!" });
      } else {
        res
          .status(201)
          .json({ message: "Data Fetched!",length:getSpecificData.length, data: getSpecificData });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  // //Read or get Specific User all Data  :
  export const getSpecificIdData = async (req, res) => {
    try {
      let {id}=req.params;
      let getSpecificData = await ServiceData.findById(id );

      if (!getSpecificData) {
        res.status(400).json({ message: "Data Not Found!" });
      } else {
        res
          .status(201)
          .json({ message: "Data Fetched!", data: getSpecificData });
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
      let updateSpecificData = await ServiceData.findByIdAndUpdate(id, data);

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
      let deleteSpecificData = await ServiceData.deleteMany({
        user: req.user.userName,
      });

      if (!deleteSpecificData) {
        res.status(400).json({ message: "Data Not Found" });
      } else {
        res
          .status(201)
          .json({ message: "All Data Deleted!",length:deleteSpecificData.length, 
            data: deleteSpecificData });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  //Delete Spcific user  Document in Basic Detail:

  export const deleteSpecificUserData = async (req, res) => {
    try {
      let { id } = req.params;

      let deleteSpecificData = await ServiceData.findByIdAndDelete(id);

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




//   //Post basic detail data to database:

// export const PostServiceData = async (req, res) => {
//   try {
//     if (
//       !req.body.ServiceName ||
//       !req.body.ServiceDescription ||
//       !req.body.ServiceImage
//     ) {
//       return res.status(401).json({ message: "All * fields Mandatory " });
//     } else {
//       let data = {
//         user: req.user.userName,
//         ServiceName: req.body.ServiceName,
//         ServiceDescription: req.body.ServiceDescription,
//         ServiceImage: req.body.ServiceImage,
//         ServiceURL: req.body.ServiceURL,
//       };

//       const result = await ServiceData.create(data);

//       return res.status(201).json({ message: "Data saved!", data: result });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };