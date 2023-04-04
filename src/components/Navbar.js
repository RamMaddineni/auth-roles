import React from "react";
import {Link} from "react-router-dom";
import {logout} from "../config/firebase";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="bg-gradient-to-r from-amber-300 to-cyan-200 text-white ">
      <div className="flex justify-between w-full p-4">
        <h1 className="text-center text-2xl font-bold ">Admin Page</h1>
        <div className="flex gap-3 ">
          <Link to="AddEmployee">
            <button className="p-2 _btn">Add Employee</button>
          </Link>
          <Link to="FireEmployee">
            <button className="p-2 _btn">Fire Employee</button>
          </Link>
          <Link to="SetShow">
            <button className="p-2 _btn">set Show</button>
          </Link>
          <Link to="DeleteShow">
            <button className="p-2 _btn">Delete Show</button>
          </Link>
          <Link to="/">
            <button className="dashboard__btn _btn" onClick={logout}>
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
