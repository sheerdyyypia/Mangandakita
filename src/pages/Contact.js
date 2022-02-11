import React from "react";

function Contact() {
  return (
    <div class="mapouter">
      <h1>LOCATION</h1>
      <div class="gmap_canvas">
        <iframe
          width="600"
          height="400"
          id="gmap_canvas"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251624.69402926718!2d125.44390036658729!3d9.796847634990442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x330136c91863193d%3A0x8d809adba4083ee4!2sSurigao%20City%2C%20Surigao%20del%20Norte!5e0!3m2!1sen!2sph!4v1644549092158!5m2!1sen!2sph"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
