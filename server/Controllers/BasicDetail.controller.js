import BasicDetails from "../Models/BasicDetail.model.js";


//DiskStorage:

//Get Async allback function..All user basicdata fetching :
export const getBasicAllData = async (req, res) => {
  try {
    let getDatas = await BasicDetails.find();
    return res
      .status(201)
      .json({ message: "Data Fetched sucessfully!",length:getDatas.length, data: getDatas });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
//Post Async allback function :

export const postBasicAllData = async (req, res) => {
    let data={
      user: req.user.userName,
      VCardName: req.body.VCardName,
      Occupation:  req.body.Occupation,
      Description: req.body.Description,
      Profile:  req.body.Profile,
      Banner: req.body.Banner,
      FirstName:  req.body.FirstName,
      LastName:  req.body.LastName,
      Email:  req.body.Email,
      MobileNumber:  req.body.MobileNumber,
      AlternateEmail:  req.body.AlternateEmail,
      AlternateMobileNumber:  req.body.AlternateMobileNumber,
      Location:  req.body.Location,
      JobTitle:  req.body.JobTitle,
      InquiryToggleSwitch:  req.body.InquiryToggleSwitch,
      QRToggleSwitch:  req.body.QRToggleSwitch,
      AppoinmentToggleSwitch:  req.body.AppoinmentToggleSwitch,
      ContactToggleSwitch:  req.body.ContactToggleSwitch,
    }
    let createDatas =new BasicDetails(data);
    try {
       await createDatas.save();
      return res
        .status(201)
        .json({ message: "Data saved!", data: createDatas });
    } catch (error) {
      return res.status(401).json({ message: 'All * fields Required' });
    }
  };

  //Read or get Specific User basic Data  :
export const readSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await BasicDetails.find({ user: req.user.userName});

    if (!getSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Data Fetched!", length:getSpecificData.length, data: getSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
  //Read or get Specific User basic Data  :
  export const readSpecificIdUserData = async (req, res) => {
    try {
      let {id}=req.params;
      let getSpecificIdData = await BasicDetails.findById(id);
  
      if (!getSpecificIdData) {
        res.status(400).json({ message: "Data Not Found!" });
      } else {
        res
          .status(201)
          .json({ message: "Data Fetched!", length:getSpecificIdData.length, data: getSpecificIdData });
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
    let updateSpecificData = await BasicDetails.findOneAndUpdate(id, data);

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
export const deleteSpecificUserAllData=async(req,res)=>{
  try {
    let deleteSpecificData = await BasicDetails.deleteMany({ user: req.user.userName});

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

export const deleteSpecificUserData=async(req,res)=>{
  try {
    let {id}=req.params;
    
    let deleteSpecificData = await BasicDetails.findByIdAndDelete(id);

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
