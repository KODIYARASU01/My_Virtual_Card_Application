import React,{useState,useContext} from "react";
import "./form_styles/PrivacyPolicy.scss";
import { Editor } from "primereact/editor";
import { useFormik } from "formik";
import axios from "axios";
import { Toaster,toast } from "react-hot-toast";
import SuperAdmin_context from "../../../../SuperAdmin_Context/SuperAdmin_context";

const PrivacyPolicy = () => {
  let { FormSubmitLoader, setFormSubmitLoader,userName } =
  useContext(SuperAdmin_context);
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
    const [PrivacyPolicy, setPrivacyPolicy] = useState("");


      //Localstorage data:
  let localStorageDatas=JSON.parse(localStorage.getItem('datas'));

  let formik = useFormik({
    initialValues: {
        PrivacyPolicy:''
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validate:SocialMediaValidate,
 
    onSubmit: async (values) => {
      values.PrivacyPolicy = stripHtmlTags(PrivacyPolicy);
      setFormSubmitLoader(true);
      await axios
        .post("http://localhost:3001/privacyPolicyDetail", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message)
          setTimeout(()=>{
           setPrivacyPolicy('')
          },2000)
          setFormSubmitLoader(false);
        })
        .catch((error) => {
       toast.error(error.response.data.message);
       console.log(error)
          setFormSubmitLoader(false);
        });
    },
  });
  return (
    <>
      <div className="privacy_container">
      <div className="title">
    {/* <h6>Link Your Social Medias</h6> */}

    <div className="note">
      <small><span>Note :</span>A privacy policy is a legal document that explains how an organization handles any customer, client or employee information gathered in its operations.</small>
    </div>
  </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="form_group">
            <label htmlFor="description">Privacy Policy <sup>*</sup></label>
            <Editor
              value={PrivacyPolicy}
              onTextChange={(e) => setPrivacyPolicy(e.htmlValue)}
              style={{ height: "300px" }}
              className="texteditor"
              {...formik.getFieldProps('PrivacyPolicy')}
            />
          </div>
          <div className="form_submit_actions">
            <button className="save" type="submit">Save</button>
            <button className="discard" onClick={formik.handleReset}>Clear</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PrivacyPolicy;
