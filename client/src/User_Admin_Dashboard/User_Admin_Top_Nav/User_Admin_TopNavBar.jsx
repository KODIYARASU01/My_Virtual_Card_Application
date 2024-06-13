import React, { useContext, useState, useEffect } from "react";
import "./User_Admin_TopNavBar.scss";
import SuperAdmin_context from "../../SuperAdmin_Context/SuperAdmin_context";
import virtualCard_logo from "../../assets/Company_Logo/logo.png";
import brand_logo from "../../assets/Company_Logo/logo1.png";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const User_Admin_TopNavBar = () => {
  let {
    userData,
    setUserData,
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

  let userDetails=JSON.parse(localStorage.getItem('datas'))
  return (
    <>
      <div className="navbar_container">
        <div className="topnav_wrapper">
          <div className="topnav_left">
            <div className="brand_logo">
              <Link to='/'>
              <img src={virtualCard_logo} alt="logo" />
              </Link>
           
            </div>
            {SideNavActions ? "" : <h4>MyVirtualCard.in</h4>}
            <div
              className="icon"
              onClick={() => setSideNavActions(!SideNavActions)}
            >
              <i className="uil uil-bars"></i>
            </div>
            <div className="current_menu">
              {/* <p>{`${window.location.pathname.slice(1,30).charAt(7).toUpperCase()}${window.location.pathname.slice(9,30)}`}</p> */}
              <p>{`${window.location.pathname.split('/')[1] + "/"} ${window.location.pathname.split('/')[3]}`}</p>
            </div>
          </div>
          <div className="topnav_right d-flex align-items-center justify-content-end">
            <div className="mode">
              <i className="bx bx-moon"></i>
            </div>
            <div className="user_profile">
              <img
                src={
                  userData.profile ||
                  "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1715790254~exp=1715793854~hmac=ba7343c32c0eb17b5cadcdddf5f5ea1b4cc7510ce54d4436095344458fedb8ca&w=740"
                }
                alt="logo"
              />
            </div>
            <div className="user_name d-flex align-items-center justify-content-center">
              <p>{userData.firstName}</p>
              <div
                className="down_arrow"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                {profileOpen ? (
                  <i className="bx bx-chevron-up"></i>
                ) : (
                  <i className="bx bx-chevron-down bx-flashing"></i>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User_Admin_TopNavBar;
