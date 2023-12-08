import React from "react";
import Button from "./Button";

const NavBar = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full h-4 bg-gradient-to-r from-blue-300 to-yellow-300"></div>
      <div className="w-full flex justify-end px-8 py-4">
        <Button title="Documentation" />
      </div>
    </div>
  );
};

export default NavBar;
