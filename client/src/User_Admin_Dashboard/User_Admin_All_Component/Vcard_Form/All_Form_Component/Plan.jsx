import React, { useState, useContext } from "react";
import "./form_styles/Plan.scss";
import { Link } from "react-router-dom";
import batches from "../../../../assets/animations/batches.gif";
import standard from "../../../../assets/animations/standard.gif";
import basic from "../../../../assets/animations/basic.gif";
import enterprice from "../../../../assets/animations/enterprice.gif";
import { toast, Toaster } from "react-hot-toast";
import SuperAdmin_context from "../../../../SuperAdmin_Context/SuperAdmin_context";
import axios from "axios";
let Your_Plans = [
  {
    id: 1,
    PlanName: "Free Demo",
    batches:
      "https://img.icons8.com/external-bearicons-flat-bearicons/64/external-Free-Trial-miscellany-texts-and-badges-bearicons-flat-bearicons.png",
    Duration: "Month",
    PlanPrice: 0,
    VCardCount: "01",
    Access: [
      {
        id: 1,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Basic Information",
      },
      {
        id: 2,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Share cards with Everyone",
      },
      {
        id: 3,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Update card Unlimited times",
      },
      {
        id: 4,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Profile Photo / Company Logo",
      },
      {
        id: 5,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Name & Contact Number",
      },
      {
        id: 6,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Social Media Links",
      },
      {
        id: 7,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Email Instantly",
      },
      {
        id: 8,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Call Now in a Touch",
      },
      {
        id: 9,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Website in a Single Click",
      },
      {
        id: 10,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Photos in Gallery -2",
      },
      {
        id: 11,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Contact Form Included",
      },
    ],
  },
  {
    id: 2,
    PlanName: "Basic",
    batches: basic,
    Duration: "Yearly",
    PlanPrice: 365,
    VCardCount: "05",
    Access: [
      {
        id: 1,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Basic Information",
      },
      {
        id: 2,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Share cards with Everyone",
      },
      {
        id: 3,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Update card Unlimited times",
      },
      {
        id: 4,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Profile Photo / Company Logo",
      },
      {
        id: 5,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Name & Contact Number",
      },
      {
        id: 6,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Social Media Links",
      },
      {
        id: 7,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Email Instantly",
      },
      {
        id: 8,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Call Now in a Touch",
      },
      {
        id: 9,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Website in a Single Click",
      },
      {
        id: 10,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Photos in Gallery -05",
      },
      {
        id: 11,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Contact Form Included",
      },
      {
        id: 12,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Services",
      },
      {
        id: 13,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "QR Code Generation",
      },
      {
        id: 14,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Google Map Link",
      },
    ],
  },
  {
    id: 3,
    PlanName: "Standard",
    batches: standard,
    Duration: "Yearly",
    PlanPrice: 799,
    VCardCount: "08",
    Access: [
      {
        id: 1,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Basic Information",
      },
      {
        id: 2,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Share cards with Everyone",
      },
      {
        id: 3,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Update card Unlimited times",
      },
      {
        id: 4,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Profile Photo / Company Logo",
      },
      {
        id: 5,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Name & Contact Number",
      },
      {
        id: 6,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Social Media Links",
      },
      {
        id: 7,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Email Instantly",
      },
      {
        id: 8,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Call Now in a Touch",
      },
      {
        id: 9,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Website in a Single Click",
      },
      {
        id: 10,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Photos in Gallery -05",
      },
      {
        id: 11,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Product with images-05",
      },
      {
        id: 12,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Product Enquiry",
      },
      {
        id: 13,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Contact Form Included",
      },
      {
        id: 14,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Services",
      },
      {
        id: 15,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "QR Code Generation",
      },
      {
        id: 16,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Google Map Link",
      },
      {
        id: 17,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Custom Domain (@ Rs.999 - optional)",
      },
    ],
  },
  {
    id: 4,
    PlanName: "Enterprises",
    batches: enterprice,
    Duration: "Yearly",
    PlanPrice: 1499,
    VCardCount: "10",
    Access: [
      {
        id: 1,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Basic Information",
      },
      {
        id: 2,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Share cards with Everyone",
      },
      {
        id: 3,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Update card Unlimited times",
      },
      {
        id: 4,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Profile Photo / Company Logo",
      },
      {
        id: 5,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Name & Contact Number",
      },
      {
        id: 6,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Social Media Links",
      },
      {
        id: 7,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Email Instantly",
      },
      {
        id: 8,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Call Now in a Touch",
      },
      {
        id: 9,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Website in a Single Click",
      },
      {
        id: 10,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Photos in Gallery -10",
      },
      {
        id: 11,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Product with images-10",
      },
      {
        id: 12,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Product Enquiry",
      },
      {
        id: 13,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Contact Form Included",
      },
      {
        id: 14,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Services",
      },
      {
        id: 15,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "QR Code Generation",
      },
      {
        id: 16,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Google Map Link",
      },
      {
        id: 17,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Payment upi linking",
      },
      {
        id: 18,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Custom Domain (@ Rs.999 - optional)",
      },
    ],
  },
];

