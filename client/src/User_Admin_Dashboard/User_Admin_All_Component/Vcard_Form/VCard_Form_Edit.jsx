import React, { useState, useEffect, useContext } from "react";
import "./VCard_Form_Edit.scss";
import Edit_BasicForm from "./Edit_All_Form_Component/Edit_BasicForm";
import { Link, useNavigate } from "react-router-dom";
import Edit_Select_Template from "./Edit_All_Form_Component/Edit_Select_Template";
import Edit_Services from "./Edit_All_Form_Component/Edit_Services";
import Edit_Products from "./Edit_All_Form_Component/Edit_Products";
import Edit_Gallery from "./Edit_All_Form_Component/Edit_Gallery";
import Edit_Blog from "./Edit_All_Form_Component/Edit_Blog";
import Edit_Testimonial from "./Edit_All_Form_Component/Edit_Testimonial";
import Edit_Iframe from "./Edit_All_Form_Component/Edit_Iframe";
import Edit_SocialMedias from "./Edit_All_Form_Component/Edit_SocialMedias";
import Edit_Banner from "./Edit_All_Form_Component/Edit_Banner";
import Edit_Dynamic_VCard from "./Edit_All_Form_Component/Edit_Dynamic_VCard";
import Edit_Appoinment from "./Edit_All_Form_Component/Edit_Appoinment";
import Edit_Business_Hour from "./Edit_All_Form_Component/Edit_Business_Hour";
import Edit_Font from "./Edit_All_Form_Component/Edit_Font";
import Edit_Terms_Conditions from "./Edit_All_Form_Component/Edit_Terms&Conditions";
import Edit_Manage_Session from "./Edit_All_Form_Component/Edit_Manage_Session";
import axios from "axios";
import { useParams } from "react-router-dom";
import SuperAdmin_context from "../../../SuperAdmin_Context/SuperAdmin_context";
import Edit_Plan from "./Edit_All_Form_Component/Edit_Plan";
import toast from "react-hot-toast";
import Edit_PrivacyPolicy from "./Edit_All_Form_Component/Edit_PrivacyPolicy";
import Edit_QR_Code from "./Edit_All_Form_Component/Edit_QR_Code";

