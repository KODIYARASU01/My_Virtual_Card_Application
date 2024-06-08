import React, { useRef, useState } from "react";
import "./form_styles/Select_Template.scss";
import { toast, Toaster } from "react-hot-toast";
import card1 from "../../../../assets/Digicards/1.png";
import card2 from "../../../../assets/Digicards/2.png";
import card3 from "../../../../assets/Digicards/3.png";
import card4 from "../../../../assets/Digicards/4.png";
import card5 from "../../../../assets/Digicards/5.png";
import card6 from "../../../../assets/Digicards/6.png";
import card7 from "../../../../assets/Digicards/7.png";
import card8 from "../../../../assets/Digicards/8.png";
import card9 from "../../../../assets/Digicards/9.png";
import Footer from "../../../UserAdmin_Footer/Footer";
import selected_gif from "../../../../assets/animations/selected.gif";
import touch_gif from "../../../../assets/animations/touch.gif";
let SelectTemplate = [
  {
    id: 1,
    image: card2,
  },
  {
    id: 2,
    image: card5,
  },
  {
    id: 3,
    image: card6,
  },
  {
    id: 4,
    image: card4,
  },
  {
    id: 5,
    image: card3,
  },
  {
    id: 6,
    image: card6,
  },
  {
    id: 7,
    image: card1,
  },
  {
    id: 8,
    image: card8,
  },
];
const Select_Template = () => {
  let [selectedTemplate, setSelectedTemplate] = useState(null);

  function handle_Template_Selection(getCurrentId) {
    setSelectedTemplate(
      getCurrentId === selectedTemplate ? null : getCurrentId
    );

    if (getCurrentId === selectedTemplate) {
      toast.error("Select Your VCard Template!");
    } 
    else{
      toast.success("VCard Template Selected!");
    }

    
  }

  return (
    <>
      <div className="select_vcard_template_container">
        <Toaster position="top-right" />
        <div className="row_one">
          <h6>
            Select Template <sup>*</sup>
          </h6>
        </div>
        <div className="row_two">
          <div className="image_container">
            {SelectTemplate.map((data, index) => {
              return (
                <div
                  className="image"
                  key={index}
                  id={
                    selectedTemplate === data.id
                      ? "templateSelected"
                      : "templateUnselected"
                  }
                  onClick={() => handle_Template_Selection(data.id)}
                >
                  {data.id === selectedTemplate ? (
                    <div className="selected_gif">
                      <img src={selected_gif} alt="selected" />
                    </div>
                  ) : (
                    ""
                  )}
                  {data.id === 1 && selectedTemplate === null ? (
                    <div className="touch_hand">
                      <img src={touch_gif} alt="touch" />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="image_box">
                    <img src={data.image} alt="" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="row_3">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Select_Template;
