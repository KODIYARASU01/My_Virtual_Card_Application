import React, { useRef, useEffect, useState } from "react";
import "./HomePage.scss";
import brand_logo from "./assets/Company_Logo/logo1.png";
import { Link, NavLink } from "react-router-dom";
import slide_1_image from "./assets/Website_page_images/slide-1.png";
import vcard1 from "./assets/Digicards/1.png";
import vcard2 from "./assets/Digicards/2.png";
import vcard3 from "./assets/Digicards/3.png";
import vcard4 from "./assets/Digicards/4.png";
import vcard5 from "./assets/Digicards/5.png";
import vcard6 from "./assets/Digicards/6.png";
import vcard7 from "./assets/Digicards/7.png";
import vcard8 from "./assets/Digicards/8.png";

import view1 from "./assets/view/1.svg";
import view2 from "./assets/view/2.svg";
import view3 from "./assets/view/3.svg";

import number1 from "./assets/Digicards/number1.png";
import number2 from "./assets/Digicards/number2.png";
import number3 from "./assets/Digicards/number3.png";
import nfc from "./assets/view/4.png";

let plan_service_list=[
  {
    id:1,
    icon:<i className='bx bxs-check-shield'></i>,
    text:'Basic Information'
  },
  {
    id:2,
    icon:<i className='bx bxs-check-shield'></i>,
    text:'Social Media'
  },
  {
    id:3,
    icon:<i className='bx bxs-check-shield'></i>,
    text:'Contact Details'
  },
  {
    id:4,
    icon:<i className='bx bxs-check-shield'></i>,
    text:'Services'
  },
  {
    id:5,
    icon:<i className='bx bxs-check-shield'></i>,
    text:'Products'
  },
  {
    id:6,
    icon:<i className='bx bxs-check-shield'></i>,
    text:'Appoinment'
  },
  {
    id:7,
    icon:<i className='bx bxs-check-shield'></i>,
    text:'Add to Contact'
  },
  {
    id:8,
    icon:<i className='bx bxs-check-shield'></i>,
    text:'Blog'
  },
  {
    id:9,
    icon:<i className='bx bxs-check-shield'></i>,
    text:'Gallery'
  },
  {
    id:10,
    icon:<i className='bx bxs-check-shield'></i>,
    text:'Testimonials'
  },
  {
    id:11,
    icon:<i className='bx bxs-check-shield'></i>,
    text:'Feedback Form'
  },
  {
    id:12,
    icon:<i className='bx bxs-check-shield'></i>,
    text:'Inquiry Form'
  },
  {
    id:13,
    icon:<i className='bx bxs-shield-x'></i>,
    text:'Dynamic Styling'
  },
  {
    id:14,
    icon:<i className='bx bxs-shield-x'></i>,
    text:'IFrame'
  },
  {
    id:15,
    icon:<i className='bx bxs-shield-x'></i>,
    text:'Custom QRCode'
  },
]

