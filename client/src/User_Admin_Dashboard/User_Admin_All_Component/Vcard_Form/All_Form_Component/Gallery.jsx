import React, { useState, useContext, useEffect } from "react";
import "./form_styles/Gallery.scss";
import { useFormik } from "formik";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { convertToBase64GalleryImage } from "../../../../Helper/convert";
import SuperAdmin_context from "../../../../SuperAdmin_Context/SuperAdmin_context";
const Gallery = () => {
  let [AllGallery, setAllGallery] = useState();
  let [galleryFormOpen, setGalleryFormOpen] = useState(false);
  let {
    currentPlan,
    setCurrentPlan,
    FormSubmitLoader,
    setFormSubmitLoader,
    userName,
  } = useContext(SuperAdmin_context);
  let [GalleryURL, setGalleryURL] = useState();
  let [GalleryImage, setGalleryImage] = useState(null);
  let [fullImageToggle, setFullImageToggle] = useState(false);
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  const onUploadGalleryImage = async (e) => {
    let base64 = await convertToBase64GalleryImage(e.target.files[0]);
    setGalleryImage(base64);
  };
  const [key, setKey] = useState(0);
  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  async function fetchAllGallery() {
    setFormSubmitLoader(true);
    try {
      await axios
        .get(
          `http://localhost:3001/galleryDetail/specificAll/${localStorageDatas.userName}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageDatas.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.data.length == 0) {
            toast.error("No Gallery added!");
            setFormSubmitLoader(false);
          } else {
            setAllGallery(res.data.data);

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
    fetchAllGallery();
  }, [key]);

  let formik = useFormik({
    initialValues: {
      GalleryURL: "",
      GalleryImage: null,
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validate:BasicDetailValidate,

    onSubmit: async (values) => {
      // values = await Object.assign(values, {
      //   GalleryImage: GalleryImage || "",
      // });
      const formData = new FormData();
      formData.append("GalleryImage", GalleryImage);
      formData.append("GalleryURL", values.GalleryURL);
      setFormSubmitLoader(true);
      await axios
        .post("http://localhost:3001/galleryDetail", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
          reloadComponent();
          setGalleryFormOpen(false);
          setGalleryImage(null);
          values.GalleryURL = "";
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
          setFormSubmitLoader(false);
        });
    },
  });

  async function handleFullImageShow(id) {
    setFormSubmitLoader(true);
    try {
      axios
        .get(`http://localhost:3001/galleryDetail/specific/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          setFormSubmitLoader(false);
          setFullImageToggle(true);
          setGalleryImage(res.data.data.GalleryImage);
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
      <div className="gallery_container">
        {fullImageToggle ?     <div className="Image_Full_view">
          <div
            className="close_image"
            onClick={() => setFullImageToggle(false)}
          >
            <i className="bx bxs-message-square-x"></i>
          </div>
          <img
            src={GalleryImage}
            alt="image"
          />
        </div>: ''}
    
        <div className="plan_title">
          <p>
            <strong>{currentPlan} plan </strong>&nbsp; Subscribed!
          </p>
        </div>
        <div className="add_new_gallery">
          <button onClick={() => setGalleryFormOpen(true)}>Add Gallery</button>
        </div>
{!fullImageToggle ?     <div className="gallery_list_table table-responsive container w-100 rounded-3">
          <table className="table rounded-3" id="example">
            <thead className="table-secondary rounded-3">
              <tr>
                <th className="fw-bold">COUNT</th>
                <th className="fw-bold">IMAGE</th>
                <th className="fw-bold">URL</th>
                <th className="fw-bold">View Image</th>
              </tr>
            </thead>
            <tbody className=" shadow-sm">
              {AllGallery != undefined ? (
                <>
                  {AllGallery.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td className="h-100 align-middle fw-semibold">
                          {index + 1}
                        </td>
                        <td className="h-100 align-middle fw-semibold">
                          <img
                            src={data.GalleryImage}
                            alt="GalleryImage"
                            name="GalleryImage"
                          />
                        </td>
                        <td className="h-100 align-middle fw-semibold">
                          {data.GalleryURL != "" ? data.GalleryURL : "N/A"}
                        </td>
                        <td className="h-100 align-middle fw-semibold">
                          <i
                            className="bx bxs-show"
                            onClick={() => handleFullImageShow(data._id)}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Gallery Added!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>: ''}
    

        {/* //Create New Service Form */}

        <div
          className="create_new_gallerycontainer"
          id={galleryFormOpen ? "shadow_background" : ""}
        >
          <div
            className="create_new_gellery_box"
            id={galleryFormOpen ? "galleryOpen" : "galleryClose"}
          >
            <div className="title">
              <p>New Gallery</p>
              <i
                className="bx bx-x"
                onClick={() => setGalleryFormOpen(false)}
              ></i>
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="form_group">
                <label htmlFor="GalleryImage">
                  Choose Your Image<sup>*</sup>
                </label>
                <label htmlFor="GalleryImage">
                  <img
                    src={
                      GalleryImage != undefined
                        ? GalleryImage
                        : "https://img.freepik.com/free-vector/realistic-fog-background_23-2149115275.jpg?t=st=1715977908~exp=1715981508~hmac=1d533445708d92e0d4c40a4db9ebd8a90505fbfa07dcb1b58b5915f9fde4f028&w=900"
                    }
                    alt="GalleryImage"
                  />
                  <i className="bx bxs-edit-location"></i>
                </label>
                <p>
                  <strong>Note :</strong> Max image size limit 2MB
                </p>
                <small>Allowed file types: png, jpg, jpeg.</small>

                <input
                  type="file"
                  id="GalleryImage"
                  name="GalleryImage"
                  onChange={onUploadGalleryImage}
                />
              </div>
              <div className="form_group">
                <label htmlFor="GalleryURL">Image URL</label>
                <input
                  type="text"
                  placeholder="Paste Image URL"
                  {...formik.getFieldProps("GalleryURL")}
                />
              </div>

              <div className="form_submit_actions">
                <div className="save">
                  <button type="submit" disabled={FormSubmitLoader}>
                    Save
                  </button>
                </div>
                <div className="discard">
                  <button
                    type="button"
                    onClick={() => setGalleryFormOpen(false)}
                  >
                    Discard
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
