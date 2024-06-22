import React, { useRef, useState, useContext, useEffect } from "react";
import "./Edit_form_styles/Edit_Select_Template.scss";
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
import SuperAdmin_context from "../../../../SuperAdmin_Context/SuperAdmin_context";
import axios from "axios";
import { useFormik } from "formik";
let FreeTemplate = [
  {
    id: 1,
    image: card2,
  },
];
let BasicTemplate = [
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
];
let StandardTemplate = [
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
let EnterpriceTemplate = [
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
  {
    id: 9,
    image: card9,
  },
  {
    id: 10,
    image: card7,
  },
];

const Select_Template = () => {
  let {
    FormSubmitLoader,
    setFormSubmitLoader,
    userName,
    currentPlan,
    setCurrentPlan,
    SavedPlan,
    setSavedPlan,
  } = useContext(SuperAdmin_context);
  let [currentTemplate, setCurrentTemplate] = useState(null);
  let [savedTemplate, setSavedTemplate] = useState(null);
  function handle_Template_Selection(getCurrentId) {
    setCurrentTemplate(getCurrentId === currentTemplate ? null : getCurrentId);

    if (getCurrentId === currentTemplate) {
      toast.error("Select Your VCard Template!");
    } else if (currentTemplate != savedTemplate && savedTemplate != null) {
      toast.error("Already VCard Selected!");
    } else {
      toast.success("VCard Selected!");
    }
  }
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://my-virtual-card-application.onrender.com/templateDetail/specificAll/${localStorageDatas.userName}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorageDatas.token}`,
  //         },
  //       }
  //     )
  //     .then((res) => {

  //       if (res.data.data[0].currentTemplate == undefined) {
  //         setCurrentTemplate(null);
  //       } else {
  //         setCurrentTemplate(res.data.data[0].currentTemplate);
  //         setSavedTemplate(res.data.data[0].currentTemplate);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [FormSubmitLoader]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://my-virtual-card-application.onrender.com/currentplan/specificAll/${localStorageDatas.userName}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorageDatas.token}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       if (res.data.data.length > 0) {
  //      setCurrentPlan(res.data.data[0].currentPlan);
  //         FormSubmitLoader(false)
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       FormSubmitLoader(false)
  //     });
  // }, [FormSubmitLoader]);

  async function fetchCurrentTemplate() {
    try {
      await axios
        .get(
          `https://my-virtual-card-application.onrender.com/templateDetail/specificAll/${localStorageDatas.userName}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageDatas.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.data.length <= 0) {
            setCurrentTemplate(null);
          } else {
            setCurrentTemplate(res.data.data[0].currentTemplate);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    fetchCurrentTemplate();
  }, []);
  let formik = useFormik({
    initialValues: {
      currentTemplate: null,
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validate:BasicDetailValidate,

    onSubmit: async (values) => {
      setFormSubmitLoader(true);
      values.currentTemplate = currentTemplate;
      await axios
        .put(
          `https://my-virtual-card-application.onrender.com/templateDetail/update_with_userName/${localStorageDatas.userName}`,
          values,
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
          toast.error(error.response.data.message);
          console.log(error);
          setFormSubmitLoader(false);
        });
    },
  });

  return (
    <>
      <div className="select_vcard_template_container">
        <Toaster position="top-right" />
        <div className="row_one">
          {currentTemplate == null ? (
            <h6>
              Select {currentPlan} Plan Template <sup>*</sup>
            </h6>
          ) : (
            <h6>
              Selected {currentPlan} Plan Template <sup>*</sup>
            </h6>
          )}

          {currentTemplate != savedTemplate || savedTemplate == null ? (
            <button onClick={formik.handleSubmit} type="submit">
              Update
            </button>
          ) : (
            ""
          )}
          {/* {savedTemplate==null   ? (
            <button onClick={formik.handleSubmit} type="submit">
              Save
            </button>
          ) : (
            ""
          )} */}
        </div>
        <div className="row_two">
          {currentPlan != null ? (
            <div className="image_container">
              {currentPlan === "Demo" ? (
                <>
                  {FreeTemplate.map((data, index) => {
                    return (
                      <div
                        className={
                          savedTemplate != null
                            ? "free_image"
                            : "single_template"
                        }
                        key={index}
                        id={
                          (currentTemplate === data.id &&
                            currentTemplate == savedTemplate) ||
                          savedTemplate == null
                            ? "templateSelected"
                            : "templateUnselected"
                        }
                        onClick={() => handle_Template_Selection(data.id)}
                        {...formik.getFieldProps("currentTemplate")}
                      >
                        {data.id === currentTemplate &&
                        savedTemplate == null ? (
                          <div className="selected_gif">
                            <img src={selected_gif} alt="selected" />
                          </div>
                        ) : (
                          ""
                        )}
                        {data.id === 1 && currentTemplate === null ? (
                          <div className="touch_hand">
                            <img src={touch_gif} alt="touch" />
                          </div>
                        ) : (
                          ""
                        )}

                        <div
                          className="image_box"
                          id={
                            currentTemplate === savedTemplate
                              ? "selected"
                              : "unselected"
                          }
                        >
                          <img src={data.image} alt="" />
                        </div>
                      </div>
                    );
                  })}{" "}
                </>
              ) : (
                ""
              )}
              {currentPlan === "Basic" ? (
                <>
                  {BasicTemplate.map((data, index) => {
                    return (
                      <div
                        className={
                          savedTemplate != null ? "free_image" : "image"
                        }
                        key={index}
                        id={
                          (currentTemplate === data.id &&
                            currentTemplate == savedTemplate) ||
                          savedTemplate == null
                            ? "templateSelected"
                            : "templateUnselected"
                        }
                        onClick={() => handle_Template_Selection(data.id)}
                        {...formik.getFieldProps("currentTemplate")}
                      >
                        {data.id === currentTemplate ? (
                          <div className="selected_gif">
                            <img src={selected_gif} alt="selected" />
                          </div>
                        ) : (
                          ""
                        )}
                        {data.id === 1 && currentTemplate === null ? (
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
                  })}{" "}
                </>
              ) : (
                ""
              )}
              {currentPlan === "Standard" ? (
                <>
                  {StandardTemplate.map((data, index) => {
                    return (
                      <div
                        className={
                          savedTemplate != null ? "free_image" : "image"
                        }
                        key={index}
                        id={
                          (currentTemplate === data.id &&
                            currentTemplate == savedTemplate) ||
                          savedTemplate == null
                            ? "templateSelected"
                            : "templateUnselected"
                        }
                        onClick={() => handle_Template_Selection(data.id)}
                        {...formik.getFieldProps("currentTemplate")}
                      >
                        {data.id === currentTemplate ? (
                          <div className="selected_gif">
                            <img src={selected_gif} alt="selected" />
                          </div>
                        ) : (
                          ""
                        )}
                        {data.id === 1 && currentTemplate === null ? (
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
                  })}{" "}
                </>
              ) : (
                ""
              )}
              {currentPlan === "Enterprises" ? (
                <>
                  {EnterpriceTemplate.map((data, index) => {
                    return (
                      <div
                        className={
                          savedTemplate != null ? "free_image" : "image"
                        }
                        key={index}
                        id={
                          (currentTemplate === data.id &&
                            currentTemplate == savedTemplate) ||
                          savedTemplate == null
                            ? "templateSelected"
                            : "templateUnselected"
                        }
                        onClick={() => handle_Template_Selection(data.id)}
                        {...formik.getFieldProps("currentTemplate")}
                      >
                        {data.id === currentTemplate ? (
                          <div className="selected_gif">
                            <img src={selected_gif} alt="selected" />
                          </div>
                        ) : (
                          ""
                        )}
                        {data.id === 1 && currentTemplate === null ? (
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
                  })}{" "}
                </>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="noplans">
              <p>No plan Choosen!</p>
            </div>
          )}
        </div>
        <div className="row_3">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Select_Template;
