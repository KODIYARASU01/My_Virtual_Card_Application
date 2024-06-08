import GalleryModel from "../Models/Gallery.model.js";

//Post basic detail data to database:

export const PostGalleryData = async (req, res) => {
  try {
    if (
        !req.body.GalleryImage
    ) {
      return res
        .status(401)
        .json({ message: "All * fields are Mandatory" });
    } else {
      let data = {
        user: req.user.userName,
        GalleryImage: req.body.GalleryImage,
        GalleryURL: req.body.GalleryURL,
      };

      const result = await GalleryModel.create(data);

      return res
        .status(201)
        .json({ message: "Data saved!", data:result });
    }
  } catch (error) {
    res.status(400).json({error:error.message});
  }
};

//Read or get all user basicDetail data  from database:

export const GetGalleryData = async (req, res) => {
  try {
    let datas = await GalleryModel.find({});
    if (!datas) {
      res.status(400).json({ message: "Data not found" });
    } else {
      res
        .status(201)
        .json({
          message: "Data Fetched!",
          data: datas,
        });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// //Read or get Specific User all Data  :
export const readSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await GalleryModel.find({ user: req.user.userName });

    if (!getSpecificData) {
      res.status(400).json({ message: " Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: " Data Fetched!", length:getSpecificData.length, data: getSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// //Read or get Specific User all Data  :
export const getSpecificIdData = async (req, res) => {
  try {
    let {id}=req.params;
    let getSpecificData = await GalleryModel.findById(id );

    if (!getSpecificData) {
      res.status(400).json({ message: "Data Not Found" });
    } else {
      res
        .status(201)
        .json({ message: " Data Fetched", data: getSpecificData });
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
    let updateSpecificData = await GalleryModel.findByIdAndUpdate(id, data);

    if (!updateSpecificData) {
      res.status(400).json({ message: " Data Not Found!" });
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
    let deleteSpecificData = await GalleryModel.deleteMany({
      user: req.user.userName,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "All Data Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Spcific user  Document in Basic Detail:

export const deleteSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await GalleryModel.findByIdAndDelete(id);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: " Data Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
