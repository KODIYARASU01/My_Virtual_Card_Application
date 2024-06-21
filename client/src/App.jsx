import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import SuperAdmin_context from "./SuperAdmin_Context/SuperAdmin_context";
import SuperAdmin from "./Admin_Container/SuperAdmin/SuperAdmin";
import { Route, Routes } from "react-router-dom";
import Admins from "./Admin_Container/AllMenuComponent/Admins";
import Users from "./Admin_Container/AllMenuComponent/Users";
import VCards from "./Admin_Container/AllMenuComponent/VCards";
import NFC from "./Admin_Container/AllMenuComponent/NFC";
import CashPayment from "./Admin_Container/AllMenuComponent/CashPayment";
import VCardTemplates from "./Admin_Container/AllMenuComponent/VCardTemplates";
import SubscribedPlans from "./Admin_Container/AllMenuComponent/SubscribedPlans";
import Plans from "./Admin_Container/AllMenuComponent/Plans";
import Withdrowals from "./Admin_Container/AllMenuComponent/Withdrowals";
import CouponCode from "./Admin_Container/AllMenuComponent/CouponCode";
import CMS from "./Admin_Container/AllMenuComponent/CMS";
import Setting from "./Admin_Container/AllMenuComponent/Setting";
import Dashboard from "./Admin_Container/AllMenuComponent/Dashboard";
import NewUser from "./Admin_Container/AllMenuComponent/NewUser";
import SingleUser from "./Admin_Container/AllMenuComponent/SingleUser";
import HomePage from "./HomePage";
import AccountSetting from "./Admin_Container/ProfileComponent/AccountSetting";
import User_Dashboard from "./User_Admin_Dashboard/User_Admin_All_Component/User_Dashboard";
import UserAdmin from "./User_Admin_Dashboard/UserAdmin/UserAdmin";
import UserAccountSetting from "./User_Admin_Dashboard/User_Profile_Setting/UserAccountSetting";
import User_VCards from "./User_Admin_Dashboard/User_Admin_All_Component/User_VCards";
import VCard_Form from "./User_Admin_Dashboard/User_Admin_All_Component/Vcard_Form/VCard_Form";
import BasicForm from "./User_Admin_Dashboard/User_Admin_All_Component/Vcard_Form/All_Form_Component/BasicForm";
import Register from "./Authentication/Register/Register";
import Login from "./Authentication/Login/Login";
import NewCardDesign3 from "./All_VCards/NewCardDesign3";
import ForgotPassword from "./Authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "./Authentication/ResetPassword/ResetPassword";
import VCard_Form_Edit from "./User_Admin_Dashboard/User_Admin_All_Component/Vcard_Form/VCard_Form_Edit";
import toast from "react-hot-toast";

