import React from 'react'
import './Edit_form_styles/Edit_Business_Hour.scss';

const Business_Hour = () => {
  return (
  <>
  <div className="business_hour_container">
  <div className="title">
          <h4 >Your Business Hour</h4>
          <div className="note">
      <small><span>Note :</span>When users click any one of this time u scheduled that will <span>notify</span> by message with <span>paid or unpaid</span> visit that is your choice u can discuss with your client by call or directly. </small>
    </div>
        </div>
    <div className="business_box">
    <div class="cs-form">
        <h5>Monday</h5>
  <input type="time" class="form-control" value="00:00 AM" />
  <div className="to">
  <p>To</p>
  </div>

  <input type="time" class="form-control" value="00:00 AM" />
</div>
<div class="cs-form">

        <h5>Tuesday</h5>
        <input type="time" class="form-control" value="00:00 AM" />
  <div className='to'>
  <p>To</p>
  </div>

  <input type="time" class="form-control" value="00:00 AM" />
</div>
<div class="cs-form">

        <h5>Wednesday</h5>
        <input type="time" class="form-control" value="00:00 AM" />
  <div className='to'>
  <p>To</p>
  </div>

  <input type="time" class="form-control" value="00:00 AM" />
</div>
<div class="cs-form">

        <h5>Thursday</h5>
        <input type="time" class="form-control" value="00:00 AM" />
  <div className='to'>
  <p>To</p>
  </div>

  <input type="time" class="form-control" value="00:00 AM" />
</div>
<div class="cs-form">

        <h5>Friday</h5>
        <input type="time" class="form-control" value="00:00 AM" />
  <div className='to'>
  <p>To</p>
  </div>

  <input type="time" class="form-control" value="00:00 AM" />
</div>
<div class="cs-form">

        <h5>Saturday</h5>
        <input type="time" class="form-control" value="00:00 AM" />
  <div className='to'>
  <p>To</p>
  </div>

  <input type="time" class="form-control" value="00:00 AM" />
</div>
<div class="cs-form">

        <h5>Sunday</h5>
        <input type="time" class="form-control" value="00:00 AM" />
  <div className='to'>
  <p>To</p>
  </div>

  <input type="time" class="form-control" value="00:00 AM" />
</div>
<div className="form_submit_actions">
              <div className="save">
              <button type="submit">
                Save
              </button>
              </div>
           <div className="discard">
           <button>Discard</button>
           </div>
           
            </div>
    </div>
  </div>
  </>
  )
}

export default Business_Hour;

