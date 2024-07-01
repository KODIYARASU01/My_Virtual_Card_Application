import React, { useState, useEffect, useContext } from "react";
import "./VCard_Form.scss";
import BasicForm from "./All_Form_Component/BasicForm";
import { Link, useNavigate } from "react-router-dom";
import Select_Template from "./All_Form_Component/Select_Template";
import Services from "./All_Form_Component/Services";
import Products from "./All_Form_Component/Products";
import Gallery from "./All_Form_Component/Gallery";
import Blog from "./All_Form_Component/Blog";
import Testimonial from "./All_Form_Component/Testimonial";
import Iframe from "./All_Form_Component/Iframe";
import SocialMedias from "./All_Form_Component/SocialMedias";
import Banner from "./All_Form_Component/Banner";
import Dynamic_VCard from "./All_Form_Component/Dynamic_VCard";
import Appoinment from "./All_Form_Component/Appoinment";
import Business_Hour from "./All_Form_Component/Business_Hour";
import Font from "./All_Form_Component/Font";
import Terms_Conditions from "./All_Form_Component/Terms&Conditions";
import Manage_Session from "./All_Form_Component/Manage_Session";
import axios from "axios";
import SuperAdmin_context from "../../../SuperAdmin_Context/SuperAdmin_context";
import Plan from "./All_Form_Component/Plan";
import PrivacyPolicy from "./All_Form_Component/PrivacyPolicy";

const VCard_Form = () => {
let{userName,currentPlan, setCurrentPlan,}=useContext(SuperAdmin_context)
  let navigate = useNavigate();
  let [userData, setUserData] = useState("jayakumar");
  let [ShowForm, setShowForm] = useState("Choose Your Plan");

  function handleFormShow(e) {
    setShowForm(e.target.innerText);
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
  return (
    <>
      <div className="vcard_form_container">
        <div className="vcard_form_title">
          <div className="title">
            <h5>Create Your VCard</h5>
          </div>
          <div className="action">
            <button
              onClick={() =>{
          
                (window.location.pathname = `/${userName}/uadmin/user_vcard`)
              }
          
              }
            >
              Back 
              <i className='bx bx-exit' ></i>
            </button>
          </div>
        </div>
        <div className="vcard_form_box">
     
     <div className="form_sidenav">
          <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Choose Your Plan" ? "menu_active" : ""}
            >
          
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
            {ShowForm === "Basic Detail" ? <BasicForm /> : ""}
            {ShowForm === "Choose Your Plan" ? <Plan /> : ""}
            {ShowForm === "VCard Templates" ? <Select_Template /> : ""}
            {ShowForm === "Services" ? <Services /> : ""}
            {ShowForm === "Products" ? <Products /> : ""}
            {ShowForm === "Galleries" ? <Gallery /> : ""}
            {ShowForm === "Blog" ? <Blog /> : ""}
            {ShowForm === "Testimonials" ? <Testimonial /> : ""}
            {ShowForm === "Iframes" ? <Iframe /> : ""}
            {ShowForm === "Social Link - Website" ? <SocialMedias /> : ""}
         
            {ShowForm === "PopUp Banner" ? <Banner /> : ""}
            {ShowForm === "Dynamic VCard" ? <Dynamic_VCard /> : ""}
            {ShowForm === "Appoinment" ? <Appoinment /> : ""}
            {ShowForm === "Business Hours" ? <Business_Hour /> : ""}
            {ShowForm === "Fonts" ? <Font /> : ""}
            {ShowForm === "Privacy Policy" ? <PrivacyPolicy/> : ""}
            {ShowForm === "Terms & Conditions" ? <Terms_Conditions /> : ""}
            {ShowForm === "Manage Sections" ? <Manage_Session /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default VCard_Form;
