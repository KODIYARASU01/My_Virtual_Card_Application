import React, { useState, useContext, useEffect } from "react";
import "./Edit_form_styles/Edit_Banner.scss";
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

  let [PopupBannerId, setPopUpBannerId] = useState();

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
  async function fetchCurrentPopUpBanner() {
    setFormSubmitLoader(true);
    try {
      await axios
        .get(
          `https://my-virtual-card-application.onrender.com/popupBannerDetail/specificAll/${localStorageDatas.userName}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageDatas.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.data.length == 0) {
            toast.error("No Popup Banner added!");
            setFormSubmitLoader(false);
          } else {
            setBannerTitle(res.data.data[0].BannerTitle);
            setBannerURL(res.data.data[0].BannerURL);
            setBannerDescription(res.data.data[0].BannerDescription);
            setBannerButtonName(res.data.data[0].BannerButtonName);
            setPopUpBannerId(res.data.data[0]._id);
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
    fetchCurrentPopUpBanner();
  }, []);

  async function handleBannerUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);

    let data = {
      BannerTitle,
      BannerURL,
      BannerDescription,
      BannerButtonName,
    };
    try {
      await axios
        .put(
          `https://my-virtual-card-application.onrender.com/popupBannerDetail/update/${PopupBannerId}`,
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
        })
        .catch((error) => {
          setFormSubmitLoader(false);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <>
      <div className="banner_container">
        <div className="title">
          <h4> Update Banner Details</h4>
          <div className="note">
            <small>
              <span>Note :</span>When users open your VCard site initially{" "}
              <span>Popup Banner</span> load on your website.. This will help u
              to showcase your <span>Organization Description</span> and lot .
            </small>
          </div>
        </div>
        <div className="form_container_box">
          <form action="" onSubmit={handleBannerUpdate}>
            <div className="form_group">
              <label htmlFor="BannerTitle">
                Banner Title<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Banner Title"
                value={BannerTitle}
                onChange={(e) => {
                  setBannerTitle(e.target.value);
                }}
              />
            </div>
            <div className="form_group">
              <label htmlFor="BannerURL">
                URL<sup></sup>
              </label>
              <input
                type="text"
                placeholder="Banner URL"
                value={BannerURL}
                onChange={(e) => {
                  setBannerURL(e.target.value);
                }}
              />
            </div>
            <div className="form_group">
              <label htmlFor="BannerDescription">
                Description<sup>*</sup>
              </label>
              <Editor
                value={BannerDescription}
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
                value={BannerButtonName}
                onChange={(e) => {
                  setBannerButtonName(e.target.value);
                }}
              />
            </div>

            <div className="form_submit_actions">
              <button className="save">Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Banner;
