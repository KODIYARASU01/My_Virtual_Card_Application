import TestimonialModel from "../Models/Testimonial.model.js";
import currentPlan from "../Models/Plan.model.js";

//Post basic detail data to database:

export const postTestimonialData = async (req, res) => {
  try {
    if (!req.body.ClientName || !req.body.ClientFeedback) {
      return res.status(401).json({ message: "All * fields are Mandatory!" });
    }
    let checkCurrentPlan = await currentPlan.find({
      user: req.user.userName,
    });

    if (!checkCurrentPlan) {
      return res
        .status(400)
        .json({ message: "Plan not be there!"});
    }
    if (checkCurrentPlan.length <= 0) {
      return res
        .status(400)
        .json({ message: "Choose your Plan first!"});
    } else {
      //Plan 2 and 3
      if (
        checkCurrentPlan[0].PlanPrice === 10 ||
        checkCurrentPlan[0].PlanPrice === 365 ||
        checkCurrentPlan[0].PlanPrice === 799 ||
        checkCurrentPlan[0].PlanPrice === 1499
      ) {
        //check images
        let checkTestimonialLength = await TestimonialModel.find({
          user: req.user.userName,
        });

        if (!checkTestimonialLength) {
          return res
            .status(400)
            .json({ message: "Image will not be there!" });
        } else {
          if (checkCurrentPlan[0].PlanPrice === 1499) {
            //Basic Image File limit checked:
            if (checkTestimonialLength.length < 6) {
              // Create a new image instance and save to MongoDB
              const newTestimonial = new TestimonialModel({
                user: req.user.userName,
                ClientImage: req.body.ClientImage,
                ClientName: req.body.ClientName,
                ClientReviewDate:req.body.ClientReviewDate,
                ClientFeedback: req.body.ClientFeedback,
              });

              await newTestimonial
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Testimonial slide uploaded!",
                    data: newTestimonial,
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(400).json({
                    message: "Failed to save image to database!",
                    
                  });
                });
            } else {
              res.status(400).json({
                message:"Max Slide Upload limit crossed..Only accept 6 Client Reviews! ",
          
              });
            }
          }
          if (checkCurrentPlan[0].PlanPrice === 799) {
            //Basic Image File limit checked:
            if (checkTestimonialLength.length < 4) {
              // Create a new image instance and save to MongoDB
              const newTestimonial = new TestimonialModel({
                user: req.user.userName,
                ClientImage: req.body.ClientImage,
                ClientName: req.body.ClientName,
                ClientReviewDate:req.body.ClientReviewDate,
                ClientFeedback: req.body.ClientFeedback,
              });

              await newTestimonial
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Testimonial slide uploaded!",
                    data: newTestimonial,
                  });
                })
                .catch((err) => {
                
                  res.status(400).json({
                    message: "Failed to save slide to database!",
                   
                  });
                });
            }
             else {
              res.status(400).json({
                message:"Max Slide Upload limit crossed..Only accept 4 Client Reviews! ",
             
              });
            }
          }
          if (checkCurrentPlan[0].PlanPrice === 365) {
            //Basic Image File limit checked:
            if (checkTestimonialLength.length < 2) {
              // Create a new image instance and save to MongoDB
              const newTestimonial = new TestimonialModel({
                user: req.user.userName,
                ClientImage: req.body.ClientImage,
                ClientName: req.body.ClientName,
                ClientReviewDate:req.body.ClientReviewDate,
                ClientFeedback: req.body.ClientFeedback,
              });

              await newTestimonial
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Testimonial slide uploaded!",
                    data: newTestimonial,
                  });
                })
                .catch((err) => {
                  console.log(err.message);
                  res.status(400).json({
                    message: "Failed to save slide to database!",
                   
                  });
                });
            } else {
              res.status(400).json({
                message:"Max Slide Upload limit crossed..Only accept 2 Client Reviews! ",
            
              });
            }
          }
          if (checkCurrentPlan[0].PlanPrice === 10) {
            //Basic Image File limit checked:
            if (checkTestimonialLength.length < 1) {
              // Create a new image instance and save to MongoDB
              const newTestimonial = new TestimonialModel({
                user: req.user.userName,
                ClientImage: req.body.ClientImage,
                ClientName: req.body.ClientName,
                ClientReviewDate:req.body.ClientReviewDate,
                ClientFeedback: req.body.ClientFeedback,
              });

              await newTestimonial
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Testimonial slide uploaded!",
                    data: newTestimonial,
                  });
                })
                .catch((err) => {
                  console.log(err.message);
                  res.status(400).json({
                    message: "Failed to save slide to database!",
                   
                  });
                });
            } else {
              res.status(400).json({
                message:"Max Slide Upload limit crossed..Only accept 1 Client Reviews! ",
            
              });
            }
          }
        }
      } else {
        res.status(400).json({ message: "Plan not match!", error: err });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Read or get all user basicDetail data  from database:

export const getTestimonialData = async (req, res) => {
  try {
    let datas = await TestimonialModel.find({});
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

// //Read or get Specific User all Data  :
export const getSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await TestimonialModel.find({
      user: req.user.userName,
    });

    if (!getSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({
          message: "Data Fetched!",
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
    let getSpecificData = await TestimonialModel.findById(id);

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
    let updateSpecificData = await TestimonialModel.findByIdAndUpdate(id, data);

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
    let deleteSpecificData = await TestimonialModel.deleteMany({
      user: req.user.userName,
    });

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

//Delete Spcific user  Document in Basic Detail:

export const deleteSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await TestimonialModel.findByIdAndDelete(id);

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

//Post basic detail data to database:

// export const postTestimonialData = async (req, res) => {
//   try {
//     if (
//          !req.body.ClientName || !req.body.ClientFeedback
//     ) {
//       return res
//         .status(401)
//         .json({ message: "All * fields are Mandatory!" });
//     } else {
//       let data = {
//         user: req.user.userName,
//         ClientImage: req.body.ClientImage,
//         ClientName: req.body.ClientName,
//         ClientFeedback: req.body.ClientFeedback,

//       };
//       const result = await TestimonialModel.create(data);

//       return res
//         .status(201)
//         .json({ message: "Data saved!", data:result });
//     }
//   } catch (error) {
//     res.status(400).json({error:error.message});
//   }
// };
