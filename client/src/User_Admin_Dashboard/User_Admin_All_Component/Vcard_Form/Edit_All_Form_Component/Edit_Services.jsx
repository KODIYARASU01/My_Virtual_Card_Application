import React, { useState, useContext, useEffect } from "react";
import "./Edit_form_styles/Edit_Services.scss";
import { useFormik } from "formik";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { convertToBase64ServiceImage } from "../../../../Helper/convert";
import SuperAdmin_context from "../../../../SuperAdmin_Context/SuperAdmin_context";
import currentPlan from "../../../../../../server/Models/Plan.model";
const Services = () => {
  let {
    currentPlan,
    setCurrentPlan,
    FormSubmitLoader,
    setFormSubmitLoader,
    userName,
  } = useContext(SuperAdmin_context);
  let [AllService, setAllService] = useState();
  let [serviceFormOpen, setServiceFormOpen] = useState(false);
  let [updateFormOpen, setUpdateFormOpen] = useState(false);
  let [viewServiceDetail, setViewServiceDetail] = useState(false);
  let [ServiceName, setServiceName] = useState();
  let [ServiceURL, setServiceURL] = useState();
  let [ServiceDescription, setServiceDescription] = useState();
  let [ServiceImage, setServiceImage] = useState();
  let [ServiceId, setServiceId] = useState();
  const [filename, setFilename] = useState("Choose File");
  const [key, setKey] = useState(0);

  var reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));

  async function fetchAllService() {
    setFormSubmitLoader(true);
    try {
      await axios
        .get(
          `https://my-virtual-card-application.onrender.com/serviceDetail/specificAll/${localStorageDatas.userName}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageDatas.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.data.length == 0) {
            toast.error("No service added!");
            setFormSubmitLoader(false);
          } else {
            setAllService(res.data.data);
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
    fetchAllService();
  }, [key]);
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  const onUploadServiceImage = async (e) => {
    // setServiceImage(e.target.files[0]);
    // setFilename(e.target.files[0].name);
    let base64 = await convertToBase64ServiceImage(e.target.files[0]);
    setServiceImage(base64);
  };
  let formik = useFormik({
    initialValues: {
      ServiceName: "",
      ServiceURL: "",
      ServiceDescription: "",
      ServiceImage: null,
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validate:BasicDetailValidate,

    onSubmit: async (values) => {
      setFormSubmitLoader(true);
      // values = await Object.assign(values, { ServiceImage: ServiceImage || "" });
      const formData = new FormData();
      formData.append("ServiceImage", ServiceImage);
      formData.append("ServiceName", values.ServiceName);
      formData.append("ServiceURL", values.ServiceURL);
      formData.append(
        "ServiceDescription",
        (values.ServiceDescription = stripHtmlTags(ServiceDescription))
      );

      await axios
        .post("https://my-virtual-card-application.onrender.com/serviceDetail", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          setFormSubmitLoader(false);
          toast.success(res.data.message);
          reloadComponent();
          setTimeout(() => {
            setServiceFormOpen(false);
          }, 500);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    },
  });
  async function handleServiceView(id) {
    setViewServiceDetail(true);
    try {
      await axios
        .get(`https://my-virtual-card-application.onrender.com/serviceDetail/specific/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          setViewServiceDetail(true);
          setServiceName(res.data.data.ServiceName);
          setServiceURL(res.data.data.ServiceURL);
          setServiceDescription(
            (res.data.data.ServiceDescription = stripHtmlTags(
              res.data.data.ServiceDescription
            ))
          );
          setServiceImage(res.data.data.ServiceImage);
          setServiceId(res.data.data._id);
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
  async function handleServiceEdit(id) {
    setFormSubmitLoader(true);
    try {
      await axios
        .get(`https://my-virtual-card-application.onrender.com/serviceDetail/specific/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          setUpdateFormOpen(true);
          setServiceName(res.data.data.ServiceName);
          setServiceURL(res.data.data.ServiceURL);
          setServiceDescription(res.data.data.ServiceDescription);
          setServiceImage(res.data.data.ServiceImage);
          setServiceId(res.data.data._id);
          setFormSubmitLoader(false);
        })

        .catch((error) => {
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleServiceUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);

    // const formData = new FormData();
    // formData.append("ServiceImage", ServiceImage);
    // formData.append('ServiceName',ServiceName);
    // formData.append('ServiceURL',ServiceURL);
    // formData.append('ServiceDescription', ServiceDescription = stripHtmlTags(ServiceDescription));
    ServiceDescription = stripHtmlTags(ServiceDescription);
    let data = {
      ServiceName,
      ServiceImage,
      ServiceURL,
      ServiceDescription,
    };
    console.log(ServiceId);
    try {
      axios
        .put(`https://my-virtual-card-application.onrender.com/serviceDetail/update/${ServiceId}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);

          setFormSubmitLoader(false);
          reloadComponent();
          setTimeout(() => {
            setUpdateFormOpen(false);
          }, 1000);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function handleServiceDelete(id) {
    // e.preventDefault();
    setFormSubmitLoader(true);
    try {
      axios
        .delete(`https://my-virtual-card-application.onrender.com/serviceDetail/delete/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
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
      <div className="service_container">
        <div className="service_plan_title">
          <p>
            <strong>{currentPlan} plan </strong>&nbsp; Subscribed!
          </p>
        </div>

        <div className="add_new_service">
          <button onClick={() => setServiceFormOpen(true)}>Add Service</button>
        </div>

        <div className="service_list_table table-responsive container w-100 rounded-3">
          <table className="table rounded-3" id="example">
            <thead className="table-secondary rounded-3">
              <tr>
                <th className="fw-bold">ICON OR IMAGE</th>
                <th className="fw-bold">TITLE</th>
                <th className="fw-bold">DESCRIPTION</th>
                <th className="fw-bold">URL</th>
                <th className="fw-bold">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="shadow-sm">
              {AllService != undefined ? (
                <>
                  {AllService.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td className="h-100 align-middle">
                          <img
                            src={data.ServiceImage}
                            alt="ServiceImage"
                            name="ServiceImage"
                          />
                        </td>
                        <td className="h-100 align-middle">
                          {data.ServiceName}
                        </td>
                        <td className="h-100 align-middle">
                          {data.ServiceDescription.slice(0, 20)}
                        </td>
                        <td className="h-100 align-middle">
                          <a href={data.ServiceURL} target="_blank">
                            {data.ServiceURL != undefined
                              ? data.ServiceURL
                              : ""}
                          </a>
                        </td>
                        <td className="h-100 align-middle">
                          <i
                            className="bx bxs-show"
                            style={{ color: "skyBlue" }}
                            onClick={() => handleServiceView(data._id)}
                          ></i>
                          <i
                            className="bx bx-edit"
                            onClick={() => handleServiceEdit(data._id)}
                            style={{ color: "#6571FF" }}
                          ></i>
                          <i
                            className="bx bx-trash-alt"
                            style={{ color: "red" }}
                            onClick={() => handleServiceDelete(data._id)}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr>
                <td colSpan='6' className="text-center">
                No Service Added!
                </td>
            </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* //Create New Service Form */}

        <div
          className="create_new_service_container"
          id={serviceFormOpen ? "shadow_background" : ""}
        >
          <div
            className="create_new_service_box"
            id={serviceFormOpen ? "serviceOpen" : "serviceClose"}
          >
            <div className="title">
              <p>New Service</p>
              <i
                className="bx bx-x"
                onClick={() => setServiceFormOpen(false)}
              ></i>
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="form_group">
                <label htmlFor="ServiceName">
                  Service Name <sup>*</sup>
                </label>
                <input
                  type="text"
                  placeholder="Enter Service Title"
                  {...formik.getFieldProps("ServiceName")}
                />
              </div>
              <div className="form_group">
                <label htmlFor="ServiceURL">Service URL</label>
                <input
                  type="text"
                  placeholder="Paste Service URL"
                  {...formik.getFieldProps("ServiceURL")}
                />
              </div>
              <div className="form_group editor">
                <label htmlFor="ServiceDescription">
                  Description <sup>*</sup>
                </label>
                <Editor
                  {...formik.getFieldProps("ServiceDescription")}
                  value={formik.values.ServiceDescription}
                  onTextChange={(e) => setServiceDescription(e.htmlValue)}
                  id="ServiceDescription"
                  name="ServiceDescription"
                  style={{ height: "130px" }}
                  placeholder="Enter Short Description"
                />
                {/* <textarea name="service_description" id="service_description" cols="48" rows="4" placeholder="Enter Short Description"></textarea> */}
              </div>
              <div className="form_group serviceImage">
                <label htmlFor="ServiceImage">Service Icon</label>
                <label htmlFor="ServiceImage">
                  <img
                    src={
                      ServiceImage != undefined
                        ? ServiceImage
                        : "https://img.freepik.com/free-vector/autumn-background_23-2149054409.jpg?t=st=1715971926~exp=1715975526~hmac=064e47d99740a4e25fb7345c45d5bc744da1c1ad7f5f1e14668eaae2cc601381&w=900"
                    }
                    alt="ServiceImage"
                  />
                  <i className="bx bxs-edit-location"></i>
                </label>
                <input
                  type="file"
                  id="ServiceImage"
                  name="ServiceImage"
                  onChange={onUploadServiceImage}
                />
                <p>
                  <strong>Note :</strong> Max file size limit 2MB
                </p>
                <small>Allowed file types: png, jpg, jpeg,.gif.</small>
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

        {/* //Update  Service Form */}

        <div
          className="update_new_service_container"
          id={updateFormOpen ? "shadow_background" : ""}
        >
          <div
            className="create_new_service_box"
            id={updateFormOpen ? "serviceUpdateOpen" : "serviceUpdateClose"}
          >
            <div className="title">
              <p>Update Service</p>
              <i
                className="bx bx-x"
                onClick={() => setUpdateFormOpen(false)}
              ></i>
            </div>
            <form action="" onSubmit={handleServiceUpdate}>
              <div className="form_group">
                <label htmlFor="ServiceName">
                  Service Name <sup>*</sup>
                </label>
                <input
                  type="text"
                  placeholder="Enter Service Title"
                  onChange={(e) => setServiceName(e.target.value)}
                  value={ServiceName}
                  // {...formik.getFieldProps("ServiceName")}
                />
              </div>
              <div className="form_group">
                <label htmlFor="ServiceURL">Service URL</label>
                <input
                  type="text"
                  placeholder="Paste Service URL"
                  value={ServiceURL}
                  onChange={(e) => setServiceURL(e.target.value)}
                />
              </div>
              <div className="form_group editor">
                <label htmlFor="ServiceDescription">
                  Description <sup>*</sup>
                </label>
                <Editor
                  value={ServiceDescription}
                  onTextChange={(e) => setServiceDescription(e.htmlValue)}
                  id="ServiceDescription"
                  name="ServiceDescription"
                  style={{ height: "130px" }}
                  placeholder="Enter Short Description"
                />
                {/* <textarea name="service_description" id="service_description" cols="48" rows="4" placeholder="Enter Short Description"></textarea> */}
              </div>
              <div className="form_group serviceImage">
                <label htmlFor="ServiceImage">Service Icon</label>
                <label htmlFor="ServiceImage">
                  <img
                    src={
                      ServiceImage != undefined
                        ? ServiceImage
                        : "https://img.freepik.com/free-vector/autumn-background_23-2149054409.jpg?t=st=1715971926~exp=1715975526~hmac=064e47d99740a4e25fb7345c45d5bc744da1c1ad7f5f1e14668eaae2cc601381&w=900"
                    }
                    alt="ServiceImage"
                  />
                  <i className="bx bxs-edit-location"></i>
                </label>
                <input
                  type="file"
                  id="ServiceImage"
                  name="ServiceImage"
                  onChange={onUploadServiceImage}
                />
                <p>
                  <strong>Note :</strong> Max file size limit 2MB
                </p>
                <small>Allowed file types: png, jpg, jpeg,.gif.</small>
              </div>
              <div className="form_submit_actions">
                <div className="save">
                  <button type="submit">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* //Service  Detail Box */}

        <div
          className="view_new_service_container"
          id={viewServiceDetail ? "shadow_background" : ""}
        >
          <div
            className="view_new_service_box"
            id={viewServiceDetail ? "serviceUpdateOpen" : "serviceUpdateClose"}
          >
            <div className="title">
              <p>Service Details</p>
              <i
                className="bx bx-x"
                onClick={() => setViewServiceDetail(false)}
              ></i>
            </div>
            <div className="details_container">
              <div className="service_name">
                <div className="service_title">Service Name</div>
                <div className="name">
                  <p>{ServiceName != undefined ? ServiceName : "N/A"}</p>
                </div>
              </div>
              <div className="service_desc">
                <div className="service_title">Service Description</div>
                <div className="name">
                  <p>
                    {ServiceDescription != undefined
                      ? ServiceDescription
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="service_url">
                <div className="service_title">Service URL</div>
                <div className="name">
                  <a href={ServiceURL} target="_blank">
                    {ServiceURL != undefined ? ServiceURL : "N/A"}
                  </a>
                </div>
              </div>
              <div className="service_image">
                <div className="service_title">Service Image</div>
                <div className="service_image">
                  <img
                    src="https://img.freepik.com/free-photo/texture-cold-gray-background-copy-space-generative-ai_169016-29494.jpg?t=st=1719067458~exp=1719071058~hmac=cd83aaa24c4e3db687a13e63bc286a6ae631fa31fc3c17a55273372b6a109a0f&w=1060"
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

export default Services;
