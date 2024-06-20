import Current_VCardTemplate from "../Models/VCardTemplate.model.js";

//Post basic detail data to database:

export const postTemplateData = async (req, res) => {
  try {
    if (req.body.currentTemplate === null) {
      return res.status(401).json({ message: "Select Your VCard Template!" });
    } 

    let checkVardActive=await Current_VCardTemplate.find({user:req.user.userName});

    if(checkVardActive.length > 0){
      return res.status(401).json({ message: "Already VCard selected!" });  
    }else{
      let data = {
        user: req.user.userName,
        currentTemplate: req.body.currentTemplate,
      };

      const result = await Current_VCardTemplate.create(data);

      return res.status(201).json({ message: "Card Selected!", data: result });
    }


  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Read or get all user basicDetail data  from database:

export const getTemplateData = async (req, res) => {
  try {
    let datas = await Current_VCardTemplate.find({});
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
export const getSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await Current_VCardTemplate.find({
      user: req.user.userName,
    });

    if (!getSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    }   
    else if(getSpecificData.length <=0){
      res.status(200).json({ message: "0 - Template selected! " });
    } else {
      res
        .status(201)
        .json({
          message: "Total Card fetched!",
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
    let getSpecificData = await Current_VCardTemplate.findById(id);

    if (!getSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res.status(201).json({ message: "Current Card!", data: getSpecificData });
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
    let updateSpecificData = await Current_VCardTemplate.findByIdAndUpdate(
      id,
      data
    );

    if (!updateSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Card Selection Updated!", data: updateSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteSpecificUserAllData = async (req, res) => {
  try {
    let deleteSpecificData = await Current_VCardTemplate.deleteMany({
      user: req.user.userName,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found" });
    } else {
      res
        .status(201)
        .json({
          message: "All Card Selection Removed!",
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

    let deleteSpecificData = await Current_VCardTemplate.findByIdAndDelete(id);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({
          message: "Current Card Selection Removed !",
          data: deleteSpecificData,
        });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
