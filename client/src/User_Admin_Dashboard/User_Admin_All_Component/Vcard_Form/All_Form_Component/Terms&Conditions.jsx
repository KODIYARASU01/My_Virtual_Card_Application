import React,{useState,useContext} from "react";
import "./form_styles/Terms&Conditions.scss";
import { Editor } from "primereact/editor";
import { useFormik } from "formik";
import axios from "axios";
import { Toaster,toast } from "react-hot-toast";
import SuperAdmin_context from "../../../../SuperAdmin_Context/SuperAdmin_context";

const Terms_Conditions = () => {
  let { FormSubmitLoader, setFormSubmitLoader,userName } =
  useContext(SuperAdmin_context);
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
    const [Terms_Conditions, setTerms_Conditions] = useState("");


      //Localstorage data:
  let localStorageDatas=JSON.parse(localStorage.getItem('datas'));

  let formik = useFormik({
    initialValues: {
      Terms_Conditions:''
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validate:SocialMediaValidate,
 
    onSubmit: async (values) => {
      values.Terms_Conditions = stripHtmlTags(Terms_Conditions);
      setFormSubmitLoader(true);
      await axios
        .post("http://localhost:3001/termConditionDetail", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message)
          setTimeout(()=>{
           setTerms_Conditions('')
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
      <div className="terms_container">
      <div className="title">
    {/* <h6>Link Your Social Medias</h6> */}

    <div className="note">
      <small><span>Note :</span>A <span>Terms and Conditions agreement </span> acts as a <span>legal contract between you (the company)</span> and the user..</small>
    </div>
  </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="form_group">
            <label htmlFor="description">Terms & Conditions <sup>*</sup></label>
            <Editor
              value={Terms_Conditions}
              onTextChange={(e) => setTerms_Conditions(e.htmlValue)}
              style={{ height: "300px" }}
              className="texteditor"
              {...formik.getFieldProps('Terms_Conditions')}
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

export default Terms_Conditions;
