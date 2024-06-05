import React, { useState,useContext } from "react";
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
  let { FormSubmitLoader, setFormSubmitLoader, userName } =
    useContext(SuperAdmin_context);
  let [productFormOpen, setProductFormOpen] = useState(false);
  let [ProductName, setProductName] = useState();
  let [ProductURL, setProductURL] = useState();
  let [ProductDescription, setProductDescription] = useState();
  let [ProductImage, setProductImage] = useState();
  let [ProductPrice, setProductPrice] = useState();

  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  const onUploadProductImage = async (e) => {
    let base64 = await convertToBase64ProductImage(e.target.files[0]);
    setProductImage(base64);
  };
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
      ProductImage: undefined,
      ProductPrice: 0,
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validate:BasicDetailValidate,

    onSubmit: async (values) => {
      values = await Object.assign(values, {
        ProductImage: ProductImage || "",
      });
      values.ProductDescription = stripHtmlTags(ProductDescription);
      setFormSubmitLoader(true);
      await axios
        .post("https://super-admin-pannel.onrender.com/productDetail", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
          setFormSubmitLoader(false);
        });
    },
  });
  return (
    <>
      <div className="product_container">
        <div className="add_new_product">
          <button onClick={() => setProductFormOpen(true)}>Add Product</button>
        </div>

        <div className="product_list_table table-responsive container w-100 rounded-3">
          <table className="table rounded-3" id="example">
            <thead className="table-secondary rounded-3">
              <tr>
                <th>ICON OR IMAGE</th>
                <th>Name</th>
                <th>DESCRIPTION</th>
                <th>PRICE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody className=" shadow-sm">
              <tr>
                <td className="h-100 align-middle">
                  <img
                    src="https://img.freepik.com/free-photo/standard-quality-control-collage-concept_23-2149595847.jpg?t=st=1715933611~exp=1715937211~hmac=d54576362232e002de841cc935f4244af4ca12908d312055576f773e438e7014&w=900"
                    alt="service_image"
                  />
                </td>
                <td className="h-100 align-middle">Web Development</td>
                <td className="h-100 align-middle">Fully Responsive</td>
                <td className="h-100 align-middle">3000</td>
                <td className="h-100 align-middle">
                  <i className="bx bxs-show" style={{ color: "skyBlue" }}></i>
                  <i className="bx bx-edit" style={{ color: "#6571FF" }}></i>
                  <i className="bx bx-trash-alt" style={{ color: "red" }}></i>
                </td>
              </tr>
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

                {/* <textarea
                  name="product_description"
                  id="product_description"
                  cols="48"
                  rows="4"
                  placeholder="Enter Short Description"
                ></textarea> */}
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
                <small>Allowed file types: png, jpg, jpeg.</small>
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
