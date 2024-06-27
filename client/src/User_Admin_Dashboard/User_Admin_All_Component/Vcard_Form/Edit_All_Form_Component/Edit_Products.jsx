import React, { useState, useContext, useEffect } from "react";
import "./Edit_form_styles/Edit_Products.scss";
import { useFormik } from "formik";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { convertToBase64ProductImage } from "../../../../Helper/convert";
import SuperAdmin_context from "../../../../SuperAdmin_Context/SuperAdmin_context";
const Products = () => {
  let { URL_Alies } = useParams();
  let {
    currentPlan,
    setCurrentPlan,
    FormSubmitLoader,
    setFormSubmitLoader,
    userName,
  } = useContext(SuperAdmin_context);
  let [AllProduct, setAllProduct] = useState();
  let [ProductCount, setProductCount] = useState(0);
  let [ProductViewToggle, setProductViewToggle] = useState(false);
  let [productFormOpen, setProductFormOpen] = useState(false);
  let [updateFormOpen, setUpdateFormOpen] = useState(false);
  let [ProductName, setProductName] = useState();
  let [ProductURL, setProductURL] = useState();
  let [ProductDescription, setProductDescription] = useState();
  let [ProductImage, setProductImage] = useState(null);
  let [ProductId, setProductId] = useState();
  let [ProductPrice, setProductPrice] = useState();
  const [key, setKey] = useState(0);

  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
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
  async function fetchCurrentProduct() {
    setFormSubmitLoader(true);
    try {
      await axios
        .get(`http://localhost:3001/productDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            toast.error("No Product added!");
            setFormSubmitLoader(false);
          } else {
            setAllProduct(res.data.data);
            setProductCount(res.data.data.length);
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
  let formik = useFormik({
    initialValues: {
      ProductName: "",
      URL_Alies: URL_Alies,
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
      formData.append("URL_Alies", URL_Alies),
        formData.append("ProductImage", ProductImage);
      formData.append("ProductName", values.ProductName);
      formData.append("ProductURL", values.ProductURL);
      formData.append(
        "ProductDescription",
        (values.ProductDescription = stripHtmlTags(ProductDescription))
      );
      formData.append("ProductPrice", values.ProductPrice);
      // values = await Object.assign(values, {
      //   ProductImage: ProductImage || "",
      // });

      setFormSubmitLoader(true);
      await axios
        .post(`http://localhost:3001/productDetail/${URL_Alies}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          reloadComponent();
          setProductCount(++ProductCount);
          toast.success(res.data.message);
          setFormSubmitLoader(false);
          setProductFormOpen(false);

          setTimeout(() => {
            values.ProductName = "";
            values.ProductPrice = "";
            values.ProductURL = "";
            values.ProductDescription = "";
            values.ProductImage = undefined;
            setProductImage(undefined);
          }, []);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    },
  });
  async function handleProductView(id) {
    setProductViewToggle(true);
    try {
      await axios
        .get(`http://localhost:3001/productDetail/specificID/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          setProductViewToggle(true);
          setProductName(res.data.data.ProductName);
          setProductImage(res.data.data.ProductImage);
          setProductPrice(res.data.data.ProductPrice);
          setProductURL(res.data.data.ProductURL);
          setProductDescription(
            (res.data.data.ProductDescription = stripHtmlTags(
              res.data.data.ProductDescription
            ))
          );
          setFormSubmitLoader(false);
        })

        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function handleProductEdit(id) {
    setFormSubmitLoader(true);
    try {
      await axios
        .get(`http://localhost:3001/productDetail/specificID/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          setUpdateFormOpen(true);
          setProductPrice(res.data.data.ProductPrice);
          setProductName(res.data.data.ProductName);
          setProductURL(res.data.data.ProductURL);
          setProductDescription(res.data.data.ProductDescription);
          setProductImage(res.data.data.ProductImage);
          setProductId(res.data.data._id);
          setFormSubmitLoader(false);
        })

        .catch((error) => {
          console.log(error);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleProductUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);

    // const formData = new FormData();
    // formData.append("ServiceImage", ServiceImage);
    // formData.append('ServiceName',ServiceName);
    // formData.append('ServiceURL',ServiceURL);
    // formData.append('ServiceDescription', ServiceDescription = stripHtmlTags(ServiceDescription));
    ProductDescription = stripHtmlTags(ProductDescription);
    let data = {
      URL_Alies,
      ProductName,
      ProductImage,
      ProductURL,
      ProductPrice,
      ProductDescription,
    };
    try {
      axios
        .put(
          `http://localhost:3001/productDetail/updateID/${ProductId}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageDatas.token}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
          reloadComponent();
          setTimeout(() => {
            setProductImage(undefined);
            setUpdateFormOpen(false);
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function handleProductDelete(id) {
    // e.preventDefault();
    setFormSubmitLoader(true);
    try {
      axios
        .delete(`http://localhost:3001/productDetail/deleteID/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          setProductCount(--ProductCount);
          toast.success(res.data.message);
          reloadComponent();
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <>
      <div className="product_container">
        <div className="product_plan_title">
          <p>
            <strong>{currentPlan} plan </strong>&nbsp; Subscribed!
          </p>
        </div>
        <div className="add_new_product">
          <button onClick={() => setProductFormOpen(true)}>
            <i className="bx bx-plus"></i>Add Product
          </button>
        </div>
        <div className="plan_based_service_add_note">
          <div className="note">
            {currentPlan === "Demo" ? (
                <>
                <i class="bx bx-upload "></i>
                <small>
                Demo Plan Product access denied!
                </small>
              </>
     
            ) : (
              ""
            )}

            {currentPlan === "Basic" ? (
           <>
           <i class="bx bx-upload "></i>
           <small>
             Max Product addOn limit :<strong> {ProductCount} / 4 </strong>
           </small>
         </>
            ) : (
              ""
            )}

            {currentPlan === "Standard" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max Product addOn limit :<strong> {ProductCount} / 6 </strong>
                </small>
              </>
            ) : (
              ""
            )}

            {currentPlan === "Enterprises" ? (
                 <>
                 <i class="bx bx-upload "></i>
                 <small>
                   Max Product addOn limit :<strong> {ProductCount} / 10 </strong>
                 </small>
               </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="product_list_table table-responsive container w-100 rounded-3">
          <table className="table rounded-3" id="example">
            <thead className="table-secondary rounded-3">
              <tr>
                <th className="fw-bold">ICON OR IMAGE</th>
                <th className="fw-bold">Name</th>
                <th className="fw-bold">DESCRIPTION</th>
                <th className="fw-bold"> PRICE</th>
                <th className="fw-bold">ACTIONS</th>
              </tr>
            </thead>
            <tbody className=" shadow-sm">
              {AllProduct != undefined ? (
                <>
                  {AllProduct.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td className="h-100 align-middle">
                          <img
                            src={
                              data.ProductImage != "null"
                                ? data.ProductImage
                                : `https://img.freepik.com/free-vector/business-people-working-modern-eco-friendly-office-with-plants-flowers-biophilic-design-room-eco-friendly-workspace-green-office-concept-bright-vibrant-violet-isolated-illustration_335657-578.jpg?t=st=1719430048~exp=1719433648~hmac=20cfde827bdafe402c3db0c259f557d189ac027e0c9f731c0740eaa55c811581&w=900`
                            }
                            alt="service_image"
                          />
                        </td>
                        <td className="h-100 align-middle">
                          {data.ProductName}
                        </td>
                        <td className="h-100 align-middle">
                          {data.ProductDescription}
                        </td>
                        <td className="h-100 align-middle">
                          Rs:&nbsp;{data.ProductPrice}
                        </td>
                        <td className="h-100 align-middle">
                          <i
                            className="bx bxs-show"
                            style={{ color: "skyBlue" }}
                            onClick={() => handleProductView(data._id)}
                          ></i>
                          <i
                            className="bx bx-edit"
                            style={{ color: "#6571FF" }}
                            onClick={() => handleProductEdit(data._id)}
                          ></i>
                          <i
                            className="bx bx-trash-alt"
                            style={{ color: "red" }}
                            onClick={() => handleProductDelete(data._id)}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Products Added!
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
                <label htmlFor="ProductPrice">
                  Price<sup>*</sup>
                </label>
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
                <label htmlFor="ProductImage">
                  Product Image<sup>*</sup>
                </label>
                <label htmlFor="ProductImage">
                  <img
                    src={
                      ProductImage != 'null'
                        ? ProductImage
                        : "https://img.freepik.com/free-vector/autumn-background_23-2149054409.jpg?t=st=1715971926~exp=1715975526~hmac=064e47d99740a4e25fb7345c45d5bc744da1c1ad7f5f1e14668eaae2cc601381&w=900"
                    }
                    alt="ProductImage"
                  />
                  <i className="bx bxs-edit-location"></i>
                </label>
                <p>
                  <strong>Note :</strong> Max file size limit 2MB
                </p>
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
                  <button type="button" onClick={formik.handleReset}>
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* //uPDATE  Product Form */}

        <div
          className="update_new_product_container"
          id={updateFormOpen ? "shadow_background" : ""}
        >
          <div
            className="create_new_product_box"
            id={updateFormOpen ? "productOpen" : "productClose"}
          >
            <div className="title">
              <p>Update Product</p>
              <i
                className="bx bx-x"
                onClick={() => setUpdateFormOpen(false)}
              ></i>
            </div>
            <form action="" onSubmit={handleProductUpdate}>
              <div className="form_group">
                <label htmlFor="ProductName">
                  Product Name <sup>*</sup>
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Title"
                  value={ProductName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="form_group">
                <label htmlFor="ProductURL">Product URL</label>
                <input
                  type="text"
                  placeholder="Paste Product URL"
                  value={ProductURL}
                  onChange={(e) => setProductURL(e.target.value)}
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
                <label htmlFor="ProductPrice">
                  Price<sup>*</sup>
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Price"
                  value={ProductPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
              <div className="form_group productDescription">
                <label htmlFor="ProductDescription">
                  Description <sup>*</sup>
                </label>

                <Editor
                  {...formik.getFieldProps(
                    "ProductDescription",
                    ProductDescription
                  )}
                  value={formik.values.ProductDescription}
                  onTextChange={(e) => setProductDescription(e.htmlValue)}
                  id="ProductDescription"
                  name="ProductDescription"
                  placeholder="Enter Short Description"
                  style={{ height: "130px" }}
                />
              </div>

              <div className="form_group productImage">
                <label htmlFor="ProductImage">
                  Product Image<sup>*</sup>
                </label>
                <label htmlFor="ProductImage">
                  <img
                    src={
                      ProductImage != 'null'
                        ? ProductImage
                        : "https://img.freepik.com/free-vector/autumn-background_23-2149054409.jpg?t=st=1715971926~exp=1715975526~hmac=064e47d99740a4e25fb7345c45d5bc744da1c1ad7f5f1e14668eaae2cc601381&w=900"
                    }
                    alt="ProductImage"
                  />
                  <i className="bx bxs-edit-location"></i>
                </label>
                <p>
                  <strong>Note :</strong> Max file size limit 2MB
                </p>
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
                  <button type="submit">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* //Product  Detail Box */}

        <div
          className="view_new_service_container"
          id={ProductViewToggle ? "shadow_background" : ""}
        >
          <div
            className="view_new_service_box"
            id={ProductViewToggle ? "serviceUpdateOpen" : "serviceUpdateClose"}
          >
            <div className="title">
              <p>Product Detail</p>
              <i
                className="bx bx-x"
                onClick={() => setProductViewToggle(false)}
              ></i>
            </div>
            <div className="details_container">
              <div className="service_name">
                <div className="service_title">Product Name</div>
                <div className="name">
                  <p>{ProductName != undefined ? ProductName : "N/A"}</p>
                </div>
              </div>
              <div className="service_desc">
                <div className="service_title">Product Description</div>
                <div className="name">
                  <p>
                    {ProductDescription != undefined
                      ? stripHtmlTags(ProductDescription)
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="service_desc">
                <div className="service_title">Product Price</div>
                <div className="name">
                  <p>
                    {ProductPrice != undefined ? `₹ ${ProductPrice}` : "₹ 0"}
                  </p>
                </div>
              </div>
              <div className="service_url">
                <div className="service_title">Product URL</div>
                <div className="name">
                  <a href={ProductURL} target="_blank">
                    {ProductURL != undefined ? ProductURL : "N/A"}
                  </a>
                </div>
              </div>
              <div className="service_image">
                <div className="service_title">Product Image</div>
                <div className="service_image">
                  <img
                    src={
                      ProductImage != 'null'
                        ? ProductImage
                        : "https://img.freepik.com/free-vector/business-people-working-modern-eco-friendly-office-with-plants-flowers-biophilic-design-room-eco-friendly-workspace-green-office-concept-bright-vibrant-violet-isolated-illustration_335657-578.jpg?t=st=1719430048~exp=1719433648~hmac=20cfde827bdafe402c3db0c259f557d189ac027e0c9f731c0740eaa55c811581&w=900"
                    }
                    alt="service"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
