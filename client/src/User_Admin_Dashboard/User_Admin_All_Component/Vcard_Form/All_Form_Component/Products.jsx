import React, { useState,useContext,useEffect } from "react";
import "./form_styles/Products.scss";
import { useFormik } from "formik";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { convertToBase64ProductImage } from "../../../../Helper/convert";
import SuperAdmin_context from "../../../../SuperAdmin_Context/SuperAdmin_context";
const Products = () => {
  let { currentPlan, setCurrentPlan,FormSubmitLoader, setFormSubmitLoader, userName } =
    useContext(SuperAdmin_context);
    let [AllProduct,setAllProduct]=useState();
  let [productFormOpen, setProductFormOpen] = useState(false);
  let [ProductName, setProductName] = useState();
  let [ProductURL, setProductURL] = useState();
  let [ProductDescription, setProductDescription] = useState();
  let [ProductImage, setProductImage] = useState(null);
  let [ProductPrice, setProductPrice] = useState();

  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  const onUploadProductImage = async (e) => {
    let base64 = await convertToBase64ProductImage(e.target.files[0]);
    setProductImage(base64);
  };
  const [key, setKey] = useState(0);
  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  async function fetchCurrentProduct() {
    setFormSubmitLoader(true);
    try {
      await axios
        .get(
          `http://localhost:3001/productDetail/specificAll/${localStorageDatas.userName}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageDatas.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.data.length == 0) {
            toast.error("No Product added!");
            setFormSubmitLoader(false);
          } else {
            setAllProduct(res.data.data);
           
            setFormSubmitLoader(false);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    fetchCurrentProduct();
  }, [key]);

  // const [filename, setFilename] = useState("Choose File");
  // const onUploadProductImage = (e) => {
  //   setProductImage(e.target.files[0]);
  //   setFilename(e.target.files[0].name);
  // };
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  let formik = useFormik({
    initialValues: {
      ProductName: "",
      ProductURL: "",
      ProductDescription: "",
      ProductImage: null,
      ProductPrice: 0,
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validate:BasicDetailValidate,

    onSubmit: async (values) => {


      const formData = new FormData();
   formData.append("ProductImage", ProductImage);
   formData.append('ProductName',values.ProductName);
   formData.append('ProductURL',values.ProductURL);
   formData.append('ProductDescription', values.ProductDescription = stripHtmlTags(ProductDescription));
   formData.append('ProductPrice',values.ProductPrice);
      // values = await Object.assign(values, {
      //   ProductImage: ProductImage || "",
      // });

     
      setFormSubmitLoader(true);
      await axios
        .post("http://localhost:3001/productDetail", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
          reloadComponent();
          setProductFormOpen(false)
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    },
  });
  return (
    <>
      <div className="product_container">
      <div className="product_plan_title">
        <p><strong>{currentPlan} plan </strong>&nbsp; Subscribed!</p>
        </div>
        <div className="add_new_product">
          <button onClick={() => setProductFormOpen(true)}>Add Product</button>
        </div>

        <div className="product_list_table table-responsive container w-100 rounded-3">
          <table className="table rounded-3" id="example">
            <thead className="table-secondary rounded-3">
              <tr>
                <th className="fw-bold">ICON OR IMAGE</th>
                <th className="fw-bold">Name</th>
                <th className="fw-bold">DESCRIPTION</th>
                <th className="fw-bold">PRICE</th>
                <th className="fw-bold">URL</th>
              </tr>
            </thead>
            <tbody className=" shadow-sm">
            {AllProduct != undefined ? (
                <>
                  {AllProduct.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td className="h-100 align-middle fw-semibold">
                          <img
                            src={data.ProductImage}
                            alt="ServiceImage"
                            name="ServiceImage"
                          />
                        </td>
                        <td className="h-100 align-middle fw-semibold">
                          {data.ProductName}
                        </td>
                        <td className="h-100 align-middle fw-semibold">
                          {data.ProductDescription.slice(0, 20)}
                        </td>
                        <td className="h-100 align-middle fw-semibold">
                        ₹ &nbsp;{data.ProductPrice}
                        </td>
                        <td className="h-100 align-middle fw-semibold">
                          <a href={data.ProductURL} target="_blank">
                            {data.ProductURL != undefined
                              ? data.ProductURL
                              : ""}
                          </a>
                        </td>
                 
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr>
                <td colSpan='6' className="text-center">
                No Product Added!
                </td>
            </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* //Create New Product Form */}

        <div
          className="create_new_product_container"
          id={productFormOpen ? "shadow_background" : ""}
        >
          <div
            className="create_new_product_box"
            id={productFormOpen ? "productOpen" : "productClose"}
          >
            <div className="title">
              <p>New Product</p>
              <i
                className="bx bx-x"
                onClick={() => setProductFormOpen(false)}
              ></i>
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="form_group">
                <label htmlFor="ProductName">
                  Product Name <sup>*</sup>
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Title"
                  {...formik.getFieldProps("ProductName")}
                />
              </div>
              <div className="form_group">
                <label htmlFor="ProductURL">Product URL</label>
                <input
                  type="text"
                  placeholder="Paste Product URL"
                  {...formik.getFieldProps("ProductURL")}
                />
              </div>
              <div className="form_group">
                <label htmlFor="product_currency">
                  Currency<sup>(Default)</sup>
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Currency"
                  value="₹"
                  readOnly
                />
              </div>
              <div className="form_group">
                <label htmlFor="ProductPrice">Price<sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Enter Product Price"
                  {...formik.getFieldProps("ProductPrice")}
                />
              </div>
              <div className="form_group productDescription">
                <label htmlFor="ProductDescription">
                  Description <sup>*</sup>
                </label>

      
                <Editor
                  {...formik.getFieldProps("ProductDescription")}
                  value={formik.values.ProductDescription}
                  onTextChange={(e) => setProductDescription(e.htmlValue)}
                  id="ProductDescription"
                  name="ProductDescription"
                  placeholder="Enter Short Description"
                  style={{ height: "130px" }}
               
                />
              </div>

              <div className="form_group productImage">
                <label htmlFor="ProductImage">Product Image<sup>*</sup></label>
                <label htmlFor="ProductImage">
                  <img
                    src={
                      ProductImage != undefined
                        ? ProductImage
                        : "https://img.freepik.com/free-vector/autumn-background_23-2149054409.jpg?t=st=1715971926~exp=1715975526~hmac=064e47d99740a4e25fb7345c45d5bc744da1c1ad7f5f1e14668eaae2cc601381&w=900"
                    }
                    alt="ProductImage"
                  />
                  <i className="bx bxs-edit-location"></i>
                </label>
                <small>Allowed file types: png, jpg, jpeg,.gif.</small>
                <input
                  type="file"
                  id="ProductImage"
                  name="ProductImage"
                  onChange={onUploadProductImage}
                />
              </div>
              <div className="form_submit_actions">
                <div className="save">
                  <button type="submit">Save</button>
                </div>
                <div className="discard">
                  <button type="button" onClick={formik.handleReset}>Clear</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
