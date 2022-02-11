import React from "react";

function TechStackPage() {
  return (
    <div className="mt-6">
      <h2 className="text-center font-semibold text-3xl mb-4 text-gray-500">
        Tech Stack
      </h2>
      <div className="flex items-center gap-3 justify-center">
        <div className="flex flex-col gap-2 items-center">
          <img
            alt=""
            className="h-20 object-contain"
            src="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-standard.png"
            width={130}
            height={170}
          />
          <p>Firebase (Database)</p>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <img
            alt=""
            className="h-20 object-contain"
            src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"
            width={150}
            height={150}
          />
          <p>React JavaScript (Programming Language)</p>
        </div>
      </div>
    </div>
  );
}

export default TechStackPage;
