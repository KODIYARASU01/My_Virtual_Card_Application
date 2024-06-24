import React, { useState, useContext, useRef } from "react";
import "./menuStyles/VCard_URL_Form.scss";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import SuperAdmin_context from "../../SuperAdmin_Context/SuperAdmin_context";
import {
  convertToBase64Banner,
  convertToBase64Profile,
} from "../../Helper/convert";
import { useNavigate } from "react-router-dom";
import { VCardURLValidate } from "../../Helper/VCard_URL";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toaster, toast } from "react-hot-toast";
const VCard_URL_Form = () => {
  let navigate = useNavigate();
  let {
    URL_Alies,
    setURL_Alies,
    FormSubmitLoader,
    setFormSubmitLoader,
    userName,
  } = useContext(SuperAdmin_context);
  let [BasicDetailLoader, setBasicDetailLoader] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [VCardName, setVCardName] = useState();
  const [Occupation, setOccupation] = useState();
  const [Description, setDescription] = useState();
  const [Profile, setProfile] = useState();
  let [Banner, setBanner] = useState();
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  const onUploadProfile = async (e) => {
    let base64 = await convertToBase64Profile(e.target.files[0]);

    setProfile(base64);
  };
  const onUploadBanner = async (e) => {
    let base64 = await convertToBase64Banner(e.target.files[0]);

    setBanner(base64);
  };

  let formik = useFormik({
    initialValues: {
      URL_Alies: "demo",
      VCardName: "",
      Occupation: "",
      Description: "",
      Profile: "",
      Banner: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: VCardURLValidate,

    onSubmit: async (values) => {
      values = await Object.assign(values, { Profile: Profile || "" });
      values = await Object.assign(values, { Banner: Banner || "" });
      values.Description = stripHtmlTags(Description);
      setFormSubmitLoader(true);
      await axios
        .post("http://localhost:3001/vcard_URL", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setURL_Alies(res.data.data.URL_Alies);
          setTimeout(() => {
            navigate(
              `/${userName}/uadmin/vcard_form_edit/${res.data.data.URL_Alies}`
            );
            //  window.location.pathname = `/${userName}/uadmin/vcard_form/${URL_Alies}`
          }, 1000);
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
      <div className="new_Vcard_url_container">
        <div className="new_vcardurl_form_title">
          <h5>Create Your New VCard</h5>
        </div>
          <div className="close_new_vcardurl_page">
              <button type="button" onClick={()=>window.location.pathname =`/${userName}/uadmin/user_vcard`}>Back<i className='bx bx-exit'></i></button>
          </div>
        <div className="new_vcardURL_container_box">
          {/* Tooltip */}
          {tooltip ? (
            <div className="tooltip_banner">
              <div className="content">
                <small>
                  The main URL that your VCard is going to be able accessed
                  from.
                </small>

                <p>
                  <strong>Ex :</strong>&nbsp;https://myvirtualcard.in/{URL_Alies}
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
          <form
            encType="multipart/form-data"
            onSubmit={formik.handleSubmit}
            method="POST"
          >
            <div className="form_group">
              <label htmlFor="URL_Alies">
                VCard URL <sup>*</sup>
                <div className="note" onMouseEnter={()=>setTooltip(true)}onMouseLeave={()=>setTooltip(false)}>
                  <i className="bx bx-question-mark "></i>
                </div>
              </label>
              <input
                type="text"
                placeholder="Enter VCard URL"
                // value={VCardName}
                // onChange={() => setVCardName(e.target.value)}
                {...formik.getFieldProps("URL_Alies")}
              />
            </div>
            <div className="form_group">
              <label htmlFor="VCardName">
                VCard Name <sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter VCard Name"
                // value={VCardName}
                // onChange={() => setVCardName(e.target.value)}
                {...formik.getFieldProps("VCardName")}
              />
            </div>
            <div className="form_group">
              <label htmlFor="occupation">
                Occupation<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Occupation"
                // value={Occupation}
                // onChange={() => setOccupation(e.target.value)}
                {...formik.getFieldProps("Occupation")}
              />
            </div>
            <div className="form_group">
              <label htmlFor="Description">
                Description<sup>*</sup>
              </label>
              <Editor
                {...formik.getFieldProps("Description")}
                value={formik.values.Description}
                onTextChange={(e) => setDescription(e.htmlValue)}
                id="Description"
                name="Description"
                style={{ height: "180px" }}
                placeholder="Enter Short Description..!"
              />
            </div>
            <div className="form_group double_col_inputs">
              <div className="first">
                <label htmlFor="Profile">
                  Profile Image <sup>*</sup>
                </label>
                <label htmlFor="Profile">
                  <img
                    src={
                      Profile != undefined
                        ? Profile
                        : "https://img.freepik.com/free-photo/3d-render-little-boy-with-eyeglasses-blue-shirt_1142-50994.jpg?t=st=1716040955~exp=1716044555~hmac=605273d0e1789be0644e11ceb509699fc6908463eed64554ad5184feb50cc3fa&w=740"
                    }
                    className="Profile"
                    alt="Profile"
                  />
                  <i className="bx bxs-edit"></i>
                </label>
                <small>Allowed file types: png, jpg, jpeg.</small>
                <input
                  onChange={onUploadProfile}
                  type="file"
                  name="Profile"
                  id="Profile"
                />
              </div>
              <div className="second">
                <label htmlFor="Banner">
                  Banner Image <sup>*</sup>
                </label>
                <label htmlFor="Banner">
                  <img
                    src={
                      Banner != null
                        ? Banner
                        : "https://img.freepik.com/free-photo/cement-wall-floor-copy-space_53876-30237.jpg?t=st=1716040667~exp=1716044267~hmac=37c1f0faf9137d781a0aa0d1436b486b6e0a620fec789a836ab08533c16cbeeb&w=826"
                    }
                    className="Banner"
                    alt="Banner"
                  />
                  <i className="bx bxs-edit"></i>
                </label>
                <small>Allowed file types: png, jpg, jpeg.</small>
                <input
                  type="file"
                  // ref={BannerRef}
                  onChange={onUploadBanner}
                  // {...formik.getFieldProps("Banner")}
                  name="Banner"
                  id="Banner"
                />
              </div>
            </div>

            <div className="form_submit_actions">
              <button className="save" type="submit">
                Save
              </button>

              <button
                className="discard"
                type="button"
                onClick={formik.handleReset}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VCard_URL_Form;
