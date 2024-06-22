import React, { useContext, useState, useEffect } from "react";
import "./UserAdmin.scss";

import SuperAdmin_context from "../../SuperAdmin_Context/SuperAdmin_context";
import User_Admin_TopNavBar from "../User_Admin_Top_Nav/User_Admin_TopNavBar";
import User_Admin_SideNavBar from "../User_Admin_SideNav/User_Admin_SideNavBar";
import UserAccountSetting from "../User_Profile_Setting/UserAccountSetting";
import User_Dashboard from "../User_Admin_All_Component/User_Dashboard";
import User_VCards from "../User_Admin_All_Component/User_VCards";
import VCard_Form from "../User_Admin_All_Component/Vcard_Form/VCard_Form";
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
// import { Flip, toast, ToastContainer } from "react-toastify";
import { Toaster, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import VCard_Form_Edit from "../User_Admin_All_Component/Vcard_Form/VCard_Form_Edit";
const UserAdmin = () => {

  let {Index}=useParams()
  let navigate = useNavigate();

  let {
  
    userData,
    setUserData,
    userName,
    FormSubmitLoader,
    setFormSubmitLoader,
    SideNavActions,
    setSideNavActions,
    profileOpen,
    setProfileOpen,
    SuperAdminLoader,
    setSuperAdmin_Loader,
    loader4,
    EditUser,
    setEditUser,
    setLoader4,
    AddUser,
    setAddUser,
    setServiceId,
    user,
    setUser,
    UserDetails,
    setUserDetails,
    profileView,
    setProfileView,
    show,
    setShow,
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
    password,
    setPassword,
    loader,
    setLoader,
    Data,
    setData,
    BasicID,
    setBasicID,
    ProductId,
    setProdictId,
    QRCodeId,
    setQRCodeId,
    GallId,
    setGallId,
    TestimonialID,
    setTestimonialID,
    slideClose,
    setSlideShow,
    basicForm,
    setBasicForm,
    contactForm,
    setContactForm,
    serviceForm,
    setServiceForm,
    productForm,
    setProductForm,
    galleryForm,
    setGalleryForm,
    socialMediaForm,
    setSocialMediaForm,
    testimonialForm,
    setTestimonialForm,
    QRCodeForm,
    setQRCodeForm,
    banner,
    setBanner,
    userDetail,
    setUserDetail,
    logo,
    setLogo,
    fullName,
    setFullName,
    profession,
    setProfession,
    summary,
    setSummary,
    Email1,
    setEmail1,
    AlternateEmail,
    setAlternateEmail,
    MobileNumber1,
    setMobileNumber1,
    AlternateMobileNumber,
    setAlternateMobileNumber,
    DOB,
    setDOB,
    Address,
    setAddress,
    serviceImage,
    setServiceImage,
    serviceTitle,
    setServiceTitle,
    serviceSummary,
    setServiceSummary,
    productImage,
    setProductImage,
    productTitle,
    setProductTitle,
    productReleaseDate,
    setProductReleaseDate,
    productSummary,
    setProductSummary,
    galleryImage,
    setGalleryImage,
    videoURL,
    setVideoURL,
    Facebook,
    setFacebook,
    LinkedIn,
    setLinkedIn,
    WhatsUp,
    setWhatsUp,
    Instagram,
    setInstagram,
    Twiter,
    setTwiter,
    clientImage,
    setClientImage,
    clientName,
    setClientName,
    clientFeedbackDate,
    setClientFeedbackDate,
    clientFeedback,
    setClientFeedback,
    QRCodeImage,
    setQRCodeImage,
    ID,
    setID,
    loader2,
    setLoader2,
    BasicData,
    setBasicData,
    ContactData,
    setContactData,
    ServiceData,
    setServiceData,
    ProductData,
    setProductData,
    GalleryData,
    setGalleryData,
    SocialMediaData,
    setSocialMediaData,
    TestimonialData,
    setTestimonialData,
    QRCodeData,
    setQRCodeData,
    BasicEdit,
    setBasicEdit,
    ContactEdit,
    setContactEdit,
    ServiceEdit,
    setServiceEdit,
    ProductEdit,
    setProductEdit,
    GalleryEdit,
    setGalleryEdit,
    SocialMediaEdit,
    setSocialMediaEdit,
    TestimonialEdit,
    setTestimonialEdit,
    QRCodeEdit,
    setQRCodeEdit,
  } = useContext(SuperAdmin_context);

  let [confirmPassToggle, setConfirmPassToggle] = useState(false);
  let [showPass, setShowPass] = useState(false);

  function showPassFunctionlity() {
    let input = document.querySelector(".changePassInput");
    setShowPass(true);
    input.type = "text";
  }
  function hidePassFunctionlity() {
    let input = document.querySelector(".changePassInput");
    setShowPass(false);
    input.type = "password";
  }
  //LogOut user
  let handleSignOut = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("datas");
      toast.success("LogOut successfully");
      setTimeout(() => {
        setUser(null);
        <Navigate to="/" />;
        window.location.pathname = "/";
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  let userDetails = JSON.parse(localStorage.getItem("datas"));
  useEffect(() => {
    axios
      .get(`https://my-virtual-card-application.onrender.com/auth/register/${userDetails.id}`)
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [navigate]);
  return (
    <>
      <div className="userAdmin_container">
        {FormSubmitLoader ? (
          <div className="form_submit_loader">
            <div className="form_loader"></div>
          </div>
        ) : (
          ""
        )}
        <Toaster position="top-right" />
        <div className="top_navBar">
          <User_Admin_TopNavBar />
        </div>
        <div className="content_box">
          <div
            className={SideNavActions ? "content_left_small" : "content_left"}
          >
            <User_Admin_SideNavBar />
          </div>
          <div
            className="content_right"
            onClick={() => {
              setConfirmPassToggle(false), setProfileOpen(false);
            }}
          >
            {window.location.pathname === `/${userName}/uadmin/dashboard` ? (
              <User_Dashboard />
            ) : (
              ""
            )}
            {window.location.pathname === `/${userName}/uadmin/user_vcard` ? (
              <User_VCards />
            ) : (
              ""
            )}

            {window.location.pathname === `/${userName}/uadmin/vcard_form` ? (
              <VCard_Form />
            ) : (
              ''
            )}
            {window.location.pathname ==
            `/${userName}/uadmin/vcard_form_edit/${userName}/${Index}` ? (
              <VCard_Form_Edit />
            ) : (
              ""
            )}
            {window.location.pathname ===
            `/${userName}/uadmin/account_setting` ? (
              <UserAccountSetting />
            ) : (
              ""
            )}
            {/* {window.location.pathname === `/server${userName}/sadmin/users/newUser` ? (
              <NewUser />
            ) : (
              ""
            )}
            {window.location.pathname === `/server${userName}/sadmin/users/:id` ? (
              <SingleUser />
            ) : (
              ""
            )}
            {window.location.pathname === `/server${userName}/sadmin/vcards` ? <VCards /> : ""}
            {window.location.pathname === `/server${userName}/sadmin/sell_NFC_cards` ? (
              <NFC />
            ) : (
              ""
            )}
            {window.location.pathname === `/server${userName}/sadmin/cash_payments` ? (
              <CashPayment />
            ) : (
              ""
            )}
            {window.location.pathname === `/server${userName}/sadmin/vcard_templates` ? (
              <VCardTemplates />
            ) : (
              ""
            )}
            {window.location.pathname === `/server${userName}/sadmin/subscribed_plans` ? (
              <SubscribedPlans />
            ) : (
              ""
            )}
            {window.location.pathname === `/server${userName}/sadmin/plans` ? <Plans /> : ""}
            {window.location.pathname === `/server${userName}/sadmin/withdrawals` ? (
              <Withdrowals />
            ) : (
              ""
            )}
            {window.location.pathname === `/server${userName}/sadmin/coupon_code` ? (
              <CouponCode />
            ) : (
              ""
            )}
            {window.location.pathname === `/server${userName}/sadmin/cms` ? <CMS /> : ""}
            {window.location.pathname === `/server${userName}/sadmin/settings` ? <Setting /> : ""} */}
          </div>

          {/* //User Profile : */}

          <div className="profile_card" id={!profileOpen ? "profileclose" : ""}>
            <div className="user_details">
              <div className="profile">
                <img
                  src={
                    userData.profile ||
                    "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1715790254~exp=1715793854~hmac=ba7343c32c0eb17b5cadcdddf5f5ea1b4cc7510ce54d4436095344458fedb8ca&w=740"
                  }
                  alt="logo"
                />
              </div>
              <div className="user_name">
                <p>{userData.firstName}</p>
                <small>{userData.email}</small>
              </div>
            </div>
            <div className="user_settings">
              <div
                className="list"
                onClick={() => {
                  (window.location.pathname = `/${userName}/uadmin/account_setting`),
                    // navigate(`${userData.firstName}/uadmin/account_setting`)
                    setProfileOpen(false);
                }}
              >
                <i className="bx bxs-user text-success"></i>

                <p>Account Setting</p>
              </div>

              <div
                className="list"
                onClick={() => {
                  setConfirmPassToggle(true), setProfileOpen(false);
                }}
              >
                <i className="bx bxs-lock text-info"></i>

                <p>Change Password</p>
              </div>

              <div
                className="list"
                // onClick={() => {
                //   setProfileOpen(false);

                // }}
                onClick={handleSignOut}
              >
                <i className="bx bx-log-out-circle text-danger"></i>

                <p>Sign Out</p>
              </div>
            </div>
          </div>
          {/* //Change Passowrd */}

          <div
            className="change_pass_container"
            id={!confirmPassToggle ? "hide" : "show"}
          >
            <div className="box">
              <div className="title">
                <h4>Change Password</h4>
                <i
                  className="bx bx-comment-x"
                  onClick={() => setConfirmPassToggle(false)}
                ></i>
              </div>

              <form action="">
                <div className="form_group">
                  <label htmlFor="currentPass">
                    Current Password<sup>*</sup>
                  </label>
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="changePassInput"
                  />

                  {showPass ? (
                    <i
                      className="bx bxs-show"
                      onClick={hidePassFunctionlity}
                    ></i>
                  ) : (
                    <i
                      className="bx bxs-hide"
                      onClick={showPassFunctionlity}
                    ></i>
                  )}
                </div>
                <div className="form_group">
                  <label htmlFor="newPass">
                    New Password<sup>*</sup>
                  </label>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="changePassInput"
                  />
                  {showPass ? (
                    <i
                      className="bx bxs-show"
                      onClick={hidePassFunctionlity}
                    ></i>
                  ) : (
                    <i
                      className="bx bxs-hide"
                      onClick={showPassFunctionlity}
                    ></i>
                  )}
                </div>
                <div className="form_group">
                  <label htmlFor="confirmPass">
                    Confirm Password<sup>*</sup>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="changePassInput"
                  />
                  {showPass ? (
                    <i
                      className="bx bxs-show"
                      onClick={hidePassFunctionlity}
                    ></i>
                  ) : (
                    <i
                      className="bx bxs-hide"
                      onClick={showPassFunctionlity}
                    ></i>
                  )}
                </div>
                <div className="form_submit">
                  <div className="save">
                    <button> Save</button>
                  </div>
                  <div className="discard">
                    <button>Discard</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAdmin;
