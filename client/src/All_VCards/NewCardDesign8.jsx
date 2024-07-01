import React, { useRef, useEffect, useState } from "react";
import "./NewCardDesign8.scss";
import { Link, useParams } from "react-router-dom";
import banner_img from "../assets/DigiCard_8/banner1.jpg";
import avatar_img from "../assets/DigiCard_8/logo2.jpg";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "react-quill/dist/quill.snow.css";
// import Carousel from 'better-react-carousel';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import axios from "axios";
import emailjs from "@emailjs/browser";
//Product
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

// import Carousel1 from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

//QRCODE:

import qrcode from "../assets/DigiCard_8/qr.svg";
//Testimonial

// ProductSlider
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import vCardsJS from "vcards-js";
const NewCardDesign8 = () => {
  let [share, setShare] = useState(false);
  //create a new vCard
  var vCard = vCardsJS();

  function generateVCF() {
    //set properties
    vCard.firstName = "Jayakumar";
    vCard.middleName = "";
    vCard.lastName = "V";
    vCard.organization = "Aristostech India Private Limited,CEO";
    vCard.photo.attachFromUrl(
      "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1714999372~exp=1715002972~hmac=148ead13ab2f0dc4db7268fb984501266e0547e55d0bd1a6918e3e51ca5a5af4&w=740",
      "JPEG"
    );
    vCard.workPhone = "+91 9344482370";
    vCard.birthday = new Date(1985, 0, 1);
    vCard.title = "Bussiness Man";
    vCard.url = "https://www.aristostechindia.com/";
    vCard.note = "Notes on Eric";

    //save to file
    // vCard.saveToFile('./eric-nesser.vcf');
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", `data:,${vCard.getFormattedString()}`);
    linkElement.setAttribute("download", "card.vcf");
    linkElement.style.display = "none";
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  }

  // your custom dot component with prop `isActive`
  const MyDot = ({ isActive }) => (
    <span
      style={{
        display: "inline-block",
        height: isActive ? "8px" : "5px",
        width: isActive ? "8px" : "5px",
        background: "#1890ff",
      }}
    ></span>
  );

  let [serviceLoad, setServiceLoad] = useState(false);

  const buttonStyle = {
    width: "0px",
    background: "none",
    opacity: 0,
    border: "0px",
    padding: "0px",
  };
  const properties = {
    prevArrow: (
      <button style={{ ...buttonStyle }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff"
        >
          <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
        </svg>
      </button>
    ),
    nextArrow: (
      <button style={{ ...buttonStyle }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff"
        >
          <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
        </svg>
      </button>
    ),
  };
  let id = useParams();
  let [formData, setFormData] = useState({
    clientFullName1: "",
    clientEmail1: "",
    clientMobileNumber1: "",
    clientInquiries1: "",
  });
  //Popup show :
  let [popup, setPopup] = useState(false);
  //Form Submit loader :
  let [loading, setLoading] = useState(false);
  //Collect form data by using useRef:
  let form = useRef();
  let popUp_open = {
    hide: { opacity: 0, scale: 0.2 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring" },
    },
  };
  //recieve email and send email to user by  emailJS:
  const sendEmail = (e) => {
    // e.preventDefault();

    emailjs
      .sendForm(
        "service_8jjtsu7",
        "template_5ro61jb",
        form.current,
        "6JJQhAKoQ9fGApzig"
      )
      .then(
        (result) => {
          // console.log(result.text);
          // console.log('message sent success')
        },
        (error) => {
          // console.log(error.text);
        }
      );
  };
  //Form Logic :
  let formik = useFormik({
    initialValues: {
      clientFullName1: "",
      clientEmail1: "",
      clientMobileNumber1: "",
      clientInquiries1: "",
    },

    //Validation :
    validationSchema: Yup.object({
      clientFullName1: Yup.string()
        .min(3, "Min 3 char required")
        .max(20, "Name must be 20 character or less")
        .required("Name is required"),
      clientEmail1: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      clientMobileNumber1: Yup.string()
        .min(10, "Invalid Mobile number")
        .max(10, "Invalid Mobile number")
        .required("MobileNumber is required"),
      clientInquiries1: Yup.string()
        .min(10, "Minimum 10 character required")
        .max(100, "Inquiries must be 100 character or less")
        .required("Inquiries is required"),
    }),
    //Form Submit :
    onSubmit: (values) => {
      setFormData({
        clientFullName1: values.clientFullName1,
        clientEmail1: values.clientEmail1,
        clientMobileNumber1: values.clientMobileNumber1,
        clientInquiries1: values.clientInquiries1,
      });

      sendEmail();
      setLoading(!loading);
      setConfetti(true);
      setTimeout(() => {
        setPopup(!popup);
        setLoading(false);
        setConfetti(!confetti);
        formik.values.clientFullName1 = "";
        formik.values.clientEmail1 = "";
        formik.values.clientMobileNumber1 = "";
        formik.values.clientInquiries1 = "";
      }, 4000);

      setTimeout(() => {
        setPopup(false);
      }, 7000);
      StopConfetti();
    },
  });
  let [feedbackForm, setFeedbackForm] = useState({
    userName: "",
    userFeedback: "",
    currentRatting: 0,
  });
  let [feedbackLoader, setFeedbackLoader] = useState(false);
  let [commentOpen, setCommentOpen] = useState(false);
  let [AllFeedBacks, setAllFeedBacks] = useState([]);
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  //Form Logic :
  let feedbackFormik = useFormik({
    initialValues: {
      userName: "",
      userFeedback: "",
      currentRatting: 0,
    },

    //Validation :
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(3, "Min 3 char required")
        .max(50, "Name must be 20 character or less")
        .required("Name is required"),
      userFeedback: Yup.string()
        .min(10, "Minimum 10 character required")
        .max(400, "Feedback must be 100 character or less")
        .required("Feedback is required"),
    }),
    //Form Submit :
    onSubmit: async (values) => {
      setFeedbackForm({
        userName: values.userName,
        userFeedback: values.userFeedback,
        currentRatting: values.currentRatting,
      });
      feedBackSubmit();
      setTimeout(() => {
        feedbackFormik.values.userName = "";
        feedbackFormik.values.userFeedback = "";
        feedbackFormik.values.currentRatting = 0;
      }, 4000);
    },
  });
  //Start Ratting:
  // let currentRatting=0;
  function handleRatting(e) {
    let star = e.target;
    // console.log(star,star.classList);
    if (star.classList.contains("star")) {
      let ratting = parseInt(star.dataset.rating, 10);
      highlightStar(ratting);
    }
  }
  //Remove Ratting:
  function removeRatting() {
    highlightStar(feedbackForm.currentRatting);
  }
  //Staring Setted
  function RattingSetted(e) {
    let starRating = document.querySelector(".ratting_container");
    let star = e.target;
    // console.log(star,star.classList);
    if (star.classList.contains("star")) {
      feedbackForm.currentRatting = parseInt(star.dataset.rating, 10);
      starRating.setAttribute("data-rating", feedbackForm.currentRatting);
      highlightStar(feedbackForm.currentRatting);
    }
  }

  //Highlight star color:
  function highlightStar(ratting) {
    let stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      if (index < ratting) {
        star.classList.add("highlight");
      } else {
        star.classList.remove("highlight");
      }
    });
  }

  //openFullImage preview:
  function openFullImage(pic) {
    let fullImageBox = document.getElementById("fullImageBox");
    let fullImage = document.getElementById("fullImage");
    fullImageBox.style.display = "block";
    fullImage.src = pic;
  }

  //Close FullImage Preview
  function closeFullImage() {
    let fullImageBox = document.getElementById("fullImageBox");

    fullImageBox.style.display = "none";
  }
  // Create a ref for the element you want to scroll to
  const targetRef = useRef(null);

  // Function to handle image click
  const handleImageClick = () => {
    // Scroll to the target element
    targetRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div className="newCard_design8_container">
        <div id="card_design_box8">
          {/* Banner */}

          <div className="card8_box1">
            <img className="banner" loading="lazy" src='https://img.freepik.com/free-photo/delicious-pizza-with-tomatoes_23-2150857784.jpg?t=st=1715257451~exp=1715261051~hmac=42b841b1684bef8b956f5c46e09c422fde847fb1d055e355921ebf768a63955a&w=1060' alt="banner" />
            <div className="overlay"></div>
            <img
              className="logo"
              src="https://img.freepik.com/free-photo/view-cartoon-male-chef-with-delicious-3d-pizza_23-2151017656.jpg?t=st=1715257406~exp=1715261006~hmac=77ff8d287a1e47c45f8c6fa3135c546439b409d11df1d47018de310321deeea3&w=826"
              alt="logo"
              loading="lazy"
            />

            <div className="user_detail">
              <h4>Thirupathii</h4>
              <small>Executive Chef</small>
            </div>
          </div>
          {/* SocialMedia */}
          <div className="card8_box2">
            <div className="social_medias">
              <a href="#">
                <i className="bx bxl-facebook"></i>
              </a>
              <a href="#">
                <i className="bx bxl-whatsapp"></i>
              </a>
              <a href="#">
                <i className="bx bxl-linkedin"></i>
              </a>
              <a href="#">
                <i className="bx bxl-instagram-alt"></i>
              </a>
              <a href="#">
                <i className="bx bxl-twitter"></i>
              </a>
              <a href="#">
                <i className="bx bxl-youtube"></i>
              </a>
            </div>
          </div>
          {/* Summary`` */}
          <div className="card8_box3">
            <div className="summary">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos, aliquid inventore minus dolore excepturi animi
                error beatae temporibus. Nihil atque alias et odit beatae dicta
                rem maxime officia cupiditate vitae.
              </p>
            </div>
          </div>
          {/* Contact */}
          <div className="card8_box4">
            <div className="contact_title">
              <h4>Contact</h4>
            </div>

            <div className="contact_container">
              <div className="contact_box">
                <div className="icon">
                  <i className="bx bxs-envelope"></i>
                </div>
                <div className="contact_detail">
                  <small>E-mail Address</small>
                  <h6>kodiyarasu01@gmail.com</h6>
                </div>
              </div>
              <div className="contact_box">
                <div className="icon">
                  <i className="bx bx-mobile"></i>
                </div>
                <div className="contact_detail">
                  <small>Mobile Number</small>
                  <h6>+91 4564646546</h6>
                </div>
              </div>
              <div className="contact_box">
                <div className="icon">
                  <i className="bx bxs-party"></i>
                </div>
                <div className="contact_detail">
                  <small>Date Of Birth</small>
                  <h6>26-01-2000</h6>
                </div>
              </div>
              <div className="contact_box">
                <div className="icon">
                  <i className="bx bxs-location-plus"></i>
                </div>
                <div className="contact_detail">
                  <small>Address</small>
                  <h6>Chennai , Tamil Nadu</h6>
                </div>
              </div>
            </div>
            <div className="add_to_contact">
              <button onClick={generateVCF}>
                <i className="bx bxs-contact"></i>Add To Contact
              </button>
            </div>
          </div>
          {/* Gallery */}
          <div className="card8_box5">
            <div className="gallery_title">
              <h4>Gallery</h4>
            </div>
            <div className="gallery_container">
              <div className="full_image" id="fullImageBox">
                <div className="close_Full_Image_gallery">
                  <i
                    class="bx bxs-message-square-x"
                    onClick={closeFullImage}
                  ></i>
                </div>
                <img src={banner_img} alt="gallery" id="fullImage" />
              </div>
              <div className="col_1">
                <img
                  src="https://img.freepik.com/free-photo/top-view-pakistan-food-arrangement_23-2148821544.jpg?t=st=1714279105~exp=1714282705~hmac=0da66ef970a50c799d9d642c2bade46845456abfa8087533bc23459a7816616e&w=740"
                  alt="gall"
                  onClick={(e) => openFullImage(e.target.src)}
                  loading="lazy"
                />
                <img
                  src="https://img.freepik.com/free-photo/high-angle-delicious-pakistan-dish-assortment_23-2148821527.jpg?t=st=1714279138~exp=1714282738~hmac=ab614522e279fa4dd2e7c63c83d39b7c5a7d6bc567614ec7134676c7e0729868&w=900"
                  alt=""
                  onClick={(e) => openFullImage(e.target.src)}
                  loading="lazy"
                />
                <img
                  src="https://img.freepik.com/free-photo/high-angle-pakistan-meal-composition_23-2148821517.jpg?t=st=1714279156~exp=1714282756~hmac=3c686a7a32b5edb80a44b6b9dfb42dce2f4d2adb30a65550a71a307dd6034ef6&w=900"
                  alt=""
                  onClick={(e) => openFullImage(e.target.src)}
                  loading="lazy"
                />
              </div>

              <div className="col_3">
                <img
                  src="https://img.freepik.com/free-photo/delicious-indian-food-tray_23-2148723505.jpg?t=st=1714278877~exp=1714282477~hmac=d9a9c0c1807f31ce801b547995e73eb160f0a7d6306c17a4b01e431d369d3c15&w=826"
                  alt=""
                  onClick={(e) => openFullImage(e.target.src)}
                  loading="lazy"
                />
                <img
                  src="https://img.freepik.com/free-photo/photo-traditional-indian-food-dish-celebrate-diwali_125540-3656.jpg?t=st=1714278912~exp=1714282512~hmac=60b7489e40e635a2d53c89952346008e0bc40035bb0ea62476146905205a5fcf&w=900"
                  alt=""
                  onClick={(e) => openFullImage(e.target.src)}
                  loading="lazy"
                />
                <img
                  src="https://img.freepik.com/free-photo/selection-food-tray_1340-23421.jpg?t=st=1714278962~exp=1714282562~hmac=9b55c6e21ae72b0ba7e3c09c931f953c1cf4b036828573970ec526bb1ced7c9e&w=900"
                  alt=""
                  onClick={(e) => openFullImage(e.target.src)}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          {/* Services */}
          <div className="card8_box6">
            <div className="service_title">
              <h4>Our Services</h4>
            </div>
            <div className="service_container">
              <div className="service_box">
                <div className="icon">
                  <i className="bx bxs-bowl-hot"></i>
                </div>
                <div className="details">
                  <h4>Cooking</h4>
                  <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illum eveniet sunt tempore ducimus, repellat consequuntur?
                  </small>
                </div>
              </div>
              <div className="service_box">
                <div className="icon">
                  <i className="uil uil-user-md"></i>
                </div>
                <div className="details">
                  <h4>Catering Services</h4>
                  <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illum eveniet sunt tempore ducimus, repellat consequuntur?
                  </small>
                </div>
              </div>
            </div>
          </div>
          {/* Testimonial */}
          <div className="card8_box7">
            <div className="testimonial_title">
              <h4>Testimonials</h4>
            </div>
            <div className="Testimonial8">
              <div className="testimonial_box">
                <Carousel autoPlay="true" className="carousel">
                  <div className="testimonial5_details">
                    <div className="user_profile">
                      <img src={banner_img} alt="logo" loading="lazy"/>
                    </div>

                    <div className="user_detail">
                      <h4>Jayakumar V</h4>
                      <small>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit.
                      </small>
                    </div>

                    <div className="date">
                      <small>__/__/____</small>
                    </div>
                  </div>
                  <div className="testimonial5_details">
                    <div className="user_profile">
                      <img src={avatar_img} alt="logo" />
                    </div>

                    <div className="user_detail">
                      <h4>Kodiyarasu C</h4>
                      <small>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit.
                      </small>
                    </div>

                    <div className="date">
                      <small>__/__/____</small>
                    </div>
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
          {/* Products */}
          <div className="card8_box8">
            <div className="product_title">
              <h4>Our Products</h4>
            </div>
            <div className="product_container">
              <div className="product_box" onClick={handleImageClick}>
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/free-photo/plate-food-with-lemon-lemon_505751-3815.jpg?t=st=1714332646~exp=1714336246~hmac=9dec1f16292a818752ac319bde92052c525fd49a00e9f1393ab97af7da61bc1c&w=1060"
                    alt="product"
                    loading="lazy"
                  />
                </div>
                <div className="product_title">
                  <h3>Chicken Briyani</h3>
                </div>
                <div className="product_summary">
                  <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </small>
                </div>
                <div className="product_price">
                  <small>₹ 500</small>
                </div>
              </div>
              <div className="product_box" onClick={handleImageClick}>
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/free-photo/bowl-biryani-with-spoon-bowl-food-it_505751-3822.jpg?t=st=1714332674~exp=1714336274~hmac=bdf93359f1ed477ddabb8d36e05ddc4e35fcbf1be495c141c8270b44d620158d&w=1060"
                    alt="product"
                    loading="lazy"
                  />
                </div>
                <div className="product_title">
                  <h3>Mutton Briyani</h3>
                </div>
                <div className="product_summary">
                  <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </small>
                </div>
                <div className="product_price">
                  <small>₹ 500</small>
                </div>
              </div>
              <div className="product_box" onClick={handleImageClick}>
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/free-photo/close-up-appetizing-ramadan-meal_23-2151182491.jpg?t=st=1714332766~exp=1714336366~hmac=5bfb6cbc2a3d22ef55a0e18843caa50340722640b07c14e41427c7c50a7aa4d5&w=1060"
                    alt="product"
                    loading="lazy"
                  />
                </div>
                <div className="product_title">
                  <h3>Full Meals</h3>
                </div>
                <div className="product_summary">
                  <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </small>
                </div>
                <div className="product_price">
                  <small>₹ 500</small>
                </div>
              </div>
              <div className="product_box" onClick={handleImageClick}>
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/premium-photo/sargi-karwa-chauth-breakfast-menu-before-starting-fasting-upwas-karva-chauth-indian-food_466689-86792.jpg?w=740"
                    alt="product"
                    loading="lazy"
                  />
                </div>
                <div className="product_title">
                  <h3>Breakfast Items</h3>
                </div>
                <div className="product_summary">
                  <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </small>
                </div>
                <div className="product_price">
                  <small>₹ 500</small>
                </div>
              </div>
            </div>
          </div>
          {/* Appoinment */}
          <div className="card8_box9">
            <div className="appoinment_title">
              <h4>Book Appoinment</h4>
            </div>
            <div className="appoinment_container">
              <form action="">
                <div className="form_group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    placeholder="pick date"
                    name="date"
                    id="date"
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="date">Hour</label>
                  <div className="times">
                    <input
                      className="time_input"
                      type="text"
                      name="time"
                      id="time"
                      value="9.30 - 10.30"
                      readOnly
                    />
                    <input
                      className="time_input"
                      type="text"
                      name="time"
                      value="11.00 - 12.00"
                      id="time"
                      readOnly
                    />
                    <input
                      className="time_input"
                      type="text"
                      name="time"
                      value="1.00 - 02.00"
                      id="time"
                      readOnly
                    />
                    <input
                      className="time_input"
                      type="text"
                      name="time"
                      value="4.30 - 05.30"
                      id="time"
                      readOnly
                    />
                  </div>
                </div>

                <div className="form_submit">
                  <button>
                    <i className="bx bx-subdirectory-right"></i>
                    Book Appoinment
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* QRCode */}
          <div className="card8_box10">
            <div className="qrcode_title">
              <h4>QR Code</h4>
            </div>
            <div className="qrcode_container">
              <div className="qrcode_box">
                <div className="qrcode">
                  <img src={qrcode} alt="qrcode" />
                </div>
              </div>
            </div>
          </div>
          {/* Feedback */}
          <div className="card8_box11">
            <div className="feedback_title">
              <h4>Feedback</h4>
            </div>
            <div className="feedback_container8">
              <form action="" onSubmit={feedbackFormik.handleSubmit}>
                <div className="form_group">
                  <label
                    htmlFor="clientName_Input"
                    className={`${
                      feedbackFormik.errors.userName ? "error" : ""
                    } `}
                  >
                    {feedbackFormik.touched.userName &&
                    feedbackFormik.errors.userName
                      ? feedbackFormik.errors.userName
                      : "Your Name"}
                    <span>
                      <sup>*</sup>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    name="userName"
                    id="userName"
                    // value={userName}
                    // onChange={(e)=>setUserName(e.target.value)}
                    value={feedbackFormik.values.userName}
                    onChange={feedbackFormik.handleChange}
                    onBlur={feedbackFormik.handleBlur}
                  />
                </div>
                <div className="form_group">
                  <label
                    htmlFor="clientFeedBack_Input"
                    className={`${
                      feedbackFormik.errors.userFeedback ? "error" : ""
                    } `}
                  >
                    {feedbackFormik.touched.userFeedback &&
                    feedbackFormik.errors.userFeedback
                      ? feedbackFormik.errors.userFeedback
                      : "Your FeedBack"}
                    <span>
                      <sup>*</sup>
                    </span>
                  </label>
                  <textarea
                    id="userFeedback"
                    name="userFeedback"
                    cols="30"
                    rows="7"
                    placeholder="Enter your Feedback"
                    // value={userFeedback}
                    // onChange={(e)=>setUserFeedback(e.target.value)}
                    value={feedbackFormik.values.userFeedback}
                    onChange={feedbackFormik.handleChange}
                    onBlur={feedbackFormik.handleBlur}
                  ></textarea>
                </div>
                <div className="form_group">
                  <label
                    htmlFor="clientName_Input"
                    className={`${
                      feedbackFormik.errors.currentRatting ? "error" : ""
                    } `}
                  >
                    {feedbackFormik.touched.currentRatting &&
                    feedbackFormik.errors.currentRatting
                      ? feedbackFormik.errors.currentRatting
                      : "Ratting"}
                    <span>
                      <sup>*</sup>
                    </span>
                  </label>
                  <div
                    className="ratting_container"
                    data-rating="0"
                    name="currentRatting"
                    id="currentRatting"
                    onMouseOver={handleRatting}
                    onMouseLeave={removeRatting}
                    onClick={RattingSetted}
                    // value={currentRatting}
                    // onChange={(e)=>setCurrentRatting(e.target.value)}
                    value={feedbackFormik.values.currentRatting}
                    onChange={feedbackFormik.handleChange}
                    onBlur={feedbackFormik.handleBlur}
                  >
                    <span className="ratting_star">
                      <i className="bx bxs-star star" data-rating="1"></i>
                    </span>
                    <span className="ratting_star">
                      <i className="bx bxs-star star" data-rating="2"></i>
                    </span>
                    <span className="ratting_star">
                      <i className="bx bxs-star star" data-rating="3"></i>
                    </span>
                    <span className="ratting_star">
                      <i className="bx bxs-star star" data-rating="4"></i>
                    </span>
                    <span className="ratting_star">
                      <i className="bx bxs-star star" data-rating="5"></i>
                    </span>
                  </div>
                </div>
                <div className="form_actions">
                  <button type="submit">
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/fluency/48/send-comment.png"
                      alt="send-comment"
                    />
                    Send Feedback
                  </button>
                </div>
              </form>
            </div>
            {/* //Feedback messages */}
            <div className="Feedback_container">
              <div className="feeback_title">
                {commentOpen ? (
                  <button onClick={() => setCommentOpen(false)}>
                    <i className="uil uil-feedback"></i>
                    Hide All Feedbacks
                  </button>
                ) : (
                  <button onClick={() => setCommentOpen(true)}>
                    <i className="uil uil-feedback"></i>See All Feedbacks
                  </button>
                )}

                {feedbackLoader ? (
                  <span className="feedBack_loader"></span>
                ) : (
                  ""
                )}
              </div>

              {commentOpen ? (
                <div className="comment_box">
                  {AllFeedBacks.map((data, index) => {
                    return (
                      <div className="message" key={index}>
                        <div className="user_detail">
                          <div className="profile">
                            <img src={profile} alt="profile" />
                          </div>
                          <div className="details">
                            <div className="userName">
                              <p>
                                {data.userName}
                                <i className="bx bxs-user-check"></i>
                              </p>
                            </div>
                            <div className="stars">
                              <div
                                className="ratting_container1"
                                data-rating={data.currentRatting}
                                name="currentRatting"
                                // id="currentRatting"
                                id={
                                  data.currentRatting == 0
                                    ? "noRatting"
                                    : "" || data.currentRatting == 1
                                    ? "singleRatting"
                                    : "" || data.currentRatting == 2
                                    ? "doubleRatting"
                                    : "" || data.currentRatting == 3
                                    ? "ThreeRatting"
                                    : "" || data.currentRatting == 4
                                    ? "fourRatting"
                                    : "" || data.currentRatting == 5
                                    ? "fullRatting"
                                    : ""
                                }
                                value={data.currentRatting}
                              >
                                <span className="ratting_star">
                                  <i
                                    className="bx bxs-star star1"
                                    data-rating="1"
                                  ></i>
                                </span>
                                <span className="ratting_star">
                                  <i
                                    className="bx bxs-star star1"
                                    data-rating="2"
                                  ></i>
                                </span>
                                <span className="ratting_star">
                                  <i
                                    className="bx bxs-star star1"
                                    data-rating="3"
                                  ></i>
                                </span>
                                <span className="ratting_star">
                                  <i
                                    className="bx bxs-star star1"
                                    data-rating="4"
                                  ></i>
                                </span>
                                <span className="ratting_star">
                                  <i
                                    className="bx bxs-star star1"
                                    data-rating="5"
                                  ></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="comments">
                          <i className="bx bx-chat"></i>
                          <span>{data.userFeedback}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* Inquries */}
          <div className="card8_box12" ref={targetRef}>
            <div className="inquries_title">
              <h4>Inquries</h4>
            </div>
            <div className="inquiries_container5">
              <form action="">
                <div className="form_group">
                  <label htmlFor="name">
                    Name <sup style={{ color: "red" }}>*</sup>
                  </label>
                  <div className="input">
                    <input type="text" placeholder="Your Name" />
                    <i className="bx bxs-user-pin"></i>
                  </div>
                </div>
                <div className="form_group">
                  <label htmlFor="email">
                    Email <sup style={{ color: "red" }}>*</sup>
                  </label>
                  <div className="input">
                    <input type="email" placeholder="Your Email" />
                    <i className="bx bxs-envelope"></i>
                  </div>
                </div>
                <div className="form_group">
                  <label htmlFor="name">
                    Phone <sup style={{ color: "red" }}>*</sup>
                  </label>
                  <div className="input">
                    <input type="tel" placeholder="Enter Phone Number" />
                    <i className="bx bxs-phone-call"></i>
                  </div>
                </div>
                <div className="form_group">
                  <label htmlFor="name">
                    Message <sup style={{ color: "red" }}>*</sup>
                  </label>
                  <div className="input">
                    <textarea
                      name="message"
                      id="message"
                      cols="30"
                      rows="5"
                      placeholder="Enter Your Message Here..."
                    ></textarea>
                    <i class="bx bxs-message-dots"></i>
                  </div>
                </div>
                <div className="form_actions">
                  <button type="submit">
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/fluency/48/submit-for-approval.png"
                      alt="submit-for-approval"
                    />
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Footer */}
          <div className="card8_box_13">
            <div className="footer_container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="#ffb545"
                  fill-opacity="1"
                  d="M0,96L60,117.3C120,139,240,181,360,181.3C480,181,600,139,720,128C840,117,960,139,1080,128C1200,117,1320,75,1380,53.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                ></path>
              </svg>
              <p>All Copyright Reserved &copy; 2024 myvirtualcard.in</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCardDesign8;