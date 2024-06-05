import React,{useState} from "react";
import "./form_styles/Terms&Conditions.scss";
import { Editor } from "primereact/editor";
const Terms_Conditions = () => {
    const [text, setText] = useState("");
  return (
    <>
      <div className="terms_container">
      <div className="title">
    {/* <h6>Link Your Social Medias</h6> */}

    <div className="note">
      <small><span>Note :</span>A <span>Terms and Conditions agreement </span> acts as a <span>legal contract between you (the company)</span> and the user..</small>
    </div>
  </div>
        <form action="">
          <div className="form_group">
            <label htmlFor="description">Terms & Conditions <sup>*</sup></label>
            <Editor
              value={text}
              onTextChange={(e) => setText(e.htmlValue)}
              style={{ height: "300px" }}
              className="texteditor"
            />
          </div>
          <div className="form_submit_actions">
            <button className="save">Save</button>
            <button className="discard">Discard</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Terms_Conditions;
