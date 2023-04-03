import React from "react";
import "./FireEmployee.css";
import {useState, useEffect} from "react";
import {registerEmployee, auth, getObj, logInWithEmailAndPassword, deleteUser} from "../../../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";

function AddEmployee() {
    const [employeeType, setEmployeeType] = useState("");
    const [employeeEmail, setEmployeeEmail] = useState("");

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
    }, [loading]);
    const handleDelete = async (e) => {
        e.preventDefault();

        console.log("came to line 22 fire employee");
        // let adminMail = auth?.currentUser?.email;
        // let Obj;
        // await getObj(adminMail, "admin")
        //     .then((val) => {
        //         Obj = val;
        //         console.log(Obj, "came to line 28 fire employee");
        //     })
        //     .catch((err) => console.log(err));
        // console.log("came to line 32 fire employee");
        // await logInWithEmailAndPassword(
        //     employeeEmail,
        //     employeeType,
        // );
        // console.log(auth?.currentUser?.email, "user email going to delete");
        // let userType;
        // if (employeeType.toLowerCase() == "salesperson") {
        //     userType = "salesPerson";
        // }
        // if (employeeType.toLowerCase() == "accountant") {
        //     userType = "accountant";
        // }
        // await deleteUser(userType);
        // await logInWithEmailAndPassword(
        //     adminMail,
        //     Obj.password,
        // );
        // navigate(`/admin/FireEmployee`);
    };

    return (
        <div className="">
            <form
                className="form bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900"
                onSubmit={(e) =>
                    handleDelete(
                        e,
                        employeeEmail,
                        employeeType
                    )
                }
            >
                <h2 className="title"> Enter the employee details to Delete</h2>

                <input
                    type="email"
                    className="input"
                    required
                    placeholder="EmployeeEmail ?"
                    value={employeeEmail}
                    onChange={(e) => setEmployeeEmail(e.target.value)}
                />

                <input
                    type="text"
                    required
                    className="input"
                    placeholder="Employee Type ?"
                    value={employeeType}
                    onChange={(e) => setEmployeeType(e.target.value)}
                />

                <button className="button" type="submit">
                    Delete {console.log("came to line 86 fire employee")}
                </button>
            </form>
        </div>
    );
}

export default AddEmployee;
