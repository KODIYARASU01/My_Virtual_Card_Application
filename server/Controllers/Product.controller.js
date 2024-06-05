import ProductModel from "../Models/Products.model.js";

//Post basic detail data to database:

export const PostProductData = async (req, res) => {
  try {
    if (
      !req.body.ProductName ||
      !req.body.ProductDescription ||
      !req.body.ProductImage ||
      !req.body.ProductPrice
    ) {
      return res.status(401).json({ message: "All * fields Mandatory " });
    } else {
      let data = {
        user: req.user.userName,
        ProductName: req.body.ProductName,
        ProductDescription: req.body.ProductDescription,
        ProductImage: req.body.ProductImage,
        ProductURL: req.body.ProductURL,
        ProductPrice:req.body.ProductPrice
      };

      const result = await ProductModel.create(data);

      return res.status(201).json({ message: "Data saved!", data: result });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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

        data: datas,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//   // //Read or get Specific User all Data  :
  export const readSpecificUserData = async (req, res) => {
    try {
      let getSpecificData = await ProductModel.find({ user: req.user.id });

      if (!getSpecificData) {
        res.status(400).json({ message: "Specific Data Not Found" });
      } else {
        res
          .status(201)
          .json({ message: "Specific Data Fetched", data: getSpecificData });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  // //Read or get Specific User all Data  :
  export const getSpecificIdData = async (req, res) => {
    try {
      let {id}=req.params;
      let getSpecificData = await ProductModel.findById(id );

      if (!getSpecificData) {
        res.status(400).json({ message: "Specific Data Not Found" });
      } else {
        res
          .status(201)
          .json({ message: "Specific Data Fetched", data: getSpecificData });
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
        res.status(400).json({ message: "Specific Data Not Found" });
      } else {
        res
          .status(201)
          .json({ message: "Specific Data Updated", data: updateSpecificData });
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
        res.status(400).json({ message: "Specific Data Not Found" });
      } else {
        res
          .status(201)
          .json({ message: "Specific Data Deleted", data: deleteSpecificData });
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
        res.status(400).json({ message: "Specific Data Not Found" });
      } else {
        res
          .status(201)
          .json({ message: "Specific Data Deleted", data: deleteSpecificData });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
