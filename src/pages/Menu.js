import React from "react";
import animation from "../assets/animation.mp4";


function Menu() {
  return (
    <div className="vid">
      <video
        src={animation}
        width={1280}
        height={720}
        autoPlay
        loop={true}
        muted={true}
      />

      </div>
    
  );
}

export default Menu;
