import React, { useState, useContext,useEffect } from "react";
import "./form_styles/Testimonial.scss";
import { useFormik } from "formik";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { convertToBase64ClientImage } from "../../../../Helper/convert";
import SuperAdmin_context from "../../../../SuperAdmin_Context/SuperAdmin_context";
const Testimonial = () => {
  let[AllTestimonialSlide,setAllTestimonialSlide]=useState();
  let [testimonialFormOpen, setTestimonialFormOpen] = useState(false);
  let { FormSubmitLoader, setFormSubmitLoader, userName } =
    useContext(SuperAdmin_context);
  let [ClientName, setClientName] = useState();
  let [ClientFeedback, setClientFeedback] = useState("");
  let [ClientImage, setClientImage] = useState();
  let[ClientReviewDate,setClientReviewDate]=useState();

  const [key, setKey] = useState(0);
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));

  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  const onUploadClientImage = async (e) => {
    let base64 = await convertToBase64ClientImage(e.target.files[0]);
    setClientImage(base64);
  };
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  async function fetchAllTestimonial() {
    setFormSubmitLoader(true);
    try {
      await axios
        .get(
          `http://localhost:3001/testimonialDetail/specificAll/${localStorageDatas.userName}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageDatas.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.data.length == 0) {
            toast.error("No Testimonial Slide added!");
            setFormSubmitLoader(false);
          } else {
            setAllTestimonialSlide(res.data.data);
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
    fetchAllTestimonial();
  }, [key]);

  let formik = useFormik({
    initialValues: {
      ClientName: "",
      ClientFeedback: "",
      ClientReviewDate: "",
      ClientImage: undefined,
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validate:BasicDetailValidate,

    onSubmit: async (values) => {
      values = await Object.assign(values, { ClientImage: ClientImage || "" });
      values.ClientFeedback = stripHtmlTags(ClientFeedback);
      setFormSubmitLoader(true);
      await axios
        .post("http://localhost:3001/testimonialDetail", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);

          setTimeout(() => {
            values.ClientName = "";
            setClientImage(undefined);
            setClientName('')
            setClientFeedback('')
            setClientReviewDate('')
            reloadComponent();
            setTestimonialFormOpen(false)
            values.ClientFeedback = "";
            values.ClientReviewDate=''
          }, 2000);
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
      <div className="testimonial_container">
        <div className="add_new_testimonial">
          <button onClick={() => setTestimonialFormOpen(true)}>
            Add Testimonial
          </button>
        </div>

        <div className="testimonial_list_table table-responsive container w-100 rounded-3">
          <table className="table rounded-3" id="example">
            <thead className="table-secondary rounded-3">
              <tr>
                <th className="fw-bold">CLIENT PROFILE</th>
                <th className="fw-bold">CLIENT NAME</th>
                <th className="fw-bold">CLIENT REVIEW</th>
                <th className="fw-bold">CLIENT REVIEW DATE</th>
            
              </tr>
            </thead>
            <tbody className=" shadow-sm">
            {AllTestimonialSlide != undefined ? (
                <>
                  {AllTestimonialSlide.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td className="h-100 align-middle fw-semibold">
                          <img
                            src={data.ClientImage}
                            alt="ClientImage"
                            name="ClientImage"
                          />
                        </td>
                        <td className="h-100 align-middle fw-semibold">
                          {data.ClientName}
                        </td>
                        <td className="h-100 align-middle fw-semibold">
                          {data.ClientFeedback.slice(0, 20)}
                        </td>
                        <td className="h-100 align-middle fw-semibold">
                          {data.ClientReviewDate}
                        </td>
                 
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr>
                <td colSpan='6' className="text-center">
                No Client Reviews Added!
                </td>
            </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* //Create New Service Form */}

        <div
          className="create_new_testimonial_container"
          id={testimonialFormOpen ? "shadow_background" : ""}
        >
          <div
            className="create_new_testimonial_box"
            id={testimonialFormOpen ? "testimonialOpen" : "testimonialClose"}
          >
            <div className="title">
              <p>New Testimonial</p>
              <i
                className="bx bx-x"
                onClick={() => setTestimonialFormOpen(false)}
              ></i>
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="form_group">
                <label htmlFor="ClientName">
                  Client Name <sup>*</sup>
                </label>
                <input
                  type="text"
                  placeholder="Enter Client Name"
                  {...formik.getFieldProps("ClientName")}
                />
              </div>

              <div className="form_group">
                <label htmlFor="ClientFeedback">
                  Client Feedback <sup>*</sup>
                </label>
                <Editor
                  {...formik.getFieldProps("ClientFeedback")}
                  value={formik.values.ClientFeedback}
                  onTextChange={(e) => setClientFeedback(e.htmlValue)}
                  id="ClientFeedback"
                  name="ClientFeedback"
                  style={{ height: "130px" }}
                  placeholder="Enter Short Description"
                />
                {/* <textarea name="client_description" id="client_description" cols="48" rows="4" placeholder="Enter Short Description"></textarea> */}
              </div>
              <div className="form_group">
                <label htmlFor="ClientReviewDate">
                  Client Review Date <sup>*</sup>
                </label>
                <input
                  type="date"
                  placeholder="Enter Client Reviewed Date"
                  {...formik.getFieldProps("ClientReviewDate")}
                />
              </div>
              <div className="form_group">
                <label htmlFor="ClientImage">Client Image</label>
                <label htmlFor="ClientImage">
                  <img
                    src={
                      ClientImage != undefined
                        ? ClientImage
                        : "https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
                    }
                    alt="ClientImage"
                  />
                  <i className="bx bxs-edit-location"></i>
                </label>
                <small>Allowed file types: png, jpg, jpeg.</small>
                <input
                  type="file"
                  id="ClientImage"
                  name="ClientImage"
                  onChange={onUploadClientImage}
                />
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
      </div>
    </>
  );
};

export default Testimonial;
