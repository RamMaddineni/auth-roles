import React from "react";
import "./AddEmployee.css";
function AddEmployee() {
  return (
    <div className="">
      <form className="form bg-gradient-to-r from-rose-700 to-violet-700">
        <h2 className="title"> Enter the employee details to Add</h2>

        <input type="text" className="input" placeholder="username" />
        <input type="email" className="input" placeholder="email" />
        <input type="password" className="input" placeholder="password" />

        <button className="button">Add</button>
      </form>
    </div>
  );
}

export default AddEmployee;