const Plan = () => {
  let {
    currentPlan,
    setCurrentPlan,
    PlanPrice,
    setPlanPrice,
    setFormSubmitLoader,
  } = useContext(SuperAdmin_context);
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  function handle_Plan_Selection(getCurrentPlan) {
    setCurrentPlan(getCurrentPlan === currentPlan ? null : getCurrentPlan);
    if (getCurrentPlan === currentPlan) {
      toast.error("Select Your Plan!");
    } else {
      toast.success(`${getCurrentPlan} Plan Selected!`);
    }
  }

  async function handlePlanSubmit(e) {
    e.preventDefault();
    try{
        setFormSubmitLoader(true);
        let data = {
          currentPlan,
          PlanPrice,
        };
        await axios.post("http://localhost:3001/currentplan", data, {
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
            console.log(error);
            setFormSubmitLoader(false);
          });
    }
    catch(error){
        console.log(error)
    }
    

  }

  console.log(currentPlan, PlanPrice);

  return (
    <>
      <div className="plan_container">
        <Toaster position="top-right" />
        <div className="plan_title">
          <h5>Choose Your Subscription</h5>
          {currentPlan != null ? (
            <div className="actions">
              <button onClick={handlePlanSubmit} type="submit">
                Save
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="note">
          <small>
            <b>Note : </b> Select your subscription plan to get more feature{" "}
            <b>VCard Templates</b> and increase your site active duration etc..
          </small>
        </div>
        <div className="all_plans_container_box">
          {/* plan1 */}
          {Your_Plans.map((data, index) => {
            return (
              <div
                key={index}
                className="plan"
                id={currentPlan === data.PlanName ? "expand" : "default"}
                onClick={() => {
                  handle_Plan_Selection(data.PlanName),
                    setPlanPrice(data.PlanPrice);
                }}
              >
                <div className="batches">
                  <img src={data.batches} alt="batch" />
                </div>
                <div className="plan_title">
                  <h3>{data.PlanName}</h3>
                </div>
                <div className="plan_price">
                  <h2>
                    ₹ {data.PlanPrice} <small>/{data.Duration}</small>
                  </h2>
                </div>
                <div className="card_count">
                  <p>
                    No of VCards : <span>{data.VCardCount}</span>
                  </p>
                </div>

                <div className="plan_action">
                  <div
                    onClick={() => {
                      setCurrentPlan(data.PlanName);
                    }}
                    className="action_div"
                  >
                    <button>
                      {currentPlan === data.PlanName
                        ? "Selected"
                        : "Choose Plan"}
                    </button>
                  </div>
                </div>
                <div className="plan_addon_service">
                  {data.Access.map((data, index) => {
                    return (
                      <div className="list" key={index}>
                        <div className="icon">{data.icon}</div>
                        <div className="text">
                          <p>{data.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Plan;