const App = () => {
  let [SideNavActions, setSideNavActions] = useState(false);
  let [profileOpen, setProfileOpen] = useState(false);
  let [searchQuery, setSearchQuery] = useState("");
  let [confirmPassToggle, setConfirmPassToggle] = useState(false);
  let [Index, setIndex] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  let [userToken, setUserToken] = useState("");
  let [loader3, setLoader3] = useState(false);
  let [loader4, setLoader4] = useState(false);
  let [loader5, setLoader5] = useState(false);
  let [SuperAdminLoader, setSuperAdmin_Loader] = useState(false);
  let [FormSubmitLoader, setFormSubmitLoader] = useState(false);
  //AllUser Data:
  let [userData, setUserData] = useState("Jayakumar");
  let [AllData, setAllData] = useState([]);
  // State to store user authentication
  let [UserDetails, setUserDetails] = useState([]);
  let [show, setShow] = useState(false);
  let [userName, setUserName] = useState("Jayakumar");
  let [profile, setProfile] = useState();
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [location, setLocation] = useState("");
  let [mobileNumber, setMobileNumber] = useState(null);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loader, setLoader] = useState(false);
  //Profile view toggle state:
  const [profileView, setProfileView] = useState(false);
  //New
  let [userDetail, setUserDetail] = useState();
  let [Data, setData] = useState("");
  let [BasicID, setBasicID] = useState("");
  let [ServiceId, setServiceId] = useState("");
  let [ProductId, setProdictId] = useState("");
  let [QRCodeId, setQRCodeId] = useState("");
  let [GallId, setGallId] = useState("");
  let [TestimonialID, setTestimonialID] = useState("");
  //States all
  let [slideClose, setSlideShow] = useState(false);
  let [basicForm, setBasicForm] = useState(true);
  let [contactForm, setContactForm] = useState(false);
  let [serviceForm, setServiceForm] = useState(false);
  let [productForm, setProductForm] = useState(false);
  let [galleryForm, setGalleryForm] = useState(false);
  let [socialMediaForm, setSocialMediaForm] = useState(false);
  let [testimonialForm, setTestimonialForm] = useState(false);
  let [QRCodeForm, setQRCodeForm] = useState(false);

  //Basic Detail form states:
  let [banner, setBanner] = useState();
  let [logo, setLogo] = useState();
  let [fullName, setFullName] = useState();
  let [profession, setProfession] = useState();
  let [summary, setSummary] = useState();

  //Contact Detail form States:

  let [Email1, setEmail1] = useState();
  let [AlternateEmail, setAlternateEmail] = useState();
  let [MobileNumber1, setMobileNumber1] = useState();
  let [AlternateMobileNumber, setAlternateMobileNumber] = useState();
  let [DOB, setDOB] = useState();
  let [Address, setAddress] = useState();

  //Service etail form states:

  let [serviceImage, setServiceImage] = useState();

  let [serviceTitle, setServiceTitle] = useState();
  let [serviceSummary, setServiceSummary] = useState();

  //Product detail form states:
  let [productImage, setProductImage] = useState();
  let [productTitle, setProductTitle] = useState();
  let [productReleaseDate, setProductReleaseDate] = useState();
  let [productSummary, setProductSummary] = useState();

  //Gallery:
  let [galleryImage, setGalleryImage] = useState();
  let [videoURL, setVideoURL] = useState();

  //SOcialMedia :

  let [Facebook, setFacebook] = useState();
  let [LinkedIn, setLinkedIn] = useState();
  let [WhatsUp, setWhatsUp] = useState();
  let [Instagram, setInstagram] = useState();
  let [Twiter, setTwiter] = useState();
  let [Website, setWebsite] = useState();
  let [Direction, setDirection] = useState();
  let [UTube, setUTube] = useState();
  let [Github, setGithub] = useState();

  //Testimonial:
  let [clientImage, setClientImage] = useState();
  let [clientName, setClientName] = useState();
  let [clientFeedbackDate, setClientFeedbackDate] = useState();
  let [clientFeedback, setClientFeedback] = useState();

  //QRCODE:

  let [QRCodeImage, setQRCodeImage] = useState();
  //Fetch data from mongoDb:

  let [ID, setID] = useState([]);
  let [loader2, setLoader2] = useState(false);

  let [BasicData, setBasicData] = useState([]);

  let [ContactData, setContactData] = useState([]);

  let [ServiceData, setServiceData] = useState([]);

  let [ProductData, setProductData] = useState([]);

  let [GalleryData, setGalleryData] = useState([]);

  let [SocialMediaData, setSocialMediaData] = useState([]);

  let [TestimonialData, setTestimonialData] = useState([]);

  let [QRCodeData, setQRCodeData] = useState([]);

  //Edit Data:
  let [BasicEdit, setBasicEdit] = useState(false);

  let [ContactEdit, setContactEdit] = useState(false);

  let [ServiceEdit, setServiceEdit] = useState(false);

  let [ProductEdit, setProductEdit] = useState(false);

  let [GalleryEdit, setGalleryEdit] = useState(false);

  let [SocialMediaEdit, setSocialMediaEdit] = useState(false);

  let [TestimonialEdit, setTestimonialEdit] = useState(false);
  let [QRCodeEdit, setQRCodeEdit] = useState(false);

  //Super Admin pannel Register form
  let [AddUser, setAddUser] = useState(false);
  let [EditUser, setEditUser] = useState(false);
  // let [userName, setUserName] = useState("Jayakumar");
  let [currentTemplate, setCurrentTemplate] = useState(null);
  let [savedTemplate, setSavedTemplate] = useState(null);
  //Plan:
  let [currentPlan, setCurrentPlan] = useState(null);
  let [SavedPlan, setSavedPlan] = useState(null);
  let [PlanPrice, setPlanPrice] = useState();

  useEffect(() => {
    const Token = JSON.parse(localStorage.getItem("datas"));
    if (Token) {
      setUser(Token);
      setUserName(Token.userName);
    } else {
      setUserName("Jayakumar");
    }
  }, [navigate]);
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/currentplan/specificAll/${localStorageDatas.userName}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.length <= 0) {
          setCurrentPlan(null);
        } else {
          setCurrentPlan(res.data.data[0].currentPlan);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [FormSubmitLoader]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/templateDetail/specificAll/${localStorageDatas.userName}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        }
      )
      .then((res) => {
      

        if (res.data.data[0].currentTemplate === null) {
          setCurrentTemplate(null);
        } else {
          setCurrentTemplate(res.data.data[0].currentTemplate);
          setSavedTemplate(res.data.data[0].currentTemplate);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [FormSubmitLoader]);

  return (
    <>
      <div className="App_container">
        <SuperAdmin_context.Provider
          value={{
            currentTemplate,
            setCurrentTemplate,
            savedTemplate,
            setSavedTemplate,
            SavedPlan,
            setSavedPlan,
            currentPlan, setCurrentPlan,
            Index,
            setIndex,
            userData,
            setUserData,
            FormSubmitLoader,
            setFormSubmitLoader,
            userName,
            setUserName,
            SideNavActions,
            setSideNavActions,
            profileOpen,
            setProfileOpen,
            searchQuery,
            setSearchQuery,
            confirmPassToggle,
            setConfirmPassToggle,
            show,
            SuperAdminLoader,
            setSuperAdmin_Loader,
            EditUser,
            setEditUser,
            AddUser,
            setAddUser,
            AllData,
            setAllData,
            loader4,
            setLoader4,
            loader5,
            setLoader5,
            ServiceId,
            setServiceId,
            currentPlan,
            setCurrentPlan,
            PlanPrice,
            setPlanPrice,
            userToken,
            setUserToken,
            UserDetails,
            setUserDetails,
            user,
            setUser,
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
            userToken,
            setUserToken,
            UserDetails,
            setUserDetails,
            user,
            setUser,
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
            Website,
            setWebsite,
            Direction,
            setDirection,
            UTube,
            setUTube,
            Github,
            setGithub,
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
            loader3,
            setLoader3,
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
          }}
        >
          {/* <SuperAdmin/> */}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to={`/${userName}/uadmin/dashboard`} />
                ) : (
                  <Login />
                )
              }
            />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route
              path="/reset_password/:id/:token"
              element={<ResetPassword />}
            />
            <Route path="/" element={<HomePage />} />
            <Route path="/new_card3" element={<NewCardDesign3 />} />
            <Route path="/sadmin" element={<SuperAdmin />}>
              <Route path="/sadmin/dashboard" element={<Dashboard />} />

              <Route path="/sadmin/admins" element={<Admins />} />
              <Route path="/sadmin/users" element={<Users />}>
                <Route path="newUser" element={<NewUser />} />
                <Route path=":id" element={<SingleUser />} />
              </Route>
              <Route path="/sadmin/vcards" element={<VCards />} />
              <Route path="/sadmin/sell_NFC_cards" element={<NFC />} />
              <Route path="/sadmin/cash_payments" element={<CashPayment />} />
              <Route
                path="/sadmin/vcard_templates"
                element={<VCardTemplates />}
              />
              <Route
                path="/sadmin/subscribed_plans"
                element={<SubscribedPlans />}
              />
              <Route path="/sadmin/plans" element={<Plans />} />
              <Route path="/sadmin/withdrawals" element={<Withdrowals />} />
              <Route path="/sadmin/coupon_code" element={<CouponCode />} />
              <Route path="/sadmin/cms" element={<CMS />} />
              <Route path="/sadmin/settings" element={<Setting />} />
              <Route
                path="/sadmin/account_setting"
                element={<AccountSetting />}
              />
            </Route>
            <Route path={`/${userName}/uadmin`} element={<UserAdmin />}>
              <Route
                path={`/${userName}/uadmin/dashboard`}
                element={<User_Dashboard />}
              />
              <Route
                path={`/${userName}/uadmin/user_vcard`}
                element={<User_VCards />}
              />
              <Route
                path={`/${userName}/uadmin/vcard_form`}
                element={<VCard_Form />}
              />
              <Route
                path={`/${userName}/uadmin/vcard_form_edit/:userName/:Index`}
                element={<VCard_Form_Edit />}
              />
              <Route
                path={`/${userName}/uadmin/vcard_form/basic_form`}
                element={<BasicForm />}
              />

              <Route
                path={`/${userName}/uadmin/account_setting`}
                element={<UserAccountSetting />}
              />
            </Route>
          </Routes>
        </SuperAdmin_context.Provider>
      </div>
    </>
  );
};

export default App;