const VCard_Form_Edit = () => {
let{userName,currentPlan, setCurrentPlan,}=useContext(SuperAdmin_context)
  let navigate = useNavigate();
  let [formSliderToggle,setFormSliderToggle]=useState(false);
  let [userData, setUserData] = useState("jayakumar");
  let [ShowForm, setShowForm] = useState("Choose Your Plan");
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  function handleFormShow(e) {

    try{
      axios.get(`http://localhost:3001/currentplan/specificAll/${userName}`,   {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageDatas.token}`,
        },
      }).then((res)=>{
        console.log(res.data.data.length)

        if(res.data.data.length == 1){
          setShowForm(e.target.innerText);
        }
        // else if(e.target.innerText='Choose Your Plan'){
        //   setShowForm(e.target.innerText);
        // }
        else{
          toast.error('Choose Your Plan First!')
        }
      }).catch((error)=>{
        toast.error(error.response.data.message)
      })
    }
    catch(error){
      toast.error(error.message)
    }
  }
  let userDetails = JSON.parse(localStorage.getItem("datas"));
  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/register/${userDetails.id}`)
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);
  console.log(formSliderToggle)
  return (
    <>
      <div className="vcard_form_container">
        <div className="vcard_form_title">
          <div className="title">
            <h5>Update Your VCard</h5>
          </div>
          <div className="back_action">
            <button
            className="back"
              onClick={() =>
                (window.location.pathname = `/${userName}/uadmin/user_vcard`)
              }
            >
              Back
              <i className='bx bx-exit' ></i>
            </button>
          </div>
        </div>
        <div className="vcard_form_box">
     
        <div className="form_sidenav" id={formSliderToggle ? "slideClose":'slideOpen'}>

          <div className="slider_icon" onClick={()=>setFormSliderToggle(!formSliderToggle)}>
          <i className='bx bx-slider-alt' ></i>
          </div>
        <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Choose Your Plan" ? "menu_active" : ""}
            >
              {/* <i className="bx bxs-spreadsheet" style={{ color: "green" }}></i> */}
              <img width="24" height="24" src="https://img.icons8.com/3d-fluency/94/cash-in-hand.png" alt="cash-in-hand"/>

              <small>Choose Your Plan</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Basic Detail" ? "menu_active" : ""}
            >
              <i className="bx bxs-user" style={{ color: "blue" }}></i>
              <small>Basic Detail</small>
            </div>
         
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "VCard Templates" ? "menu_active" : ""}
            >
              <i className="bx bxs-spreadsheet" style={{ color: "green" }}></i>

              <small>VCard Templates</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Social Link - Website" ? "menu_active" : ""}
            >
              <i className="bx bxs-planet" style={{ color: "tomato" }}></i>
              <small>Social Link - Website</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Services" ? "menu_active" : ""}
            >
              <i className="bx bx-trophy" style={{ color: "black" }}></i>
              <small>Services</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Products" ? "menu_active" : ""}
            >
              <i
                className="bx bxl-product-hunt"
                style={{ color: "orange" }}
              ></i>
              <small>Products</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Galleries" ? "menu_active" : ""}
            >
              <i className="bx bxs-photo-album" style={{ color: "violet" }}></i>
              <small>Galleries</small>
            </div>
       
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Testimonials" ? "menu_active" : ""}
            >
              <i className="bx bxs-star" style={{ color: "red" }}></i>
              <small>Testimonials</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "PopUp Banner" ? "menu_active" : ""}
            >
              <i className="bx bxs-image-add" style={{ color: "darkGray" }}></i>
              <small>PopUp Banner</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Business Hours" ? "menu_active" : ""}
            >
              <i className="bx bxs-hourglass" style={{ color: "skyblue" }}></i>
              <small>Business Hours</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Customize QR Code" ? "menu_active" : ""}
            >
              <i className="bx bx-qr-scan"></i>
              <small>Customize QR Code</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Privacy Policy" ? "menu_active" : ""}
            >
          
              <i className='bx bxs-lock' style={{ color: "grey" }}></i>
              <small>Privacy Policy</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Terms & Conditions" ? "menu_active" : ""}
            >
              <i className="bx bxs-notepad" style={{ color: "green" }}></i>
              <small>Terms & Conditions</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Manage Sections" ? "menu_active" : ""}
            >
              <i className="bx bxs-slideshow" style={{ color: "tomato" }}></i>
              <small>Manage Sections</small>
            </div>
            <div className="progressing">
            <small>On Working  Progress</small>
            <i class='bx bx-chevrons-down bx-fade-down' ></i>
            </div>
    
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Iframes" ? "menu_active" : ""}
            >
              <i className="bx bx-shape-square" style={{ color: "grey" }}></i>
              <small>Iframes</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Appoinment" ? "menu_active" : ""}
            >
              <i className="bx bxs-calendar" style={{ color: "royalBlue" }}></i>
              <small>Appoinment</small>
            </div>
         
         
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Dynamic VCard" ? "menu_active" : ""}
            >
              <i className="bx bxs-landscape" style={{ color: "orange" }}></i>
              <small>Dynamic VCard</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Blog" ? "menu_active" : ""}
            >
              <i className="bx bxl-blogger" style={{ color: "purple" }}></i>
              <small>Blog</small>
            </div>
         
          
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Fonts" ? "menu_active" : ""}
            >
              <i className="bx bx-font-family" style={{ color: "skyblue" }}></i>
              <small>Fonts</small>
            </div>
        
           
          </div>
          <div className="all_form_inputs">
            {ShowForm === "Basic Detail" ? <Edit_BasicForm /> : ""}
            {ShowForm === "Choose Your Plan" ? <Edit_Plan /> : ""}
            {ShowForm === "VCard Templates" ? <Edit_Select_Template /> : ""}
            {ShowForm === "Services" ? <Edit_Services /> : ""}
            {ShowForm === "Products" ? <Edit_Products /> : ""}
            {ShowForm === "Galleries" ? <Edit_Gallery /> : ""}
            {ShowForm === "Blog" ? <Edit_Blog /> : ""}
            {ShowForm === "Testimonials" ? <Edit_Testimonial /> : ""}
            {ShowForm === "Iframes" ? <Edit_Iframe /> : ""}
            {ShowForm === "Social Link - Website" ? <Edit_SocialMedias /> : ""}
            {ShowForm === "Customize QR Code" ? <Edit_QR_Code/>:''}
            {ShowForm === "PopUp Banner" ? <Edit_Banner /> : ""}
            {ShowForm === "Dynamic VCard" ? <Edit_Dynamic_VCard /> : ""}
            {ShowForm === "Appoinment" ? <Edit_Appoinment /> : ""}
            {ShowForm === "Business Hours" ? <Edit_Business_Hour /> : ""}
            {ShowForm === 'Privacy Policy' ?  <Edit_PrivacyPolicy/>: ''}
            {ShowForm === "Fonts" ? <Edit_Font /> : ""}
            {ShowForm === "Terms & Conditions" ? <Edit_Terms_Conditions /> : ""}
            {ShowForm === "Manage Sections" ? <Edit_Manage_Session /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default VCard_Form_Edit;
