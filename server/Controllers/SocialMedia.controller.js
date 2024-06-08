import SocialMediaModel from "../Models/SocialMedia.model.js";

//Post basic detail data to database:

export const PostSocialMediaData = async (req, res) => {
  try {
    if (!req.body.WhatsUp) {
      return res
        .status(401)
        .json({ message: "Mandatory:WhatsUp" });
    } else {
      let data = {
        user: req.user.userName,
        Website:req.body.Website,
        Facebook: req.body.Facebook,
        LinkedIn: req.body.LinkedIn,
        WhatsUp: req.body.WhatsUp,
        Instagram: req.body.Instagram,
        Twiter: req.body.Twiter,
        YouTube:req.body.YouTube,
        Github:req.body.Github
      };
console.log(req.user)
      const result = await SocialMediaModel.create(data);

      return res
        .status(201)
        .json({ message: "Data saved!", data:result });
    }
  } catch (error) {
    res.status(400).json({error:error.message});
  }
};

//Read or get all user basicDetail data  from database:

export const GetSocialMediaData = async (req, res) => {
  try {
    let datas = await SocialMediaModel.find({});
    if (!datas) {
      res.status(400).json({ message: "Data not found!" });
    } else {
      res
        .status(201)
        .json({
          message: "Data Fetched!",
          length: datas.length,
          data: datas,
        });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Read or get Specific User all Data  :
export const getSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await SocialMediaModel.find({ user: req.user.userName });

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
    let getSpecificData = await SocialMediaModel.findById(id );

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
    let updateSpecificData = await SocialMediaModel.findByIdAndUpdate(id, data);

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
    let deleteSpecificData = await SocialMediaModel.deleteMany({ user: req.user.userName });

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
    
    let deleteSpecificData = await SocialMediaModel.findByIdAndDelete(id);

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

