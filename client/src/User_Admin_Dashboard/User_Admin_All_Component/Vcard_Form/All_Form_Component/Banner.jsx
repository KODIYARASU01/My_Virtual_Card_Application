import React, { useState, useContext } from "react";
import "./form_styles/Banner.scss";
import { useFormik } from "formik";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import SuperAdmin_context from "../../../../SuperAdmin_Context/SuperAdmin_context";
const Banner = () => {
  let { FormSubmitLoader, setFormSubmitLoader, userName } =
    useContext(SuperAdmin_context);
  let [DemoBannerView, setDemoBannerView] = useState(false);
  let [BannerTitle, setBannerTitle] = useState();
  let [BannerURL, setBannerURL] = useState();
  let [BannerDescription, setBannerDescription] = useState();
  let [BannerButtonName, setBannerButtonName] = useState();
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  let formik = useFormik({
    initialValues: {
      BannerTitle: "",
      BannerURL: "",
      BannerDescription: "",
      BannerButtonName: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validate:BasicDetailValidate,

    onSubmit: async (values) => {
      values.BannerDescription = stripHtmlTags(BannerDescription);
      setFormSubmitLoader(true);
      await axios
        .post("http://localhost:3001/popupBannerDetail", values, {
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
      <div className="banner_container" >
        <div className="view_demo">
          <p>
            View <strong>Demo!</strong>{" "}
            <small onClick={() => setDemoBannerView(!DemoBannerView)}>
              Click
            </small>
          </p>
        </div>

        {DemoBannerView ? <div className="demoBanner">

          <div className="close_banner" onClick={()=>setDemoBannerView(false)}>
          <i className='bx bxs-message-rounded-x'></i>
          </div>
<div className="banner_title">
  <h4>Online Class Lecture!</h4>
</div>
<div className="banner_description">
  <small>Online Classes are a combination of video recordings and live lectures with course reading and tests. They are generally conducted using a virtual portal through which students gather reading materials, interact with teachers and classmates, view grades, and monitor progress.</small>
</div>
<div className="banner_action">
  <a href="">Book Your Slot!<i className='bx bxs-send bx-flashing' ></i></a>
</div>

        </div> : ""}

        <div className="title">
          <h4>Banner Details</h4>
          <div className="note">
            <small>
              <span>Note :</span>When users open your VCard site initially{" "}
              <span>Popup Banner</span> load on your website.. This will help u
              to showcase your <span>Organization Description</span> and link any <span>URL</span>  navigate user to visit! .
            </small>
          </div>
        </div>
        {DemoBannerView ? '' :    <div className="form_container_box">
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="form_group">
              <label htmlFor="BannerTitle">
                Banner Title<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Banner Title"
                {...formik.getFieldProps("BannerTitle")}
              />
            </div>
            <div className="form_group">
              <label htmlFor="BannerURL">
                URL<sup></sup>
              </label>
              <input
                type="text"
                placeholder="Banner URL"
                {...formik.getFieldProps("BannerURL")}
              />
            </div>
            <div className="form_group">
              <label htmlFor="BannerDescription">
                Description<sup>*</sup>
              </label>
              <Editor
                {...formik.getFieldProps("BannerDescription")}
                value={formik.values.BannerDescription}
                onTextChange={(e) => setBannerDescription(e.htmlValue)}
                id="BannerDescription"
                name="BannerDescription"
                style={{ height: "130px" }}
                placeholder="Enter Short Description"
              />
              {/* <textarea name="banner_description" id="banner_description" cols="50" rows="4" placeholder="Enter Short Description" ></textarea> */}
            </div>
            <div className="form_group">
              <label htmlFor="BannerButtonName">
                Banner Button<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Button Name"
                {...formik.getFieldProps("BannerButtonName")}
              />
            </div>

            <div className="form_submit_actions">
              <button className="save">Save</button>
              <button
                className="discard"
                type="button"
                onClick={formik.handleReset}
              >
                Clear
              </button>
            </div>
          </form>
        </div>}
    
      </div>
    </>
  );
};

export default Banner;
