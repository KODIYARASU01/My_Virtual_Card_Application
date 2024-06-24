import React, { useContext, useEffect, useState } from "react";
import "./menuStyles/User_VCards.scss";
import { Link } from "react-router-dom";
import SuperAdmin_context from "../../SuperAdmin_Context/SuperAdmin_context";
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import toast from "react-hot-toast";
import {useParams} from 'react-router-dom'
const User_VCards = () => {

  let { userName, setFormSubmitLoader } = useContext(SuperAdmin_context);
let[CurrentPlan,setCurrentPlan]=useState()
  let [VcardDeleteToggle, setVcardDeleteToggle] = useState(false);
  let [Yes, setYes] = useState(false);
  let [VCardCount, setVCardCount] = useState();
  let [URL_Alies, setURL_Alies] = useState();
  let userData = JSON.parse(localStorage.getItem("datas"));

  const [key, setKey] = useState(0);
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  // let VCardURL = JSON.parse(localStorage.getItem("URL_Alies"));
  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  useEffect(() => {
    setFormSubmitLoader(true);
    axios
      .get(`http://localhost:3001/vcard_URL/${userName}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        setFormSubmitLoader(false);
        setVCardCount(res.data.data);
      })
      .catch((error) => {
        setFormSubmitLoader(false);
        console.log(error);
      });
  }, [key]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/currentplan/specificAll/${userName}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        setCurrentPlan(res.data.data[0].currentPlan)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  async function handleVCardDelete() {
    setFormSubmitLoader(true);
    try {
      await axios
        .delete(
          `http://localhost:3001/vcard/all_Data_Delete_API/${URL_Alies}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageDatas.token}`,
            },
          }
        )
        .then((res) => {
          reloadComponent();
          toast.success("Your VCard Sucessfully Deleted!");
          setFormSubmitLoader(false);
          setVcardDeleteToggle(false);
        })
        .catch((error) => {
          toast.error("Failed to Delete!");
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  const [copied, setCopied] = useState(false);

  const handleCopyURL = () => {
    setCopied(true);
    toast.success("Link Copied!");
    setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
  };
  return (
    <>
      <div className="user_vcards_container">
        {VcardDeleteToggle ? (
          <div className="Vcard_delete_popupBox">
            <div className="popup_title">
              Are u sure want to delete Your VCard?
            </div>

            <div className="popup_actions">
              <div className="delete">
                <button onClick={handleVCardDelete}>Yes</button>
              </div>
              <div className="cancel">
                <button onClick={() => setVcardDeleteToggle(false)}>No</button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="row_1">
          <div className="actions">
            <Link>
              <button
                onClick={async () => {
                  setFormSubmitLoader(true);
                  await axios
                    .get(`http://localhost:3001/vcard_URL/${userName}`, {
                      headers: {
                        Authorization: `Bearer ${userData.token}`,
                      },
                    })
                    .then((res) => {
                      console.log(res);
                      if (res.data.length < 5) {
                        setFormSubmitLoader(false)(
                          (window.location.pathname = `/${userName}/uadmin/create_new_vcard`)
                        );
                      } else {
                        setFormSubmitLoader(false);
                        toast.error(
                          "Already U Created Your VCard..One VCard Access U subscribed!  "
                        );
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
                className="fw-bolder"
              >
                <i className="bx bx-plus"></i>
                Create New VCard
              </button>
            </Link>
          </div>
        </div>
        <div className="row_2">
          <div className="title">
            <h5 className="fw-medium">All Your VCards</h5>
          </div>

          <div className="appoinment_container table-responsive  ">
            <div className="container">
              <table className="table table-hover rounded-3" id="example">
                <thead>
                  <tr>
                    <th
                      className="fw-semibold text-center"
                      style={{ width: "10%" }}
                    >
                      PROFILE
                    </th>
                    <th
                      className="text-center fw-semibold"
                      style={{ width: "18%" }}
                    >
                      VCARD NAME
                    </th>
                    <th
                      className="text-center fw-semibold"
                      style={{ width: "25%" }}
                    >
                      PREVIEW URL
                    </th>

                    <th
                      className="text-center fw-semibold "
                      style={{ width: "10%" }}
                    >
                      PLAN
                    </th>

                    <th
                      className="text-center fw-semibold "
                      style={{ width: "10%" }}
                    >
                      SUBSCRIBERS
                    </th>
                    <th
                      className="text-center fw-semibold "
                      style={{ width: "15%" }}
                    >
                      CREATED AT
                    </th>
                    <th
                      className="text-center fw-semibold "
                      style={{ width: "40%" }}
                    >
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {VCardCount != undefined ? (
                    VCardCount.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td className="fw-light">
                            <img src={data.Profile} alt="profile" />
                          </td>
                          <td className="fw-light">{data.VCardName}</td>
                          <td className="fw-light text-center align-items-center">
                            {" "}
                            <a
                              href={`https://myvirtualcard.in/${data.URL_Alies}`}
                              target="_blank"
                            >
                              https://myvirtualcard.in/{data.URL_Alies}
                            </a>
                            <CopyToClipboard
                              text={`https://myvirtualcard.in/${data.URL_Alies}`}
                              onCopy={handleCopyURL}
                            >
                              <i className="bx bx-copy"></i>
                            </CopyToClipboard>
                          </td>
                          <td className="fw-light plan">
                            <small>{CurrentPlan}</small>
                          </td>

                          <td className="fw-light plan">
                            <i class="bx bxs-group"></i>
                          </td>
                          <td className="fw-light">
                            <small>
                              {data.createdAt
                                .slice(0, 10)
                                .split("-")
                                .reverse()
                                .join("-")}
                            </small>
                          </td>
                          <td className="fw-light">
                            <i
                              className="bx bxs-edit"
                         
                              onClick={async () => {
                                localStorage.setItem(
                                  "URL_Alies",
                                  data.URL_Alies
                                );
                                window.location.pathname = `/${userName}/uadmin/vcard_form_edit/${data.URL_Alies}`;
                              }}
                            ></i>
                            <i
                              className="bx bx-trash"
                              style={{color:'red'}}
                              onClick={() => {
                                // handleVCardDelete(data.URL_Alies);
                                setURL_Alies(data.URL_Alies);
                                setVcardDeleteToggle(true);
                              }}
                            ></i>
                            <i className="bx bx-dots-vertical-rounded"></i>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td colSpan="1" className="text-center">
                        No Vcard Found!
                      </td>

                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User_VCards;
