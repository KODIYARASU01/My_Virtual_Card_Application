import React, { useState, useContext, useRef,useEffect } from "react";
import "./Edit_form_styles/Edit_BasicForm.scss";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import SuperAdmin_context from "../../../../SuperAdmin_Context/SuperAdmin_context";
import {
  convertToBase64Banner,
  convertToBase64Profile,
} from "../../../../Helper/convert";
import {useParams} from 'react-router-dom'
import { BasicDetailValidate } from "../../../../Helper/BasicDetailValiate";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toaster, toast } from "react-hot-toast";
const BasicForm = () => {
  let {Index}=useParams();
  let { FormSubmitLoader, setFormSubmitLoader, userName } =
    useContext(SuperAdmin_context);
  let [BasicDetailLoader, setBasicDetailLoader] = useState(false);
  const [VCardName, setVCardName] = useState();
  const [Occupation, setOccupation] = useState();
  const [Description, setDescription] = useState();

  const [Profile, setProfile] = useState();

  let [Banner, setBanner] = useState();
  let [BannerName, setBannerName] = useState("");
  let [FirstName, setFirstName] = useState();
  let [LastName, setLastName] = useState();
  let [Email, setEmail] = useState();
  let [MobileNumber, setMobileNumber] = useState();
  let [AlternateEmail, setAlternateEmail] = useState();
  let [AlternateMobileNumber, setAlternateMobileNumber] = useState();
  let [Location, setLocation] = useState();
  let [JobTitle, setJobTitle] = useState();
  let [InquiryToggleSwitch, setInquiryToggleSwitch] = useState(true);
  let [QRToggleSwitch, setQRToggleSwitch] = useState(true);
  let [AppoinmentToggleSwitch, setAppoinmentToggleSwitch] = useState(false);
  let [ContactToggleSwitch, setContactToggleSwitch] = useState(true);

  let [imagePath, setImagePath] = useState(null);

 

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
  console.log(Index)
  async function fetchBasicData(){
    try{
      setFormSubmitLoader(true)
      axios
      .get(
        `http://localhost:3001/basicDetail/specificAll/${localStorageDatas.userName}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        }
      )
      .then((res) => {
   
      setVCardName(res.data.data[Index].VCardName);
      setOccupation(res.data.data[Index].Occupation);
      setDescription(res.data.data[Index].Description);
      setProfile(res.data.data[Index].Profile);
      setBanner(res.data.data[Index].Banner);
      setFirstName(res.data.data[Index].FirstName);
      setLastName(res.data.data[Index].LastName);
      setEmail(res.data.data[Index].Email);
      setMobileNumber(res.data.data[Index].MobileNumber);
      setAlternateEmail(res.data.data[Index].AlternateEmail);
      setAlternateMobileNumber(res.data.data[Index].AlternateMobileNumber);
      setLocation(res.data.data[Index].Location);
      setJobTitle(res.data.data[Index].JobTitle);
      setInquiryToggleSwitch(res.data.data[Index].InquiryToggleSwitch);
      setQRToggleSwitch(res.data.data[Index].QRToggleSwitch);
      setAppoinmentToggleSwitch(res.data.data[Index].AppoinmentToggleSwitch);
      setAppoinmentToggleSwitch(res.data.data[Index].AppoinmentToggleSwitch)
      setFormSubmitLoader(false)
      })
      .catch((error) => {
        console.log(error);
        setFormSubmitLoader(false)
      });
    }
    catch(error){
      console.log(error)
      setFormSubmitLoader(false)
    }
  }
  useEffect(() => {
    fetchBasicData();
  }, []);


  // let formik = useFormik({
  //   initialValues: {
  //     VCardName: '',
  //     Occupation: "",
  //     Description: "",
  //     Profile: undefined,
  //     Banner: null,
  //     BannerName: "",
  //     FirstName: "",
  //     LastName: "",
  //     Email: "",
  //     MobileNumber: "",
  //     AlternateEmail: "",
  //     AlternateMobileNumber: "",
  //     Location: "",
  //     JobTitle: "",
  //     InquiryToggleSwitch: true,
  //     QRToggleSwitch: true,
  //     AppoinmentToggleSwitch: false,
  //     ContactToggleSwitch: true,
  //   },
  //   validateOnChange: false,
  //   validateOnBlur: false,
  //   validate: BasicDetailValidate,

  //   onSubmit: async (values) => {


  //     values = await Object.assign(values, { Profile: Profile || "" });
  //     values = await Object.assign(values, { Banner: Banner || "" });
  //     values.Description = stripHtmlTags(Description);
  //     setFormSubmitLoader(true);
  //     await axios
  //       .put(`http://localhost:3001/basicDetail/update_by_userName/${localStorageDatas.userName}`, values, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorageDatas.token}`,
  //         },
  //       })
  //       .then((res) => {
  //         toast.success(res.data.message);
  //         setFormSubmitLoader(false);
  //       })
  //       .catch((error) => {
  //         toast.error(error.response.data.message);
  //         console.log(error);
  //         setFormSubmitLoader(false);
  //       });
  //   },
  // });

async function handleFormUpdate(e){
e.preventDefault();
  let data={
      VCardName,
      Occupation,
      Description,
      Profile,
      Banner,
      BannerName,
      FirstName,
      LastName,
      Email,
      MobileNumber,
      AlternateEmail,
      AlternateMobileNumber,
      Location,
      JobTitle,
      InquiryToggleSwitch,
      QRToggleSwitch,
      AppoinmentToggleSwitch,
      ContactToggleSwitch

  }
  setFormSubmitLoader(true)
  try{
    axios.put(`http://localhost:3001/basicDetail/update_by_userName/${localStorageDatas.userName}`, data, {
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
  }
  catch(error){
    toast.error(error.message)
  }
}

  return (
    <>
      <div className="basicform_container">
        <Toaster position="top-right" />
        <div className="form1_container_box">
          <form
            encType="multipart/form-data"
            onSubmit={handleFormUpdate}
        
          >
            <div className="form_group">
              <label htmlFor="VCardName">
                VCard Name <sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter VCard Name"
                value={VCardName}
                onChange={(e) => setVCardName(e.target.value)}
              
              />
            </div>
            <div className="form_group">
              <label htmlFor="occupation">
                Occupation<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Occupation"
                value={Occupation}
                onChange={(e) => setOccupation(e.target.value)}
             
              />
            </div>
            <div className="form_group">
              <label htmlFor="Description">
                Description<sup>*</sup>
              </label>
              <Editor
           
                value={Description}
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
           
                  onChange={onUploadBanner}
             
                  name="Banner"
                  id="Banner"
                />
              </div>
            </div>
            <div className="form2_title">
              <h4>VCard Details</h4>
            </div>
            <div className="form_group">
              <label htmlFor="firstName">
                First Name<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Your FirstName"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
    
              />
            </div>
            <div className="form_group">
              <label htmlFor="lastName">
                Last Name<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Your LastName"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
       
              />
            </div>
            <div className="form_group">
              <label htmlFor="email">
                Email<sup>*</sup>
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
      
              />
            </div>
            <div className="form_group">
              <label htmlFor="email">
                Phone Number<sup>*</sup>
              </label>
              <input
                type="tel"
                placeholder="Enter Your Phone Number"
                value={MobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
   
              />
            </div>
            <div className="form_group">
              <label htmlFor="alternateEmail">Alternate Email</label>
              <input
                type="email"
                placeholder="Alternate Email"
                value={AlternateEmail}
                onChange={(e) => setAlternateEmail(e.target.value)}

              />
            </div>
            <div className="form_group">
              <label htmlFor="alternateEmail">Alternate Phone</label>
              <input
                type="tel"
                placeholder="Alternate Phone"
                value={AlternateMobileNumber}
                onChange={(e) => setAlternateMobileNumber(e.target.value)}
      
              />
            </div>
            <div className="form_group">
              <label htmlFor="location">
                Location<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Location"
                value={Location}
                onChange={(e) => setLocation(e.target.value)}

              />
            </div>
            <div className="form_group">
              <label htmlFor="job">
                Job Title<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Job Title"
                value={JobTitle}
                onChange={(e) => setJobTitle(e.target.value)}

              />
            </div>

            <div className="actions">
              <p>Enable Inquiry Form :</p>
              <input
                id="InquiryToggleSwitch"
                name="InquiryToggleSwitch"
                type="checkbox"
                checked={InquiryToggleSwitch}
           
              />
            </div>
            <div className="actions">
              <p>Enable QR Code :</p>
              <input
                id="QRToggleSwitch"
                name="QRToggleSwitch"
                type="checkbox"
                checked={QRToggleSwitch}
           
              />
            </div>
            <div className="actions">
              <p>Enable Appoinment:</p>
              {/* {AppoinmentToggleSwitch ? (
                <i
                  className="bx bxs-toggle-right on"
                
                  onChange={formik.values.AppoinmentToggleSwitch}
                  onClick={() => setAppoinmentToggleSwitch(!AppoinmentToggleSwitch)}
                ></i>
              ) : (
                <i
                  class="bx bxs-toggle-left off"
                  checked={formik.values.AppoinmentToggleSwitch}
                  onClick={() => setAppoinmentToggleSwitch(!AppoinmentToggleSwitch)}
                ></i>
              )} */}
              <input
                id="AppoinmentToggleSwitch"
                name="AppoinmentToggleSwitch"
                type="checkbox"
                checked={AppoinmentToggleSwitch}
         
              />
            </div>
            <div className="actions">
              <p>Enable Add To Contact:</p>
              <input
                id="ContactToggleSwitch"
                name="ContactToggleSwitch"
                type="checkbox"
                checked={ContactToggleSwitch}
         
              />
            </div>

            <div className="form_submit_actions">
              <button className="save" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BasicForm;