let questions=[
  {
    id:1,
    plus:<i className='bx bx-plus'></i>,
    minus:<i className='bx bx-minus'></i>,
    question:'1. What is a digital vCard?',
    answer:'A digital vCard, or virtual business card, is a modern alternative to traditional paper business cards. It contains essential contact information such as name, job title, company name, phone number, email address, and more, all stored in a digital format.'
  },
  {
    id:2,
    plus:<i className='bx bx-plus'></i>,
    minus:<i className='bx bx-minus'></i>,
    question:'2. How does the NFC feature work with digital vCards?',
    answer:'The NFC (Near Field Communication) feature allows you to share your digital vCard with others by simply tapping your NFC-enabled device against theirs. This instantaneously transfers your contact information without the need for manual input or scanning QR codes.'
  },
  {
    id:3,
    plus:<i className='bx bx-plus'></i>,
    minus:<i className='bx bx-minus'></i>,
    question:'3. What devices are compatible with the NFC feature?',
    answer:'Most modern smartphones and tablets are equipped with NFC technology, including Android and iOS devices. Ensure that your device’s NFC functionality is enabled to take advantage of this feature.'
  },
  {
    id:4,
    plus:<i className='bx bx-plus'></i>,
    minus:<i className='bx bx-minus'></i>,
    question:'4. Can I customize my digital vCard?',
    answer:'Yes, you can customize your digital vCard with your preferred design, including adding your company logo, choosing colors, and selecting fonts. You can also include additional information such as social media profiles and website links.'
  },
  {
    id:5,
    plus:<i className='bx bx-plus'></i>,
    minus:<i className='bx bx-minus'></i>,
    question:'5. Is there a limit to the number of vCards I can create?',
    answer:'No, there are no limits to the number of digital vCards you can create. You can generate multiple vCards for different purposes, such as personal, professional, or specific events.'
  },
  {
    id:6,
    plus:<i className='bx bx-plus'></i>,
    minus:<i className='bx bx-minus'></i>,
    question:'6. How do I share my digital vCard with others?',
    answer:`You can share your digital vCard in multiple ways:
    •Via NFC: Simply tap your device against another NFC-enabled device to transfer your vCard.
    •QR Code: Display a QR code containing your vCard information for others to scan.
    •Email: Send your digital vCard as an email attachment.
    •Messaging Apps: Share your vCard through messaging apps like WhatsApp or Telegram.`
  },
  {
    id:7,
    plus:<i className='bx bx-plus'></i>,
    minus:<i className='bx bx-minus'></i>,
    question:'7. Can I update my digital vCard after creation?',
    answer:'Yes, you can update your digital vCard at any time. Changes you make to your contact information or design preferences will be reflected in the shared vCards.'
  },
  {
    id:8,
    plus:<i className='bx bx-plus'></i>,
    minus:<i className='bx bx-minus'></i>,
    question:'8. Is there a fee for using the NFC-enabled digital vCard service?',
    answer:'Our basic NFC-enabled digital vCard service is free to use. However, we may offer premium features or advanced customization options that come with a subscription fee.'
  },
  {
    id:9,
    plus:<i className='bx bx-plus'></i>,
    minus:<i className='bx bx-minus'></i>,
    question:'9. Is the NFC transfer secure?',
    answer:'Yes, the NFC transfer of digital vCards is secure and encrypted, ensuring that your contact information remains protected during the sharing process.'
  },
  {
    id:10,
    plus:<i className='bx bx-plus'></i>,
    minus:<i className='bx bx-minus'></i>,
    question:'10. What if I encounter issues with NFC sharing or using digital vCards?',
    answer:'If you experience any difficulties with NFC sharing or using digital vCards, please refer to our comprehensive user guide or contact our customer support team for assistance. We’re here to help resolve any issues you may encounter.'
  },
]
const HomePage1 = () => {
  const scrollContainerRef = useRef(null);
let[planExpand,setPlanExpand]=useState(false);
let[standardPlanExpand,setStandardPlanExpand]=useState(false);
let[PremiumPlanExpand,setPremiumPlanExpand]=useState(false);
let[showAnswer,setShowAnswer]=useState(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let scrollAmount = 0;
    const scrollStep = 0.3; // Adjust the speed of the scroll
    const delay = 0; // Adjust the delay for the scrolling effect

    const scrollHorizontally = () => {
      scrollAmount += scrollStep;
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollAmount;
        if (
          scrollAmount >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollAmount = 0; // Reset the scroll amount if it reaches the end
        }
      }
    };

    const intervalId = setInterval(scrollHorizontally, delay);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function handleQuestions(e,index,id){
    let index1=index+1;
 let id1=id;

    if(id1===index1){
return setShowAnswer(!showAnswer)
    }
    else{
      return
    }
console.log(e.target.value)
  }
  return (
    <>
      <div className="home_container">
        {/* whatsup_icons */}
        <div className="whatsup">
        <a href="https://wa.me/9344482370" target="_blank">
        <img width="48" height="48" src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="whatsapp--v1"/>
        </a>
        </div>
        <div className="slide_1_page">
          <ul class="slide_1_background">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <header>
            <div className="top_nav">
              <div className="left">
                <img src={brand_logo} alt="logo" />
              </div>
              <div className="right">
                <div className="nav_list">
                  <ul>
                    <li className="align-middle">
                      <NavLink>Home </NavLink>
                    </li>
                    <li>
                      <NavLink> About</NavLink>
                    </li>
                    <li>
                      <NavLink>Feature </NavLink>
                    </li>
                    <li>
                      <NavLink>Pricing </NavLink>
                    </li>
                    <li>
                      <NavLink>FAQs </NavLink>
                    </li>
                  </ul>
                </div>
                <div className="actions">
                  <Link to="/login">
                    <button>Login</button>
                  </Link>
                </div>
              </div>
            </div>
          </header>
          <div className="slide_1">
            <div className="left">
              <div className="title">
                <h3>Design Your Digital Identity:</h3>
                <h4>Introducing Custom vCards</h4>
              </div>
              <div className="sub_title">
                <p>
                  Customize Your Digital Identity Effortlessly with My Virtual
                  Card!
                </p>
              </div>
              <div className="summary">
                <p>
                  Experience the future of digital ID cards by AristosTech India
                  Pvt Ltd. Simplify identification with our secure virtual
                  solution.
                </p>
              </div>

              <div className="actions">
                <div className="start">
                  <Link to="/register">
                    <button>
                      Get Started!<i className="bx bxs-user-plus bx-tada"></i>
                    </button>
                  </Link>
                </div>
                <div className="enquiry">
                  <a href="https://wa.me/9344482370" target="_blank">
                    <button>
                      For Enquiry!<i className="bx bxs-bell-ring bx-tada"></i>
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="right">
              <img src={slide_1_image} alt="" />
            </div>
          </div>
          <div className="svg_curve">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#523ab3"
                fill-opacity="1"
                d="M0,224L48,208C96,192,192,160,288,133.3C384,107,480,85,576,106.7C672,128,768,192,864,224C960,256,1056,256,1152,234.7C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="slide_2_page">
          <div className="title">
            <h2>Explore Our Range of vCard Templates!</h2>
            <p>
              <strong>Simplify Your Digital Networking:</strong> Get Started
              with Our vCard Templates
            </p>
          </div>

          <div
            className="slide_2_container"
            ref={scrollContainerRef}
            style={{
              whiteSpace: "nowrap",

              // width: "100%",
            }}
          >
            <div className="vcard">
              <img src={vcard1} alt="vcard" />
            </div>
            <div className="vcard">
              <img src={vcard2} alt="vcard" />
            </div>
            <div className="vcard">
              <img src={vcard3} alt="vcard" />
            </div>
            <div className="vcard">
              <img src={vcard4} alt="vcard" />
            </div>
            <div className="vcard">
              <img src={vcard5} alt="vcard" />
            </div>
            <div className="vcard">
              <img src={vcard6} alt="vcard" />
            </div>
            <div className="vcard">
              <img src={vcard7} alt="vcard" />
            </div>
            <div className="vcard">
              <img src={vcard8} alt="vcard" />
            </div>
          </div>
        </div>
        <div className="slide_3_page">
          <div className="svg_anime_slide_3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#523ab3"
                fill-opacity="1"
                d="M0,160L120,181.3C240,203,480,245,720,245.3C960,245,1200,203,1320,181.3L1440,160L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
              ></path>
            </svg>
          </div>
          <div className="slide_3_title">
            <div className="heading">
              <h2>
                Premium Features by <span>VCard</span>
              </h2>
            </div>
            <div className="description">
              <p>
                Discover Innovation, Integration, and Inspiration with Our
                Premium Features
              </p>
            </div>
          </div>
          <div className="slide_3_container_box">
            <div className="box">
              <div className="icon">
                <img
                  width="67"
                  height="67"
                  src="https://img.icons8.com/external-others-inmotus-design/67/external-Call-colored-others-inmotus-design-2.png"
                  alt="external-Call-colored-others-inmotus-design-2"
                />
              </div>
              <div className="content">
                <h5>Click to Call Feature</h5>
                <p>
                  Connect Effortlessly - Your Clients Reach You with Just a Tap!
                </p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <img
                  width="100"
                  height="100"
                  src="https://img.icons8.com/stickers/100/forward-arrow.png"
                  alt="forward-arrow"
                />
              </div>
              <div className="content">
                <h5>Share Your vCard Seamlessly</h5>
                <p>
                  Effortlessly ShareYour Business Information via SMS, Email,
                  and More.
                </p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/qr-code--v1.png"
                  alt="qr-code--v1"
                />
              </div>
              <div className="content">
                <h5>Scan and Share Your vCard</h5>
                <p>
                  Scan to Access, Share to Connect: Simplify Networking with QR
                  Codes
                </p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/dynamic-links.png"
                  alt="dynamic-links"
                />
              </div>
              <div className="content">
                <h5>Social Media Links</h5>
                <p>
                  Your clients can connect with you on social media, and sharing
                  your social link can also increase your business.
                </p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/isometric/50/web-design.png"
                  alt="web-design"
                />
              </div>
              <div className="content">
                <h5>Wide Range of Templates</h5>
                <p>
                  You can choose from a wide range of templates for your VCards
                  and share them with your clients.
                </p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <img
                  width="94"
                  height="94"
                  src="https://img.icons8.com/3d-fluency/94/price-tag-usd.png"
                  alt="price-tag-usd"
                />
              </div>
              <div className="content">
                <h5>Afforadable Pricing</h5>
                <p>
                  We offer a variety of pricing plans for you to choose from,
                  depending on your needs.
                </p>
              </div>
            </div>
          </div>
          <div className="svg_bottom_slice_3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#523ab3"
                fill-opacity="1"
                d="M0,96L1440,160L1440,0L0,0Z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="slide_4_page">
          <div className="slide_4_title">
            <h2>
              Create your perfect <span>VCards with us!</span>
            </h2>
          </div>
          <div className="slide_4_container">
            <div className="row_1">
              <div className="left">
                <img src={view1} alt="view" />
              </div>
              <div className="right">
                <h3>Your Style, Your Statement: Design Your vCard</h3>
                <p>
                  Empower your digital presence with ‘Your Identity, Your
                  Influence, Your Digital Signature.’ Elevate your online
                  persona with our customizable vCard solution, showcasing your
                  brand, contact details, and expertise.
                </p>
              </div>
            </div>
            <div className="row_2">
              <div className="right">
                <h3>Unleash Your Digital Presence with Custom vCards</h3>
                <p>
                  Transform your first impression with our bespoke vCard
                  templates, designed to leave a lasting impact. Explore a
                  variety of personalized designs to confidently display your
                  professional identity, all while reflecting your distinct
                  style.
                </p>
              </div>
              <div className="left">
                <img src={view2} alt="view" />
              </div>
            </div>
            <div className="row_3">
              <div className="left">
                <img src={view3} alt="view" />
              </div>
              <div className="right">
                <h3>
                  Refine Your Digital Persona with Our Customizable vCard
                  Templates
                </h3>
                <p>
                  Step into the limelight with our meticulously curated
                  collection of vCard templates, tailored to elevate your
                  digital identity. Select from a diverse range of designs that
                  enable you to showcase your unique personality while upholding
                  a polished and professional appearance.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="slide_5_page">
          <div className="slide_5_title">
            <h2>
              Making a vCard is easy with <span>My Virtual Card</span>
            </h2>
          </div>
          <div className="slide_5_box_container">
            <div className="box_1">
              <div className="icon">
                <img src={number1} alt="view" />
              </div>
              <div className="content">
                <h3>Select Your Virtual Card Template</h3>
                <p>
                  Start with My Virtual Card's user-friendly maker. Enter your
                  details for tailored designs or use keywords for a perfect
                  fit.
                </p>
              </div>
            </div>
            <div className="box_1">
              <div className="icon">
                <img src={number2} alt="view" />
              </div>
              <div className="content">
                <h3>Select Your Virtual Card Template</h3>
                <p>
                  Start with My Virtual Card's user-friendly maker. Enter your
                  details for tailored designs or use keywords for a perfect
                  fit.
                </p>
              </div>
            </div>
            <div className="box_1">
              <div className="icon">
                <img src={number3} alt="view" />
              </div>
              <div className="content">
                <h3>Select Your Virtual Card Template</h3>
                <p>
                  Start with My Virtual Card's user-friendly maker. Enter your
                  details for tailored designs or use keywords for a perfect
                  fit.
                </p>
              </div>
            </div>
          </div>
          <div className="slider_5_nfc_container">
            <div className="svg_top">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 283.5 27.8"
                preserveAspectRatio="none"
              >
                <path
                  class="elementor-shape-fill"
                  d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7	s-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7	c-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3	c-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6	c0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7	C239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5	c0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1	c-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7	c0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6	C8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8	c0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2	C74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3	C97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1	z M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1	c-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z"
                ></path>
                <path
                  class="elementor-shape-fill"
                  d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C267.7,18.8,269.7,18,269.6,18z"
                ></path>
                <path
                  class="elementor-shape-fill"
                  d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2	S227.6,9.9,227.4,9.8z"
                ></path>
                <path
                  class="elementor-shape-fill"
                  d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4	C206.4,12.9,204.6,13.5,204.5,13.4z"
                ></path>
                <path
                  class="elementor-shape-fill"
                  d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6	S201,10.7,201,10.6z"
                ></path>
                <path
                  class="elementor-shape-fill"
                  d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C152.6,27.5,154.6,26.8,154.5,26.7z"
                ></path>
                <path
                  class="elementor-shape-fill"
                  d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6	c-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z"
                ></path>
                <path
                  class="elementor-shape-fill"
                  d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0	C76.9,11.5,75.3,12.5,75.5,12.6z"
                ></path>
                <path
                  class="elementor-shape-fill"
                  d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4	C19.9,13.7,15.7,13.3,15.6,13.2z"
                ></path>
              </svg>
            </div>
            <div className="content_box">
              <div className="left">
                <div className="header">
                  <h3>
                    Tap Into Convenience: <span>NFC Cards</span>
                  </h3>
                </div>
                <div className="sub_head">
                  <strong>Tap, Connect, Go:</strong> NFC Cards for Modern
                  Solutions
                </div>
                <div className="description">
                  <p>
                    Tap into the potential of NFC technology with our Vcards!
                    Share contact details seamlessly. Just tap, connect, and
                    exchange info effortlessly. Say goodbye to traditional
                    business cards and embrace the future of networking.
                  </p>
                </div>
              </div>
              <div className="right">
                <img src={nfc} alt="nfc" />
              </div>
            </div>
            <div className="svg_bottom">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 283.5 27.8"
                preserveAspectRatio="none"
              >
                <path
                  class="elementor-shape-fill"
                  d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7	s-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7	c-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3	c-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6	c0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7	C239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5	c0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1	c-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7	c0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6	C8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8	c0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2	C74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3	C97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1	z M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1	c-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z"
                ></path>
                <path
                  class="elementor-shape-fill"
                  d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C267.7,18.8,269.7,18,269.6,18z"
                ></path>
                <path
                  class="elementor-shape-fill"
                  d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2	S227.6,9.9,227.4,9.8z"
                ></path>
                <path
                  class="elementor-shape-fill"
                  d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4	C206.4,12.9,204.6,13.5,204.5,13.4z"
                ></path>
                <path
                  class="elementor-shape-fill"
                  d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6	S201,10.7,201,10.6z"
                ></path>
                <path
                  class="elementor-shape-fill"
                  d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C152.6,27.5,154.6,26.8,154.5,26.7z"
                ></path>
                <path
                  class="elementor-shape-fill"
                  d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6	c-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z"
                ></path>
                <path
                  class="elementor-shape-fill"
                  d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0	C76.9,11.5,75.3,12.5,75.5,12.6z"
                ></path>
                <path
                  class="elementor-shape-fill"
                  d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4	C19.9,13.7,15.7,13.3,15.6,13.2z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        {/* Plan */}
        <div className="slide_6_page">
          <div className="plan_heading">
            <h2>
              Select the <span>Perfect Plan</span> for You
            </h2>
            <p>
              <strong>Your Plan, Your Way:</strong> Choose What Works Best
            </p>
          </div>

          <div className="plan_container_box">
            {/* plan1 */}
            <div className="plan" id={planExpand ? 'expand':'default'}>
              <div className="down_arrow" onClick={()=>setPlanExpand(!planExpand)}>
              <i className='bx bxs-chevron-down bx-tada' ></i>
              </div>
              <div className="plan_title">
                <h3>Basic</h3>
              </div>
              <div className="plan_price">
                <h2>
                  ₹ 299 <small>/Yearly</small>
                </h2>
              </div>
              <div className="card_count">
                <p>
                  No of VCards : <span>05</span>
                </p>
              </div>

              <div className="plan_action">
                <Link to='/register'>
                  <button>Choose Plan</button>
                </Link>
              </div>
              <div className="plan_addon_service">

                {plan_service_list.map((data,index)=>{
                  return(
                    <div className="list" key={index}>
                    <div className="icon">
                    {data.icon}
                    </div>
                    <div className="text">
                      <p>{data.text}</p>
                    </div>
                  </div>
                  )
                })}
              
              </div>
            </div>
            {/* plan2 */}
            <div className="plan"  id={standardPlanExpand ? 'expand':'default'}>
            <div className="down_arrow" onClick={()=>setStandardPlanExpand(!standardPlanExpand)}>
              <i className='bx bxs-chevron-down bx-tada' ></i>
              </div>
              <div className="plan_title">
                <h3>Standard</h3>
              </div>
              <div className="plan_price">
                <h2>
                  ₹ 499 <small>/Yearly</small>
                </h2>
              </div>
              <div className="card_count">
                <p>
                  No of VCards : <span>02</span>
                </p>
              </div>

              <div className="plan_action">
                <Link to='/register'>
                  <button>Choose Plan</button>
                </Link>
              </div>
              <div className="plan_addon_service">

                {plan_service_list.map((data,index)=>{
                  return(
                    <div className="list" key={index}>
                    <div className="icon">
                    {data.icon}
                    </div>
                    <div className="text">
                      <p>{data.text}</p>
                    </div>
                  </div>
                  )
                })}
              
              </div>
            </div>
            {/* plan3 */}
            <div className="plan"  id={PremiumPlanExpand ? 'expand':'default'}>
            <div className="down_arrow" onClick={()=>setPremiumPlanExpand(!PremiumPlanExpand)}>
              <i className='bx bxs-chevron-down bx-tada' ></i>
              </div>
              <div className="plan_title">
                <h3>Premium</h3>
              </div>
              <div className="plan_price">
                <h2>
                  ₹ 999 <small>/Yearly</small>
                </h2>
              </div>
              <div className="card_count">
                <p>
                  No of VCards : <span>08</span>
                </p>
              </div>

              <div className="plan_action">
                <Link to='/register'>
                  <button>Choose Plan</button>
                </Link>
              </div>
              <div className="plan_addon_service">

                {plan_service_list.map((data,index)=>{
                  return(
                    <div className="list" key={index}>
                    <div className="icon">
                    {data.icon}
                    </div>
                    <div className="text">
                      <p>{data.text}</p>
                    </div>
                  </div>
                  )
                })}
              
              </div>
            </div>
          </div>
        </div>
        {/* Questions */}
        <div className="slide_7_page">
          <div className="slide_7_title">
            <h2>Frequently Asked <span>Questions</span></h2>
          </div>
          <div className="sub_heading">
            <p>Got Questions? We’ve Got Answers!</p>
          </div>

          <div className="qn_container_box">
            {/* qn */}
            {questions.map((data,index)=>{
              return(
                <div className="question_box" id={showAnswer ? 'showAnswer':'hideAnswer'} key={index}  onClick={(e)=>handleQuestions(e,index,data.id)}>
                <div className="question">
                  <h5>{data.question}</h5>
                  <div>
                    
                  {/* {data.plus} */}
                  </div>
           
                </div>
                <div className="answer">
                  {showAnswer ?  <small>{data.answer}</small>:''}
                 
                </div>
                </div>
              )
            })}
        


          </div>
        </div>
        {/* get_intouch */}
        <div className="slide_8_page">
          <div className="getin_touch_container_box">
              <div className="left">
                <div className="title">
                   <h4>Get In Touch !</h4>
                
                </div>
                <div className="list">
                <i className='bx bx-current-location'></i>
                <p> First Floor No. 113, Ankur Plaza, Old 52, Gopathi Narayanaswami Chetty Rd, T. Nagar, Chennai, Tamil Nadu 600017</p>
                </div>
                <div className="list">
                <i className='bx bx-mail-send'></i>
                <p>contact@aristostechindia.com</p>
                </div>
                <div className="list">
                <i className='bx bxs-phone-call' ></i>
                <p>+91 9344482370</p>
                </div>
              </div>
              <div className="right">
                  <div className="form_box">
                    <form action="">
                      <div className="form_group">
                        <input type="text" placeholder="Enter Your Name" />
                      </div>
                      <div className="form_group">
                        <input type="email" placeholder="Enter Your Email" />
                      </div>
                      <div className="form_group subject">
                        <input type="email" placeholder="Enter Your Email" />
                      </div>
                      <div className="message">
                        <textarea name="message" id="" cols="30" rows="5" placeholder="Enter Your Message"></textarea>
                      </div>

                      <div className="form_submit">
                        <button>Send Message</button>
                      </div>
                    </form>
                  </div>
              </div>
          </div>
        </div>
        <div className="footer">
      <div className="company">
      <p>Group of AristosTech India Pvt Ltd.</p>
      
      </div>
   <div className="aggrement">
    <Link>
    <p>Terms & Condition</p>
    </Link>
    <Link>
    <p>Privacy Policy</p>
    </Link>
   </div>
        </div>
      </div>
    </>
  );
};

export default HomePage1;
