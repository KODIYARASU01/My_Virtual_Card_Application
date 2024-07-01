import React, { useEffect, useContext, useState } from "react";
import "./styles/UserAccountSetting.scss";

import SuperAdmin_context from "../../SuperAdmin_Context/SuperAdmin_context";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { convertToBase64 } from "../../Helper/convert";
import { useFormik } from "formik";
const UserAccountSetting = () => {
  let[updateLoader,setUpdateLoader]=useState(false);

  let {
    profile,
    setProfile,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    location,
    setLocation,
    mobileNumber,
    setMobileNumber,
    email,
    setEmail,
    setLoader,
    currentPlan,
    setCurrentPlan,
    PlanPrice,
    setPlanPrice,
    FormSubmitLoader,
    setFormSubmitLoader,
    
  } = useContext(SuperAdmin_context);

  let navigate = useNavigate();
  let { id } = useParams();
  let UserData = JSON.parse(localStorage.getItem("datas"));
  //Fetching user Data:
  useEffect(() => {
    setLoader(true);
    setFormSubmitLoader(true)
    axios
      .get(`http://localhost:3001/auth/register/${UserData.id}`)
      .then((responce) => {

        setFormSubmitLoader(false)
        setProfile(responce.data.data.profile);
        setFirstName(responce.data.data.firstName);
        setLastName(responce.data.data.lastName);
        setEmail(responce.data.data.email);
        setMobileNumber(responce.data.data.mobileNumber);
        setLocation(responce.data.data.location);
        // toast.success(responce.data.message, {
        //   position: "top-right",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        //   transition: Flip,
        // });
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Flip,
        });
        setFormSubmitLoader(false)
      });

      axios.get()
  }, []);
  //Update UserDetail
  let handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitLoader(true)
    try {
   
      let data = {
        profile,
        firstName,
        lastName,
        email,
        location,
        mobileNumber,
      };
      axios
        .put(`http://localhost:3001/auth/register/${UserData.id}`, data)
        .then((res) => {
          setFormSubmitLoader(false)
          toast.success(res.data.message);
          setUpdateLoader(false);
        })
        .catch((error) => {
          setFormSubmitLoader(false)
          toast.error(error.response.data.message);
          setUpdateLoader(false);
        });
    } catch (error) {
      toast.error(error);
      setUpdateLoader(false);
    }
  };
  //Formik does not support file upload so we could create handler :
  const onUpload = async (e) => {
    let base64 = await convertToBase64(e.target.files[0]);

    setProfile(base64);
  };
  return (
    <>
      <div className="account_setting_container">
        <Toaster position="top-right" />
        <div className="setting_title">
          <h4>Update Your Profile</h4>
        </div>
        <div className="account_form_box">
          <form action="" onSubmit={handleSubmit}>
            <div className="form_group">
              <label htmlFor="avatar">
                <h5>
                  Avatar{" "}
                  <span>
                    <sup>*</sup>
                  </span>
                </h5>
              </label>

              <label htmlFor="avatar">
                <img
                  src={
                    profile ||
                    "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1715790254~exp=1715793854~hmac=ba7343c32c0eb17b5cadcdddf5f5ea1b4cc7510ce54d4436095344458fedb8ca&w=740"
                  }
                  alt="avatar"
                />
                <i class="bx bxs-message-rounded-edit"></i>
              </label>

              <input type="file" id="avatar" onChange={onUpload} />
            </div>
            <div className="form_group">
              <label htmlFor="fullName">
                <h5>
                  FullName
                  <span>
                    <sup>*</sup>
                  </span>
                </h5>
              </label>

              <div className="input">
                <div className="first">
                  <input
                    type="text"
                    placeholder="Enter FirstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <i className="bx bxs-user"></i>
                </div>
                <div className="second">
                  <input
                    type="text"
                    placeholder="Enter LastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <i className="bx bx-user"></i>
                </div>
              </div>
            </div>
            <div className="form_group">
              <label htmlFor="email">
                <h5>
                  Email
                  <span>
                    <sup>*</sup>
                  </span>
                </h5>
              </label>
              <div className="fullwidth_input">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="bx bxs-envelope"></i>
              </div>
            </div>
            <div className="form_group">
              <label htmlFor="mobileNumber">
                <h5>
                  Mobile Number
                  <span>
                    <sup>*</sup>
                  </span>
                </h5>
              </label>
              <div className="fullwidth_input">
                <input
                  type="tel"
                  placeholder="+91 ............."
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <i className="bx bxs-phone-call"></i>
              </div>
            </div>
            <div className="form_group">
              <label htmlFor="location">
                <h5>
                  Location
                  <span>
                    <sup>*</sup>
                  </span>
                </h5>
              </label>
              <div className="fullwidth_input">
                <input
                  type="text"
                  placeholder="Enter Your Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <i className="bx bxs-phone-call"></i>
              </div>
            </div>
            <div className="form_submit">
              <button className="save" type="submit">
               {updateLoader ? <div className="loader"></div> : 'Save'} 
              </button>
              <Link to={`/${UserData.userName}/uadmin/dashboard`}>
                <button
                  className="discard"
                 
                 
                  
                >
                  Discard
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserAccountSetting;
