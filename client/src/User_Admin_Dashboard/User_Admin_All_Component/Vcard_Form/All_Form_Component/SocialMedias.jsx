import React,{useState,useContext} from 'react'
import './form_styles/SocialMedias.scss';
import { useFormik } from "formik";
import axios from "axios";
import { Toaster,toast } from "react-hot-toast";
import SuperAdmin_context from "../../../../SuperAdmin_Context/SuperAdmin_context";
import { SocialMediaValidate } from '../../../../Helper/SocialMediaValidate';
const SocialMedias = () => {
  let { FormSubmitLoader, setFormSubmitLoader,userName } =
  useContext(SuperAdmin_context);
  //SOcialMedia :
  let [Facebook, setFacebook] = useState();
  let [LinkedIn, setLinkedIn] = useState();
  let [WhatsUp, setWhatsUp] = useState();
  let [Instagram, setInstagram] = useState();
  let [Twiter, setTwiter] = useState();
  let [Website, setWebsite] = useState();
  let [YouTube, setYouTube] = useState();
  let [Github, setGithub] = useState();
  //Localstorage data:
  let localStorageDatas=JSON.parse(localStorage.getItem('datas'));

  let formik = useFormik({
    initialValues: {

      Facebook: "",
      LinkedIn: "",
      WhatsUp: '',
      Instagram:'',
      Twiter:'',
      Website:'',
      YouTube:'',
      Github:''
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate:SocialMediaValidate,
 
    onSubmit: async (values) => {
      setFormSubmitLoader(true);
      await axios
        .post("http://localhost:3001/socialMediaDetail", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message)
          setTimeout(()=>{
            setFacebook('');
            setWebsite("");
            setWhatsUp("");
            setInstagram("");
            setTwiter("");
            setYouTube("");
            setLinkedIn("");
            setGithub("");
          },2000)
          setFormSubmitLoader(false);
        })
        .catch((error) => {
       toast.error(error.response.data.message);
       console.log(error)
          setFormSubmitLoader(false);
        });
    },
  });
  return (
<>
<div className="socialmedia_component">
  <div className="title">
    <h6>Link Your Social Medias</h6>

    <div className="note">
      <small><span>Note :</span>Link all your social media with in https URL except <span>whatsup</span> ..Whatsup should paste your <span>10 digit mobile number with country code</span>.</small>
    </div>
  </div>
<div className="all_socialmedias">
    <form action="" onSubmit={formik.handleSubmit}>
      <div className="form_group ">
        <label htmlFor="Facebook">
        <i className='bx bxl-facebook-square'></i>
   
        </label>
        <input type="text" placeholder='https://www.facebook.com/' {...formik.getFieldProps('Facebook')} />
      </div>
      <div className="form_group">
        <label htmlFor="WhatsUp">
        <i className='bx bxl-whatsapp-square' ></i>
        <sup>(*mandatory)</sup>
        </label>
        <input type="tel" placeholder='+91 ...........'{...formik.getFieldProps('WhatsUp')} />
      </div>
      <div className="form_group">
        <label htmlFor="Instagram">
        <i className='bx bxl-instagram-alt' ></i>
        </label>
        <input type="text" placeholder='https://www.instagram.com/' {...formik.getFieldProps('Instagram')}/>
      </div>
      <div className="form_group">
        <label htmlFor="LinkedIn">
        <i className='bx bxl-linkedin-square' ></i>
        </label>
        <input type="text" placeholder='https://www.linkedin.com/' {...formik.getFieldProps('LinkedIn')}/>
      </div>
      <div className="form_group">
        <label htmlFor="Twiter">
        <i className='bx bxl-twitter'></i>
        </label>
        <input type="text" placeholder='https://www.twiter.com/' {...formik.getFieldProps('Twiter')} />
      </div>
      <div className="form_group">
        <label htmlFor="Github">
        <i className='bx bxl-github'></i>
        </label>
        <input type="text" placeholder='https://www.github.com/' {...formik.getFieldProps('Github')}/>
      </div>
      <div className="form_group">
        <label htmlFor="YouTube">
        <i className='bx bxl-youtube'></i>
        </label>
        <input type="text" placeholder='https://www.youtube.com/' {...formik.getFieldProps('YouTube')}/>
      </div>
      <div className="form_group">
        <label htmlFor="Website">
        <i className='bx bx-world' style={{color:'grey'}} ></i>
        </label>
        <input type="text" placeholder='Your website link' {...formik.getFieldProps('Website')}/>
      </div>
      <div className="form_submit_actions">
              <div className="save">
              <button type="submit">
                Save
              </button>
              </div>
           <div className="discard">
           <button type='button' onClick={formik.handleReset}>Clear</button>
           </div>
           
            </div>
    </form>
</div>
</div>
</>
  )
}

export default SocialMedias;
