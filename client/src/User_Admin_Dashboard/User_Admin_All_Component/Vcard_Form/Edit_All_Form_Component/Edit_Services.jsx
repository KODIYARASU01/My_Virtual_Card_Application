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
  let[updateFormOpen,setUpdateFormOpen]=useState(false);
  let [ServiceName, setServiceName] = useState();
  let [ServiceURL, setServiceURL] = useState();
  let [ServiceDescription, setServiceDescription] = useState();
  let [ServiceImage, setServiceImage] = useState();
  let [ServiceId, setServiceId] = useState();
  const [filename, setFilename] = useState("Choose File");

  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  
  async function fetchCurrentService() {
    setFormSubmitLoader(true);
    try {
      await axios
        .get(
          `http://localhost:3001/serviceDetail/specificAll/${localStorageDatas.userName}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageDatas.token}`,
            },
          }
        )
        .then((res) => {
          if(res.data.data.length == 0){
            toast.error('No service added!');
            setFormSubmitLoader(false)
          }
          else{
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
    fetchCurrentService()
  }, []);
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  let formik = useFormik({
    initialValues: {
      ServiceName: "",
      ServiceURL: "",
      ServiceDescription: "",
      ServiceImage: null
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validate:BasicDetailValidate,
 
    onSubmit: async (values) => {
      setFormSubmitLoader(true);
      // values = await Object.assign(values, { ServiceImage: ServiceImage || "" });
      const formData = new FormData();
      formData.append("ServiceImage", ServiceImage);
      formData.append('ServiceName',values.ServiceName);
      formData.append('ServiceURL',values.ServiceURL);
      formData.append('ServiceDescription', values.ServiceDescription = stripHtmlTags(ServiceDescription));
 
      await axios
        .post("http://localhost:3001/serviceDetail", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          setFormSubmitLoader(false);
          toast.success(res.data.message);
        
        })
        .catch((error) => {
       toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    },
  });
  async function handleServiceEdit(id) {
    setFormSubmitLoader(true)
    try {
      await axios
        .get(`http://localhost:3001/serviceDetail/specific/${id}`, {
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
          console.log(error);
          setFormSubmitLoader(false)
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  const onUploadServiceImage = async (e) => {
    setServiceImage(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  
  async function handleServiceUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);

    // const formData = new FormData();
    // formData.append("ServiceImage", ServiceImage);
    // formData.append('ServiceName',ServiceName);
    // formData.append('ServiceURL',ServiceURL);
    // formData.append('ServiceDescription', ServiceDescription = stripHtmlTags(ServiceDescription));
ServiceDescription=stripHtmlTags(ServiceDescription);
let data={
  ServiceName,
  ServiceImage,
  ServiceURL,
  ServiceDescription
}
console.log(ServiceId)
    try {
      axios.put(`http://localhost:3001/serviceDetail/update/${ServiceId}`,data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          console.log(res)
          setFormSubmitLoader(false);
          setTimeout(()=>{
           setUpdateFormOpen(false)
          },1000)
        })
        .catch((error) => {
          console.log(error)
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };
  async function handleServiceDelete(id) {
    // e.preventDefault();
    setFormSubmitLoader(true);
    try {
      axios
        .delete(`http://localhost:3001/serviceDetail/delete/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

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
                <th>ICON OR IMAGE</th>
                <th>TITLE</th>
                <th>DESCRIPTION</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody className=" shadow-sm">
            
              {AllService != undefined ? (
                <>
                  {AllService.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td className="h-100 align-middle">
                          <img
                            src="https://img.freepik.com/free-photo/standard-quality-control-collage-concept_23-2149595847.jpg?t=st=1715933611~exp=1715937211~hmac=d54576362232e002de841cc935f4244af4ca12908d312055576f773e438e7014&w=900"
                            alt="service_image"
                          />
                        </td>
                        <td className="h-100 align-middle">
                          {data.ServiceName}
                        </td>
                        <td className="h-100 align-middle">
                          {data.ServiceDescription.slice(0, 20)}
                        </td>
                        <td className="h-100 align-middle">
                          <i
                            className="bx bxs-show"
                            style={{ color: "skyBlue" }}
                          ></i>
                          <i
                            className="bx bx-edit"
                            onClick={() => handleServiceEdit(data._id)}
                            style={{ color: "#6571FF" }}
                          ></i>
                          <i
                            className="bx bx-trash-alt"
                            style={{ color: "red" }}
                            onClick={()=>handleServiceDelete(data._id)}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                "No data Found!"
              )}
            </tbody>
          </table>
        </div>

        {/* //Create New Service Form */}
{serviceFormOpen ?  <div className="create_new_service_container" id={serviceFormOpen ? 'shadow_background':''}>
<div className="create_new_service_box" id={serviceFormOpen ? 'serviceOpen':'serviceClose'}>
           <div className="title">
            <p>New Service</p>
            <i className='bx bx-x'  onClick={()=>setServiceFormOpen(false)}></i>
           </div>
           <form action="" onSubmit={formik.handleSubmit}>
            <div className="form_group">
              <label htmlFor="ServiceName">Service Name <sup>*</sup></label>
              <input type="text" placeholder="Enter Service Title" {...formik.getFieldProps('ServiceName')} />
            </div>
            <div className="form_group">
              <label htmlFor="ServiceURL">Service URL</label>
              <input type="text" placeholder="Paste Service URL" {...formik.getFieldProps('ServiceURL')} />
            </div>
            <div className="form_group editor">
              <label htmlFor="ServiceDescription">Description <sup>*</sup></label>
              <Editor
              {...formik.getFieldProps('ServiceDescription')}
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
          
              <input type="file" id="ServiceImage"  name="ServiceImage" onChange={onUploadServiceImage} />
              <small>Allowed file types: png, jpg, jpeg,.gif.</small>
            
            </div>
            <div className="form_submit_actions">
              <div className="save">
              <button type="submit">
                Save
              </button>
              </div>
           <div className="discard" >
           <button type="button" onClick={formik.handleReset}>Clear</button>
           </div>
           
            </div>
           </form>
        </div>
</div>:''}
       
        {/* //Update  Service Form */}
{updateFormOpen ?      <div
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
                 onChange={(e)=>setServiceURL(e.target.value)}
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

                <input
                  type="file"
                  id="ServiceImage"
                  name="ServiceImage"
                 
                  onChange={onUploadServiceImage}
                />
                <small>Allowed file types: png, jpg, jpeg,.gif.</small>
              </div>
              <div className="form_submit_actions">
                <div className="save">
                  <button type="submit">Update</button>
                </div>
              
              </div>
            </form>
          </div>
        </div>:''}
   
      </div>
    </>
  );
};

export default Services;
