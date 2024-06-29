import React, { useState, useEffect, useContext } from "react";
import "./form_styles/Plan.scss";
import { Link } from "react-router-dom";
import batches from "../../../../assets/animations/batches.gif";
import standard from "../../../../assets/animations/standard.gif";
import basic from "../../../../assets/animations/basic.gif";
import enterprice from "../../../../assets/animations/enterprice.gif";
import { toast, Toaster } from "react-hot-toast";
import SuperAdmin_context from "../../../../SuperAdmin_Context/SuperAdmin_context";
import axios from "axios";
let Free_Plans = [
  {
    id: 1,
    PlanName: "Demo",
    batches:
      "https://img.icons8.com/external-bearicons-flat-bearicons/64/external-Free-Trial-miscellany-texts-and-badges-bearicons-flat-bearicons.png",
    Duration: "1-Day",
    PlanPrice: 10,
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
];
let Basic_Plans = [
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
];
let Standard_Plans = [
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
];
let EnterPrice_Plans = [
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
        text: "Testimonial Sider",
      },
      {
        id: 17,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Google Map Link",
      },
      {
        id: 18,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Payment upi linking",
      },
      {
        id: 19,
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
    FormSubmitLoader,
    setFormSubmitLoader,
  } = useContext(SuperAdmin_context);

  let [currentAccessDetails, setCurrentAccessDetails] = useState();
  let [currentAccessActive, setCurrentAccessActive] = useState(false);
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
    try {
      setFormSubmitLoader(true);
      let data = {
        currentPlan,
        PlanPrice,
      };
      await axios
        .post("https://my-virtual-card-application.onrender.com/currentplan", data, {
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
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    axios
      .get(
        `https://my-virtual-card-application.onrender.com/currentplan/specificAll/${localStorageDatas.userName}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data)
        if (res.data.length > 0) {
           setCurrentPlan(res.data.data[0].currentPlan)
        }
        else{
          setCurrentPlan(null)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [FormSubmitLoader]);

  function handleAccessDetails(data) {
    setCurrentAccessDetails(data);
    setCurrentAccessActive(true)
  }

  console.log(currentPlan);
  return (
    <>
      <div className="plan_container" >
        {currentAccessDetails === 1 ? (
          <>
            {Free_Plans.map((data, index) => {
              return (
                <div className="plan_access_details" id={currentAccessActive ?'activeDetail':''}>
                      <div className="plan_close" onClick={()=>setCurrentAccessActive(false)}>
                  <i className='bx bx-message-x'></i>
                  </div>
                  <div className="plan_title">
                    <h6>{data.PlanName} Plan Access</h6>
                  </div>
                  <div className="plan_addon_service">
                    <>
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
                    </>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}
        {currentAccessDetails === 2 ? (
          <>
            {Basic_Plans.map((data, index) => {
              return (
                <div className="plan_access_details" id={currentAccessActive ?'activeDetail':''}>
                      <div className="plan_close" onClick={()=>setCurrentAccessActive(false)}>
                  <i className='bx bx-message-x'></i>
                  </div>
                  <div className="plan_title">
                    <h6>{data.PlanName} Plan Access</h6>
                  </div>
                  <div className="plan_addon_service">
                    <>
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
                    </>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}
        {currentAccessDetails === 3 ? (
          <>
            {Standard_Plans.map((data, index) => {
              return (
                <div className="plan_access_details" id={currentAccessActive ?'activeDetail':''}>
                      <div className="plan_close" onClick={()=>setCurrentAccessActive(false)}>
                  <i className='bx bx-message-x'></i>
                  </div>
                  <div className="plan_title">
                    <h6>{data.PlanName} Plan Access</h6>
                  </div>
                  <div className="plan_addon_service">
                    <>
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
                    </>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}
        {currentAccessDetails === 4 ? (
          <>
            {EnterPrice_Plans.map((data, index) => {
              return (
                <div className="plan_access_details" id={currentAccessActive ?'activeDetail':''}>
                  <div className="plan_close" onClick={()=>setCurrentAccessActive(false)}>
                  <i className='bx bx-message-x'></i>
                  </div>
                  <div className="plan_title">
                    <h6>{data.PlanName} Plan Access</h6>
                  </div>
                  <div className="plan_addon_service">
                    <>
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
                    </>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}
        <Toaster position="top-right" />
        <div id={currentAccessActive ? 'listView' :'listUnview'} >
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
          {Free_Plans.map((data, index) => {
            return (
              <div
                key={index}
                className="plan"
       
                id={currentPlan === data.PlanName ? "active" : ""}
              >
                <div
                  className="access_details_icons"
                  title="details"
                  onClick={() => handleAccessDetails(data.id)}
                >
              <i className='bx bx-list-ul'></i>
                </div>
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
                      handle_Plan_Selection(data.PlanName),
                      setPlanPrice(data.PlanPrice);
                    }}
                    className="action_div"
                    id={currentPlan === data.PlanName ? "activePlan" : ""}
                  >
                    <button>
                      {currentPlan === data.PlanName
                        ? "Selected"
                        : "Choose Plan"}
                    </button>
                  </div>
                </div>
       
              </div>
            );
          })}
          {Basic_Plans.map((data, index) => {
            return (
              <div
                key={index}
                className="plan"
                id={currentPlan === data.PlanName ? "active" : ""}
                // onClick={() => {
                //   handle_Plan_Selection(data.PlanName),
                //     setPlanPrice(data.PlanPrice);
                // }}
              >
                <div
                  className="access_details_icons"
                  title="details"
                  onClick={() => handleAccessDetails(data.id)}
                >
                  <i className='bx bx-list-ul'></i>
                </div>
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
                      handle_Plan_Selection(data.PlanName),
                      setPlanPrice(data.PlanPrice);
                    }}
                    className="action_div"
                    id={currentPlan === data.PlanName ? "activePlan" : ""}
                  >
                    <button>
                      {currentPlan === data.PlanName
                        ? "Selected"
                        : "Choose Plan"}
                    </button>
                  </div>
                </div>
          
              </div>
            );
          })}
          {Standard_Plans.map((data, index) => {
            return (
              <div
                key={index}
                className="plan"
         
                // onClick={() => {
                //   handle_Plan_Selection(data.PlanName),
                //     setPlanPrice(data.PlanPrice);
                // }}
                id={currentPlan === data.PlanName ? "active" : ""}
              >
                <div
                  className="access_details_icons"
                  title="details"
                  onClick={() => handleAccessDetails(data.id)}
                >
                    <i className='bx bx-list-ul'></i>
                </div>
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
                      handle_Plan_Selection(data.PlanName),
                      setPlanPrice(data.PlanPrice);
                    }}
                    className="action_div"
                    id={currentPlan === data.PlanName ? "activePlan" : ""}
                  >
                    <button>
                      {currentPlan === data.PlanName
                        ? "Selected"
                        : "Choose Plan"}
                    </button>
                  </div>
                </div>
           
              </div>
            );
          })}
          {EnterPrice_Plans.map((data, index) => {
            return (
              <div
                key={index}
                className="plan"
         
                // onClick={() => {
                //   handle_Plan_Selection(data.PlanName),
                //     setPlanPrice(data.PlanPrice);
                // }}
                id={currentPlan === data.PlanName ? "active" : ""}
              >
                <div
                  className="access_details_icons"
                  title="details"
                  onClick={() => handleAccessDetails(data.id)}
                >
                  <i className='bx bx-list-ul'></i>
                </div>
                <div className="batches">
                  {/* <img src={data.batches} alt="batch" /> */}
                  <i className='bx bxs-purchase-tag bx-tada' ></i>
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
                      handle_Plan_Selection(data.PlanName),
                      setPlanPrice(data.PlanPrice);
                    }}
                    className="action_div"
                    id={currentPlan === data.PlanName ? "activePlan" : ""}
                  >
                    <button>
                      {currentPlan === data.PlanName
                        ? "Selected"
                        : "Choose Plan"}
                    </button>
                  </div>
                </div>
        
              </div>
            );
          })}
        </div>
        </div>
    
      </div>
    </>
  );
};

export default Plan;