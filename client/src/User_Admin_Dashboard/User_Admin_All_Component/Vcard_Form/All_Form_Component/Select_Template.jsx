import React,{useRef,useState} from 'react'
import './form_styles/Select_Template.scss';
import card1 from '../../../../assets/Digicards/1.png';
import card2 from '../../../../assets/Digicards/2.png';
import card3 from '../../../../assets/Digicards/3.png';
import card4 from '../../../../assets/Digicards/4.png';
import card5 from '../../../../assets/Digicards/5.png';
import card6 from '../../../../assets/Digicards/6.png';
import card7 from '../../../../assets/Digicards/7.png';
import card8 from '../../../../assets/Digicards/8.png';
import card9 from '../../../../assets/Digicards/9.png';
import Footer from '../../../UserAdmin_Footer/Footer';

const Select_Template = () => {

  return (
   <>
   <div className="select_vcard_template_container">
<div className="row_one">
 <h6>Select Template <sup>*</sup></h6>
</div>
<div className="row_two">
<div className="image_container">
  <div className="image"  >
   
    <div  className='image_box'>
      <img src={card7} alt=""  />
    </div>
  </div>
  <div className="image">
      
  <div  className='image_box'>
      <img src={card2} alt=""  />
    </div>
  </div>
  <div className="image">
    
  <div  className='image_box'>
      <img src={card3} alt=""  />
    </div>
  </div>
  <div className="image">
   
  <div  className='image_box'>
      <img src={card4} alt=""  />
    </div>
  </div>
  <div className="image">
     
  <div  className='image_box'>
      <img src={card5} alt=""  />
    </div>
  </div>
  <div className="image">
      
  <div  className='image_box'>
      <img src={card6} alt=""  />
    </div>
  </div>
  <div className="image">
     
  <div  className='image_box'>
      <img src={card1} alt=""  />
    </div>
  </div>
  <div className="image">
     
  <div  className='image_box'>
      <img src={card8} alt=""  />
    </div>
  </div>
  <div className="image">
   
  <div  className='image_box'>
      <img src={card9} alt=""  />
    </div>
  </div>
</div>
</div>
<div className="row_3">
  <Footer/>
</div>
   </div>
   </>
  )
}

export default Select_Template;
